/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Team, Match } from './types';

export const TEAMS: Team[] = [
  // Group A
  { code: 'MEX', name: 'México', group: 'A', rating: 82, flag: '🇲🇽' },
  { code: 'RSA', name: 'África do Sul', group: 'A', rating: 68, flag: '🇿🇦' },
  { code: 'KOR', name: 'Coreia do Sul', group: 'A', rating: 80, flag: '🇰🇷' },
  { code: 'CZE', name: 'Tchéquia', group: 'A', rating: 79, flag: '🇨🇿' },

  // Group B
  { code: 'CAN', name: 'Canadá', group: 'B', rating: 80, flag: '🇨🇦' },
  { code: 'BIH', name: 'Bósnia e H.', group: 'B', rating: 76, flag: '🇧🇦' },
  { code: 'QAT', name: 'Catar', group: 'B', rating: 68, flag: '🇶🇦' },
  { code: 'SUI', name: 'Suíça', group: 'B', rating: 83, flag: '🇨🇭' },

  // Group C
  { code: 'BRA', name: 'Brasil', group: 'C', rating: 92, flag: '🇧🇷' },
  { code: 'MAR', name: 'Marrocos', group: 'C', rating: 86, flag: '🇲🇦' },
  { code: 'HAI', name: 'Haiti', group: 'C', rating: 64, flag: '🇭🇹' },
  { code: 'SCO', name: 'Escócia', group: 'C', rating: 77, flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },

  // Group D
  { code: 'USA', name: 'Estados Unidos', group: 'D', rating: 83, flag: '🇺🇸' },
  { code: 'PAR', name: 'Paraguai', group: 'D', rating: 75, flag: '🇵🇾' },
  { code: 'AUS', name: 'Austrália', group: 'D', rating: 77, flag: '🇦🇺' },
  { code: 'TUR', name: 'Turquia', group: 'D', rating: 79, flag: '🇹🇷' },

  // Group E
  { code: 'GER', name: 'Alemanha', group: 'E', rating: 89, flag: '🇩🇪' },
  { code: 'CUW', name: 'Curaçao', group: 'E', rating: 65, flag: '🇨🇼' },
  { code: 'CIV', name: 'Costa do Marfim', group: 'E', rating: 79, flag: '🇨🇮' },
  { code: 'ECU', name: 'Equador', group: 'E', rating: 80, flag: '🇪🇨' },

  // Group F
  { code: 'NED', name: 'Holanda', group: 'F', rating: 88, flag: '🇳🇱' },
  { code: 'JPN', name: 'Japão', group: 'F', rating: 82, flag: '🇯🇵' },
  { code: 'SWE', name: 'Suécia', group: 'F', rating: 81, flag: '🇸🇪' },
  { code: 'TUN', name: 'Tunísia', group: 'F', rating: 68, flag: '🇹🇳' },

  // Group G
  { code: 'BEL', name: 'Bélgica', group: 'G', rating: 85, flag: '🇧🇪' },
  { code: 'EGY', name: 'Egito', group: 'G', rating: 75, flag: '🇪🇬' },
  { code: 'IRN', name: 'Irã', group: 'G', rating: 74, flag: '🇮🇷' },
  { code: 'NZL', name: 'Nova Zelândia', group: 'G', rating: 67, flag: '🇳🇿' },

  // Group H
  { code: 'ESP', name: 'Espanha', group: 'H', rating: 91, flag: '🇪🇸' },
  { code: 'CPV', name: 'Cabo Verde', group: 'H', rating: 69, flag: '🇨🇻' },
  { code: 'KSA', name: 'Arábia Saudita', group: 'H', rating: 74, flag: '🇸🇦' },
  { code: 'URU', name: 'Uruguai', group: 'H', rating: 88, flag: '🇺🇾' },

  // Group I
  { code: 'FRA', name: 'França', group: 'I', rating: 93, flag: '🇫🇷' },
  { code: 'SEN', name: 'Senegal', group: 'I', rating: 82, flag: '🇸🇳' },
  { code: 'IRQ', name: 'Iraque', group: 'I', rating: 70, flag: '🇮🇶' },
  { code: 'NOR', name: 'Noruega', group: 'I', rating: 79, flag: '🇳🇴' },

  // Group J
  { code: 'ARG', name: 'Argentina', group: 'J', rating: 92, flag: '🇦🇷' },
  { code: 'ALG', name: 'Argélia', group: 'J', rating: 76, flag: '🇩🇿' },
  { code: 'AUT', name: 'Áustria', group: 'J', rating: 77, flag: '🇦🇹' },
  { code: 'JOR', name: 'Jordânia', group: 'J', rating: 66, flag: '🇯🇴' },

  // Group K
  { code: 'POR', name: 'Portugal', group: 'K', rating: 90, flag: '🇵🇹' },
  { code: 'COD', name: 'RD Congo', group: 'K', rating: 72, flag: '🇨🇩' },
  { code: 'UZB', name: 'Uzbequistão', group: 'K', rating: 72, flag: '🇺🇿' },
  { code: 'COL', name: 'Colômbia', group: 'K', rating: 85, flag: '🇨🇴' },

  // Group L
  { code: 'ENG', name: 'Inglaterra', group: 'L', rating: 92, flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { code: 'CRO', name: 'Croácia', group: 'L', rating: 87, flag: '🇭🇷' },
  { code: 'GHA', name: 'Gana', group: 'L', rating: 74, flag: '🇬🇭' },
  { code: 'PAN', name: 'Panamá', group: 'L', rating: 70, flag: '🇵🇦' }
];

// Helper colors for premium styling
export const TEAM_COLORS: Record<string, { primary: string; secondary: string }> = {
  MEX: { primary: '#15803d', secondary: '#b91c1c' },
  RSA: { primary: '#0ea5e9', secondary: '#facc15' },
  KOR: { primary: '#be123c', secondary: '#1e3a8a' },
  CZE: { primary: '#1e40af', secondary: '#e11d48' },
  CAN: { primary: '#dc2626', secondary: '#ffffff' },
  BIH: { primary: '#1d4ed8', secondary: '#facc15' },
  QAT: { primary: '#881337', secondary: '#f8fafc' },
  SUI: { primary: '#e11d48', secondary: '#ffffff' },
  BRA: { primary: '#eab308', secondary: '#15803d' },
  MAR: { primary: '#b91c1c', secondary: '#15803d' },
  HAI: { primary: '#1d4ed8', secondary: '#dc2626' },
  SCO: { primary: '#0f172a', secondary: '#3b82f6' },
  USA: { primary: '#1e3a8a', secondary: '#e11d48' },
  PAR: { primary: '#dc2626', secondary: '#1d4ed8' },
  AUS: { primary: '#047857', secondary: '#facc15' },
  TUR: { primary: '#b91c1c', secondary: '#ffffff' },
  GER: { primary: '#09090b', secondary: '#facc15' },
  CUW: { primary: '#1d4ed8', secondary: '#facc15' },
  CIV: { primary: '#f97316', secondary: '#16a34a' },
  ECU: { primary: '#facc15', secondary: '#1d4ed8' },
  NED: { primary: '#ea580c', secondary: '#1d4ed8' },
  JPN: { primary: '#ffffff', secondary: '#be123c' },
  SWE: { primary: '#1d4ed8', secondary: '#facc15' },
  TUN: { primary: '#dc2626', secondary: '#ffffff' },
  BEL: { primary: '#09090b', secondary: '#dc2626' },
  EGY: { primary: '#991b1b', secondary: '#09090b' },
  IRN: { primary: '#16a34a', secondary: '#dc2626' },
  NZL: { primary: '#ffffff', secondary: '#09090b' },
  ESP: { primary: '#b91c1c', secondary: '#facc15' },
  CPV: { primary: '#1e3a8a', secondary: '#dc2626' },
  KSA: { primary: '#15803d', secondary: '#ffffff' },
  URU: { primary: '#0ea5e9', secondary: '#0f172a' },
  FRA: { primary: '#1e3a8a', secondary: '#dc2626' },
  SEN: { primary: '#15803d', secondary: '#facc15' },
  IRQ: { primary: '#09090b', secondary: '#15803d' },
  NOR: { primary: '#991b1b', secondary: '#1e3a8a' },
  ARG: { primary: '#60a5fa', secondary: '#ffffff' },
  ALG: { primary: '#15803d', secondary: '#ffffff' },
  AUT: { primary: '#dc2626', secondary: '#ffffff' },
  JOR: { primary: '#b91c1c', secondary: '#15803d' },
  POR: { primary: '#b91c1c', secondary: '#15803d' },
  COD: { primary: '#3b82f6', secondary: '#facc15' },
  UZB: { primary: '#06b6d4', secondary: '#ffffff' },
  COL: { primary: '#eab308', secondary: '#1d4ed8' },
  ENG: { primary: '#f8fafc', secondary: '#e11d48' },
  CRO: { primary: '#991b1b', secondary: '#ffffff' },
  GHA: { primary: '#f97316', secondary: '#15803d' },
  PAN: { primary: '#be123c', secondary: '#1d4ed8' }
};

export const INITIAL_MATCHES: Match[] = [
  // ==================== GRUPO A ====================
  {
    id: 1,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'MEX',
    awayTeamCode: 'RSA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '11/06/2026',
    time: '16:00',
    location: 'Cidade do México, México'
  },
  {
    id: 2,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'KOR',
    awayTeamCode: 'CZE',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '11/06/2026',
    time: '23:00',
    location: 'Guadalajara/Zapopan, México'
  },
  {
    id: 25,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CZE',
    awayTeamCode: 'RSA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '18/06/2026',
    time: '13:00',
    location: 'Atlanta, EUA'
  },
  {
    id: 28,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'MEX',
    awayTeamCode: 'KOR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '18/06/2026',
    time: '22:00',
    location: 'Guadalajara/Zapopan, México'
  },
  {
    id: 49,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'RSA',
    awayTeamCode: 'KOR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '22:00',
    location: 'Guadalajara, México'
  },
  {
    id: 50,
    group: 'A',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CZE',
    awayTeamCode: 'MEX',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '22:00',
    location: 'Cidade do México, México'
  },

  // ==================== GRUPO B ====================
  {
    id: 3,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CAN',
    awayTeamCode: 'BIH',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '12/06/2026',
    time: '16:00',
    location: 'Toronto, Canadá'
  },
  {
    id: 5,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'QAT',
    awayTeamCode: 'SUI',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '13/06/2026',
    time: '16:00',
    location: 'Santa Clara, EUA'
  },
  {
    id: 26,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SUI',
    awayTeamCode: 'BIH',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '18/06/2026',
    time: '16:00',
    location: 'Los Angeles, EUA'
  },
  {
    id: 27,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CAN',
    awayTeamCode: 'QAT',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '18/06/2026',
    time: '19:00',
    location: 'Vancouver, Canadá'
  },
  {
    id: 51,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SUI',
    awayTeamCode: 'CAN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '16:00',
    location: 'Vancouver, Canadá'
  },
  {
    id: 52,
    group: 'B',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'BIH',
    awayTeamCode: 'QAT',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '16:00',
    location: 'Seattle, EUA'
  },

  // ==================== GRUPO C ====================
  {
    id: 6,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'BRA',
    awayTeamCode: 'MAR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '13/06/2026',
    time: '19:00',
    location: 'Nova York/Nova Jersey, EUA'
  },
  {
    id: 7,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'HAI',
    awayTeamCode: 'SCO',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '13/06/2026',
    time: '22:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 30,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SCO',
    awayTeamCode: 'MAR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '19/06/2026',
    time: '19:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 31,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'BRA',
    awayTeamCode: 'HAI',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '19/06/2026',
    time: '21:30',
    location: 'Filadélfia, EUA'
  },
  {
    id: 53,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'MAR',
    awayTeamCode: 'HAI',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '19:00',
    location: 'Atlanta, EUA'
  },
  {
    id: 54,
    group: 'C',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SCO',
    awayTeamCode: 'BRA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '24/06/2026',
    time: '19:00',
    location: 'Miami, EUA'
  },

  // ==================== GRUPO D ====================
  {
    id: 4,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'USA',
    awayTeamCode: 'PAR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '12/06/2026',
    time: '22:00',
    location: 'Los Angeles, EUA'
  },
  {
    id: 8,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'AUS',
    awayTeamCode: 'TUR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '14/06/2026',
    time: '01:00',
    location: 'Vancouver, Canadá'
  },
  {
    id: 29,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'USA',
    awayTeamCode: 'AUS',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '19/06/2026',
    time: '16:00',
    location: 'Seattle, EUA'
  },
  {
    id: 32,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'TUR',
    awayTeamCode: 'PAR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '20/06/2026',
    time: '00:00',
    location: 'Santa Clara, EUA'
  },
  {
    id: 59,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'TUR',
    awayTeamCode: 'USA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '23:00',
    location: 'Los Angeles, EUA'
  },
  {
    id: 60,
    group: 'D',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'PAR',
    awayTeamCode: 'AUS',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '23:00',
    location: 'Santa Clara, EUA'
  },

  // ==================== GRUPO E ====================
  {
    id: 9,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'GER',
    awayTeamCode: 'CUW',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '14/06/2026',
    time: '14:00',
    location: 'Houston, EUA'
  },
  {
    id: 11,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CIV',
    awayTeamCode: 'ECU',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '14/06/2026',
    time: '20:00',
    location: 'Filadélfia, EUA'
  },
  {
    id: 34,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'GER',
    awayTeamCode: 'CIV',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '20/06/2026',
    time: '17:00',
    location: 'Toronto, Canadá'
  },
  {
    id: 35,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ECU',
    awayTeamCode: 'CUW',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '20/06/2026',
    time: '21:00',
    location: 'Kansas City, EUA'
  },
  {
    id: 55,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CUW',
    awayTeamCode: 'CIV',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '17:00',
    location: 'Filadélfia, EUA'
  },
  {
    id: 56,
    group: 'E',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ECU',
    awayTeamCode: 'GER',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '17:00',
    location: 'Nova York/Nova Jersey, EUA'
  },

  // ==================== GRUPO F ====================
  {
    id: 10,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NED',
    awayTeamCode: 'JPN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '14/06/2026',
    time: '17:00',
    location: 'Dallas/Arlington, EUA'
  },
  {
    id: 12,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SWE',
    awayTeamCode: 'TUN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '14/06/2026',
    time: '23:00',
    location: 'Guadalajara, México'
  },
  {
    id: 33,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NED',
    awayTeamCode: 'SWE',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '20/06/2026',
    time: '14:00',
    location: 'Houston, EUA'
  },
  {
    id: 36,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'TUN',
    awayTeamCode: 'JPN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '21/06/2026',
    time: '01:00',
    location: 'Guadalajara, México'
  },
  {
    id: 57,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'TUN',
    awayTeamCode: 'NED',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '20:00',
    location: 'Kansas City, EUA'
  },
  {
    id: 58,
    group: 'F',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'JPN',
    awayTeamCode: 'SWE',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '25/06/2026',
    time: '20:00',
    location: 'Dallas/Arlington, EUA'
  },

  // ==================== GRUPO G ====================
  {
    id: 14,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'BEL',
    awayTeamCode: 'EGY',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '15/06/2026',
    time: '16:00',
    location: 'Seattle, EUA'
  },
  {
    id: 16,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'IRN',
    awayTeamCode: 'NZL',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '15/06/2026',
    time: '22:00',
    location: 'Los Angeles, EUA'
  },
  {
    id: 38,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'BEL',
    awayTeamCode: 'IRN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '21/06/2026',
    time: '16:00',
    location: 'Los Angeles, EUA'
  },
  {
    id: 40,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NZL',
    awayTeamCode: 'EGY',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '21/06/2026',
    time: '22:00',
    location: 'Vancouver, Canadá'
  },
  {
    id: 65,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NZL',
    awayTeamCode: 'BEL',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '00:00',
    location: 'Vancouver, Canadá'
  },
  {
    id: 66,
    group: 'G',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'EGY',
    awayTeamCode: 'IRN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '00:00',
    location: 'Seattle, EUA'
  },

  // ==================== GRUPO H ====================
  {
    id: 13,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ESP',
    awayTeamCode: 'CPV',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '15/06/2026',
    time: '13:00',
    location: 'Atlanta, EUA'
  },
  {
    id: 15,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'KSA',
    awayTeamCode: 'URU',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '15/06/2026',
    time: '19:00',
    location: 'Miami, EUA'
  },
  {
    id: 37,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ESP',
    awayTeamCode: 'KSA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '21/06/2026',
    time: '13:00',
    location: 'Atlanta, EUA'
  },
  {
    id: 39,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'URU',
    awayTeamCode: 'CPV',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '21/06/2026',
    time: '19:00',
    location: 'Miami, EUA'
  },
  {
    id: 63,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CPV',
    awayTeamCode: 'KSA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '26/06/2026',
    time: '21:00',
    location: 'Houston, EUA'
  },
  {
    id: 64,
    group: 'H',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'URU',
    awayTeamCode: 'ESP',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '26/06/2026',
    time: '21:00',
    location: 'Guadalajara/Zapopan, México'
  },

  // ==================== GRUPO I ====================
  {
    id: 17,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'FRA',
    awayTeamCode: 'SEN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '16/06/2026',
    time: '16:00',
    location: 'Nova York/Nova Jersey, EUA'
  },
  {
    id: 18,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'IRQ',
    awayTeamCode: 'NOR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '16/06/2026',
    time: '19:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 41,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'FRA',
    awayTeamCode: 'IRQ',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '22/06/2026',
    time: '18:00',
    location: 'Filadélfia, EUA'
  },
  {
    id: 42,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NOR',
    awayTeamCode: 'SEN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '22/06/2026',
    time: '21:00',
    location: 'Toronto, Canadá'
  },
  {
    id: 61,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'NOR',
    awayTeamCode: 'FRA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '26/06/2026',
    time: '16:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 62,
    group: 'I',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'SEN',
    awayTeamCode: 'IRQ',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '26/06/2026',
    time: '16:00',
    location: 'BMO Field (Toronto, Canadá)'
  },

  // ==================== GRUPO J ====================
  {
    id: 19,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ARG',
    awayTeamCode: 'ALG',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '16/06/2026',
    time: '22:00',
    location: 'Kansas City, EUA'
  },
  {
    id: 20,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'AUT',
    awayTeamCode: 'JOR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '17/06/2026',
    time: '01:00',
    location: 'Santa Clara, EUA'
  },
  {
    id: 43,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ARG',
    awayTeamCode: 'AUT',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '22/06/2026',
    time: '14:00',
    location: 'Dallas/Arlington, EUA'
  },
  {
    id: 44,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'JOR',
    awayTeamCode: 'ALG',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '23/06/2026',
    time: '00:00',
    location: 'Santa Clara, EUA'
  },
  {
    id: 71,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ALG',
    awayTeamCode: 'AUT',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '23:00',
    location: 'Kansas City, EUA'
  },
  {
    id: 72,
    group: 'J',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'JOR',
    awayTeamCode: 'ARG',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '23:00',
    location: 'Dallas/Arlington, EUA'
  },

  // ==================== GRUPO K ====================
  {
    id: 21,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'POR',
    awayTeamCode: 'COD',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '17/06/2026',
    time: '14:00',
    location: 'Houston, EUA'
  },
  {
    id: 24,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'UZB',
    awayTeamCode: 'COL',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '17/06/2026',
    time: '23:00',
    location: 'Cidade do México, México'
  },
  {
    id: 45,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'POR',
    awayTeamCode: 'UZB',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '23/06/2026',
    time: '14:00',
    location: 'Houston, EUA'
  },
  {
    id: 48,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'COL',
    awayTeamCode: 'COD',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '23/06/2026',
    time: '23:00',
    location: 'Guadalajara/Zapopan, México'
  },
  {
    id: 69,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'COL',
    awayTeamCode: 'POR',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '20:30',
    location: 'Miami, EUA'
  },
  {
    id: 70,
    group: 'K',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'COD',
    awayTeamCode: 'UZB',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '20:30',
    location: 'Atlanta, EUA'
  },

  // ==================== GRUPO L ====================
  {
    id: 22,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ENG',
    awayTeamCode: 'CRO',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '17/06/2026',
    time: '17:00',
    location: 'Dallas/Arlington, EUA'
  },
  {
    id: 23,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'GHA',
    awayTeamCode: 'PAN',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '17/06/2026',
    time: '20:00',
    location: 'Toronto, Canadá'
  },
  {
    id: 46,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'ENG',
    awayTeamCode: 'GHA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '23/06/2026',
    time: '17:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 47,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'PAN',
    awayTeamCode: 'CRO',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '23/06/2026',
    time: '20:00',
    location: 'Boston/Foxborough, EUA'
  },
  {
    id: 67,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'PAN',
    awayTeamCode: 'ENG',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '18:00',
    location: 'Nova York/Nova Jersey, EUA'
  },
  {
    id: 68,
    group: 'L',
    isKnockout: false,
    roundKey: 'groups',
    homeTeamCode: 'CRO',
    awayTeamCode: 'GHA',
    homeScore: null,
    awayScore: null,
    homePenScore: null,
    awayPenScore: null,
    state: 'pending',
    date: '27/06/2026',
    time: '18:00',
    location: 'Filadélfia, EUA'
  }
];

// Knocout brackets placeholder specs from PDF
export const KNOCKOUT_METADATA_TEMPLATES = [
  // ==================== ROUND OF 32 (Fase de 32) ====================
  { id: 73, roundKey: 'R32', date: '28/06/2026', time: '16:00', location: 'Los Angeles, EUA', homeLabel: '2º Grupo A', awayLabel: '2º Grupo B' },
  { id: 74, roundKey: 'R32', date: '29/06/2026', time: '17:30', location: 'Boston/Foxborough, EUA', homeLabel: '1º Grupo E', awayLabel: '3º Grupo A/B/C/D/F' },
  { id: 75, roundKey: 'R32', date: '29/06/2026', time: '22:00', location: 'Guadalajara, México', homeLabel: '1º Grupo F', awayLabel: '2º Grupo C' },
  { id: 76, roundKey: 'R32', date: '29/06/2026', time: '14:00', location: 'Houston, EUA', homeLabel: '1º Grupo C', awayLabel: '2º Grupo F' },
  { id: 77, roundKey: 'R32', date: '30/06/2026', time: '18:00', location: 'Nova York/Nova Jersey, EUA', homeLabel: '1º Grupo I', awayLabel: '3º Grupo C/D/F/G/H' },
  { id: 78, roundKey: 'R32', date: '30/06/2026', time: '14:00', location: 'Dallas/Arlington, EUA', homeLabel: '2º Grupo E', awayLabel: '2º Grupo I' },
  { id: 79, roundKey: 'R32', date: '30/06/2026', time: '22:00', location: 'Cidade do México, México', homeLabel: '1º Grupo A', awayLabel: '3º Grupo C/E/F/H/I' },
  { id: 80, roundKey: 'R32', date: '01/07/2026', time: '13:00', location: 'Atlanta, EUA', homeLabel: '1º Grupo L', awayLabel: '3º Grupo E/H/I/J/K' },
  { id: 81, roundKey: 'R32', date: '01/07/2026', time: '21:00', location: 'Santa Clara, EUA', homeLabel: '1º Grupo D', awayLabel: '3º Grupo B/E/F/I/J' },
  { id: 82, roundKey: 'R32', date: '01/07/2026', time: '17:00', location: 'Seattle, EUA', homeLabel: '1º Grupo G', awayLabel: '3º Grupo A/E/H/I/J' },
  { id: 83, roundKey: 'R32', date: '02/07/2026', time: '20:00', location: 'Toronto, Canadá', homeLabel: '2º Grupo K', awayLabel: '2º Grupo L' },
  { id: 84, roundKey: 'R32', date: '02/07/2026', time: '16:00', location: 'Los Angeles, EUA', homeLabel: '1º Grupo H', awayLabel: '2º Grupo J' },
  { id: 85, roundKey: 'R32', date: '03/07/2026', time: '00:00', location: 'Vancouver, Canadá', homeLabel: '1º Grupo B', awayLabel: '3º Grupo E/F/G/I/J' },
  { id: 86, roundKey: 'R32', date: '03/07/2026', time: '19:00', location: 'Miami, EUA', homeLabel: '1º Grupo J', awayLabel: '2º Grupo H' },
  { id: 87, roundKey: 'R32', date: '03/07/2026', time: '22:30', location: 'Kansas City, EUA', homeLabel: '1º Grupo K', awayLabel: '3º Grupo D/E/I/J/L' },
  { id: 88, roundKey: 'R32', date: '03/07/2026', time: '15:00', location: 'Dallas/Arlington, EUA', homeLabel: '2º Grupo D', awayLabel: '2º Grupo G' },

  // ==================== ROUND OF 16 / OITAVAS ====================
  { id: 89, roundKey: 'R16', date: '04/07/2026', time: '18:00', location: 'Filadélfia, EUA', homeLabel: 'Vencedor Jogo 74', awayLabel: 'Vencedor Jogo 77' },
  { id: 90, roundKey: 'R16', date: '04/07/2026', time: '14:00', location: 'Houston, EUA', homeLabel: 'Vencedor Jogo 73', awayLabel: 'Vencedor Jogo 75' },
  { id: 91, roundKey: 'R16', date: '05/07/2026', time: '17:00', location: 'Nova York/Nova Jersey, EUA', homeLabel: 'Vencedor Jogo 76', awayLabel: 'Vencedor Jogo 78' },
  { id: 92, roundKey: 'R16', date: '05/07/2026', time: '21:00', location: 'Cidade do México, México', homeLabel: 'Vencedor Jogo 79', awayLabel: 'Vencedor Jogo 80' },
  { id: 93, roundKey: 'R16', date: '06/07/2026', time: '16:00', location: 'Dallas/Arlington, EUA', homeLabel: 'Vencedor Jogo 83', awayLabel: 'Vencedor Jogo 84' },
  { id: 94, roundKey: 'R16', date: '06/07/2026', time: '21:00', location: 'Seattle, EUA', homeLabel: 'Vencedor Jogo 81', awayLabel: 'Vencedor Jogo 82' },
  { id: 95, roundKey: 'R16', date: '07/07/2026', time: '13:00', location: 'Atlanta, EUA', homeLabel: 'Vencedor Jogo 86', awayLabel: 'Vencedor Jogo 88' },
  { id: 96, roundKey: 'R16', date: '07/07/2026', time: '17:00', location: 'Vancouver, Canadá', homeLabel: 'Vencedor Jogo 85', awayLabel: 'Vencedor Jogo 87' },

  // ==================== QUARTER-FINALS / QUARTAS ====================
  { id: 97, roundKey: 'QF', date: '09/07/2026', time: '17:00', location: 'Boston/Foxborough, EUA', homeLabel: 'Vencedor Jogo 89', awayLabel: 'Vencedor Jogo 90' },
  { id: 98, roundKey: 'QF', date: '10/07/2026', time: '16:00', location: 'Los Angeles, EUA', homeLabel: 'Vencedor Jogo 93', awayLabel: 'Vencedor Jogo 94' },
  { id: 99, roundKey: 'QF', date: '11/07/2026', time: '18:00', location: 'Miami, EUA', homeLabel: 'Vencedor Jogo 91', awayLabel: 'Vencedor Jogo 92' },
  { id: 100, roundKey: 'QF', date: '11/07/2026', time: '22:00', location: 'Kansas City, EUA', homeLabel: 'Vencedor Jogo 95', awayLabel: 'Vencedor Jogo 96' },

  // ==================== SEMI-FINALS ====================
  { id: 101, roundKey: 'SF', date: '14/07/2026', time: '16:00', location: 'Dallas/Arlington, EUA', homeLabel: 'Vencedor Jogo 97', awayLabel: 'Vencedor Jogo 98' },
  { id: 102, roundKey: 'SF', date: '15/07/2026', time: '16:00', location: 'Atlanta, EUA', homeLabel: 'Vencedor Jogo 99', awayLabel: 'Vencedor Jogo 100' },

  // ==================== THIRD PLACE ====================
  { id: 103, roundKey: 'TP', date: '18/06/2026', time: '18:00', location: 'Miami, EUA', homeLabel: 'Perdedor Jogo 101', awayLabel: 'Perdedor Jogo 102' },

  // ==================== FINAL ====================
  { id: 104, roundKey: 'F', date: '19/07/2026', time: '16:00', location: 'Nova York/Nova Jersey, EUA', homeLabel: 'Vencedor Jogo 101', awayLabel: 'Vencedor Jogo 102' }
];

// Helper to simulate scores realistically based on team rating
export function generateRealisticMatchSimulation(homeRating: number, awayRating: number, isKnockout = false): {
  homeScore: number;
  awayScore: number;
  homePenScore: number | null;
  awayPenScore: number | null;
  possessionHome: number;
  possessionAway: number;
  shotsHome: number;
  shotsAway: number;
  foulsHome: number;
  foulsAway: number;
  cornersHome: number;
  cornersAway: number;
} {
  // Simple weighted probability for goals
  const ratingDiff = homeRating - awayRating;
  
  // Base lambda (expected core goals) is around 1.3 goals for regular match
  const lambdaHome = Math.max(0.4, 1.4 + (ratingDiff / 15));
  const lambdaAway = Math.max(0.4, 1.4 - (ratingDiff / 15));

  // Poisson distribution approximation (limited values)
  const getRandomGoals = (lambda: number) => {
    const L = Math.exp(-lambda);
    let k = 0;
    let p = 1.0;
    do {
      k++;
      p *= Math.random();
    } while (p > L && k < 10);
    return k - 1;
  };

  let homeScore = getRandomGoals(lambdaHome);
  let awayScore = getRandomGoals(lambdaAway);

  // Cap crazy scores to keep it realistic (max 6 goals per team usually)
  if (homeScore > 6) homeScore = 5 + (homeScore % 2);
  if (awayScore > 6) awayScore = 5 + (awayScore % 2);

  let homePenScore: number | null = null;
  let awayPenScore: number | null = null;

  if (isKnockout && homeScore === awayScore) {
    // Simulate penalty shootout
    // Usually 5 penalties, if still tied, sudden death
    let ph = 0;
    let pa = 0;
    do {
      ph = 0;
      pa = 0;
      // First 5 pens simulation
      for (let i = 0; i < 5; i++) {
        if (Math.random() < 0.78) ph++; // 78% success rate in pens
        if (Math.random() < 0.78) pa++;
      }
      // If tied, add sudden death
      if (ph === pa) {
        if (Math.random() < 0.78) ph++;
        if (Math.random() < 0.78) pa++;
      }
    } while (ph === pa); // Keep doing if still draft
    
    homePenScore = ph;
    awayPenScore = pa;
  }

  // Realistic statistics
  // Possession: base 50%, offset by rating differential with some random noise
  const possessionBase = 50 + (ratingDiff * 0.82);
  const possessionHome = Math.min(80, Math.max(20, Math.round(possessionBase + (Math.random() * 10 - 5))));
  const possessionAway = 100 - possessionHome;

  // Shots: aligned with rating and possession
  const shotsHome = Math.max(2, Math.round((possessionHome / 100) * 24 + (Math.random() * 6 - 3)));
  const shotsAway = Math.max(2, Math.round((possessionAway / 100) * 24 + (Math.random() * 6 - 3)));

  // Fouls: randomized
  const foulsHome = Math.max(4, Math.round(11 + (Math.random() * 8 - 4)));
  const foulsAway = Math.max(4, Math.round(11 + (Math.random() * 8 - 4)));

  // Corners: aligned with shots
  const cornersHome = Math.max(0, Math.round((shotsHome * 0.4) + (Math.random() * 4 - 2)));
  const cornersAway = Math.max(0, Math.round((shotsAway * 0.4) + (Math.random() * 4 - 2)));

  return {
    homeScore,
    awayScore,
    homePenScore,
    awayPenScore,
    possessionHome,
    possessionAway,
    shotsHome,
    shotsAway,
    foulsHome,
    foulsAway,
    cornersHome,
    cornersAway
  };
}

// Soccer scorers pool for simulating goalscorers dynamically
export const POPULAR_SCORERS_BY_TEAM: Record<string, string[]> = {
  BRA: ['Vinícius Júnior', 'Neymar Jr', 'Rodrygo', 'Raphinha', 'Endrick', 'Gabriel Martinelli', 'Lucas Paquetá', 'Bruno Guimarães'],
  ARG: ['Lionel Messi', 'Lautaro Martínez', 'Julián Álvarez', 'Alexis Mac Allister', 'Enzo Fernández', 'Angel Di María', 'Rodrigo de Paul'],
  FRA: ['Kylian Mbappé', 'Antoine Griezmann', 'Olivier Giroud', 'Ousmane Dembélé', 'Kingsley Coman', 'Aurélien Tchouaméni', 'Marcus Thuram'],
  ESP: ['Alvaro Morata', 'Dani Olmo', 'Pedri', 'Lamine Yamal', 'Nico Williams', 'Ferran Torres', 'Rodri'],
  ENG: ['Harry Kane', 'Bukayo Saka', 'Jude Bellingham', 'Phil Foden', 'Ollie Watkins', 'Cole Palmer', 'Marcus Rashford', 'Declan Rice'],
  GER: ['Kai Havertz', 'Jamal Musiala', 'Florian Wirtz', 'Niclas Füllkrug', 'Leroy Sané', 'Serge Gnabry', 'İlkay Gündoğan'],
  POR: ['Cristiano Ronaldo', 'Bruno Fernandes', 'Bernardo Silva', 'João Félix', 'Gonçalo Ramos', 'Rafael Leão', 'Diogo Jota'],
  NED: ['Memphis Depay', 'Cody Gakpo', 'Wout Weghorst', 'Donyell Malen', 'Xavi Simons', 'Frenkie de Jong', 'Virgil van Dijk'],
  BEL: ['Romelu Lukaku', 'Kevin De Bruyne', 'Lois Openda', 'Leandro Trossard', 'Jérémy Doku', 'Charles De Ketelaere'],
  URU: ['Darwin Núñez', 'Federico Valverde', 'Luis Suárez', 'Facundo Pellistri', 'Giorgian de Arrascaeta', 'Nicolás de la Cruz'],
  CRO: ['Andrej Kramarić', 'Luka Modrić', 'Ivan Perišić', 'Mario Pašalić', 'Mateo Kovačić', 'Bruno Petković'],
  COL: ['Luis Díaz', 'James Rodríguez', 'Jhon Durán', 'Rafael Borré', 'Jhon Arias', 'Mateus Uribe'],
  MAR: ['Youssef En-Nesyri', 'Hakim Ziyech', 'Sofiane Boufal', 'Achraf Hakimi', 'Amine Harit', 'Azzedine Ounahi'],
  USA: ['Christian Pulisic', 'Folarin Balogun', 'Timothy Weah', 'Weston McKennie', 'Ricardo Pepi', 'Giovanni Reyna'],
  MEX: ['Santiago Giménez', 'Henry Martín', 'Hirving Lozano', 'Uriel Antuna', 'Luis Chávez', 'Edson Álvarez'],
  JPN: ['Kyogo Furuhashi', 'Kaoru Mitoma', 'Takumi Minamino', 'Ritsu Doan', 'Daichi Kamada', 'Takefusa Kubo'],
  SEN: ['Sadio Mané', 'Nicolas Jackson', 'Ismaïla Sarr', 'Habib Diallo', 'Idrissa Gueye', 'Pape Matar Sarr'],
  CIV: ['Sébastien Haller', 'Simon Adingra', 'Franck Kessié', 'Oumar Diakité', 'Nicolas Pépé', 'Ibrahim Sangaré'],
  ECU: ['Enner Valencia', 'Kendry Páez', 'Moises Caicedo', 'Pervis Estupiñán', 'Ángel Mena', 'Jordy Caicedo'],
  SWE: ['Alexander Isak', 'Viktor Gyökeres', 'Dejan Kulusevski', 'Emil Forsberg', 'Anthony Elanga'],
  KOR: ['Son Heung-min', 'Hwang Hee-chan', 'Cho Gue-sung', 'Lee Kang-in', 'Lee Jae-sung'],
  CZE: ['Patrik Schick', 'Tomáš Souček', 'Adam Hložek', 'Jan Kuchta', 'Václav Černý'],
  TUR: ['Cenk Tosun', 'Kerem Aktürkoğlu', 'Arda Güler', 'Hakan Çalhanoğlu', 'Kenan Yıldız', 'Barış Alper Yılmaz'],
  AUS: ['Mitchell Duke', 'Craig Goodwin', 'Jackson Irvine', 'Harry Souttar', 'Brandon Borrello'],
  CAN: ['Jonathan David', 'Alphonso Davies', 'Cyle Larin', 'Tajon Buchanan', 'Ismaël Koné'],
  NOR: ['Erling Haaland', 'Martin Ødegaard', 'Alexander Sørloth', 'Jørgen Strand Larsen', 'Antonio Nusa'],
  AUT: ['Michael Gregoritsch', 'Marcel Sabitzer', 'Christoph Baumgartner', 'Konrad Laimer', 'Marko Arnautović'],
  PAR: ['Miguel Almirón', 'Antonio Sanabria', 'Julio Enciso', 'Ramón Sosa', 'Gabriel Ávalos'],
  ALG: ['Riyad Mahrez', 'Amine Gouiri', 'Baghdad Bounedjah', 'Houssem Aouar', 'Sofiane Feghouli'],
  EGY: ['Mohamed Salah', 'Mostafa Mohamed', 'Trézéguet', 'Omar Marmoush', 'Mohamed Elneny'],
  BIH: ['Edin Džeko', 'Ermedin Demirović', 'Miralem Pjanić', 'Luka Menalo'],
  IRQ: ['Aymen Hussein', 'Mohanad Ali', 'Ali Al-Hammadi', 'Ibrahim Bayesh'],
  CPV: ['Ryan Mendes', 'Garry Rodrigues', 'Bebé', 'Jovane Cabral'],
  KSA: ['Salem Al-Dawsari', 'Firas Al-Buraikan', 'Saleh Al-Shehri', 'Abdulrahman Ghareeb'],
  GHA: ['Inaki Williams', 'Mohammed Kudus', 'Jordan Ayew', 'Antoine Semenyo', 'Ernest Nuamah'],
  TUN: ['Youssef Msakni', 'Elyes Skhiri', 'Anis Slimane', 'Wahbi Khazri'],
  COD: ['Yoane Wissa', 'Cédric Bakambu', 'Meschack Elia', 'Samuel Moutoussamy'],
  PAN: ['Ismael Díaz', 'José Fajardo', 'Cecilio Waterman', 'Adalberto Carrasquilla'],
  UZB: ['Eldor Shomurodov', 'Abbosbek Fayzullaev', 'Oston Urunov', 'Igor Sergeev'],
  QAT: ['Akram Afif', 'Almoez Ali', 'Hassan Al-Haydos'],
  RSA: ['Percy Tau', 'Themba Zwane', 'Teboho Mokoena', 'Evidence Makgopa'],
  NZL: ['Chris Wood', 'Ben Waine', 'Elijah Just', 'Marko Stamenic'],
  JOR: ['Musa Al-Taamari', 'Yazan Al-Naimat', 'Ali Olwan'],
  HAI: ['Frantzdy Pierrot', 'Duckens Nazon', 'Carnejy Antoine'],
  CUW: ['Rangelo Janga', 'Juninho Bacuna', 'Leandro Bacuna'],
  SCO: ['John McGinn', 'Scott McTominay', 'Che Adams', 'Lawrence Shankland', 'Lyndon Dykes']
};

export function simulateGoalScorers(teamCode: string, goals: number): string[] {
  if (goals <= 0) return [];
  const pool = POPULAR_SCORERS_BY_TEAM[teamCode] || ['Atleta ' + teamCode];
  const scorers: string[] = [];
  for (let i = 0; i < goals; i++) {
    const scorer = pool[Math.floor(Math.random() * pool.length)];
    const minute = Math.floor(Math.random() * 90) + 1;
    scorers.push(`${scorer} (${minute}')`);
  }
  // Sort scorers by minute
  return scorers.sort((a, b) => {
    const minA = parseInt(a.match(/\d+/)?.at(0) || '0');
    const minB = parseInt(b.match(/\d+/)?.at(0) || '0');
    return minA - minB;
  });
}

const FLAG_MAP: Record<string, string> = {
  MEX: 'mx',
  RSA: 'za',
  KOR: 'kr',
  CZE: 'cz',
  CAN: 'ca',
  BIH: 'ba',
  QAT: 'qa',
  SUI: 'ch',
  BRA: 'br',
  MAR: 'ma',
  HAI: 'ht',
  SCO: 'gb-sct',
  USA: 'us',
  PAR: 'py',
  AUS: 'au',
  TUR: 'tr',
  GER: 'de',
  CUW: 'cw',
  CIV: 'ci',
  ECU: 'ec',
  NED: 'nl',
  JPN: 'jp',
  SWE: 'se',
  TUN: 'tn',
  BEL: 'be',
  EGY: 'eg',
  IRN: 'ir',
  NZL: 'nz',
  ESP: 'es',
  CPV: 'cv',
  KSA: 'sa',
  URU: 'uy',
  FRA: 'fr',
  SEN: 'sn',
  IRQ: 'iq',
  NOR: 'no',
  ARG: 'ar',
  ALG: 'dz',
  AUT: 'at',
  JOR: 'jo',
  POR: 'pt',
  COD: 'cd',
  UZB: 'uz',
  COL: 'co',
  ENG: 'gb-eng',
  CRO: 'hr',
  GHA: 'gh',
  PAN: 'pa'
};

export function getTeamFlagUrl(teamCode: string | null | undefined): string {
  if (!teamCode) return '';
  const code = FLAG_MAP[teamCode.toUpperCase()];
  if (!code) return '';
  return `https://flagcdn.com/w40/${code}.png`;
}

