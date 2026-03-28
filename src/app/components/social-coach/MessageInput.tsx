// src/components/social-coach/MessageInput.tsx
import { useState } from "react";

type Props = {
  onSubmit: (message: string) => void;
  disabled?: boolean;
};

export default function MessageInput({ onSubmit, disabled }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <div className="w-full">
      <label className="block text-base font-bold text-purple-800 mb-2">
        💬 What do you want to say?
      </label>
      <p className="text-sm text-purple-500 mb-3">
        Type how you're feeling, or what you'd say to them. There's no wrong answer!
      </p>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          disabled={disabled}
          placeholder="e.g. I feel left out and sad..."
          className="flex-1 rounded-2xl border-2 border-purple-300 bg-white px-4 py-3 text-purple-900 placeholder-purple-300 text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 disabled:opacity-50 transition-all"
        />
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-bold px-5 py-3 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md whitespace-nowrap"
        >
          ✨ Go!
        </button>
      </div>
    </div>
  );
}