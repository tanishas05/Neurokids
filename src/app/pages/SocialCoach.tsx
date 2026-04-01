// src/app/pages/SocialCoach.tsx
import { useState, useEffect } from "react";
import ScenarioDropdown from "../components/social-coach/ScenarioDropdown";
import MessageInput from "../components/social-coach/MessageInput";
import ReplyCard from "../components/social-coach/ReplyCard";
import FeedbackBanner from "../components/social-coach/FeedbackBanner";
import { getMatchedScenario } from "../data/scenarios";
import type { ReplyOption } from "../data/scenarios";

type Stage = "pick" | "type" | "replies" | "feedback";

const BADGES = [
  { id: "first", emoji: "🌟", label: "First Step!", desc: "Completed your first scenario", threshold: 1 },
  { id: "three", emoji: "🔥", label: "On Fire!", desc: "Completed 3 scenarios", threshold: 3 },
  { id: "five", emoji: "🏆", label: "Champion!", desc: "Completed 5 scenarios", threshold: 5 },
  { id: "ten", emoji: "💎", label: "Diamond Mind", desc: "Completed 10 scenarios", threshold: 10 },
  { id: "kind", emoji: "💛", label: "Kindness Star", desc: "Chose a Kind reply", threshold: 0, special: "kind" },
  { id: "brave", emoji: "🦁", label: "Brave Heart", desc: "Chose a Brave reply", threshold: 0, special: "assertive" },
];

export function SocialCoach() {
  const [scenarioId, setScenarioId] = useState("");
  const [stage, setStage] = useState<Stage>("pick");
  const [selectedReply, setSelectedReply] = useState<ReplyOption | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(() =>
    parseInt(localStorage.getItem("sc_completed") || "0")
  );
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() =>
    JSON.parse(localStorage.getItem("sc_badges") || "[]")
  );
  const [newBadge, setNewBadge] = useState<typeof BADGES[0] | null>(null);
  const [streakDays] = useState<number>(() =>
    parseInt(localStorage.getItem("sc_streak") || "1")
  );

  const scenario = getMatchedScenario(scenarioId);

  const checkBadges = (count: number, tone: string) => {
    const newlyEarned: typeof BADGES[0][] = [];
    BADGES.forEach(badge => {
      if (earnedBadges.includes(badge.id)) return;
      if (badge.threshold > 0 && count >= badge.threshold) newlyEarned.push(badge);
      if (badge.special && badge.special === tone) newlyEarned.push(badge);
    });
    if (newlyEarned.length > 0) {
      const updated = [...earnedBadges, ...newlyEarned.map(b => b.id)];
      setEarnedBadges(updated);
      localStorage.setItem("sc_badges", JSON.stringify(updated));
      setNewBadge(newlyEarned[0]);
      setTimeout(() => setNewBadge(null), 4000);
    }
  };

  const handleScenarioChange = (id: string) => {
    setScenarioId(id);
    setSelectedReply(null);
    setStage(id ? "type" : "pick");
  };

  const handleMessageSubmit = (_message: string) => {
    if (!scenario) return;
    setStage("replies");
  };

  const handleReplySelect = (reply: ReplyOption) => {
    setSelectedReply(reply);
    setStage("feedback");
    const newCount = completedCount + 1;
    setCompletedCount(newCount);
    localStorage.setItem("sc_completed", String(newCount));
    checkBadges(newCount, reply.tone);
  };

  const handleTryAgain = () => {
    setScenarioId("");
    setSelectedReply(null);
    setStage("pick");
  };

  const stages: Stage[] = ["pick", "type", "replies", "feedback"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-yellow-50 flex flex-col items-center px-4 py-6">

      {/* New badge toast */}
      {newBadge && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl px-6 py-4 flex items-center gap-3 border-2 border-yellow-300 animate-bounce">
          <span className="text-4xl">{newBadge.emoji}</span>
          <div>
            <p className="font-black text-gray-800 text-sm">Badge Unlocked!</p>
            <p className="font-bold text-purple-600">{newBadge.label}</p>
            <p className="text-xs text-gray-500">{newBadge.desc}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-xl mb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-purple-800 flex items-center gap-2">
              🧠 Social Coach
            </h1>
            <p className="text-purple-500 text-xs mt-0.5">
              Practice makes perfect — you're doing great!
            </p>
          </div>
          {/* Streak + count */}
          <div className="flex items-center gap-2">
            <div className="bg-orange-100 border border-orange-200 rounded-2xl px-3 py-2 text-center">
              <div className="text-lg font-black text-orange-500">🔥 {streakDays}</div>
              <div className="text-xs text-orange-400 font-semibold">day streak</div>
            </div>
            <div className="bg-purple-100 border border-purple-200 rounded-2xl px-3 py-2 text-center">
              <div className="text-lg font-black text-purple-600">{completedCount}</div>
              <div className="text-xs text-purple-400 font-semibold">done</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges shelf */}
      {earnedBadges.length > 0 && (
        <div className="w-full max-w-xl mb-4">
          <div className="bg-white/70 backdrop-blur rounded-2xl px-4 py-3 border border-purple-100">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Your badges</p>
            <div className="flex gap-2 flex-wrap">
              {BADGES.filter(b => earnedBadges.includes(b.id)).map(badge => (
                <div key={badge.id} className="flex flex-col items-center group relative">
                  <span className="text-2xl">{badge.emoji}</span>
                  <span className="text-xs text-gray-500 font-semibold">{badge.label}</span>
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-1 bg-gray-800 text-white text-xs rounded-lg px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                    {badge.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <div className="w-full max-w-xl mb-5">
        <div className="flex items-center justify-between text-xs text-purple-400 font-semibold mb-1.5">
          <span>Progress</span>
          <span>Step {stages.indexOf(stage) + 1} of 4</span>
        </div>
        <div className="h-2.5 bg-purple-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full transition-all duration-500"
            style={{ width: `${((stages.indexOf(stage) + 1) / 4) * 100}%` }}
          />
        </div>
      </div>

      {/* Main card */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl overflow-hidden">

        {/* Step 1 */}
        <div className={`p-5 transition-all ${stage !== "pick" ? "bg-purple-50 border-b border-purple-100" : ""}`}>
          <div className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
              stage !== "pick" ? "bg-purple-500 text-white" : "bg-purple-500 text-white"
            }`}>
              {stage !== "pick" ? "✓" : "1"}
            </div>
            <ScenarioDropdown selected={scenarioId} onChange={handleScenarioChange} />
          </div>
        </div>

        {/* Step 2 */}
        {scenarioId && (
          <div className={`p-5 transition-all ${(stage === "replies" || stage === "feedback") ? "bg-pink-50 border-b border-pink-100" : ""}`}>
            <div className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${
                stage === "replies" || stage === "feedback" ? "bg-pink-500 text-white" : "bg-pink-500 text-white"
              }`}>
                {stage === "replies" || stage === "feedback" ? "✓" : "2"}
              </div>
              <MessageInput
                onSubmit={handleMessageSubmit}
                disabled={stage === "replies" || stage === "feedback"}
              />
            </div>
          </div>
        )}

        {/* Step 3: Reply cards */}
        {(stage === "replies" || stage === "feedback") && scenario && (
          <div className="p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-black text-sm shrink-0">
                {stage === "feedback" ? "✓" : "3"}
              </div>
              <div>
                <p className="font-black text-gray-800">Pick your reply:</p>
                <p className="text-xs text-gray-400">All styles are valid — choose what fits you!</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5 mt-3">
              {scenario.replies.map((reply: ReplyOption) => (
                <ReplyCard
                  key={reply.id}
                  reply={reply}
                  onSelect={handleReplySelect}
                  selected={selectedReply?.id === reply.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Feedback */}
        {stage === "feedback" && selectedReply && (
          <div className="p-5 pt-0">
            <FeedbackBanner
              emoji={selectedReply.feedbackEmoji}
              message={selectedReply.feedback}
              onTryAgain={handleTryAgain}
            />
          </div>
        )}

        {/* Empty state */}
        {stage === "pick" && !scenarioId && (
          <div className="p-8 text-center text-purple-300">
            <div className="text-4xl mb-2">☝️</div>
            <p className="text-sm font-semibold">Pick a situation above to get started!</p>
          </div>
        )}
      </div>

      {/* Locked badges preview */}
      {earnedBadges.length < BADGES.length && (
        <div className="w-full max-w-xl mt-5">
          <p className="text-xs font-bold text-purple-300 uppercase tracking-wider mb-2 text-center">Badges to unlock</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {BADGES.filter(b => !earnedBadges.includes(b.id)).slice(0, 4).map(badge => (
              <div key={badge.id} className="flex flex-col items-center opacity-40">
                <span className="text-2xl grayscale">{badge.emoji}</span>
                <span className="text-xs text-gray-400">{badge.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-purple-400 text-center max-w-xs">
        This is a safe space to practise. There are no wrong answers. 💜
      </p>
    </div>
  );
}