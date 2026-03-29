import { motion } from "motion/react";
import contentData from "@/data/learningContent.json";

interface InterestSelectorProps {
  selected: string | null;
  onSelect: (id: string) => void;
}

export function InterestSelector({ selected, onSelect }: InterestSelectorProps) {
  const { interests } = contentData;

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-gray-800 mb-1">
        What are you interested in? 🌟
      </h2>
      <p className="text-sm text-gray-500 mb-5">
        Pick a topic and we'll find the perfect lesson for you!
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {interests.map((interest) => {
          const isSelected = selected === interest.id;
          return (
            <motion.button
              key={interest.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(interest.id)}
              className="flex flex-col items-center gap-2 rounded-2xl border-2 p-4 cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                borderColor: isSelected ? interest.color : "#e5e7eb",
                backgroundColor: isSelected ? interest.bgColor : "#ffffff",
                boxShadow: isSelected
                  ? `0 0 0 2px ${interest.color}33`
                  : "none",
              }}
              aria-pressed={isSelected}
            >
              <span className="text-4xl">{interest.emoji}</span>
              <span
                className="text-sm font-semibold text-center leading-tight"
                style={{ color: isSelected ? interest.color : "#374151" }}
              >
                {interest.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}