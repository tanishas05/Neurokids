import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, RotateCcw, Hand } from "lucide-react";
import gamesData from "../../data/dyslexiaGamesData.json";

interface SyllableGameProps {
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

export function SyllableGame({ onSessionComplete }: SyllableGameProps) {
  const allWords = gamesData.syllableGame.words;
  const [words] = useState(() => shuffle(allWords));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [taps, setTaps] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [tapFlash, setTapFlash] = useState(false);

  const word = words[currentIndex];

  function handleTap() {
    if (submitted) return;
    setTaps((t) => t + 1);
    setTapFlash(true);
    setTimeout(() => setTapFlash(false), 150);
  }

  function handleSubmit() {
    if (submitted || taps === 0) return;
    setSubmitted(true);
    const correct = taps === word.count;
    if (correct) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentIndex < words.length - 1) {
        setCurrentIndex((i) => i + 1);
        setTaps(0);
        setSubmitted(false);
      } else {
        setDone(true);
        onSessionComplete(score + (correct ? 1 : 0), words.length);
      }
    }, 1200);
  }

  function restart() {
    setCurrentIndex(0);
    setTaps(0);
    setSubmitted(false);
    setScore(0);
    setDone(false);
  }

  function resetTaps() {
    if (!submitted) setTaps(0);
  }

  if (done) {
    const pct = Math.round((score / words.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-6"
      >
        <Trophy className="mx-auto mb-3 text-yellow-500" size={40} />
        <h4 className="text-xl font-bold text-gray-800 mb-1">Well done! 🎉</h4>
        <p className="text-gray-500 text-sm mb-2">
          You got{" "}
          <span className="font-bold text-indigo-600">{score}</span> out of{" "}
          <span className="font-bold">{words.length}</span>
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
          {pct >= 80 ? "🌟 Superstar!" : pct >= 50 ? "👍 Nice work!" : "💪 Try again!"}
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

  const isCorrect = submitted && taps === word.count;
  const isWrong = submitted && taps !== word.count;

  return (
    <div className="w-full">
      {/* Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-400 font-medium">
          Word {currentIndex + 1} / {words.length}
        </span>
        <span className="text-sm font-bold text-indigo-600">
          ⭐ {score} correct
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2 mb-6 overflow-hidden">
        <motion.div
          animate={{ width: `${(currentIndex / words.length) * 100}%` }}
          className="h-2 rounded-full bg-indigo-400"
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center"
        >
          <p className="text-sm text-gray-500 mb-2">
            Tap the button once for each syllable in this word:
          </p>

          {/* Word display */}
          <div className="mb-4">
            <span
              className="text-4xl font-black tracking-widest"
              style={{
                fontFamily: "'Trebuchet MS', Arial, sans-serif",
                color: isCorrect ? "#16a34a" : isWrong ? "#dc2626" : "#1e293b",
              }}
            >
              {word.word}
            </span>
          </div>

          {/* Syllable dots */}
          {submitted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center gap-2 mb-4"
            >
              {word.syllables.map((syl, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded-lg text-sm font-bold"
                  style={{
                    backgroundColor: isCorrect ? "#dcfce7" : "#fee2e2",
                    color: isCorrect ? "#16a34a" : "#dc2626",
                    fontFamily: "'Trebuchet MS', Arial, sans-serif",
                    letterSpacing: "0.05em",
                  }}
                >
                  {syl}
                </span>
              ))}
            </motion.div>
          )}

          {/* Tap counter */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="text-sm text-gray-400">Your taps:</span>
            <motion.div
              animate={{
                scale: tapFlash ? 1.3 : 1,
                backgroundColor: tapFlash ? "#e0e7ff" : "#f3f4f6",
              }}
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
            >
              <span className="text-xl font-black text-indigo-600">{taps}</span>
            </motion.div>
          </div>

          {/* Tap button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleTap}
            disabled={submitted}
            className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 py-5 rounded-3xl border-4 border-indigo-400 bg-indigo-50 text-indigo-700 font-bold text-base mb-4 transition-all hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Hand size={22} />
            TAP!
          </motion.button>

          <div className="flex gap-2 justify-center">
            <button
              onClick={resetTaps}
              disabled={submitted || taps === 0}
              className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Reset taps
            </button>
            <button
              onClick={handleSubmit}
              disabled={submitted || taps === 0}
              className="px-5 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit answer
            </button>
          </div>

          {/* Feedback */}
          <AnimatePresence>
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 rounded-2xl p-3"
                style={{
                  backgroundColor: isCorrect ? "#f0fdf4" : "#fef2f2",
                  border: `2px solid ${isCorrect ? "#86efac" : "#fca5a5"}`,
                }}
              >
                <p
                  className="text-sm font-bold"
                  style={{ color: isCorrect ? "#16a34a" : "#dc2626" }}
                >
                  {isCorrect
                    ? `✅ Correct! "${word.word}" has ${word.count} syllable${word.count > 1 ? "s" : ""}.`
                    : `❌ Not quite! "${word.word}" has ${word.count} syllable${word.count > 1 ? "s" : ""}, not ${taps}.`}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}