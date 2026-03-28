// src/app/components/social-coach/ScenarioDropdown.tsx
import { scenarios } from "../../data/scenarios";
import type { Scenario } from "../../data/scenarios";

type Props = {
  selected: string;
  onChange: (id: string) => void;
};

export default function ScenarioDropdown({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <label className="block text-base font-bold text-purple-800 mb-2">
        🌟 What's happening?
      </label>
      <select
        value={selected}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border-2 border-purple-300 bg-white px-4 py-3 text-purple-900 text-base font-medium shadow-sm focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 cursor-pointer appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238b5cf6' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
      >
        <option value="">-- Pick a situation --</option>
        {scenarios.map((s: Scenario) => (
          <option key={s.id} value={s.id}>
            {s.emoji} {s.title}
          </option>
        ))}
      </select>

      {selected && (
        <p className="mt-2 text-sm text-purple-700 bg-purple-50 border border-purple-200 rounded-xl px-3 py-2 leading-relaxed">
          {scenarios.find((s: Scenario) => s.id === selected)?.description}
        </p>
      )}
    </div>
  );
}