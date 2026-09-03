"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  COINS_PER_STAR,
  badges,
  certificates,
  getLevelProgress,
  initialPlayerState,
} from "./config";
import { loadPlayerState, savePlayerState, clearPlayerState } from "./storage";
import { recordStreak } from "./streak";
import { createCertificateAward } from "./certificate";
import type {
  LessonReward,
  PlayerState,
  RewardToastItem,
} from "./types";

type GameContextValue = {
  player: PlayerState;
  /** False during the first client render, before localStorage is read. */
  isLoaded: boolean;
  level: ReturnType<typeof getLevelProgress>;
  toasts: RewardToastItem[];
  dismissToast: (id: string) => void;
  awardXp: (amount: number, reason?: string) => void;
  awardCoins: (amount: number, reason?: string) => void;
  completeLesson: (lessonId: string, reward: LessonReward) => void;
  /** Records a finished world: XP, stars, coins and quiz accuracy in one write. */
  completeWorld: (input: {
    worldId: number;
    xp: number;
    stars: number;
    correct: number;
    total: number;
    badgeLabel: string;
  }) => void;
  setProfile: (profile: { name?: string; avatarEmoji?: string }) => void;
  resetProgress: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

let toastCounter = 0;

/** Holds the player's XP, coins, badges, streak and certificates. */
export function GameProvider({ children }: { children: ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(initialPlayerState);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toasts, setToasts] = useState<RewardToastItem[]>([]);

  const pushToast = useCallback(
    (kind: RewardToastItem["kind"], label: string) => {
      toastCounter += 1;
      const id = `toast-${toastCounter}`;
      setToasts((current) => [...current, { id, kind, label }]);
    },
    [],
  );

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  // Hydrate from localStorage and record today's visit for the streak.
  useEffect(() => {
    const saved = loadPlayerState();
    const { streak, changed } = recordStreak(saved.streak);

    setPlayer({ ...saved, streak });
    setIsLoaded(true);

    if (changed && streak.count > 1) {
      pushToast("streak", `${streak.count}-day streak!`);
    }
  }, [pushToast]);

  useEffect(() => {
    if (isLoaded) savePlayerState(player);
  }, [player, isLoaded]);

  // Unlock any badges and certificates the player now qualifies for.
  useEffect(() => {
    if (!isLoaded) return;

    const newBadges = badges.filter(
      (badge) => !player.badgeIds.includes(badge.id) && badge.isEarned(player),
    );
    const newCertificates = certificates.filter(
      (certificate) =>
        !player.certificateIds.includes(certificate.id) &&
        certificate.isEarned(player),
    );
    const certificatesMissingAwards = certificates.filter(
      (certificate) =>
        (player.certificateIds.includes(certificate.id) ||
          newCertificates.some((item) => item.id === certificate.id)) &&
        !player.certificateAwards[certificate.id],
    );

    if (
      newBadges.length === 0 &&
      newCertificates.length === 0 &&
      certificatesMissingAwards.length === 0
    ) {
      return;
    }

    setPlayer((current) => {
      const certificateAwards = { ...current.certificateAwards };
      certificatesMissingAwards.forEach((certificate) => {
        certificateAwards[certificate.id] = createCertificateAward(certificate.id);
      });

      return {
        ...current,
        badgeIds: [...current.badgeIds, ...newBadges.map((badge) => badge.id)],
        certificateIds: [
          ...current.certificateIds,
          ...newCertificates.map((certificate) => certificate.id),
        ],
        certificateAwards,
      };
    });

    newBadges.forEach((badge) =>
      pushToast("badge", `${badge.emoji} ${badge.name} unlocked!`),
    );
    newCertificates.forEach((certificate) =>
      pushToast("certificate", `${certificate.title} awarded!`),
    );
  }, [player, isLoaded, pushToast]);

  const awardXp = useCallback(
    (amount: number, reason?: string) => {
      if (amount <= 0) return;
      setPlayer((current) => ({ ...current, xp: current.xp + amount }));
      pushToast("xp", reason ?? `+${amount} XP`);
    },
    [pushToast],
  );

  const awardCoins = useCallback(
    (amount: number, reason?: string) => {
      if (amount <= 0) return;
      setPlayer((current) => ({ ...current, coins: current.coins + amount }));
      pushToast("coins", reason ?? `+${amount} coins`);
    },
    [pushToast],
  );

  const completeLesson = useCallback(
    (lessonId: string, reward: LessonReward) => {
      const coins = reward.coins + reward.stars * COINS_PER_STAR;

      setPlayer((current) => {
        const alreadyDone = current.completedLessonIds.includes(lessonId);

        return {
          ...current,
          // Replaying a lesson still counts for stats, but XP is only paid once.
          xp: alreadyDone ? current.xp : current.xp + reward.xp,
          coins: current.coins + coins,
          completedLessonIds: alreadyDone
            ? current.completedLessonIds
            : [...current.completedLessonIds, lessonId],
          stats: {
            quizzesTaken: current.stats.quizzesTaken + 1,
            perfectQuizzes:
              current.stats.perfectQuizzes + (reward.stars === 3 ? 1 : 0),
            starsEarned: current.stats.starsEarned + reward.stars,
          },
        };
      });

      pushToast("xp", `+${reward.xp} XP`);
      pushToast("coins", `+${coins} coins`);
    },
    [pushToast],
  );

  const completeWorld = useCallback(
    ({
      worldId,
      xp,
      stars,
      correct,
      total,
      badgeLabel,
    }: {
      worldId: number;
      xp: number;
      stars: number;
      correct: number;
      total: number;
      badgeLabel: string;
    }) => {
      const coins = stars * COINS_PER_STAR;

      setPlayer((current) => {
        if (current.completedWorldIds.includes(worldId)) return current;

        return {
          ...current,
          xp: current.xp + xp,
          coins: current.coins + coins,
          completedWorldIds: [...current.completedWorldIds, worldId],
          quizScores: { ...current.quizScores, [`world-${worldId}`]: { correct, total } },
          stats: {
            quizzesTaken: current.stats.quizzesTaken + 1,
            perfectQuizzes:
              current.stats.perfectQuizzes + (total > 0 && correct === total ? 1 : 0),
            starsEarned: current.stats.starsEarned + stars,
          },
        };
      });

      pushToast("xp", `+${xp} XP`);
      pushToast("badge", `${badgeLabel} earned!`);
    },
    [pushToast],
  );

  const setProfile = useCallback(
    (profile: { name?: string; avatarEmoji?: string }) => {
      setPlayer((current) => ({ ...current, ...profile }));
    },
    [],
  );
  const resetProgress = useCallback(() => {
    clearPlayerState();
    setPlayer(initialPlayerState);
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({
      player,
      isLoaded,
      level: getLevelProgress(player.xp),
      toasts,
      dismissToast,
      awardXp,
      awardCoins,
      completeLesson,
      completeWorld,
      setProfile,
      resetProgress,
    }),
    [
      player,
      isLoaded,
      toasts,
      dismissToast,
      awardXp,
      awardCoins,
      completeLesson,
      completeWorld,
      setProfile,
      resetProgress,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used inside a <GameProvider>.");
  }
  return context;
}
