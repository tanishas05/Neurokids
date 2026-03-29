import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RotateCcw, ChevronRight } from "lucide-react";
import gamesData from "@/data/dyslexiaGamesData.json";

interface WordMatchGameProps {
  onSessionComplete: (score: number, total: number) => void;
}

type CardType = { id: string; type: "word" | "image"; value: string; pairId: string };

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function WordMatchGame({ onSessionComplete }: WordMatchGameProps) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [cards, setCards] = useState<CardType[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const level = gamesData.wordMatchGame.levels[levelIndex];

  const buildCards = useCallback((lvl: typeof level) => {
    const wordCards: CardType[] = lvl.pairs.map((p) => ({
      id: `word-${p.word}`,
      type: "word",
      value: p.word,
      pairId: p.word,
    }));
    const imageCards: CardType[] = lvl.pairs.map((p) => ({
      id: `img-${p.word}`,
      type: "image",
      value: p.image,
      pairId: p.word,
    }));
    return shuffle([...wordCards, ...imageCards]);
  }, []);

  useEffect(() => {
    setCards(buildCards(level));
    setSelected([]);
    setMatched([]);
    setWrong([]);
    setScore(0);
    setDone(false);
    setAttempts(0);
  }, [levelIndex, level, buildCards]);

  function handleCardClick(id: string) {
    if (matched.includes(id) || selected.includes(id) || wrong.length > 0) return;

    const newSelected = [...selected, id];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      setAttempts((a) => a + 1);
      const [a, b] = newSelected.map((sid) => cards.find((c) => c.id === sid)!);
      if (a.pairId === b.pairId && a.type !== b.type) {
        // Match!
        const newMatched = [...matched, a.id, b.id];
        setMatched(newMatched);
        setSelected([]);
        setScore((s) => s + 1);
        if (newMatched.length === cards.length) {
          setTimeout(() => {
            setDone(true);
            onSessionComplete(score + 1, level.pairs.length);
          }, 400);
        }
      } else {
        setWrong(newSelected);
        setTimeout(() => {
          setWrong([]);
          setSelected([]);
        }, 800);
      }
    }
  }

  function nextLevel() {
    if (levelIndex < gamesData.wordMatchGame.levels.length - 1) {
      setLevelIndex((i) => i + 1);
    }
  }

  function restart() {
    setCards(buildCards(level));
    setSelected([]);
    setMatched([]);
    setWrong([]);
    setScore(0);
    setDone(false);
    setAttempts(0);
  }

  const getCardState = (id: string) => {
    if (matched.includes(id)) return "matched";
    if (wrong.includes(id)) return "wrong";
    if (selected.includes(id)) return "selected";
    return "idle";
  };

  const cardStateStyles: Record<string, string> = {
    matched: "border-green-400 bg-green-50 scale-95",
    wrong: "border-red-400 bg-red-50",
    selected: "border-indigo-500 bg-indigo-50 shadow-md",
    idle: "border-gray-200 bg-white hover:border-indigo-300 hover:shadow-sm cursor-pointer",
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500">
            {level.label}
          </span>
          <div className="flex gap-1">
            {gamesData.wordMatchGame.levels.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-colors"
                style={{
                  backgroundColor: i <= levelIndex ? "#6366f1" : "#e5e7eb",
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-indigo-600">
            {score} / {level.pairs.length} matched
          </span>
          <button
            onClick={restart}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Restart"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        Tap a word, then tap its matching picture! 🎯
      </p>

      {/* Card grid */}
      <div className="grid grid-cols-4 gap-2">
        {cards.map((card) => {
          const state = getCardState(card.id);
          return (
            <motion.button
              key={card.id}
              layout
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(card.id)}
              disabled={state === "matched"}
              className={`rounded-xl border-2 p-3 flex flex-col items-center justify-center min-h-[72px] transition-all duration-150 select-none ${cardStateStyles[state]}`}
            >
              {card.type === "image" ? (
                <span className="text-3xl">{card.value}</span>
              ) : (
                <span
                  className="text-sm font-bold text-center"
                  style={{
                    fontFamily:
                      "'Trebuchet MS', Arial, sans-serif",
                    letterSpacing: "0.03em",
                    color:
                      state === "matched"
                        ? "#16a34a"
                        : state === "wrong"
                        ? "#dc2626"
                        : state === "selected"
                        ? "#4338ca"
                        : "#374151",
                  }}
                >
                  {card.value}
                </span>
              )}
              {state === "matched" && (
                <span className="text-xs text-green-500 mt-1">✓</span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Done state */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 p-5 text-center"
          >
            <Trophy className="mx-auto mb-2 text-yellow-500" size={32} />
            <h4 className="text-lg font-bold text-gray-800 mb-1">
              Level complete! 🎉
            </h4>
            <p className="text-sm text-gray-500 mb-1">
              You matched all {score} pairs in {attempts} attempts.
            </p>
            {levelIndex < gamesData.wordMatchGame.levels.length - 1 ? (
              <button
                onClick={nextLevel}
                className="mt-3 flex items-center gap-1 mx-auto px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Next Level <ChevronRight size={14} />
              </button>
            ) : (
              <p className="mt-3 text-sm font-semibold text-indigo-600">
                🏆 All levels complete! Amazing job!
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}