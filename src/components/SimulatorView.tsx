/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Match, TeamStats } from '../types';
import GroupStageView from './GroupStageView';
import BracketView from './BracketView';
import GeneralTableView from './GeneralTableView';
import { Sparkles, Trophy, Compass, Award, RotateCcw, Play, AlertCircle } from 'lucide-react';

interface SimulatorViewProps {
  simulatedMatches: Match[];
  simulatedFullTournamentMatches: Match[];
  simulatedGroupStandings: Record<string, TeamStats[]>;
  onSimulateMatchSandbox: (id: number) => void;
  onUpdateScoreSandbox: (id: number, home: number, away: number, hPen?: number | null, aPen?: number | null) => void;
  onSimulateAllSandbox: () => void;
  onSimulateGroupsSandbox: () => void;
  onSimulateKnockoutsSandbox: () => void;
  onResetSandbox: () => void;
  onOpenH2H: (match: Match) => void;
}

type SimulatorTab = 'groups' | 'bracket' | 'standings';

export default function SimulatorView({
  simulatedMatches,
  simulatedFullTournamentMatches,
  simulatedGroupStandings,
  onSimulateMatchSandbox,
  onUpdateScoreSandbox,
  onSimulateAllSandbox,
  onSimulateGroupsSandbox,
  onSimulateKnockoutsSandbox,
  onResetSandbox,
  onOpenH2H
}: SimulatorViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<SimulatorTab>('groups');

  return (
    <div className="space-y-6 animate-fade-in" id="simulator-root-view">
      {/* Informative Warning Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-amber-900 shadow-3xs" id="sim-warning-banner">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs space-y-1">
          <p className="font-bold uppercase tracking-wider text-[10px] text-amber-800">Modo Projeção & Simulação Inteligente</p>
          <p className="font-medium text-slate-650">
            Este é um laboratório virtual. Todas as simulações, chutes e ações de simulação em lote executadas aqui 
            <strong> não afetam os dados, tabelas reais ou chaveamentos oficiais</strong> das outras abas. 
            Use esta área para criar infinitos cenários e testar cruzamentos hipotéticos!
          </p>
        </div>
      </div>

      {/* Main Simulation Action Hub */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs space-y-4" id="simulation-hub-controls">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300" />
              Controles do Simulador
            </h3>
            <p className="text-xs text-slate-500">Comande a copa através dos nossos motores estatísticos de futebol em lote</p>
          </div>
          
          {/* Action Row */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={onSimulateAllSandbox}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white px-3.5 py-2 rounded-lg text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs shrink-0"
              title="Simula 100% dos jogos da copa de uma só vez"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" /> Simular Toda a Copa
            </button>
            <button
              onClick={onSimulateGroupsSandbox}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-slate-200"
              title="Simula os jogos pendentes da fase de grupos"
            >
              Simular Grupos
            </button>
            <button
              onClick={onSimulateKnockoutsSandbox}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-2 rounded-lg text-xs font-bold transition-all border border-slate-200"
              title="Calcula e simula o mata-mata inteiro"
            >
              Simular Mata-mata
            </button>
            <button
              onClick={onResetSandbox}
              className="bg-slate-100 hover:bg-rose-50 hover:text-rose-600 border border-slate-250 hover:border-rose-200 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1"
              title="Sincroniza os dados do simulador com os dados reais salvos"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Sincronizar / Resetar
            </button>
          </div>
        </div>
      </div>

      {/* Simulator Navigation Subtabs */}
      <div className="flex overflow-x-auto scrollbar-hidden flex-nowrap border-b border-slate-250 gap-2 bg-slate-50/70 p-1.5 rounded-lg border border-slate-200" id="simulator-subtabs-nav">
        <button
          onClick={() => setActiveSubTab('groups')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 shrink-0 min-w-[150px] sm:min-w-0 ${
            activeSubTab === 'groups'
              ? 'bg-white text-slate-800 shadow-3xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Compass className="w-4 h-4 text-teal-600" />
          1. Grupos Simulados
        </button>
        <button
          onClick={() => setActiveSubTab('bracket')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 shrink-0 min-w-[150px] sm:min-w-0 ${
            activeSubTab === 'bracket'
              ? 'bg-white text-slate-800 shadow-3xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Trophy className="w-4 h-4 text-amber-500" />
          2. Chaveamento Provisório
        </button>
        <button
          onClick={() => setActiveSubTab('standings')}
          className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-1.5 shrink-0 min-w-[150px] sm:min-w-0 ${
            activeSubTab === 'standings'
              ? 'bg-white text-slate-800 shadow-3xs border border-slate-200'
              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
          }`}
        >
          <Award className="w-4 h-4 text-sky-600" />
          3. Classificação Geral Simulada
        </button>
      </div>

      {/* Dynamic Conditional Rendering of Subsections */}
      <div className="pt-2" id="simulator-subtab-container">
        {activeSubTab === 'groups' && (
          <GroupStageView
            matches={simulatedFullTournamentMatches}
            groupStandings={simulatedGroupStandings}
            onSimulateMatch={onSimulateMatchSandbox}
            onUpdateScore={(mId, hs, as) => onUpdateScoreSandbox(mId, hs, as, null, null)}
            allowSimulation={true}
          />
        )}

        {activeSubTab === 'bracket' && (
          <BracketView
            matches={simulatedFullTournamentMatches}
            onSimulateMatch={onSimulateMatchSandbox}
            onOpenH2H={onOpenH2H}
            onUpdateScore={onUpdateScoreSandbox}
            allowSimulation={true}
          />
        )}

        {activeSubTab === 'standings' && (
          <GeneralTableView
            matches={simulatedFullTournamentMatches}
            onSelectTeam={() => {}}
          />
        )}
      </div>
    </div>
  );
}
