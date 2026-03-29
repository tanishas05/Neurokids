import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { useNavigate } from "react-router";
import { WordMatchGame } from "@/components/learning/WordMatchGame";
import { LetterSoundGame } from "@/components/learning/LetterSoundGame";
import { SyllableGame } from "@/components/learning/SyllableGame";
import { GameCard } from "@/components/learning/GameCard";
import { ScoreBadge } from "@/components/learning/ScoreBadge";
import { useGameProgress } from "@/hooks/useGameProgress";

type GameId = "word-match" | "letter-sound" | "syllable";

const GAMES: {
  id: GameId;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
}[] = [
  {
    id: "word-match",
    title: "Word Match",
    description: "Match words to pictures",
    emoji: "🃏",
    color: "#6366f1",
    bgColor: "#eef2ff",
  },
  {
    id: "letter-sound",
    title: "Letter Sounds",
    description: "Which word starts with this letter?",
    emoji: "🔤",
    color: "#ec4899",
    bgColor: "#fdf2f8",
  },
  {
    id: "syllable",
    title: "Syllable Tap",
    description: "Tap out the syllables",
    emoji: "👋",
    color: "#f59e0b",
    bgColor: "#fffbeb",
  },
];

export default function DyslexiaGamesPage() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState<GameId>("word-match");
  const { sessions, recordSession } = useGameProgress();

  const activeGameMeta = GAMES.find((g) => g.id === activeGame)!;

  const lastSession = [...sessions]
    .reverse()
    .find((s) => s.gameId === activeGame);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-white/90 backdrop-blur-sm border-b border-gray-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Gamepad2 size={18} className="text-pink-500" />
          <h1 className="text-base font-bold text-gray-800">Dyslexia Games</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-5">
        {/* Intro */}
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-800">
            Reading Games 📚
          </h2>
          <p className="text-sm text-gray-500 mt-0.5">
            Fun ways to practise reading, letters, and sounds!
          </p>
        </div>

        {/* Game tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1 no-scrollbar">
          {GAMES.map((game) => {
            const isActive = activeGame === game.id;
            return (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: isActive ? game.color : "#e5e7eb",
                  backgroundColor: isActive ? game.bgColor : "#ffffff",
                  color: isActive ? game.color : "#6b7280",
                }}
              >
                <span>{game.emoji}</span>
                {game.title}
              </button>
            );
          })}
        </div>

        {/* Last score badge */}
        {lastSession && (
          <div className="mb-4">
            <ScoreBadge
              score={lastSession.score}
              total={lastSession.total}
              gameLabel={`Last ${activeGameMeta.title} session`}
            />
          </div>
        )}

        {/* Active game */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <GameCard
              title={activeGameMeta.title}
              description={activeGameMeta.description}
              emoji={activeGameMeta.emoji}
              color={activeGameMeta.color}
              bgColor={activeGameMeta.bgColor}
            >
              {activeGame === "word-match" && (
                <WordMatchGame
                  onSessionComplete={(score, total) =>
                    recordSession("word-match", score, total)
                  }
                />
              )}
              {activeGame === "letter-sound" && (
                <LetterSoundGame
                  onSessionComplete={(score, total) =>
                    recordSession("letter-sound", score, total)
                  }
                />
              )}
              {activeGame === "syllable" && (
                <SyllableGame
                  onSessionComplete={(score, total) =>
                    recordSession("syllable", score, total)
                  }
                />
              )}
            </GameCard>
          </motion.div>
        </AnimatePresence>

        {/* All sessions mini log */}
        {sessions.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-3">
              Today's sessions
            </h3>
            <div className="flex flex-col gap-2">
              {[...sessions]
                .reverse()
                .slice(0, 5)
                .map((s, i) => {
                  const game = GAMES.find((g) => g.id === s.gameId);
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-gray-100 shadow-xs"
                    >
                      <span className="text-xl">{game?.emoji ?? "🎮"}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {game?.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {s.score}/{s.total} ·{" "}
                          {s.completedAt.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3].map((star) => {
                          const pct =
                            s.total > 0 ? (s.score / s.total) * 100 : 0;
                          const stars =
                            pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;
                          return (
                            <span
                              key={star}
                              className="text-xs"
                              style={{ opacity: star <= stars ? 1 : 0.2 }}
                            >
                              ⭐
                            </span>
                          );
                        })}
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}