import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Lightbulb, ChevronRight } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  readingLevel: string;
  content: string;
  funFact: string;
  wordCount: number;
  imageEmoji: string;
}

interface LessonCardProps {
  lesson: Lesson;
  interestColor: string;
  interestBgColor: string;
  onComplete: () => void;
}

const levelColors: Record<string, string> = {
  easy: "#10b981",
  medium: "#f59e0b",
  hard: "#ef4444",
};

export function LessonCard({
  lesson,
  interestColor,
  interestBgColor,
  onComplete,
}: LessonCardProps) {
  const [showFunFact, setShowFunFact] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [fontSize, setFontSize] = useState<"normal" | "large">("normal");

  function handleComplete() {
    setCompleted(true);
    onComplete();
  }

  const levelColor = levelColors[lesson.readingLevel] ?? "#6366f1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div
        className="p-5 flex items-center gap-4"
        style={{ backgroundColor: interestBgColor }}
      >
        <span className="text-5xl">{lesson.imageEmoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-800 leading-snug">
            {lesson.title}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span
              className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: levelColor }}
            >
              {lesson.readingLevel.charAt(0).toUpperCase() +
                lesson.readingLevel.slice(1)}
            </span>
            <span className="text-xs text-gray-400">
              {lesson.wordCount} words
            </span>
          </div>
        </div>
      </div>

      {/* Font size toggle */}
      <div className="flex items-center gap-2 px-5 pt-4">
        <span className="text-xs text-gray-400 font-medium">Text size:</span>
        <button
          onClick={() => setFontSize("normal")}
          className={`text-xs px-2 py-0.5 rounded-full border transition-colors ${
            fontSize === "normal"
              ? "border-indigo-400 text-indigo-600 bg-indigo-50"
              : "border-gray-200 text-gray-400"
          }`}
        >
          A
        </button>
        <button
          onClick={() => setFontSize("large")}
          className={`text-sm px-2 py-0.5 rounded-full border transition-colors font-semibold ${
            fontSize === "large"
              ? "border-indigo-400 text-indigo-600 bg-indigo-50"
              : "border-gray-200 text-gray-400"
          }`}
        >
          A
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pt-3 pb-2">
        <div className="flex items-start gap-2 mb-2">
          <BookOpen
            size={16}
            className="mt-1 flex-shrink-0"
            style={{ color: interestColor }}
          />
          <span
            className="text-xs font-semibold uppercase tracking-wide"
            style={{ color: interestColor }}
          >
            Read this
          </span>
        </div>
        <p
          className="text-gray-700 leading-relaxed tracking-wide"
          style={{
            fontSize: fontSize === "large" ? "1.1rem" : "0.95rem",
            fontFamily:
              "'Trebuchet MS', 'Lucida Sans Unicode', Arial, sans-serif",
            lineHeight: fontSize === "large" ? "1.9" : "1.75",
            letterSpacing: "0.02em",
          }}
        >
          {lesson.content}
        </p>
      </div>

      {/* Fun Fact toggle */}
      <div className="px-5 py-3">
        <button
          onClick={() => setShowFunFact((v) => !v)}
          className="flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
        >
          <Lightbulb size={16} />
          {showFunFact ? "Hide fun fact" : "Show fun fact! 🎉"}
          <ChevronRight
            size={14}
            className={`transition-transform ${showFunFact ? "rotate-90" : ""}`}
          />
        </button>
        <AnimatePresence>
          {showFunFact && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-2 rounded-xl bg-amber-50 border border-amber-200 p-3"
            >
              <p className="text-sm text-amber-800 font-medium">
                💡 {lesson.funFact}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Complete button */}
      <div className="px-5 pb-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleComplete}
          disabled={completed}
          className="w-full py-3 rounded-2xl font-bold text-white text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            backgroundColor: completed ? "#10b981" : interestColor,
          }}
        >
          {completed ? "✅ Lesson Complete!" : "I've read this! ✓"}
        </motion.button>
      </div>
    </motion.div>
  );
}