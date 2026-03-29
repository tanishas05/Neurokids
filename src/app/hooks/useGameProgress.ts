import { useState, useCallback } from "react";

export interface GameSession {
  gameId: string;
  score: number;
  total: number;
  completedAt: Date;
}

export function useGameProgress() {
  const [sessions, setSessions] = useState<GameSession[]>([]);

  const recordSession = useCallback(
    (gameId: string, score: number, total: number) => {
      setSessions((prev) => [
        ...prev,
        { gameId, score, total, completedAt: new Date() },
      ]);

      // Emit a custom event so the Parent Dashboard can listen
      const event = new CustomEvent("neurokids:gameComplete", {
        detail: { gameId, score, total, completedAt: new Date().toISOString() },
      });
      window.dispatchEvent(event);
    },
    []
  );

  const getTotalScore = useCallback(() => {
    return sessions.reduce((sum, s) => sum + s.score, 0);
  }, [sessions]);

  const getSessionsForGame = useCallback(
    (gameId: string) => {
      return sessions.filter((s) => s.gameId === gameId);
    },
    [sessions]
  );

  return { sessions, recordSession, getTotalScore, getSessionsForGame };
}