/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Match, TeamStats } from '../types';
import { TEAMS, getTeamFlagUrl } from '../data';
import { Play, Sparkles, Edit3, Save, Compass } from 'lucide-react';

interface GroupStageViewProps {
  matches: Match[];
  groupStandings: Record<string, TeamStats[]>;
  onSimulateMatch: (matchId: number) => void;
  onUpdateScore: (matchId: number, homeScore: number, awayScore: number) => void;
  allowSimulation?: boolean;
}

export default function GroupStageView({
  matches,
  groupStandings,
  onSimulateMatch,
  onUpdateScore,
  allowSimulation = false
}: GroupStageViewProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('A');
  const [editingMatchId, setEditingMatchId] = useState<number | null>(null);
  const [editHome, setEditHome] = useState<string>('');
  const [editAway, setEditAway] = useState<string>('');

  const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  const renderFlag = (teamCode: string | null | undefined, sizeClass = "w-5 h-3.5") => {
    if (!teamCode) return <span className="text-slate-450 select-none">🏳️</span>;
    const url = getTeamFlagUrl(teamCode);
    if (!url) return <span className="text-slate-450 select-none">🏳️</span>;
    return (
      <img
        src={url}
        alt={teamCode}
        className={`${sizeClass} object-cover rounded-xs border border-slate-200 inline-block shadow-3xs shrink-0`}
        referrerPolicy="no-referrer"
      />
    );
  };

  const startEditing = (m: Match) => {
    setEditingMatchId(m.id);
    setEditHome(m.homeScore !== null ? m.homeScore.toString() : '0');
    setEditAway(m.awayScore !== null ? m.awayScore.toString() : '0');
  };

  const saveScoreEdit = (mId: number) => {
    const h = parseInt(editHome) || 0;
    const a = parseInt(editAway) || 0;
    onUpdateScore(mId, h, a);
    setEditingMatchId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in" id="group-stage-container">
      {/* Group Navigation Bar */}
      <div className="flex overflow-x-auto gap-1.5 pb-2 border-b border-slate-200 flex-nowrap -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hidden" id="groups-nav">
        {groups.map((g) => {
          const isSelected = selectedGroup === g;
          return (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all border shrink-0 ${
                isSelected
                  ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-800'
              }`}
            >
              Grupo {g}
            </button>
          );
        })}
      </div>

      {/* Main Container: Standings Table + Chronological Matches List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" id="group-workspace">
        {/* Standings Cards Column */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" id="group-standings-card">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Compass className="w-5 h-5 text-teal-600" />
                Classificação • Grupo {selectedGroup}
              </h3>
              <span className="text-[10px] text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full font-bold border border-teal-100">
                Fase de Grupos
              </span>
            </div>

            {/* Micro Standings Table */}
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-3xs">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-slate-50 text-xs text-slate-650 font-bold border-b border-slate-200">
                    <th className="py-2.5 px-3 text-center w-8">#</th>
                    <th className="py-2.5 px-3">Seleção</th>
                    <th className="py-2.5 px-2 text-center w-10">Pts</th>
                    <th className="py-2.5 px-2 text-center w-8">J</th>
                    <th className="py-2.5 px-2 text-center w-8">V</th>
                    <th className="hidden sm:table-cell py-2.5 px-2 text-center w-8">E</th>
                    <th className="hidden sm:table-cell py-2.5 px-2 text-center w-8">D</th>
                    <th className="py-2.5 px-3 text-center w-12">SG</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-150">
                  {groupStandings[selectedGroup]?.map((team, idx) => {
                    // Qualification Zones Styling
                    let rowBg = '';

                    if (idx < 2) {
                      // Top 2 Direct Qualify
                      rowBg = 'bg-emerald-50/40 hover:bg-emerald-50/80';
                    } else if (idx === 2) {
                      // 3rd placed potential qualify
                      rowBg = 'bg-amber-50/40 hover:bg-amber-50/80';
                    } else {
                      // 4th placed eliminated
                      rowBg = 'hover:bg-slate-50/55 text-slate-400';
                    }

                    return (
                      <tr key={team.code} className={`${rowBg} transition-colors group`}>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-slate-500">
                          {idx + 1}
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
                          {renderFlag(team.code, "w-6 h-4")}
                          <span className="truncate max-w-[130px]">{team.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono font-normal">{team.code}</span>
                        </td>
                        <td className="py-2.5 px-2 text-center text-slate-900 font-bold">{team.points}</td>
                        <td className="py-2.5 px-2 text-center font-mono text-slate-600">{team.played}</td>
                        <td className="py-2.5 px-2 text-center text-emerald-600 font-bold">{team.wins}</td>
                        <td className="hidden sm:table-cell py-2.5 px-2 text-center text-slate-500">{team.draws}</td>
                        <td className="hidden sm:table-cell py-2.5 px-2 text-center text-rose-600">{team.losses}</td>
                        <td className="py-2.5 px-3 text-center">
                          <span className={`font-mono font-bold ${team.goalDifference > 0 ? 'text-emerald-600' : team.goalDifference < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                            {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-5 p-3.5 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-2">
            <p className="flex items-center gap-2 text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block shrink-0" /> Posições 1º e 2º: Vagas diretas na Fase de 32 (Mata-mata).
            </p>
            <p className="flex items-center gap-2 text-amber-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0" /> Posição 3º: Disputa vagas no ranking geral dos melhores terceiros.
            </p>
          </div>
        </div>

        {/* Matches Management Column */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between" id="group-matches-container">
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              Partidas do Grupo {selectedGroup}
            </h3>

            {/* Individual Matches List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1" id="matches-scrollbar">
              {matches
                .filter((m) => m.group === selectedGroup && !m.isKnockout)
                .map((m) => {
                  const isEditing = editingMatchId === m.id;
                  const hasStats = m.state !== 'pending';

                  return (
                    <div
                      key={m.id}
                      className={`p-3 rounded-lg border text-sm transition-all ${
                        hasStats
                          ? 'bg-white border-slate-200 hover:border-slate-300'
                          : 'bg-slate-50/40 border-slate-150 hover:border-slate-200'
                      }`}
                    >
                      {/* Date and Location Header */}
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-2">
                        <span>{m.date} - {m.time}</span>
                        <span className="truncate max-w-[160px]">{m.location}</span>
                      </div>

                      {/* Team Names and Live Scores Grid */}
                      <div className="grid grid-cols-12 gap-3 items-center">
                        {/* Home team */}
                        <div className="col-span-5 flex items-center justify-end gap-2 text-slate-800">
                          <span className="text-slate-900 font-semibold truncate text-[12px]">{m.homeTeamCode ? TEAMS.find((t) => t.code === m.homeTeamCode)?.name : m.homeTeamCode}</span>
                          {renderFlag(m.homeTeamCode, "w-6 h-4")}
                        </div>

                        {/* Middle Score values */}
                        <div className="col-span-2 text-center">
                          {isEditing ? (
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="number"
                                min="0"
                                className="w-8 h-6 bg-white border border-slate-300 text-slate-900 font-bold text-center text-xs rounded focus:outline-hidden focus:border-teal-500"
                                value={editHome}
                                onChange={(e) => setEditHome(e.target.value)}
                              />
                              <span className="text-slate-400 font-mono font-bold">:</span>
                              <input
                                type="number"
                                min="0"
                                className="w-8 h-6 bg-white border border-slate-300 text-slate-900 font-bold text-center text-xs rounded focus:outline-hidden focus:border-teal-500"
                                value={editAway}
                                onChange={(e) => setEditAway(e.target.value)}
                              />
                            </div>
                          ) : (
                            <div className={`font-mono text-center font-bold px-2 py-0.5 rounded text-xs ${hasStats ? 'bg-teal-50 text-teal-700 border border-teal-100 font-bold' : 'text-slate-400 font-semibold bg-slate-50'}`}>
                              {hasStats ? `${m.homeScore} - ${m.awayScore}` : 'vs'}
                            </div>
                          )}
                        </div>

                        {/* Away team */}
                        <div className="col-span-5 flex items-center justify-start gap-2 text-slate-800">
                          {renderFlag(m.awayTeamCode, "w-6 h-4")}
                          <span className="text-slate-900 font-semibold truncate text-[12px]">{m.awayTeamCode ? TEAMS.find((t) => t.code === m.awayTeamCode)?.name : m.awayTeamCode}</span>
                        </div>
                      </div>

                      {/* Individual Controls */}
                      <div className="flex justify-end gap-2 mt-3 pt-2 border-t border-slate-100">
                        {isEditing ? (
                          <button
                            onClick={() => saveScoreEdit(m.id)}
                            className="bg-teal-600 text-white px-2.5 py-1 rounded text-[11px] font-bold hover:bg-teal-500 flex items-center gap-1 transition-all shadow-3xs"
                          >
                            <Save className="w-3 h-3" /> Salvar
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => startEditing(m)}
                              className="text-slate-500 hover:text-slate-850 px-2 py-1 rounded hover:bg-slate-100 text-[11px] flex items-center gap-0.5 transition-all font-semibold"
                              title="Editar placar manualmente"
                            >
                              <Edit3 className="w-3.5 h-3.5 text-slate-400" /> Placar
                            </button>
                            {allowSimulation && (
                              <button
                                onClick={() => onSimulateMatch(m.id)}
                                className="bg-teal-600 hover:bg-teal-505 hover:bg-teal-500 text-white px-2.5 py-1 rounded text-[11px] font-bold flex items-center gap-1 shadow-3xs transition-all"
                              >
                                <Play className="w-3 h-3 fill-white" /> Simular
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
