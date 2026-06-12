/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Match } from '../types';
import { TEAMS, getTeamFlagUrl } from '../data';
import { Play, LineChart, Award } from 'lucide-react';

interface BracketViewProps {
  matches: Match[];
  onSimulateMatch: (matchId: number) => void;
  onOpenH2H: (match: Match) => void;
  onUpdateScore: (matchId: number, homeScore: number, awayScore: number, homePen?: number | null, awayPen?: number | null) => void;
  allowSimulation?: boolean;
}

export default function BracketView({ matches, onSimulateMatch, onOpenH2H, onUpdateScore, allowSimulation = false }: BracketViewProps) {
  const [activeRound, setActiveRound] = useState<'all' | 'r32' | 'r16' | 'qf' | 'sf' | 'f'>('all');

  const rounds = [
    { id: 'all', name: 'Mata-mata' },
    { id: 'r32', name: '32 Avos' },
    { id: 'r16', name: 'Oitavas' },
    { id: 'qf', name: 'Quartas' },
    { id: 'sf', name: 'Semis' },
    { id: 'f', name: 'Finais' }
  ] as const;

  const getEmojiFlag = (teamCode: string | null, sizeClass = "w-[21px] h-[14px]") => {
    if (!teamCode) return <span className="text-slate-400 select-none">🏳️</span>;
    const url = getTeamFlagUrl(teamCode);
    if (!url) return <span className="text-slate-400 select-none">🏳️</span>;
    return (
      <img
        src={url}
        alt={teamCode}
        className={`${sizeClass} object-cover rounded-xs border border-slate-200 inline-block shadow-3xs shrink-0`}
        referrerPolicy="no-referrer"
      />
    );
  };

  const getTeamName = (teamCode: string | null, placeholder: string) => {
    if (!teamCode) return placeholder;
    const t = TEAMS.find((team) => team.code === teamCode);
    return t ? t.name : teamCode;
  };

  const getMatchById = (id: number) => matches.find((m) => m.id === id);

  return (
    <div className="space-y-6 animate-fade-in" id="bracket-root">
      {/* Mobile-Friendly Round Navigation Tab Bar */}
      <div className="md:hidden flex flex-col gap-2 bg-white border border-slate-200 rounded-xl p-3 shadow-3xs" id="mobile-bracket-nav">
        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Fases do Mata-Mata (Navegação):</label>
        <div className="flex overflow-x-auto gap-1 pb-0.5 scrollbar-hidden flex-nowrap -mx-1 px-1">
          {rounds.map((r) => {
            const isSelected = activeRound === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRound(r.id)}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                  isSelected
                    ? 'bg-teal-600 text-white border-teal-600 shadow-3xs'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scroll Hint (visible on desktop or if activeRound is 'all' on mobile) */}
      <div className={`flex items-center justify-between bg-white border border-slate-200 shadow-xs rounded-lg px-4 py-3 text-xs text-slate-600 ${activeRound === 'all' ? 'flex' : 'hidden md:flex'}`} id="scroll-hint">
        <span>💡 Dica: Role horizontalmente ou escolha uma fase acima para navegar pelo mata-mata!</span>
        <span className="font-bold text-teal-600">Torneio Completo</span>
      </div>

      {/* Bracket Tree Row */}
      <div className={`${activeRound === 'all' ? 'overflow-x-auto pb-6' : 'w-full'} flex justify-center`} id="bracket-scroller">
        <div className={`flex gap-8 px-2 ${activeRound === 'all' ? 'w-max min-w-full' : 'w-full flex-col items-center md:flex-row md:justify-around'}`} id="bracket-columns">
          {/* ==================== ROUND OF 32 ==================== */}
          <div className={`${activeRound === 'all' || activeRound === 'r32' ? 'flex' : 'hidden md:flex'} flex-col justify-around gap-4 w-full md:w-66 max-w-sm`} id="round-r32">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 py-2.5 rounded-lg shadow-xs">
              Dezesseis-avos (32)
            </h4>
            <div className="space-y-4">
              {[73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88].map((id) => (
                <BracketNode
                  key={id}
                  match={getMatchById(id)}
                  onSimulate={onSimulateMatch}
                  onOpenH2H={onOpenH2H}
                  onUpdateScore={onUpdateScore}
                  getEmojiFlag={getEmojiFlag}
                  getTeamName={getTeamName}
                  allowSimulation={allowSimulation}
                />
              ))}
            </div>
          </div>

          {/* ==================== ROUND OF 16 ==================== */}
          <div className={`${activeRound === 'all' || activeRound === 'r16' ? 'flex' : 'hidden md:flex'} flex-col justify-around gap-4 w-full md:w-66 max-w-sm`} id="round-r16">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 py-2.5 rounded-lg shadow-xs">
              Oitavas de Final
            </h4>
            <div className="space-y-6 flex flex-col justify-around h-full py-4">
              {[89, 90, 91, 92, 93, 94, 95, 96].map((id) => (
                <BracketNode
                  key={id}
                  match={getMatchById(id)}
                  onSimulate={onSimulateMatch}
                  onOpenH2H={onOpenH2H}
                  onUpdateScore={onUpdateScore}
                  getEmojiFlag={getEmojiFlag}
                  getTeamName={getTeamName}
                  allowSimulation={allowSimulation}
                />
              ))}
            </div>
          </div>

          {/* ==================== QUARTER-FINALS ==================== */}
          <div className={`${activeRound === 'all' || activeRound === 'qf' ? 'flex' : 'hidden md:flex'} flex-col justify-around gap-4 w-full md:w-66 max-w-sm`} id="round-qf">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 py-2.5 rounded-lg shadow-xs">
              Quartas de Final
            </h4>
            <div className="space-y-12 flex flex-col justify-around h-full py-8">
              {[97, 98, 99, 100].map((id) => (
                <BracketNode
                  key={id}
                  match={getMatchById(id)}
                  onSimulate={onSimulateMatch}
                  onOpenH2H={onOpenH2H}
                  onUpdateScore={onUpdateScore}
                  getEmojiFlag={getEmojiFlag}
                  getTeamName={getTeamName}
                  allowSimulation={allowSimulation}
                />
              ))}
            </div>
          </div>

          {/* ==================== SEMI-FINALS ==================== */}
          <div className={`${activeRound === 'all' || activeRound === 'sf' ? 'flex' : 'hidden md:flex'} flex-col justify-around gap-4 w-full md:w-66 max-w-sm`} id="round-sf">
            <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 py-2.5 rounded-lg shadow-xs">
              Semifinais
            </h4>
            <div className="space-y-24 flex flex-col justify-around h-full py-12">
              {[101, 102].map((id) => (
                <BracketNode
                  key={id}
                  match={getMatchById(id)}
                  onSimulate={onSimulateMatch}
                  onOpenH2H={onOpenH2H}
                  onUpdateScore={onUpdateScore}
                  getEmojiFlag={getEmojiFlag}
                  getTeamName={getTeamName}
                  allowSimulation={allowSimulation}
                />
              ))}
            </div>
          </div>

          {/* ==================== FINAL & THIRD PLACE ==================== */}
          <div className={`${activeRound === 'all' || activeRound === 'f' ? 'flex' : 'hidden md:flex'} flex-col justify-center gap-10 w-full md:w-72 max-w-sm`} id="round-f">
            {/* Grand Final Container */}
            <div className="space-y-4" id="grand-final-box">
              <h4 className="text-center text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-200 py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-xs">
                <Award className="w-4 h-4 text-amber-600" /> Grande Final (Jogo 104)
              </h4>
              <BracketNode
                match={getMatchById(104)}
                onSimulate={onSimulateMatch}
                onOpenH2H={onOpenH2H}
                onUpdateScore={onUpdateScore}
                getEmojiFlag={getEmojiFlag}
                getTeamName={getTeamName}
                isFinalNode={true}
                allowSimulation={allowSimulation}
              />
            </div>

            {/* Third Place Container */}
            <div className="space-y-4" id="third-place-box">
              <h4 className="text-center text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-200 py-2 rounded-lg shadow-xs">
                Decisão 3º Lugar (Jogo 103)
              </h4>
              <BracketNode
                match={getMatchById(103)}
                onSimulate={onSimulateMatch}
                onOpenH2H={onOpenH2H}
                onUpdateScore={onUpdateScore}
                getEmojiFlag={getEmojiFlag}
                getTeamName={getTeamName}
                allowSimulation={allowSimulation}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Single Match node rendering component
interface BracketNodeProps {
  key?: any;
  match?: Match;
  onSimulate: (id: number) => void;
  onOpenH2H: (m: Match) => void;
  onUpdateScore: (matchId: number, homeScore: number, awayScore: number, homePen?: number | null, awayPen?: number | null) => void;
  getEmojiFlag: (code: string | null, sizeClass?: string) => React.ReactNode;
  getTeamName: (code: string | null, plc: string) => string;
  isFinalNode?: boolean;
  allowSimulation?: boolean;
}

function BracketNode({
  match,
  onSimulate,
  onOpenH2H,
  onUpdateScore,
  getEmojiFlag,
  getTeamName,
  isFinalNode = false,
  allowSimulation = false
}: BracketNodeProps) {
  if (!match) return null;

  const hasTeams = match.homeTeamCode !== null && match.awayTeamCode !== null;
  const isPlayed = match.state !== 'pending';

  // Toggle editor inside components
  const [isEditing, setIsEditing] = useState(false);
  const [editHome, setEditHome] = useState(match.homeScore !== null ? match.homeScore.toString() : '0');
  const [editAway, setEditAway] = useState(match.awayScore !== null ? match.awayScore.toString() : '0');
  const [editHomePen, setEditHomePen] = useState(match.homePenScore !== null ? match.homePenScore.toString() : '');
  const [editAwayPen, setEditAwayPen] = useState(match.awayPenScore !== null ? match.awayPenScore.toString() : '');

  // Synchronize values with match changes
  useEffect(() => {
    setEditHome(match.homeScore !== null ? match.homeScore.toString() : '0');
    setEditAway(match.awayScore !== null ? match.awayScore.toString() : '0');
    setEditHomePen(match.homePenScore !== null ? match.homePenScore.toString() : '');
    setEditAwayPen(match.awayPenScore !== null ? match.awayPenScore.toString() : '');
  }, [match]);

  const showPensInput = editHome !== '' && editAway !== '' && parseInt(editHome, 10) === parseInt(editAway, 10);

  const handleSave = () => {
    const hScore = parseInt(editHome, 10);
    const aScore = parseInt(editAway, 10);
    if (isNaN(hScore) || isNaN(aScore)) return;

    let hPen: number | null = null;
    let aPen: number | null = null;
    if (hScore === aScore) {
      const parsedHPen = parseInt(editHomePen, 10);
      const parsedAPen = parseInt(editAwayPen, 10);
      if (!isNaN(parsedHPen) && !isNaN(parsedAPen)) {
        hPen = parsedHPen;
        aPen = parsedAPen;
      }
    }

    onUpdateScore(match.id, hScore, aScore, hPen, aPen);
    setIsEditing(false);
  };

  // Determine winner for subtle highlight
  let homeWinner = false;
  let awayWinner = false;
  if (isPlayed && match.homeScore !== null && match.awayScore !== null) {
    if (match.homeScore > match.awayScore) homeWinner = true;
    else if (match.homeScore < match.awayScore) awayWinner = true;
    else if (match.homePenScore !== null && match.awayPenScore !== null) {
      if (match.homePenScore > match.awayPenScore) homeWinner = true;
      else awayWinner = true;
    }
  }

  // Edit Mode view
  if (isEditing) {
    return (
      <div
        className="border rounded-xl shadow-md overflow-hidden bg-white border-teal-500 animate-fade-in"
        id={`bracket-node-edit-${match.id}`}
      >
        {/* Node Metadata (Time, Location, etc.) */}
        <div className="bg-teal-55 bg-teal-50 px-3 py-1 text-[10px] text-teal-800 font-mono flex justify-between items-center border-b border-teal-150">
          <span className="font-bold">Editar Jogo {match.id}</span>
          <span className="truncate max-w-[120px]">{match.location.split(',')[0]}</span>
        </div>

        <div className="p-3 space-y-3">
          {/* Home Team Input */}
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-1.5 truncate text-slate-800">
              {getEmojiFlag(match.homeTeamCode, "w-[21px] h-[14px]")}
              <span className="truncate font-semibold">{getTeamName(match.homeTeamCode, match.homeLabel || 'Indefinido')}</span>
            </div>
            <input
              type="number"
              min="0"
              value={editHome}
              onChange={(e) => setEditHome(e.target.value)}
              className="w-12 h-7 text-center border border-slate-300 rounded font-bold text-slate-800 bg-white focus:outline-hidden focus:border-teal-500 font-mono text-xs"
            />
          </div>

          {/* Away Team Input */}
          <div className="flex items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-1.5 truncate text-slate-800">
              {getEmojiFlag(match.awayTeamCode, "w-[21px] h-[14px]")}
              <span className="truncate font-semibold">{getTeamName(match.awayTeamCode, match.awayLabel || 'Indefinido')}</span>
            </div>
            <input
              type="number"
              min="0"
              value={editAway}
              onChange={(e) => setEditAway(e.target.value)}
              className="w-12 h-7 text-center border border-slate-300 rounded font-bold text-slate-800 bg-white focus:outline-hidden focus:border-teal-500 font-mono text-xs"
            />
          </div>

          {/* Penalty inputs if draw */}
          {showPensInput && (
            <div className="bg-slate-50 p-2 rounded border border-slate-200 space-y-2 animate-fade-in">
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider text-center">Disputa de Pênaltis</p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[10px] text-slate-600 font-medium">Placar Pênaltis:</span>
                <div className="flex items-center gap-1 font-mono">
                  <input
                    type="number"
                    min="0"
                    placeholder="Casa"
                    value={editHomePen}
                    onChange={(e) => setEditHomePen(e.target.value)}
                    className="w-10 h-6 text-center border border-slate-300 rounded text-xs bg-white"
                  />
                  <span className="text-slate-400 font-bold px-0.5">-</span>
                  <input
                    type="number"
                    min="0"
                    placeholder="Fora"
                    value={editAwayPen}
                    onChange={(e) => setEditAwayPen(e.target.value)}
                    className="w-10 h-6 text-center border border-slate-300 rounded text-xs bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-1.5 justify-end pt-1">
            <button
              onClick={() => setIsEditing(false)}
              className="text-[10px] text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded font-bold transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}
              className="bg-teal-600 hover:bg-teal-500 text-white text-[10px] px-3 py-1 rounded font-bold transition-all shadow-sm"
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Standard rendering of match card
  return (
    <div
      className={`border rounded-xl shadow-xs overflow-hidden transition-all ${
        isFinalNode
          ? 'bg-gradient-to-br from-amber-50 to-white border-amber-300 hover:border-amber-400 shadow-sm'
          : isPlayed
          ? 'bg-white border-slate-200 hover:border-slate-300'
          : 'bg-slate-100/40 border-slate-200 hover:border-slate-300'
      }`}
      id={`bracket-node-${match.id}`}
    >
      {/* Node Metadata (Time, Location, etc.) */}
      <div className="bg-slate-50 px-3 py-1 text-[10px] text-slate-500 font-mono flex justify-between items-center border-b border-slate-200">
        <span>Jogo {match.id}</span>
        <span className="truncate max-w-[124px]">{match.location.split(',')[0]}</span>
      </div>

      <div className="p-3 space-y-2">
        {/* Home Row */}
        <div className={`flex items-center justify-between text-xs transition-opacity ${!hasTeams ? 'opacity-50' : 'opacity-100'}`}>
          <div className={`flex items-center gap-2 max-w-[160px] truncate ${homeWinner ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
            {getEmojiFlag(match.homeTeamCode, "w-[21px] h-[14px]")}
            <span className="truncate">{getTeamName(match.homeTeamCode, match.homeLabel || 'Indefinido')}</span>
          </div>
          {isPlayed && (
            <div className="flex items-center gap-1.5 font-mono">
              {match.homePenScore !== null && (
                <span className="text-[10px] text-teal-600/90 font-bold" title="Pênaltis">
                  ({match.homePenScore})
                </span>
              )}
              <span className={`text-sm font-bold ${homeWinner ? 'text-teal-600 font-black' : 'text-slate-400'}`}>{match.homeScore}</span>
            </div>
          )}
        </div>

        {/* Away Row */}
        <div className={`flex items-center justify-between text-xs transition-opacity ${!hasTeams ? 'opacity-50' : 'opacity-100'}`}>
          <div className={`flex items-center gap-2 max-w-[160px] truncate ${awayWinner ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
            {getEmojiFlag(match.awayTeamCode, "w-[21px] h-[14px]")}
            <span className="truncate">{getTeamName(match.awayTeamCode, match.awayLabel || 'Indefinido')}</span>
          </div>
          {isPlayed && (
            <div className="flex items-center gap-1.5 font-mono">
              {match.awayPenScore !== null && (
                <span className="text-[10px] text-teal-600/90 font-bold" title="Pênaltis">
                  ({match.awayPenScore})
                </span>
              )}
              <span className={`text-sm font-bold ${awayWinner ? 'text-teal-600 font-black' : 'text-slate-400'}`}>{match.awayScore}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons footer */}
      <div className="bg-slate-50 px-3 py-1.5 flex gap-1 justify-between items-center border-t border-slate-200">
        <button
          onClick={() => onOpenH2H(match)}
          className="text-[10px] text-slate-500 hover:text-slate-800 px-2 py-0.5 rounded hover:bg-slate-100 flex items-center gap-1 font-semibold transition-all"
          title="Ver confrontos diretos e gráficos de desempenho"
        >
          <LineChart className="w-3 h-3 text-slate-400" /> H2H / Análise
        </button>
        <div className="flex gap-1">
          {hasTeams && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-[10px] text-teal-700 hover:bg-teal-50 hover:text-teal-800 px-2 py-0.5 rounded flex items-center gap-0.5 font-semibold transition-all"
              title="Inserir placar real manualmente"
            >
              Placar
            </button>
          )}
          {allowSimulation && hasTeams && !isPlayed && (
            <button
              onClick={() => onSimulate(match.id)}
              className="bg-teal-600 hover:bg-teal-500 text-white text-[10px] px-2.5 py-0.5 rounded font-bold flex items-center gap-1 shadow-xs hover:shadow-sm transition-all"
            >
              <Play className="w-2.5 h-2.5 fill-white" /> Simular
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
