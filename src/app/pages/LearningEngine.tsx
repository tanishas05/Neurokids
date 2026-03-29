import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, BookOpen, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { InterestSelector } from "../components/learning/InterestSelector";
import { LessonCard } from "../components/learning/LessonCard";
import contentData from "../data/learningContent.json";

type Lesson = {
  id: string;
  title: string;
  readingLevel: string;
  content: string;
  funFact: string;
  wordCount: number;
  imageEmoji: string;
};

type LessonsMap = Record<string, Lesson[]>;

export default function LearningEnginePage() {
  const navigate = useNavigate();
  const [selectedInterest, setSelectedInterest] = useState<string | null>(null);
  const [lessonIndex, setLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const interest = selectedInterest
    ? contentData.interests.find((i) => i.id === selectedInterest)
    : null;

  const lessons: Lesson[] = selectedInterest
    ? ((contentData.lessons as LessonsMap)[selectedInterest] ?? [])
    : [];

  const currentLesson = lessons[lessonIndex] ?? null;

  function handleInterestSelect(id: string) {
    setSelectedInterest(id);
    setLessonIndex(0);
  }

  function handleLessonComplete() {
    if (currentLesson) {
      setCompletedLessons((prev) => new Set([...prev, currentLesson.id]));
    }
  }

  function clearInterest() {
    setSelectedInterest(null);
    setLessonIndex(0);
  }

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
          <BookOpen size={18} className="text-indigo-500" />
          <h1 className="text-base font-bold text-gray-800">Learning Engine</h1>
        </div>
        {selectedInterest && (
          <button
            onClick={clearInterest}
            className="ml-auto text-xs text-indigo-500 font-semibold hover:text-indigo-700 transition-colors"
          >
            Change topic
          </button>
        )}
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {!selectedInterest ? (
            <motion.div
              key="selector"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <InterestSelector
                selected={selectedInterest}
                onSelect={handleInterestSelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="lesson"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{interest?.emoji}</span>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">
                    {interest?.label}
                  </p>
                  <p className="text-sm text-gray-600">
                    Lesson {lessonIndex + 1} of {lessons.length}
                  </p>
                </div>
              </div>

              {/* Lesson dots */}
              <div className="flex gap-2 mb-5">
                {lessons.map((l, i) => (
                  <button
                    key={l.id}
                    onClick={() => setLessonIndex(i)}
                    className="flex-1 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor:
                        completedLessons.has(l.id)
                          ? "#10b981"
                          : i === lessonIndex
                          ? interest?.color ?? "#6366f1"
                          : "#e5e7eb",
                    }}
                    title={l.title}
                  />
                ))}
              </div>

              {/* Lesson card — keyed by lesson id so all internal state resets on lesson change */}
              {currentLesson && (
                <LessonCard
                  key={currentLesson.id}
                  lesson={currentLesson}
                  interestColor={interest?.color ?? "#6366f1"}
                  interestBgColor={interest?.bgColor ?? "#eef2ff"}
                  onComplete={handleLessonComplete}
                />
              )}

              {/* Navigation */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => setLessonIndex((i) => Math.max(0, i - 1))}
                  disabled={lessonIndex === 0}
                  className="flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} /> Previous
                </button>
                <button
                  onClick={() =>
                    setLessonIndex((i) => Math.min(lessons.length - 1, i + 1))
                  }
                  disabled={lessonIndex === lessons.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-full bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>

              {/* All done state */}
              {completedLessons.size === lessons.length && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-5 text-center"
                >
                  <p className="text-2xl mb-1">🏆</p>
                  <h4 className="font-bold text-gray-800 mb-1">
                    You've read all lessons!
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">
                    Amazing work on {interest?.label}. Pick a new topic to keep
                    learning!
                  </p>
                  <button
                    onClick={clearInterest}
                    className="px-5 py-2 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    Choose another topic
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}