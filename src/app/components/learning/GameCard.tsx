import { ReactNode } from "react";
import { motion } from "motion/react";

interface GameCardProps {
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  children: ReactNode;
}

export function GameCard({
  title,
  description,
  emoji,
  color,
  bgColor,
  children,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-gray-100 bg-white shadow-sm overflow-hidden"
    >
      {/* Game header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ backgroundColor: bgColor }}
      >
        <span className="text-3xl">{emoji}</span>
        <div>
          <h3 className="font-bold text-gray-800 text-base leading-snug">
            {title}
          </h3>
          <p className="text-xs text-gray-500">{description}</p>
        </div>
      </div>

      {/* Game body */}
      <div className="p-5">{children}</div>
    </motion.div>
  );
}