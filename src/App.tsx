import { useState, useEffect, useCallback, useRef } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Setup } from '@/components/Setup';
import { RevealRole } from '@/components/RevealRole';
import { GameTurn } from '@/components/GameTurn';
import { GameOver } from '@/components/GameOver';
import { Rules } from '@/components/Rules';
import { PremiumModal } from '@/components/PremiumModal';
import type {
  GamePhase,
  GameResult,
  LangCode,
  Player,
  SetupConfig,
  WordPair,
} from '@/game/types';
import { getTranslation } from '@/game/i18n';
import { buildPool } from '@/game/words';
import {
  generatePlayers,
  pickFirstPlayer,
  pickNextWordPair,
  checkWinCondition,
  makeUsedKey,
} from '@/game/gameLogic';
import {
  getDeviceId,
  fetchPurchases,
  computePremiumState,
  isPremiumActive,
  type PremiumState,
  type PurchaseType,
} from '@/lib/supabase';

const LANG_KEY = 'undercover_lang';

export default function App() {
  const [lang, setLang] = useState<LangCode>(() => {
    const stored = localStorage.getItem(LANG_KEY) as LangCode | null;
    return stored || 'fr';
  });
  const t = getTranslation(lang);

  const [phase, setPhase] = useState<GamePhase>('setup');
  const [players, setPlayers] = useState<Player[]>([]);
  const [showRules, setShowRules] = useState(false);
  const [showPremium, setShowPremium] = useState(false);
  const [wordPair, setWordPair] = useState<WordPair | null>(null);
  const [round, setRound] = useState(1);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [setupConfig, setSetupConfig] = useState<SetupConfig | null>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [firstPlayerId, setFirstPlayerId] = useState(0);

  const [premiumState, setPremiumState] = useState<PremiumState>({
    hasLifetime: false,
    partyPassUntil: null,
  });
  const [premiumLoading, setPremiumLoading] = useState(true);
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  const usedKeysRef = useRef<Set<string>>(new Set());

  const isPremium = isPremiumActive(premiumState);

  const loadPurchases = useCallback(async () => {
    setPremiumLoading(true);
    const deviceId = getDeviceId();
    const purchases = await fetchPurchases(deviceId);
    setPremiumState(computePremiumState(purchases));
    setPremiumLoading(false);
  }, []);

  useEffect(() => {
    loadPurchases();
  }, [loadPurchases]);

  const handleLanguageChange = (newLang: LangCode) => {
    setLang(newLang);
    localStorage.setItem(LANG_KEY, newLang);
  };

  const startGame = (config: SetupConfig) => {
    setSetupConfig(config);
    const pool = buildPool(lang, config.categoryIds, isPremium);
    if (pool.length === 0) return;

    usedKeysRef.current = new Set();
    const pair = pickNextWordPair(pool, usedKeysRef.current);
    if (!pair) return;

    usedKeysRef.current.add(makeUsedKey(pair));
    const generated = generatePlayers(config.playerNames, config.roleConfig, pair);
    const firstId = pickFirstPlayer(generated);

    const currentScores = { ...scores };
    config.playerNames.forEach((name) => {
      if (currentScores[name] === undefined) currentScores[name] = 0;
    });
    setScores(currentScores);

    setWordPair(pair);
    setPlayers(generated);
    setFirstPlayerId(firstId);
    setPhase('reveal');
    setRound(1);
    setGameResult(null);
  };

  const updatePlayer = (id: number, updates: Partial<Player>) => {
    setPlayers((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const handleRevealComplete = () => setPhase('play');

  const processWin = (result: GameResult, finalPlayers: Player[]) => {
    const newScores = { ...scores };
    if (result.winningIds) {
      result.winningIds.forEach((id) => {
        const p = finalPlayers.find((player) => player.id === id);
        if (p) {
          newScores[p.name] = (newScores[p.name] || 0) + 2;
        }
      });
    }
    setScores(newScores);
    setGameResult(result);
    setPhase('gameover');
  };

  const handleEliminate = (playerIds: number | number[], currentRound: number) => {
    const idsToKill = Array.isArray(playerIds) ? playerIds : [playerIds];
    const updatedPlayers = players.map((p) =>
      idsToKill.includes(p.id) ? { ...p, isAlive: false, diedAtRound: currentRound } : p
    );
    setPlayers(updatedPlayers);

    const result = checkWinCondition(updatedPlayers, currentRound);
    if (result.over) {
      processWin(result, updatedPlayers);
    } else {
      if (setupConfig) {
        const pool = buildPool(lang, setupConfig.categoryIds, isPremium);
        if (pool.length > 0 && wordPair) {
          const nextPair = pickNextWordPair(pool, usedKeysRef.current);
          if (nextPair) {
            usedKeysRef.current.add(makeUsedKey(nextPair));
            setWordPair(nextPair);
          }
        }
      }
      setRound(currentRound + 1);
    }
  };

  const handleMrWin = (result: GameResult) => processWin(result, players);

  const handleRestart = (mode: 'same_all' | 'same_players' | 'full_reset') => {
    if (mode === 'same_all' && setupConfig) {
      startGame(setupConfig);
    } else if (mode === 'same_players') {
      setPhase('setup');
      setPlayers([]);
      setWordPair(null);
      setGameResult(null);
    } else {
      setSetupConfig(null);
      setPhase('setup');
      setPlayers([]);
      setWordPair(null);
      setGameResult(null);
      setScores({});
    }
  };

  const handleBuy = async (type: PurchaseType) => {
    setPurchaseLoading(true);
    try {
      const deviceId = getDeviceId();
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          purchaseType: type,
          deviceId,
          lang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Checkout failed (${response.status})`);
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Purchase error:', err);
      setPurchaseLoading(false);
    }
  };

  const handleRestore = async () => {
    setPurchaseLoading(true);
    await loadPurchases();
    setPurchaseLoading(false);
    setShowPremium(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      loadPurchases();
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [loadPurchases]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Header
        onShowRules={() => setShowRules(true)}
        onShowPremium={() => setShowPremium(true)}
        onLanguageChange={handleLanguageChange}
        currentLang={lang}
        t={t}
        isPremium={isPremium}
      />

      <main className="flex-1 py-4 flex flex-col justify-center">
        {phase === 'setup' && (
          <Setup
            onStart={startGame}
            initialConfig={setupConfig}
            t={t}
            lang={lang}
            isPremium={isPremium}
            onUpgradeClick={() => setShowPremium(true)}
          />
        )}
        {phase === 'reveal' && wordPair && (
          <RevealRole
            players={players}
            wordPair={wordPair}
            onRevealComplete={handleRevealComplete}
            updatePlayer={updatePlayer}
            blindMode={setupConfig?.blindMode || false}
            t={t}
          />
        )}
        {phase === 'play' && wordPair && (
          <GameTurn
            players={players}
            round={round}
            onEliminate={handleEliminate}
            wordPair={wordPair}
            onGameOver={handleMrWin}
            firstPlayerId={firstPlayerId}
            t={t}
          />
        )}
        {phase === 'gameover' && gameResult && wordPair && (
          <GameOver
            result={gameResult}
            players={players}
            wordPair={wordPair}
            onRestart={handleRestart}
            scores={scores}
            t={t}
          />
        )}
      </main>

      {(phase === 'setup' || phase === 'gameover') && <Footer t={t} />}

      {showRules && <Rules onClose={() => setShowRules(false)} t={t} />}
      {showPremium && (
        <PremiumModal
          onClose={() => setShowPremium(false)}
          onBuy={handleBuy}
          onRestore={handleRestore}
          t={t}
          premiumState={premiumState}
          loading={purchaseLoading || premiumLoading}
        />
      )}
    </div>
  );
}
