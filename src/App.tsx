/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Match, Team, TeamStats, ViewTab } from './types';
import { TEAMS, INITIAL_MATCHES, TEAM_COLORS, generateRealisticMatchSimulation, simulateGoalScorers, getTeamFlagUrl } from './data';
import { computeAllGroupStandings, computeThirdPlacedRankings, matchThirdPlacesToKnockoutSlots, computeKnockoutFixtures } from './utils/calc';

// Load our child views modularly
import GeneralTableView from './components/GeneralTableView';
import GroupStageView from './components/GroupStageView';
import BracketView from './components/BracketView';
import HeadToHeadView from './components/HeadToHeadView';
import SimulatorView from './components/SimulatorView';

// Icons
import {
  Trophy,
  Users,
  BarChart3,
  Calendar,
  Flame,
  Award,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  ChevronRight,
  Eye,
  Github
} from 'lucide-react';

const LOCAL_STORAGE_KEY = 'world_cup_2026_matches_v2';

export default function App() {
  const [activeTab, setActiveTab] = useState<ViewTab>('matches');
  const [matches, setMatches] = useState<Match[]>([]);
  const [simulatedMatches, setSimulatedMatches] = useState<Match[]>([]);
  const [selectedH2HHome, setSelectedH2HHome] = useState<string>('BRA');
  const [selectedH2HAway, setSelectedH2HAway] = useState<string>('ARG');
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  // Initialize matches from localStorage or defaults
  useEffect(() => {
    // 1. Get official matches
    const savedOfficial = localStorage.getItem(LOCAL_STORAGE_KEY);
    let officialList: Match[] = [];
    if (savedOfficial) {
      try {
        const parsed = JSON.parse(savedOfficial) as Match[];
        // Sanitize: any legacy simulated matches get reset to 'pending'
        officialList = parsed.map((m) => {
          if (m.state === 'simulated') {
            return {
              ...m,
              homeScore: null,
              awayScore: null,
              homePenScore: null,
              awayPenScore: null,
              state: 'pending' as const,
              stats: undefined
            };
          }
          return m;
        });
      } catch (e) {
        officialList = [...INITIAL_MATCHES];
      }
    } else {
      officialList = [...INITIAL_MATCHES];
    }
    setMatches(officialList);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(officialList));

    // 2. Get simulated matches
    const savedSimulated = localStorage.getItem('world_cup_2026_matches_simulated');
    if (savedSimulated) {
      try {
        setSimulatedMatches(JSON.parse(savedSimulated));
      } catch (e) {
        setSimulatedMatches(officialList.map((m) => ({ ...m })));
      }
    } else {
      setSimulatedMatches(officialList.map((m) => ({ ...m })));
    }
  }, []);

  // Save changes to localStorage
  const saveMatches = (updated: Match[]) => {
    // Also clean up simulated state here for safety, keeping only pending and edited
    const sanitized = updated.map((m) => {
      if (m.state === 'simulated') {
        return {
          ...m,
          homeScore: null,
          awayScore: null,
          homePenScore: null,
          awayPenScore: null,
          state: 'pending' as const,
          stats: undefined
        };
      }
      return m;
    });
    setMatches(sanitized);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
  };

  const saveSimulatedMatches = (updated: Match[]) => {
    setSimulatedMatches(updated);
    localStorage.setItem('world_cup_2026_matches_simulated', JSON.stringify(updated));
  };

  // ==================== DYNAMIC CALCULATIONS FEEDBACK ====================
  // Calculate group standings live
  const groupStandings = useMemo(() => {
    return computeAllGroupStandings(matches);
  }, [matches]);

  // Rank 3rd placed teams live
  const thirdPlacedRankings = useMemo(() => {
    return computeThirdPlacedRankings(groupStandings);
  }, [groupStandings]);

  // Filter top 8 third place qualified teams
  const qualifiedThirds = useMemo(() => {
    return thirdPlacedRankings.slice(0, 8);
  }, [thirdPlacedRankings]);

  // Match these 12 third places to correct knockout template slots
  const thirdPlaceAssignments = useMemo(() => {
    return matchThirdPlacesToKnockoutSlots(qualifiedThirds);
  }, [qualifiedThirds]);

  // Compute live bracket matches dynamically from group standings and bracket match history!
  const bracketMatches = useMemo(() => {
    return computeKnockoutFixtures(matches, groupStandings, thirdPlaceAssignments);
  }, [matches, groupStandings, thirdPlaceAssignments]);

  // Merge group matches with live computed bracket matches
  const fullTournamentMatches = useMemo(() => {
    const groupMatches = matches.filter((m) => !m.isKnockout);
    return [...groupMatches, ...bracketMatches];
  }, [matches, bracketMatches]);

  // ==================== SIMULATOR SPACE CALCULATIONS ====================
  const simulatedGroupStandings = useMemo(() => {
    return computeAllGroupStandings(simulatedMatches);
  }, [simulatedMatches]);

  const simulatedThirdPlacedRankings = useMemo(() => {
    return computeThirdPlacedRankings(simulatedGroupStandings);
  }, [simulatedGroupStandings]);

  const simulatedQualifiedThirds = useMemo(() => {
    return simulatedThirdPlacedRankings.slice(0, 8);
  }, [simulatedThirdPlacedRankings]);

  const simulatedThirdPlaceAssignments = useMemo(() => {
    return matchThirdPlacesToKnockoutSlots(simulatedQualifiedThirds);
  }, [simulatedQualifiedThirds]);

  const simulatedBracketMatches = useMemo(() => {
    return computeKnockoutFixtures(simulatedMatches, simulatedGroupStandings, simulatedThirdPlaceAssignments);
  }, [simulatedMatches, simulatedGroupStandings, simulatedThirdPlaceAssignments]);

  const simulatedFullTournamentMatches = useMemo(() => {
    const groupMatches = simulatedMatches.filter((m) => !m.isKnockout);
    return [...groupMatches, ...simulatedBracketMatches];
  }, [simulatedMatches, simulatedBracketMatches]);

  // ==================== SIMULATION LOGIC ====================
  // Simulates a single match by ID (either group or knockout)
  const simulateMatch = (id: number, currentMatchesList = fullTournamentMatches) => {
    const matchCopy = currentMatchesList.find((m) => m.id === id);
    if (!matchCopy || !matchCopy.homeTeamCode || !matchCopy.awayTeamCode) return currentMatchesList;

    const homeTeam = TEAMS.find((t) => t.code === matchCopy.homeTeamCode)!;
    const awayTeam = TEAMS.find((t) => t.code === matchCopy.awayTeamCode)!;

    // Run statistical game mechanics
    const sim = generateRealisticMatchSimulation(homeTeam.rating, awayTeam.rating, matchCopy.isKnockout);

    // Goalscorers
    const scorersHome = simulateGoalScorers(matchCopy.homeTeamCode, sim.homeScore);
    const scorersAway = simulateGoalScorers(matchCopy.awayTeamCode, sim.awayScore);

    const updatedMatch: Match = {
      ...matchCopy,
      homeScore: sim.homeScore,
      awayScore: sim.awayScore,
      homePenScore: sim.homePenScore,
      awayPenScore: sim.awayPenScore,
      state: 'simulated',
      stats: {
        possessionHome: sim.possessionHome,
        possessionAway: sim.possessionAway,
        shotsHome: sim.shotsHome,
        shotsAway: sim.shotsAway,
        foulsHome: sim.foulsHome,
        foulsAway: sim.foulsAway,
        cornersHome: sim.cornersHome,
        cornersAway: sim.cornersAway,
        scorersHome,
        scorersAway
      }
    };

    // Replace in full list
    const newList = currentMatchesList.map((m) => (m.id === id ? updatedMatch : m));
    return newList;
  };

  const handleSimulateMatch = (id: number) => {
    const updated = simulateMatch(id);
    saveMatches(updated);
  };

  // Overwrites match scores manually
  const handleUpdateScore = (
    matchId: number, 
    homeScore: number, 
    awayScore: number, 
    homePenScoreParam?: number | null, 
    awayPenScoreParam?: number | null
  ) => {
    const list = [...fullTournamentMatches];
    const matchIndex = list.findIndex((m) => m.id === matchId);
    if (matchIndex === -1) return;

    const m = list[matchIndex];
    if (!m.homeTeamCode || !m.awayTeamCode) return;

    let homePenScore: number | null = null;
    let awayPenScore: number | null = null;

    if (m.isKnockout && homeScore === awayScore) {
      if (homePenScoreParam !== undefined && homePenScoreParam !== null && awayPenScoreParam !== undefined && awayPenScoreParam !== null) {
        homePenScore = homePenScoreParam;
        awayPenScore = awayPenScoreParam;
      } else {
        // Prompt a pen score default if not entered
        homePenScore = 5;
        awayPenScore = 4;
      }
    }

    const updatedMatch: Match = {
      ...m,
      homeScore,
      awayScore,
      homePenScore,
      awayPenScore,
      state: 'edited',
      stats: {
        possessionHome: 50,
        possessionAway: 50,
        shotsHome: 10,
        shotsAway: 10,
        foulsHome: 8,
        foulsAway: 8,
        cornersHome: 5,
        cornersAway: 5,
        scorersHome: simulateGoalScorers(m.homeTeamCode, homeScore),
        scorersAway: simulateGoalScorers(m.awayTeamCode, awayScore)
      }
    };

    const newList = list.map((item) => (item.id === matchId ? updatedMatch : item));
    saveMatches(newList);
  };

  // Simulates all matches in the group stage
  const simulateGroupStageOnly = (silentList = [...fullTournamentMatches]) => {
    let current = [...silentList];
    const groupMatches = current.filter((m) => !m.isKnockout);

    groupMatches.forEach((m) => {
      if (m.state === 'pending') {
        current = simulateMatch(m.id, current);
      }
    });

    return current;
  };

  const handleSimulateGroupStage = () => {
    const updated = simulateGroupStageOnly();
    saveMatches(updated);
    setSimulationLog('Fase de Grupos Simulada com Sucesso!');
    setTimeout(() => setSimulationLog(null), 3000);
  };

  // Simulates knockout matches chronologically (ensuring teams have propagated first!)
  const simulateKnockoutStageOnly = (silentList = [...fullTournamentMatches]) => {
    let current = [...silentList];

    // Knockout game order is chronological from ID 73 to 104
    for (let id = 73; id <= 104; id++) {
      // Before simulating, we MUST compute the live fixtures so the next round's teams are refreshed!
      const groupStandingsLocal = computeAllGroupStandings(current);
      const thirdsLocal = computeThirdPlacedRankings(groupStandingsLocal).slice(0, 8);
      const thirdPlaceAssignmentsLocal = matchThirdPlacesToKnockoutSlots(thirdsLocal);
      const currentKnockoutsComputed = computeKnockoutFixtures(current, groupStandingsLocal, thirdPlaceAssignmentsLocal);

      // Re-merge
      const groupOnly = current.filter((m) => !m.isKnockout);
      current = [...groupOnly, ...currentKnockoutsComputed];

      const m = current.find((item) => item.id === id);
      if (m && m.state === 'pending' && m.homeTeamCode && m.awayTeamCode) {
        current = simulateMatch(id, current);
      }
    }

    return current;
  };

  const handleSimulateKnockoutStage = () => {
    const updated = simulateKnockoutStageOnly();
    saveMatches(updated);
    setSimulationLog('Mata-mata Simulado até a Final!');
    setTimeout(() => setSimulationLog(null), 3000);
  };

  // Simulates the entire World Cup from groups to final!
  const handleSimulateAllTournament = () => {
    let updated = simulateGroupStageOnly();
    updated = simulateKnockoutStageOnly(updated);
    saveMatches(updated);
    setSimulationLog('Copa do Mundo Simulada com Proporções Reais!');
    setTimeout(() => setSimulationLog(null), 3000);
  };

  // Resets the tournament state
  const handleResetTournament = () => {
    if (window.confirm('Tem certeza de que deseja resetar todo o histórico de placares da Copa?')) {
      saveMatches([...INITIAL_MATCHES]);
      setSimulationLog('Simulador Resetado.');
      setTimeout(() => setSimulationLog(null), 2000);
    }
  };

  // ==================== SIMULATOR SANDBOX ACTION HUB ====================
  // Simulate single match in sandbox
  const handleSimulateMatchSandbox = (id: number) => {
    const updated = simulateMatch(id, simulatedFullTournamentMatches);
    saveSimulatedMatches(updated);
  };

  // Manual update of sandbox scores
  const handleUpdateScoreSandbox = (
    matchId: number, 
    homeScore: number, 
    awayScore: number, 
    homePenScoreParam?: number | null, 
    awayPenScoreParam?: number | null
  ) => {
    const list = [...simulatedFullTournamentMatches];
    const matchIndex = list.findIndex((m) => m.id === matchId);
    if (matchIndex === -1) return;

    const m = list[matchIndex];
    if (!m.homeTeamCode || !m.awayTeamCode) return;

    let homePenScore: number | null = null;
    let awayPenScore: number | null = null;

    if (m.isKnockout && homeScore === awayScore) {
      if (homePenScoreParam !== undefined && homePenScoreParam !== null && awayPenScoreParam !== undefined && awayPenScoreParam !== null) {
        homePenScore = homePenScoreParam;
        awayPenScore = awayPenScoreParam;
      } else {
        homePenScore = 5;
        awayPenScore = 4;
      }
    }

    const updatedMatch: Match = {
      ...m,
      homeScore,
      awayScore,
      homePenScore,
      awayPenScore,
      state: 'edited',
      stats: {
        possessionHome: 50,
        possessionAway: 55,
        shotsHome: 12,
        shotsAway: 11,
        foulsHome: 9,
        foulsAway: 10,
        cornersHome: 6,
        cornersAway: 4,
        scorersHome: simulateGoalScorers(m.homeTeamCode, homeScore),
        scorersAway: simulateGoalScorers(m.awayTeamCode, awayScore)
      }
    };

    const newList = list.map((item) => (item.id === matchId ? updatedMatch : item));
    saveSimulatedMatches(newList);
  };

  // Simulate group stage (sandbox)
  const handleSimulateGroupStageSandbox = () => {
    let current = [...simulatedFullTournamentMatches];
    const groupMatches = current.filter((m) => !m.isKnockout);

    groupMatches.forEach((m) => {
      if (m.state === 'pending') {
        current = simulateMatch(m.id, current);
      }
    });

    saveSimulatedMatches(current);
    setSimulationLog('Grupos Simulados (Playground)!');
    setTimeout(() => setSimulationLog(null), 3050);
  };

  // Simulate knockouts (sandbox)
  const handleSimulateKnockoutStageSandbox = () => {
    let current = [...simulatedFullTournamentMatches];

    for (let id = 73; id <= 104; id++) {
      const groupStandingsLocal = computeAllGroupStandings(current);
      const thirdsLocal = computeThirdPlacedRankings(groupStandingsLocal).slice(0, 8);
      const thirdPlaceAssignmentsLocal = matchThirdPlacesToKnockoutSlots(thirdsLocal);
      const currentKnockoutsComputed = computeKnockoutFixtures(current, groupStandingsLocal, thirdPlaceAssignmentsLocal);

      const groupOnly = current.filter((m) => !m.isKnockout);
      current = [...groupOnly, ...currentKnockoutsComputed];

      const m = current.find((item) => item.id === id);
      if (m && m.state === 'pending' && m.homeTeamCode && m.awayTeamCode) {
        current = simulateMatch(id, current);
      }
    }

    saveSimulatedMatches(current);
    setSimulationLog('Mata-mata Simulado (Playground)!');
    setTimeout(() => setSimulationLog(null), 3050);
  };

  // Simulate entire tournament (sandbox)
  const handleSimulateAllTournamentSandbox = () => {
    let current = [...simulatedFullTournamentMatches];
    const groupMatches = current.filter((m) => !m.isKnockout);

    // 1. Sim groups
    groupMatches.forEach((m) => {
      if (m.state === 'pending') {
        current = simulateMatch(m.id, current);
      }
    });

    // 2. Sim knockouts
    for (let id = 73; id <= 104; id++) {
      const groupStandingsLocal = computeAllGroupStandings(current);
      const thirdsLocal = computeThirdPlacedRankings(groupStandingsLocal).slice(0, 8);
      const thirdPlaceAssignmentsLocal = matchThirdPlacesToKnockoutSlots(thirdsLocal);
      const currentKnockoutsComputed = computeKnockoutFixtures(current, groupStandingsLocal, thirdPlaceAssignmentsLocal);

      const groupOnly = current.filter((m) => !m.isKnockout);
      current = [...groupOnly, ...currentKnockoutsComputed];

      const m = current.find((item) => item.id === id);
      if (m && m.state === 'pending' && m.homeTeamCode && m.awayTeamCode) {
        current = simulateMatch(id, current);
      }
    }

    saveSimulatedMatches(current);
    setSimulationLog('Torneio Completo Simulado (Playground)!');
    setTimeout(() => setSimulationLog(null), 3050);
  };

  // Reset sandbox back to match current real matches
  const handleResetSandbox = () => {
    const listCopy = matches.map((m) => ({ ...m }));
    saveSimulatedMatches(listCopy);
    setSimulationLog('Projeções resetadas aos dados reais!');
    setTimeout(() => setSimulationLog(null), 2000);
  };

  // Opens confrontation side analysis
  const handleOpenH2HAnalysis = (m: Match) => {
    setSelectedH2HHome(m.homeTeamCode || 'BRA');
    setSelectedH2HAway(m.awayTeamCode || 'ARG');
    setActiveTab('stats');
  };

  // Calculate high-level status banner items
  const groupMatchesSimulatedCount = useMemo(() => {
    return matches.filter((m) => !m.isKnockout && m.state !== 'pending').length;
  }, [matches]);

  const knockoutMatchesSimulatedCount = useMemo(() => {
    return bracketMatches.filter((m) => m.state !== 'pending').length;
  }, [bracketMatches]);

  const championTeam = useMemo(() => {
    const finalMatch = bracketMatches.find((m) => m.id === 104);
    if (!finalMatch || finalMatch.state === 'pending' || !finalMatch.homeTeamCode || !finalMatch.awayTeamCode) return null;

    if (finalMatch.homeScore !== null && finalMatch.awayScore !== null) {
      if (finalMatch.homeScore > finalMatch.awayScore) {
        return TEAMS.find((t) => t.code === finalMatch.homeTeamCode);
      } else if (finalMatch.homeScore < finalMatch.awayScore) {
        return TEAMS.find((t) => t.code === finalMatch.awayTeamCode);
      } else if (finalMatch.homePenScore !== null && finalMatch.awayPenScore !== null) {
        return finalMatch.homePenScore > finalMatch.awayPenScore
          ? TEAMS.find((t) => t.code === finalMatch.homeTeamCode)
          : TEAMS.find((t) => t.code === finalMatch.awayTeamCode);
      }
    }
    return null;
  }, [bracketMatches]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500 selection:text-white antialiased">
      {/* Dynamic Simulation Notification Toast */}
      {simulationLog && (
        <div className="fixed top-5 right-5 z-50 bg-teal-600 text-white px-4 py-3 rounded-lg font-bold shadow-xl animate-bounce flex items-center gap-2 border border-teal-500">
          <Sparkles className="w-5 h-5 fill-white" /> {simulationLog}
        </div>
      )}

      {/* Rádio Meio Norte FM Theme Banner Header */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-indigo-950 py-3 text-center text-xs font-semibold text-white border-b border-emerald-900/30 flex flex-wrap gap-2 items-center justify-center px-4" id="station-badge">
        <span className="bg-yellow-500 text-slate-950 font-black px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">Edição Especial</span>
        <span>Rádio Meio-Norte 89.1 FM • Tabela da Rádio Meio Norte na Copa do Mundo 2026</span>
      </div>

      {/* Main Brand header */}
      <header className="bg-white border-b border-slate-200 py-6 px-4 md:px-8 shadow-xs" id="main-header">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md shadow-teal-500/10">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight flex items-center gap-2">
                TABELA DA COPA DO MUNDO 2026
              </h1>
              <p className="text-xs text-slate-500 font-semibold">
                Simulador Dinâmico • Gráficos Interativos de H2H • Fase de Grupos & Chaveamento
              </p>
            </div>
          </div>

          {/* Quick Simulation Commands */}
          <div className="flex flex-wrap gap-2" id="header-actions">
            <button
              onClick={() => {
                setActiveTab('simulator');
                const element = document.getElementById('simulator-root-view');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-4 py-2 rounded-lg text-xs font-black flex items-center gap-1.5 shadow-sm hover:shadow transition-all cursor-pointer"
              title="Abrir simulador interativo"
            >
              <Sparkles className="w-3.5 h-3.5 fill-white text-white" /> Projeções / Simulador da Copa
            </button>
            <button
              onClick={handleResetTournament}
              className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-200 hover:border-rose-300 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              title="Apagar todos os resultados reais inseridos"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpar Resultados Reais
            </button>
          </div>
        </div>
      </header>

      {/* Live Tournament Stat Indicators */}
      <section className="bg-white py-3 px-4 border-b border-slate-200 shadow-xs" id="stat-counters">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Group progress */}
          <div className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100 flex items-center justify-between text-xs">
            <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-600" /> Fase de Grupos:
            </span>
            <span className="font-mono font-bold text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-100">
              {groupMatchesSimulatedCount} / 72 Jogos
            </span>
          </div>

          {/* Knockouts progress */}
          <div className="bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 flex items-center justify-between text-xs">
            <span className="text-indigo-800 font-semibold flex items-center gap-1.5">
              <Award className="w-4 h-4 text-indigo-600" /> Mata-mata:
            </span>
            <span className="font-mono font-bold text-indigo-950 bg-white px-2 py-0.5 rounded border border-indigo-100">
              {knockoutMatchesSimulatedCount} / 32 Jogos
            </span>
          </div>

          {/* Champion feedback */}
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 flex items-center justify-between text-xs">
            <span className="text-amber-850 font-bold flex items-center gap-1.5">
              🏅 Campeão Selecionado:
            </span>
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              {championTeam ? (
                <>
                  <img
                    src={getTeamFlagUrl(championTeam.code)}
                    alt={championTeam.name}
                    className="w-6 h-4 object-cover rounded-xs border border-slate-200 inline-block shadow-3xs"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-amber-600 font-extrabold">{championTeam.name.toUpperCase()}</span>
                </>
              ) : (
                <span className="text-slate-400 italic">Disputa em andamento</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Main Container Work Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto scrollbar-hidden flex-nowrap border-b border-slate-200 -mx-4 px-4 sm:mx-0 sm:px-0" id="tabs-bar">
          <button
            onClick={() => setActiveTab('matches')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'matches'
                ? 'border-teal-600 text-teal-600 bg-teal-50/40 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4" /> Fase de Grupos
          </button>
          <button
            onClick={() => setActiveTab('bracket')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'bracket'
                ? 'border-teal-600 text-teal-600 bg-teal-50/40 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Trophy className="w-4 h-4" /> Chaveamento
          </button>
          <button
            onClick={() => setActiveTab('tables')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'tables'
                ? 'border-teal-600 text-teal-600 bg-teal-50/40 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" /> Tabela Geral (48 Times)
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer relative shrink-0 whitespace-nowrap ${
              activeTab === 'simulator'
                ? 'border-amber-500 text-amber-750 bg-amber-50/30 font-black'
                : 'border-transparent text-amber-600 hover:text-amber-800 hover:bg-amber-50/10'
            }`}
          >
            <Sparkles className="w-4 h-4" /> Simulador da Copa
            <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-mono font-black text-[7px] px-1.5 py-0.5 rounded-full scale-90 uppercase animate-pulse">PLAY</span>
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition-all cursor-pointer shrink-0 whitespace-nowrap ${
              activeTab === 'stats'
                ? 'border-teal-600 text-teal-600 bg-teal-50/40 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Flame className="w-4 h-4" /> Confronto Direto (H2H)
          </button>
        </div>

        {/* Tab Panel contents */}
        <div className="tab-contents-container" id="tab-viewport">
          {activeTab === 'bracket' && (
            <BracketView
              matches={fullTournamentMatches}
              onSimulateMatch={handleSimulateMatch}
              onOpenH2H={handleOpenH2HAnalysis}
              onUpdateScore={handleUpdateScore}
              allowSimulation={false}
            />
          )}

          {activeTab === 'matches' && (
            <GroupStageView
              matches={matches}
              groupStandings={groupStandings}
              onSimulateMatch={handleSimulateMatch}
              onUpdateScore={handleUpdateScore}
              allowSimulation={false}
            />
          )}

          {activeTab === 'tables' && (
            <GeneralTableView
              matches={fullTournamentMatches}
              onSelectTeam={(code) => {
                setSelectedH2HHome(code);
                setActiveTab('stats');
              }}
            />
          )}

          {activeTab === 'simulator' && (
            <SimulatorView
              simulatedMatches={simulatedMatches}
              simulatedFullTournamentMatches={simulatedFullTournamentMatches}
              simulatedGroupStandings={simulatedGroupStandings}
              onSimulateMatchSandbox={handleSimulateMatchSandbox}
              onUpdateScoreSandbox={handleUpdateScoreSandbox}
              onSimulateAllSandbox={handleSimulateAllTournamentSandbox}
              onSimulateGroupsSandbox={handleSimulateGroupStageSandbox}
              onSimulateKnockoutsSandbox={handleSimulateKnockoutStageSandbox}
              onResetSandbox={handleResetSandbox}
              onOpenH2H={handleOpenH2HAnalysis}
            />
          )}

          {activeTab === 'stats' && (
            <HeadToHeadView
              matches={fullTournamentMatches}
              initialHomeCode={selectedH2HHome}
              initialAwayCode={selectedH2HAway}
            />
          )}
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-6 text-center" id="footer-credits">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p>© 2026 Copa do Mundo FIFA • Tabela Rádio Meio Norte FM</p>
          <p className="text-slate-400 font-mono text-[10px]">
            Horários convertidos para o fuso de Brasília (UTC-3) • Sujeito a alterações pela FIFA
          </p>
        </div>
      </footer>
    </div>
  );
}
