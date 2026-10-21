export type RoleId =
  | 'CIVIL'
  | 'UNDERCOVER'
  | 'MR_WHITE'
  | 'MR_GREEN'
  | 'ANGE'
  | 'VOLEUR'
  | 'CHASSEUR'
  | 'VOYANTE';

export type VoleurSide = 'Civil' | 'Undercover';

export interface WordPair {
  civil: string;
  undercover: string;
  theme: string;
}

export interface WordCategory {
  id: string;
  emoji: string;
  words: WordPair[];
}

export interface Player {
  id: number;
  name: string;
  originalRole: RoleId;
  currentRole: RoleId;
  word: string;
  theme: string;
  isAlive: boolean;
  diedAtRound: number | null;
  hasPlayedSpecial: boolean;
  voleurSide: VoleurSide | null;
  voyanteTarget: number | null;
}

export interface RoleConfig {
  undercoverCount: number;
  mrWhite: boolean;
  mrGreen: boolean;
  ange: boolean;
  voleur: boolean;
  chasseur: boolean;
  voyante: boolean;
}

export interface SetupConfig {
  playerNames: string[];
  roleConfig: RoleConfig;
  categoryIds: string[];
  blindMode: boolean;
}

export type GamePhase = 'setup' | 'reveal' | 'play' | 'gameover';

export interface GameResult {
  over: true;
  winners: string[];
  winningIds: number[];
  message: string;
}

export type LangCode = 'fr' | 'en' | 'es' | 'de' | 'it' | 'pt';

export interface PurchaseState {
  hasLifetime: boolean;
  partyPassUntil: number | null;
}

export const ROLES: Record<RoleId, RoleId> = {
  CIVIL: 'CIVIL',
  UNDERCOVER: 'UNDERCOVER',
  MR_WHITE: 'MR_WHITE',
  MR_GREEN: 'MR_GREEN',
  ANGE: 'ANGE',
  VOLEUR: 'VOLEUR',
  CHASSEUR: 'CHASSEUR',
  VOYANTE: 'VOYANTE',
};
