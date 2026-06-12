/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Match } from '../types';
import { TEAMS, TEAM_COLORS, getTeamFlagUrl } from '../data';
import { Flame, Sliders, Award } from 'lucide-react';

interface HeadToHeadViewProps {
  matches: Match[];
  initialHomeCode?: string;
  initialAwayCode?: string;
  onSimulateCustomMatch?: (homeCode: string, awayCode: string) => void;
}

export default function HeadToHeadView({
  matches,
  initialHomeCode = 'BRA',
  initialAwayCode = 'ARG'
}: HeadToHeadViewProps) {
  const [homeCode, setHomeCode] = useState(initialHomeCode);
  const [awayCode, setAwayCode] = useState(initialAwayCode);
  const [predictionResult, setPredictionResult] = useState<{
    homeScore: number;
    awayScore: number;
    winChanceHome: number;
    winChanceAway: number;
    tacticsHome: string;
    tacticsAway: string;
  } | null>(null);

  // Sync state if initial selection shifts (from outside clicks)
  React.useEffect(() => {
    setHomeCode(initialHomeCode);
  }, [initialHomeCode]);

  React.useEffect(() => {
    setAwayCode(initialAwayCode);
  }, [initialAwayCode]);

  const homeTeam = useMemo(() => TEAMS.find((t) => t.code === homeCode) || TEAMS[0], [homeCode]);
  const awayTeam = useMemo(() => TEAMS.find((t) => t.code === awayCode) || TEAMS[1], [awayCode]);

  // Compute overall current statistics in this tournament for both teams
  const teamStatsSummary = useMemo(() => {
    const defaultSum = { played: 0, wins: 0, draws: 0, losses: 0, gf: 0, ga: 0, pts: 0 };
    const summary = { home: { ...defaultSum }, away: { ...defaultSum } };

    matches.forEach((m) => {
      if (m.state === 'pending') return;
      if (m.homeScore === null || m.awayScore === null) return;

      // check home
      if (m.homeTeamCode === homeCode) {
        summary.home.played++;
        summary.home.gf += m.homeScore;
        summary.home.ga += m.awayScore;
        if (m.homeScore > m.awayScore) { summary.home.wins++; summary.home.pts += 3; }
        else if (m.homeScore < m.awayScore) { summary.home.losses++; }
        else { summary.home.draws++; summary.home.pts += 1; }
      } else if (m.awayTeamCode === homeCode) {
        summary.home.played++;
        summary.home.gf += m.awayScore;
        summary.home.ga += m.homeScore;
        if (m.awayScore > m.homeScore) { summary.home.wins++; summary.home.pts += 3; }
        else if (m.awayScore < m.homeScore) { summary.home.losses++; }
        else { summary.home.draws++; summary.home.pts += 1; }
      }

      // check away
      if (m.homeTeamCode === awayCode) {
        summary.away.played++;
        summary.away.gf += m.homeScore;
        summary.away.ga += m.awayScore;
        if (m.homeScore > m.awayScore) { summary.away.wins++; summary.away.pts += 3; }
        else if (m.homeScore < m.awayScore) { summary.away.losses++; }
        else { summary.away.draws++; summary.away.pts += 1; }
      } else if (m.awayTeamCode === awayCode) {
        summary.away.played++;
        summary.away.gf += m.awayScore;
        summary.away.ga += m.homeScore;
        if (m.awayScore > m.homeScore) { summary.away.wins++; summary.away.pts += 3; }
        else if (m.awayScore < m.homeScore) { summary.away.losses++; }
        else { summary.away.draws++; summary.away.pts += 1; }
      }
    });

    return summary;
  }, [matches, homeCode, awayCode]);

  // Color mappings
  const colorsHome = TEAM_COLORS[homeCode] || { primary: '#0ea5e9', secondary: '#ffffff' };
  const colorsAway = TEAM_COLORS[awayCode] || { primary: '#ef4444', secondary: '#ffffff' };

  // Calculate prediction dynamically
  const runH2HPrediction = () => {
    const diff = homeTeam.rating - awayTeam.rating;
    
    // Win probability
    const winChanceHome = Math.round(50 + (diff * 2));
    const winChanceAway = 100 - winChanceHome;

    // Simulated score line
    const baseHome = 1.3 + (diff / 15);
    const baseAway = 1.3 - (diff / 15);

    const sHome = Math.max(0, Math.round(baseHome + (Math.random() * 1.5 - 0.7)));
    const sAway = Math.max(0, Math.round(baseAway + (Math.random() * 1.5 - 0.7)));

    // Tactical comments
    const commentsHome = diff > 8
      ? 'Aposta em ofensiva agressiva com ampla posse de bola mundial e forte pressão no último terço.'
      : diff < -8
      ? 'Estratégia reativa defensiva priorizando o contra-ataque rápido e transições nas costas dos volantes.'
      : 'Esquema equilibrado no 4-3-3 priorizando controle físico de meio-campo e investidas aceleradas pelas alas.';

    const commentsAway = diff < -8
      ? 'Aposta em ofensiva agressiva com ampla posse de bola mundial e forte pressão no último terço.'
      : diff > 8
      ? 'Estratégia reativa defensiva priorizando o contra-ataque rápido e transições nas costas dos volantes.'
      : 'Esquema equilibrado no 4-4-2 focado na solidez defensiva, compactação de linhas e bolas paradas.';

    setPredictionResult({
      homeScore: sHome,
      awayScore: sAway,
      winChanceHome,
      winChanceAway,
      tacticsHome: commentsHome,
      tacticsAway: commentsAway
    });
  };

  useMemo(() => {
    // Reset prediction on team swap to force manual prediction clicks!
    setPredictionResult(null);
  }, [homeCode, awayCode]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6 animate-fade-in" id="h2h-container">
      {/* Title */}
      <div className="flex items-center justify-between border-b border-slate-205 border-slate-200 pb-4" id="h2h-header">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Flame className="w-5 h-5 text-teal-600 fill-teal-600" />
            Confronto Direto • Head to Head
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">
            Compare estatísticas das duas seleções no torneio e faça previsões táticas
          </p>
        </div>
        <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-150 px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
          <Sliders className="w-3.5 h-3.5 text-teal-600" /> Inteligência Simulador 2026
        </span>
      </div>

      {/* Selectors and Flags Screen */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-200" id="h2h-selectors">
        {/* Home selection */}
        <div className="col-span-3 flex flex-col items-center p-3" id="select-home-col">
          <img
            src={getTeamFlagUrl(homeCode)}
            alt={homeTeam.name}
            className="w-24 h-16 object-cover rounded-lg border-2 border-slate-200 shadow-custom-xs mb-3 transition-transform duration-200 hover:scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Seleção A (Casa)</label>
          <select
            className="bg-white text-slate-800 border border-slate-250 rounded-lg px-3 py-1.5 text-xs font-bold w-full focus:outline-hidden focus:border-teal-500 shadow-3xs"
            value={homeCode}
            onChange={(e) => setHomeCode(e.target.value)}
          >
            {TEAMS.map((t) => (
              <option key={t.code} value={t.code} disabled={t.code === awayCode}>
                {t.flag} {t.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 items-center mt-2.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: colorsHome.primary }} />
            <span className="text-[11px] text-slate-500 font-mono font-bold">Força: {homeTeam.rating}</span>
          </div>
        </div>

        {/* VS spacer with prediction click */}
        <div className="col-span-1 text-center py-4 md:py-0" id="vs-col">
          <div className="w-12 h-12 bg-white border border-slate-200 text-slate-400 font-bold flex items-center justify-center rounded-full text-xs font-mono mx-auto shadow-xs select-none">
            VS
          </div>
          <button
            onClick={runH2HPrediction}
            className="mt-3.5 text-[10px] bg-teal-600 hover:bg-teal-55 bg-teal-500 hover:bg-teal-600 font-bold text-white px-3 py-1.5 rounded-lg flex items-center gap-1 mx-auto shadow-3xs transition-all whitespace-nowrap cursor-pointer"
          >
            Prever Placar
          </button>
        </div>

        {/* Away selection */}
        <div className="col-span-3 flex flex-col items-center p-3" id="select-away-col">
          <img
            src={getTeamFlagUrl(awayCode)}
            alt={awayTeam.name}
            className="w-24 h-16 object-cover rounded-lg border-2 border-slate-200 shadow-custom-xs mb-3 transition-transform duration-200 hover:scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Seleção B (Fora)</label>
          <select
            className="bg-white text-slate-800 border border-slate-250 rounded-lg px-3 py-1.5 text-xs font-bold w-full focus:outline-hidden focus:border-teal-500 shadow-3xs"
            value={awayCode}
            onChange={(e) => setAwayCode(e.target.value)}
          >
            {TEAMS.map((t) => (
              <option key={t.code} value={t.code} disabled={t.code === homeCode}>
                {t.flag} {t.name}
              </option>
            ))}
          </select>
          <div className="flex gap-2 items-center mt-2.5">
            <span className="w-3 h-3 rounded" style={{ backgroundColor: colorsAway.primary }} />
            <span className="text-[11px] text-slate-500 font-mono font-bold">Força: {awayTeam.rating}</span>
          </div>
        </div>
      </div>

      {/* Prediction Output Section */}
      {predictionResult && (
        <div className="bg-teal-50 border border-teal-200/80 p-4.5 rounded-xl text-slate-700 space-y-3.5 animate-fade-in" id="prediction-box">
          <div className="flex items-center gap-2 text-teal-850 font-bold text-xs uppercase tracking-wide">
            <Award className="w-4 h-4 text-teal-600" /> Predição Inteligente de Resultados
          </div>
          <div className="grid grid-cols-3 items-center text-center py-2" id="prediction-scores">
            <div>
              <span className="text-sm font-bold text-slate-800">{homeTeam.name}</span>
              <div className="text-3xl font-mono font-black text-teal-700 mt-1">{predictionResult.homeScore}</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-1">Chance: {predictionResult.winChanceHome}%</div>
            </div>
            <div className="text-slate-450 text-xs font-bold italic">Simulação Tática</div>
            <div>
              <span className="text-sm font-bold text-slate-800">{awayTeam.name}</span>
              <div className="text-3xl font-mono font-black text-teal-700 mt-1">{predictionResult.awayScore}</div>
              <div className="text-[11px] text-slate-500 font-semibold mt-1">Chance: {predictionResult.winChanceAway}%</div>
            </div>
          </div>
          <div className="border-t border-teal-200 pt-2.5 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:px-2">
            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-650"><strong className="text-slate-800 flex items-center gap-1">📋 Tática {homeTeam.name}:</strong> {predictionResult.tacticsHome}</p>
            <p className="bg-white p-2.5 rounded-lg border border-slate-200 text-slate-650"><strong className="text-slate-800 flex items-center gap-1">📋 Tática {awayTeam.name}:</strong> {predictionResult.tacticsAway}</p>
          </div>
        </div>
      )}

      {/* Interactive SVGs Performance Charts */}
      <div className="space-y-4" id="h2h-graphics">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
          📊 Gráficos de Confronto de Atributos
        </h3>

        <div className="space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-200" id="svg-charts-container">
          {/* Chart 1: Force rating */}
          <BracketAttributeBar
            label="Força do Elenco Geral (Rating)"
            homeVal={homeTeam.rating}
            awayVal={awayTeam.rating}
            maxVal={100}
            colorHome={colorsHome.primary}
            colorAway={colorsAway.primary}
            homeTeamName={homeTeam.code}
            awayTeamName={awayTeam.code}
          />

          {/* Chart 2: Cumulative Points */}
          <BracketAttributeBar
            label="Pontos Acumulados no Torneio"
            homeVal={teamStatsSummary.home.pts}
            awayVal={teamStatsSummary.away.pts}
            maxVal={Math.max(12, teamStatsSummary.home.pts, teamStatsSummary.away.pts)}
            colorHome={colorsHome.primary}
            colorAway={colorsAway.primary}
            homeTeamName={homeTeam.code}
            awayTeamName={awayTeam.code}
          />

          {/* Chart 3: Average Goals Per Match */}
          <BracketAttributeBar
            label="Total de Gols Marcados (GP)"
            homeVal={teamStatsSummary.home.gf}
            awayVal={teamStatsSummary.away.gf}
            maxVal={Math.max(12, teamStatsSummary.home.gf, teamStatsSummary.away.gf)}
            colorHome={colorsHome.primary}
            colorAway={colorsAway.primary}
            homeTeamName={homeTeam.code}
            awayTeamName={awayTeam.code}
          />

          {/* Chart 4: Clean sheets / conceded goals */}
          <BracketAttributeBar
            label="Gols Sofridos (GC - Menos é Melhor)"
            homeVal={teamStatsSummary.home.ga}
            awayVal={teamStatsSummary.away.ga}
            maxVal={Math.max(12, teamStatsSummary.home.ga, teamStatsSummary.away.ga)}
            colorHome={colorsHome.primary}
            colorAway={colorsAway.primary}
            homeTeamName={homeTeam.code}
            awayTeamName={awayTeam.code}
            isInverted={true}
          />
        </div>
      </div>
    </div>
  );
}

// Custom responsive SVG comparative bar component
interface BracketAttributeBarProps {
  label: string;
  homeVal: number;
  awayVal: number;
  maxVal: number;
  colorHome: string;
  colorAway: string;
  homeTeamName: string;
  awayTeamName: string;
  isInverted?: boolean;
}

function BracketAttributeBar({
  label,
  homeVal,
  awayVal,
  maxVal,
  colorHome,
  colorAway,
  homeTeamName,
  awayTeamName,
  isInverted = false
}: BracketAttributeBarProps) {
  const finalMax = maxVal === 0 ? 1 : maxVal;
  const pctHome = Math.min(100, Math.round((homeVal / finalMax) * 100));
  const pctAway = Math.min(100, Math.round((awayVal / finalMax) * 100));

  return (
    <div className="space-y-1 text-xs">
      <div className="flex justify-between text-[11px] text-slate-500 font-mono font-bold">
        <span>{label}</span>
        <span className="flex gap-2">
          <span>{homeTeamName}: <span className="font-bold text-slate-800">{homeVal}</span></span>
          <span className="text-slate-400 font-light">vs</span>
          <span>{awayTeamName}: <span className="font-bold text-slate-800">{awayVal}</span></span>
        </span>
      </div>

      {/* SVG Comparative Dual bar */}
      <div className="h-6 w-full bg-white border border-slate-200 rounded-lg overflow-hidden flex relative items-center justify-between px-3">
        {/* Left / Home filled progress */}
        <div
          className="absolute left-0 top-0 bottom-0 opacity-80 transition-all duration-500"
          style={{
            width: `${pctHome / 2}%`,
            background: `linear-gradient(270deg, ${colorHome}dd, ${colorHome}44)`
          }}
        />

        {/* Right / Away filled progress */}
        <div
          className="absolute right-0 top-0 bottom-0 opacity-80 transition-all duration-500"
          style={{
            width: `${pctAway / 2}%`,
            background: `linear-gradient(90deg, ${colorAway}dd, ${colorAway}44)`
          }}
        />

        {/* Live Values label display superimposed */}
        <span className="font-bold text-slate-700 z-10 font-mono text-[10px] sm:text-xs">
          {pctHome > pctAway && !isInverted ? <span className="font-bold text-amber-600">🏆</span> : null} {homeVal}
        </span>
        <span className="text-[10px] text-slate-400 font-bold z-10 p-1 bg-white/95 rounded border border-slate-200 shadow-3xs">Equilíbrio</span>
        <span className="font-bold text-slate-700 z-10 font-mono text-[10px] sm:text-xs">
          {awayVal > homeVal && !isInverted ? <span className="font-bold text-amber-600">🏆</span> : null} {awayVal}
        </span>
      </div>
    </div>
  );
}
