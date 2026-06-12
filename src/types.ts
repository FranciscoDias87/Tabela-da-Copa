/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Team {
  code: string;
  name: string;
  group: string;
  rating: number; // 60 to 95 for weighted simulations
  flag: string; // Emoji flag or code
}

export interface MatchStats {
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  foulsHome: number;
  foulsAway: number;
  cornersHome: number;
  cornersAway: number;
  scorersHome: string[];
  scorersAway: string[];
}

export interface Match {
  id: number;
  group?: string; // A to L, or undefined for knockout
  isKnockout: boolean;
  roundKey: string; // 'groups', 'R32', 'R16', 'QF', 'SF', 'TP' (Third Place), 'F' (Final)
  homeTeamCode: string | null; // null if not decided yet
  awayTeamCode: string | null; // null if not decided yet
  homeScore: number | null; // null if not played
  awayScore: number | null; // null if not played
  homePenScore: number | null; // for penalty shootout
  awayPenScore: number | null; // for penalty shootout
  state: 'pending' | 'simulated' | 'edited';
  date: string;
  time: string;
  location: string;
  homeLabel?: string;
  awayLabel?: string;
  stats?: MatchStats;
}

export interface TeamStats {
  code: string;
  name: string;
  group: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  stars: number; // overall multiplier
}

export type ViewTab = 'tables' | 'matches' | 'bracket' | 'stats' | 'simulator';
