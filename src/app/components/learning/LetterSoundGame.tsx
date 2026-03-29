import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RotateCcw } from "lucide-react";
import gamesData from "../../data/dyslexiaGamesData.json";

interface LetterSoundGameProps {
  onSessionComplete: (score: number, total: number) => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function LetterSoundGame({ onSessionComplete }: LetterSoundGameProps) {
  const allRounds = gamesData.letterSoundGame.rounds;

  const [rounds, setRounds] = useState(() => shuffle(allRounds).slice(0, 6));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const round = rounds[currentIndex];

  useEffect(() => {
    setSelected(null);
    setShowResult(false);
  }, [currentIndex]);

  function handleAnswer(option: string) {
    if (selected !== null) return;
    setSelected(option);
    setShowResult(true);
    const correct = option === round.correct;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex < rounds.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else {
        setDone(true);
        onSessionComplete(score + (correct ? 1 : 0), rounds.length);
      }
    }, 900);
  }

  function restart() {
    setRounds(shuffle(allRounds).slice(0, 6));
    setCurrentIndex(0);
    setSelected(null);
    setScore(0);
    setDone(false);
    setShowResult(false);
  }

  if (done) {
    const pct = Math.round((score / rounds.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <Trophy className="mx-auto mb-3 text-yellow-500" size={40} />
        <h4 className="text-xl font-bold text-gray-800 mb-1">
          Game over! 🎉
        </h4>
        <p className="text-gray-500 text-sm mb-2">
          You scored <span className="font-bold text-indigo-600">{score}</span>{" "}
          out of <span className="font-bold">{rounds.length}</span>
        </p>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-3 rounded-full bg-indigo-500"
          />
        </div>
        <p className="text-sm font-semibold text-gray-600 mb-4">
          {pct >= 80 ? "🌟 Excellent!" : pct >= 50 ? "👍 Good effort!" : "💪 Keep practising!"}
        </p>
        <button
          onClick={restart}
          className="flex items-center gap-2 mx-auto px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors"
        >
          <RotateCcw size={14} /> Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400 font-medium">
          Question {currentIndex + 1} / {rounds.length}
        </span>
        <span className="text-sm font-bold text-indigo-600">
          ⭐ {score} correct
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${((currentIndex) / rounds.length) * 100}%` }}
          className="h-2 rounded-full bg-indigo-400"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Prompt */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-3">
              Which word starts with the letter...
            </p>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-indigo-100 border-4 border-indigo-300 mb-1">
              <span className="text-6xl font-black text-indigo-600">
                {round.letter}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Hint: think of a {round.emoji}
            </p>
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3">
            {round.options.map((option) => {
              const isSelected = selected === option;
              const isCorrect = option === round.correct;
              let borderColor = "#e5e7eb";
              let bgColor = "#ffffff";
              let textColor = "#374151";

              if (showResult && isSelected) {
                if (isCorrect) {
                  borderColor = "#22c55e";
                  bgColor = "#f0fdf4";
                  textColor = "#16a34a";
                } else {
                  borderColor = "#ef4444";
                  bgColor = "#fef2f2";
                  textColor = "#dc2626";
                }
              } else if (showResult && isCorrect) {
                borderColor = "#22c55e";
                bgColor = "#f0fdf4";
                textColor = "#16a34a";
              }

              return (
                <motion.button
                  key={option}
                  whileHover={!selected ? { scale: 1.03 } : {}}
                  whileTap={!selected ? { scale: 0.97 } : {}}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className="rounded-2xl border-2 py-4 px-3 text-center font-bold text-base transition-all duration-200"
                  style={{ borderColor, backgroundColor: bgColor, color: textColor }}
                >
                  <span
                    style={{
                      fontFamily: "'Trebuchet MS', Arial, sans-serif",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {option}
                  </span>
                  {showResult && isCorrect && (
                    <span className="ml-1">✓</span>
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <span className="ml-1">✗</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}