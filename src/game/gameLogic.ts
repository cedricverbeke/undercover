import type {
  Player,
  RoleConfig,
  RoleId,
  WordPair,
  GameResult,
} from './types';

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function generatePlayers(
  playerNames: string[],
  roleConfig: RoleConfig,
  wordPair: WordPair
): Player[] {
  const pool: RoleId[] = [];

  if (roleConfig.mrWhite) pool.push('MR_WHITE');
  if (roleConfig.mrGreen) pool.push('MR_GREEN');
  if (roleConfig.ange) pool.push('ANGE');
  if (roleConfig.voleur) pool.push('VOLEUR');
  if (roleConfig.chasseur) pool.push('CHASSEUR');
  if (roleConfig.voyante) pool.push('VOYANTE');

  for (let i = 0; i < roleConfig.undercoverCount; i++) {
    pool.push('UNDERCOVER');
  }

  while (pool.length < playerNames.length) {
    pool.push('CIVIL');
  }

  const shuffledPool = shuffle(pool);

  return playerNames.map((name, index) => {
    const role = shuffledPool[index];
    let word = '';
    let theme = '';

    switch (role) {
      case 'CIVIL':
      case 'VOYANTE':
      case 'CHASSEUR':
      case 'ANGE':
        word = wordPair.civil;
        break;
      case 'UNDERCOVER':
        word = wordPair.undercover;
        break;
      case 'VOLEUR':
        break;
      case 'MR_GREEN':
        theme = wordPair.theme;
        break;
      case 'MR_WHITE':
        break;
    }

    return {
      id: index,
      name,
      originalRole: role,
      currentRole: role,
      word,
      theme,
      isAlive: true,
      diedAtRound: null,
      hasPlayedSpecial: false,
      voleurSide: null,
      voyanteTarget: null,
    };
  });
}

export function pickFirstPlayer(players: Player[]): number {
  const valid = players.filter(
    (p) => p.originalRole !== 'MR_WHITE' && p.originalRole !== 'MR_GREEN'
  );
  const source = valid.length > 0 ? valid : players;
  return source[Math.floor(Math.random() * source.length)].id;
}

function isCivilSide(p: Player): boolean {
  if (p.currentRole === 'UNDERCOVER') return false;
  if (p.currentRole === 'VOLEUR' && p.voleurSide === 'Undercover') return false;
  return true;
}

function isUndercoverSide(p: Player): boolean {
  if (p.currentRole === 'UNDERCOVER') return true;
  if (p.currentRole === 'VOLEUR' && p.voleurSide === 'Undercover') return true;
  return false;
}

export function checkWinCondition(
  players: Player[],
  roundNumber: number
): GameResult | { over: false } {
  const alive = players.filter((p) => p.isAlive);
  const deadThisRound = players.filter(
    (p) => !p.isAlive && p.diedAtRound === roundNumber
  );

  const ange = deadThisRound.find((p) => p.currentRole === 'ANGE');
  if (ange && roundNumber === 1) {
    return {
      over: true,
      winners: ['ANGE'],
      winningIds: [ange.id],
      message: '',
    };
  }

  const civilsAlive = alive.filter(isCivilSide).length;
  const undercoverAlive = alive.filter(isUndercoverSide).length;

  if (undercoverAlive === 0) {
    const civilIds = players.filter(isCivilSide).map((p) => p.id);
    return {
      over: true,
      winners: ['CIVIL'],
      winningIds: civilIds,
      message: '',
    };
  }

  if (undercoverAlive >= civilsAlive) {
    const undercoverIds = players.filter(isUndercoverSide).map((p) => p.id);
    return {
      over: true,
      winners: ['UNDERCOVER'],
      winningIds: undercoverIds,
      message: '',
    };
  }

  return { over: false };
}

export function pickUniqueWordPairs(
  pool: WordPair[],
  count: number
): WordPair[] {
  const shuffled = shuffle(pool);
  const seen = new Set<string>();
  const result: WordPair[] = [];

  for (const pair of shuffled) {
    if (result.length >= count) break;
    const key = [pair.civil, pair.undercover].sort().join('|').toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      result.push(pair);
    }
  }

  return result;
}

export function pickNextWordPair(
  pool: WordPair[],
  usedKeys: Set<string>
): WordPair | null {
  const available = pool.filter((pair) => {
    const key = [pair.civil, pair.undercover].sort().join('|').toLowerCase();
    return !usedKeys.has(key);
  });

  if (available.length === 0) {
    if (pool.length === 0) return null;
    return pool[Math.floor(Math.random() * pool.length)];
  }

  return available[Math.floor(Math.random() * available.length)];
}

export function makeUsedKey(pair: WordPair): string {
  return [pair.civil, pair.undercover].sort().join('|').toLowerCase();
}
