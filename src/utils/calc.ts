/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match, TeamStats } from '../types';
import { TEAMS, generateRealisticMatchSimulation, simulateGoalScorers, KNOCKOUT_METADATA_TEMPLATES } from '../data';

// Computes standings for a single group based on current matches
export function computeGroupStandings(groupLetter: string, matches: Match[]): TeamStats[] {
  const groupTeams = TEAMS.filter((t) => t.group === groupLetter);
  const statsMap: Record<string, TeamStats> = {};

  // Initialize
  groupTeams.forEach((team) => {
    statsMap[team.code] = {
      code: team.code,
      name: team.name,
      group: groupLetter,
      played: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      stars: team.rating
    };
  });

  // Filter completed matches for this group
  const groupKeyMatches = matches.filter(
    (m) => m.group === groupLetter && !m.isKnockout && m.state !== 'pending'
  );

  groupKeyMatches.forEach((m) => {
    if (m.homeTeamCode && m.awayTeamCode && m.homeScore !== null && m.awayScore !== null) {
      const home = statsMap[m.homeTeamCode];
      const away = statsMap[m.awayTeamCode];

      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.goalsFor += m.homeScore;
        home.goalsAgainst += m.awayScore;
        away.goalsFor += m.awayScore;
        away.goalsAgainst += m.homeScore;

        if (m.homeScore > m.awayScore) {
          home.wins += 1;
          home.points += 3;
          away.losses += 1;
        } else if (m.homeScore < m.awayScore) {
          away.wins += 1;
          away.points += 3;
          home.losses += 1;
        } else {
          home.draws += 1;
          away.draws += 1;
          home.points += 1;
          away.points += 1;
        }
      }
    }
  });

  // Math-sort
  return Object.values(statsMap).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const diffA = a.goalsFor - a.goalsAgainst;
    const diffB = b.goalsFor - b.goalsAgainst;
    if (diffB !== diffA) return diffB - diffA;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return b.stars - a.stars; // Tie-breaker by rating
  });
}

// Calculates full standings for all 12 groups
export function computeAllGroupStandings(matches: Match[]): Record<string, TeamStats[]> {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const standings: Record<string, TeamStats[]> = {};
  letters.forEach((l) => {
    standings[l] = computeGroupStandings(l, matches);
  });
  return standings;
}

// Ranks all third placed teams from all groups; selects top 8
export function computeThirdPlacedRankings(allStandings: Record<string, TeamStats[]>): TeamStats[] {
  const thirds: TeamStats[] = [];
  Object.keys(allStandings).forEach((grp) => {
    const list = allStandings[grp];
    if (list && list[2]) {
      thirds.push(list[2]); // The 3rd index
    }
  });

  // Sort them
  return thirds.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return b.stars - a.stars; // Tie-breaker by rating
  });
}

// Decides perfect assignments of the 8 qualified third-place teams into Round of 32 slots (greedy or backtracking solver)
export function matchThirdPlacesToKnockoutSlots(
  qualifiedThirds: TeamStats[]
): Record<number, string> {
  const slots = [
    { id: 74, eligible: ['A', 'B', 'C', 'D', 'F'] },
    { id: 77, eligible: ['C', 'D', 'F', 'G', 'H'] },
    { id: 79, eligible: ['C', 'E', 'F', 'H', 'I'] },
    { id: 80, eligible: ['E', 'H', 'I', 'J', 'K'] },
    { id: 81, eligible: ['B', 'E', 'F', 'I', 'J'] },
    { id: 82, eligible: ['A', 'E', 'H', 'I', 'J'] },
    { id: 85, eligible: ['E', 'F', 'G', 'I', 'J'] },
    { id: 87, eligible: ['D', 'E', 'I', 'J', 'L'] }
  ];

  const assignment: Record<number, string> = {};
  const usedTeams = new Set<string>();

  function backtrack(slotIndex: number): boolean {
    if (slotIndex === slots.length) return true;
    const slot = slots[slotIndex];
    for (const teamStats of qualifiedThirds) {
      const code = teamStats.code;
      if (!usedTeams.has(code) && slot.eligible.includes(teamStats.group)) {
        usedTeams.add(code);
        assignment[slot.id] = code;
        if (backtrack(slotIndex + 1)) return true;
        // backup
        usedTeams.delete(code);
        delete assignment[slot.id];
      }
    }
    return false;
  }

  if (backtrack(0)) {
    return assignment;
  }

  // Fallback if backtracking can't match strictly
  const fallback: Record<number, string> = {};
  slots.forEach((s, idx) => {
    if (qualifiedThirds[idx]) {
      fallback[s.id] = qualifiedThirds[idx].code;
    }
  });
  return fallback;
}

// Compute the entire dynamic tree of the tournament (bracket matches)
export function computeKnockoutFixtures(
  matches: Match[], // current list of matches (contains group + knockout matches)
  allGroupStandings: Record<string, TeamStats[]>,
  thirdPlaceAssignments: Record<number, string>
): Match[] {
  // Extract all currently played knockout results to preserve them
  const currentKnockoutsMap = new Map<number, Match>();
  matches.forEach((m) => {
    if (m.isKnockout) {
      currentKnockoutsMap.set(m.id, m);
    }
  });

  const getWinner = (matchId: number): string | null => {
    const m = currentKnockoutsMap.get(matchId);
    if (!m || m.state === 'pending' || m.homeTeamCode === null || m.awayTeamCode === null) {
      return null;
    }
    if (m.homeScore !== null && m.awayScore !== null) {
      if (m.homeScore > m.awayScore) return m.homeTeamCode;
      if (m.homeScore < m.awayScore) return m.awayTeamCode;
      // penalties
      if (m.homePenScore !== null && m.awayPenScore !== null) {
        return m.homePenScore > m.awayPenScore ? m.homeTeamCode : m.awayTeamCode;
      }
    }
    return null;
  };

  const getLoser = (matchId: number): string | null => {
    const m = currentKnockoutsMap.get(matchId);
    if (!m || m.state === 'pending' || m.homeTeamCode === null || m.awayTeamCode === null) {
      return null;
    }
    const win = getWinner(matchId);
    if (!win) return null;
    return win === m.homeTeamCode ? m.awayTeamCode : m.homeTeamCode;
  };

  const getTeamForLabel = (label: string, matchId: number): string | null => {
    if (label.startsWith('1º Grupo')) {
      const grp = label.substring(9);
      const stand = allGroupStandings[grp];
      return stand && stand[0] ? stand[0].code : null;
    }
    if (label.startsWith('2º Grupo')) {
      const grp = label.substring(9);
      const stand = allGroupStandings[grp];
      return stand && stand[1] ? stand[1].code : null;
    }
    if (label.startsWith('3º Grupo')) {
      // Look up our assigned third place team for this specific R32 match
      return thirdPlaceAssignments[matchId] || null;
    }
    if (label.startsWith('Vencedor Jogo')) {
      const prevId = parseInt(label.substring(14));
      return getWinner(prevId);
    }
    if (label.startsWith('Perdedor Jogo')) {
      const prevId = parseInt(label.substring(14));
      return getLoser(prevId);
    }
    return null;
  };

  // Build the live knockout matches
  return KNOCKOUT_METADATA_TEMPLATES.map((tpl) => {
    const existing = currentKnockoutsMap.get(tpl.id);
    const resolvedHome = getTeamForLabel(tpl.homeLabel, tpl.id);
    const resolvedAway = getTeamForLabel(tpl.awayLabel, tpl.id);

    // If teams have changed due to group standings, reset the match back to pending unless they match!
    const isStillValid = existing && 
      existing.homeTeamCode === resolvedHome && 
      existing.awayTeamCode === resolvedAway;

    return {
      id: tpl.id,
      isKnockout: true,
      roundKey: tpl.roundKey,
      homeTeamCode: resolvedHome,
      awayTeamCode: resolvedAway,
      homeScore: isStillValid ? existing!.homeScore : null,
      awayScore: isStillValid ? existing!.awayScore : null,
      homePenScore: isStillValid ? existing!.homePenScore : null,
      awayPenScore: isStillValid ? existing!.awayPenScore : null,
      state: isStillValid ? existing!.state : 'pending',
      date: tpl.date,
      time: tpl.time,
      location: tpl.location,
      homeLabel: tpl.homeLabel,
      awayLabel: tpl.awayLabel,
      stats: isStillValid ? existing!.stats : undefined
    };
  });
}
