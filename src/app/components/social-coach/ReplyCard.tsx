// src/app/components/social-coach/ReplyCard.tsx
import type { ReplyOption } from "../../data/scenarios";

type Props = {
  reply: ReplyOption;
  onSelect: (reply: ReplyOption) => void;
  selected: boolean;
};

const toneStyles: Record<string, { idle: string; active: string; badge: string }> = {
  kind: {
    idle: "bg-yellow-50 border-yellow-300 hover:border-yellow-400 hover:bg-yellow-100 hover:shadow-md",
    active: "bg-yellow-100 border-yellow-500 ring-2 ring-yellow-300 shadow-md",
    badge: "bg-yellow-200 text-yellow-800",
  },
  neutral: {
    idle: "bg-green-50 border-green-300 hover:border-green-400 hover:bg-green-100 hover:shadow-md",
    active: "bg-green-100 border-green-500 ring-2 ring-green-300 shadow-md",
    badge: "bg-green-200 text-green-800",
  },
  assertive: {
    idle: "bg-blue-50 border-blue-300 hover:border-blue-400 hover:bg-blue-100 hover:shadow-md",
    active: "bg-blue-100 border-blue-500 ring-2 ring-blue-300 shadow-md",
    badge: "bg-blue-200 text-blue-800",
  },
};

export default function ReplyCard({ reply, onSelect, selected }: Props) {
  const styles = toneStyles[reply.tone];
  const colorClass = selected ? styles.active : styles.idle;

  return (
    <button
      onClick={() => onSelect(reply)}
      className={`w-full text-left rounded-2xl border-2 p-4 cursor-pointer transition-all duration-150 active:scale-95 ${colorClass}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${styles.badge}`}>
          {reply.label}
        </span>
        {selected && (
          <span className="text-xs font-bold text-gray-500">✓ Selected</span>
        )}
      </div>
      <p className="text-gray-800 text-base leading-snug">
        &ldquo;{reply.text}&rdquo;
      </p>
    </button>
  );
}