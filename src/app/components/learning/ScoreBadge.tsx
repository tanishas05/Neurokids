import { motion } from "motion/react";

interface ScoreBadgeProps {
  score: number;
  total: number;
  gameLabel: string;
}

export function ScoreBadge({ score, total, gameLabel }: ScoreBadgeProps) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0;

  const stars =
    pct >= 90 ? 3 : pct >= 60 ? 2 : pct >= 30 ? 1 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 px-4 py-3"
    >
      <div className="flex gap-0.5">
        {[1, 2, 3].map((s) => (
          <span
            key={s}
            className="text-lg"
            style={{ opacity: s <= stars ? 1 : 0.25 }}
          >
            ⭐
          </span>
        ))}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 truncate">{gameLabel}</p>
        <p className="text-sm font-bold text-indigo-700">
          {score}/{total} correct ({pct}%)
        </p>
      </div>
    </motion.div>
  );
}