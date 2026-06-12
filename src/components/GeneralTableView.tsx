/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Match, TeamStats } from '../types';
import { TEAMS, getTeamFlagUrl } from '../data';
import { Search, ArrowUpDown, Shield } from 'lucide-react';

interface GeneralTableViewProps {
  matches: Match[];
  onSelectTeam: (code: string) => void;
}

type SortColumn = 'pts' | 'played' | 'wins' | 'draws' | 'losses' | 'gf' | 'ga' | 'gd' | 'util';

export default function GeneralTableView({ matches, onSelectTeam }: GeneralTableViewProps) {
  const [search, setSearch] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortColumn>('pts');
  const [sortAsc, setSortAsc] = useState(false);

  // Accumulate statistics for all 48 selections throughout the whole cup (both group stage AND knockouts)
  const allTeamPerformance = useMemo(() => {
    const stats: Record<string, TeamStats> = {};

    // Initialize all 48 selections
    TEAMS.forEach((team) => {
      stats[team.code] = {
        code: team.code,
        name: team.name,
        group: team.group,
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

    // Populate data from simulated matches
    matches.forEach((m) => {
      if (m.state === 'pending' || !m.homeTeamCode || !m.awayTeamCode) return;
      if (m.homeScore === null || m.awayScore === null) return;

      const home = stats[m.homeTeamCode];
      const away = stats[m.awayTeamCode];

      if (home && away) {
        home.played += 1;
        away.played += 1;
        home.goalsFor += m.homeScore;
        home.goalsAgainst += m.awayScore;
        away.goalsFor += m.awayScore;
        away.goalsAgainst += m.homeScore;

        // Group matches provide points
        if (!m.isKnockout) {
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
        } else {
          // Knockout matches count for record (win/loss based on finished scores or penalties)
          if (m.homeScore > m.awayScore) {
            home.wins += 1;
            home.points += 3; // add nominal pts for comparison
            away.losses += 1;
          } else if (m.homeScore < m.awayScore) {
            away.wins += 1;
            away.points += 3;
            home.losses += 1;
          } else {
            // Draw nominal
            home.draws += 1;
            away.draws += 1;
            home.points += 1;
            away.points += 1;

            if (m.homePenScore !== null && m.awayPenScore !== null) {
              if (m.homePenScore > m.awayPenScore) {
                home.wins += 1; // Advanced in tournament
              } else {
                away.wins += 1;
              }
            }
          }
        }
      }
    });

    // Compute derived goal differences
    return Object.values(stats).map((s) => ({
      ...s,
      goalDifference: s.goalsFor - s.goalsAgainst
    }));
  }, [matches]);

  // Handle Sort & Search
  const sortedAndFiltered = useMemo(() => {
    let result = allTeamPerformance.filter((team) => {
      const matchSearch = team.name.toLowerCase().includes(search.toLowerCase()) || 
                          team.code.toLowerCase().includes(search.toLowerCase());
      const matchGroup = filterGroup === 'all' || team.group === filterGroup;
      return matchSearch && matchGroup;
    });

    // Execute sorting
    result.sort((a, b) => {
      let valA: number = 0;
      let valB: number = 0;

      switch (sortBy) {
        case 'pts':
          valA = a.points;
          valB = b.points;
          break;
        case 'played':
          valA = a.played;
          valB = b.played;
          break;
        case 'wins':
          valA = a.wins;
          valB = b.wins;
          break;
        case 'draws':
          valA = a.draws;
          valB = b.draws;
          break;
        case 'losses':
          valA = a.losses;
          valB = b.losses;
          break;
        case 'gf':
          valA = a.goalsFor;
          valB = b.goalsFor;
          break;
        case 'ga':
          valA = a.goalsAgainst;
          valB = b.goalsAgainst;
          break;
        case 'gd':
          valA = a.goalDifference;
          valB = b.goalDifference;
          break;
        case 'util':
          const apA = a.played > 0 ? (a.points / (a.played * 3)) * 100 : 0;
          const apB = b.played > 0 ? (b.points / (b.played * 3)) * 100 : 0;
          valA = apA;
          valB = apB;
          break;
      }

      // secondary sort of goal difference and criteria
      if (valA === valB) {
        if (a.goalDifference !== b.goalDifference) {
          return sortAsc ? a.goalDifference - b.goalDifference : b.goalDifference - a.goalDifference;
        }
        return sortAsc ? a.goalsFor - b.goalsFor : b.goalsFor - a.goalsFor;
      }

      return sortAsc ? valA - valB : valB - valA;
    });

    return result;
  }, [allTeamPerformance, search, filterGroup, sortBy, sortAsc]);

  const toggleSort = (column: SortColumn) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(false); // Default desc
    }
  };

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

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden animate-fade-in" id="ranking-container">
      {/* Header and Filter Controls */}
      <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row gap-4 items-center justify-between" id="ranking-header">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Shield className="w-5 h-5 text-teal-600" />
            Classificação Dinâmica Geral da Copa
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Métricas acumuladas de todas as 48 seleções (pontos cumulativos, saldo, aproveitamento estruturado)
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 items-center">
          {/* Searching */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              className="w-full bg-slate-50 text-slate-700 border border-slate-205 border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:outline-hidden focus:border-teal-500 transition-colors"
              placeholder="Pesquisar seleção..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Group Filter */}
          <div className="w-full sm:w-auto">
            <select
              className="bg-slate-50 text-slate-750 border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:outline-hidden focus:border-teal-500 w-full font-bold"
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
            >
              <option value="all">Filtro: Todos os Grupos</option>
              {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((g) => (
                <option key={g} value={g}>
                  Grupo {g}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Spreadsheet Standings Grid */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border-b border-slate-100">
          <thead>
            <tr className="bg-slate-50/60 text-xs text-slate-600 border-b border-slate-200 font-bold tracking-wider">
              <th className="py-3 px-4 text-center">Pos</th>
              <th className="py-3 px-4">Seleção</th>
              <th className="hidden sm:table-cell py-3 px-2 text-center">Grupo</th>
              <th className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('pts')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  Pts {sortBy === 'pts' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'pts' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('played')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  J {sortBy === 'played' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'played' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="py-3 px-2 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('wins')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  V {sortBy === 'wins' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'wins' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="hidden sm:table-cell py-3 px-2 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('draws')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  E {sortBy === 'draws' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'draws' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="hidden sm:table-cell py-3 px-2 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('losses')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  D {sortBy === 'losses' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'losses' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="hidden md:table-cell py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('gf')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  GP {sortBy === 'gf' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'gf' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="hidden md:table-cell py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('ga')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  GC {sortBy === 'ga' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'ga' && <ArrowUpDown className="w-3 h-3 text-slate-455" />}
                </span>
              </th>
              <th className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('gd')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  SG {sortBy === 'gd' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'gd' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
              <th className="hidden md:table-cell py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => toggleSort('util')}>
                <span className="flex items-center justify-center gap-1 font-bold">
                  Aprov % {sortBy === 'util' && (sortAsc ? '▲' : '▼')}
                  {sortBy !== 'util' && <ArrowUpDown className="w-3 h-3 text-slate-450" />}
                </span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedAndFiltered.map((team, idx) => {
              const aproveitamento = team.played > 0 
                ? ((team.points / (team.played * 3)) * 100).toFixed(1) 
                : '0.0';

              return (
                <tr
                  key={team.code}
                  className="hover:bg-slate-50/70 transition-colors text-sm text-slate-600 group cursor-pointer"
                  onClick={() => onSelectTeam(team.code)}
                >
                  <td className="py-3 px-4 text-center font-mono text-slate-405 text-slate-400 font-bold">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800 flex items-center gap-2 group-hover:text-teal-600 transition-colors">
                    {renderFlag(team.code, "w-6 h-4")}
                    <span>{team.name}</span>
                    <span className="text-xs text-slate-400 font-mono font-normal ml-1">
                      {team.code}
                    </span>
                  </td>
                  <td className="hidden sm:table-cell py-3 px-2 text-center">
                    <span className="bg-slate-100 border border-slate-200 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold text-slate-600 text-center">
                      {team.group}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-black text-slate-900 group-hover:text-teal-600 transition-colors">
                    {team.points}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-500">{team.played}</td>
                  <td className="py-3 px-2 text-center text-emerald-600 font-bold">{team.wins}</td>
                  <td className="hidden sm:table-cell py-3 px-2 text-center text-slate-500">{team.draws}</td>
                  <td className="hidden sm:table-cell py-3 px-2 text-center text-rose-600">{team.losses}</td>
                  <td className="hidden md:table-cell py-3 px-3 text-center font-mono text-slate-500">{team.goalsFor}</td>
                  <td className="hidden md:table-cell py-3 px-3 text-center font-mono text-slate-500">{team.goalsAgainst}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`font-mono font-bold ${team.goalDifference > 0 ? 'text-emerald-600' : team.goalDifference < 0 ? 'text-rose-600' : 'text-slate-500'}`}>
                      {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
                    </span>
                  </td>
                  <td className="hidden md:table-cell py-3 px-3 text-center font-mono font-bold text-slate-500">
                    {aproveitamento}%
                  </td>
                </tr>
              );
            })}

            {sortedAndFiltered.length === 0 && (
              <tr>
                <td colSpan={12} className="py-12 text-center text-slate-400 text-sm">
                  Nenhuma seleção correspondente aos filtros foi encontrada.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
