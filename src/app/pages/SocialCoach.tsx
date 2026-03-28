// src/app/pages/SocialCoach.tsx
import { useState } from "react";
import ScenarioDropdown from "../components/social-coach/ScenarioDropdown";
import MessageInput from "../components/social-coach/MessageInput";
import ReplyCard from "../components/social-coach/ReplyCard";
import FeedbackBanner from "../components/social-coach/FeedbackBanner";
import { getMatchedScenario } from "../data/scenarios";
import type { ReplyOption } from "../data/scenarios";

type Stage = "pick" | "type" | "replies" | "feedback";

export function SocialCoach() {
  const [scenarioId, setScenarioId] = useState("");
  const [stage, setStage] = useState<Stage>("pick");
  const [selectedReply, setSelectedReply] = useState<ReplyOption | null>(null);

  const scenario = getMatchedScenario(scenarioId);

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
  };

  const handleTryAgain = () => {
    setScenarioId("");
    setSelectedReply(null);
    setStage("pick");
  };

  const stepNumber = (n: number, color: string) => (
    <span
      className={`${color} text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shrink-0`}
    >
      {n}
    </span>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-50 flex flex-col items-center px-4 py-8">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">🧠💬</div>
        <h1 className="text-3xl font-extrabold text-purple-800 tracking-tight">
          Social Coach
        </h1>
        <p className="text-purple-500 mt-2 text-sm max-w-xs mx-auto leading-relaxed">
          Practice tricky social situations in a safe space. Pick a scenario and I'll help you find the right words!
        </p>
      </div>

      {/* Progress dots */}
      <div className="flex items-center gap-2 mb-6">
        {(["pick", "type", "replies", "feedback"] as Stage[]).map((s, i) => (
          <div
            key={s}
            className={`rounded-full transition-all duration-300 ${
              stage === s
                ? "w-6 h-3 bg-purple-500"
                : (["pick", "type", "replies", "feedback"] as Stage[]).indexOf(stage) > i
                ? "w-3 h-3 bg-purple-400"
                : "w-3 h-3 bg-purple-200"
            }`}
          />
        ))}
      </div>

      {/* Main card */}
      <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl p-6 flex flex-col gap-6">

        {/* Step 1: Scenario picker — always visible */}
        <div className="flex items-start gap-3">
          {stepNumber(1, "bg-purple-500")}
          <ScenarioDropdown selected={scenarioId} onChange={handleScenarioChange} />
        </div>

        {/* Divider */}
        {scenarioId && <div className="border-t-2 border-dashed border-purple-100" />}

        {/* Step 2: Message input */}
        {scenarioId && (stage === "type" || stage === "replies" || stage === "feedback") && (
          <div className="flex items-start gap-3">
            {stepNumber(2, "bg-pink-500")}
            <MessageInput
              onSubmit={handleMessageSubmit}
              disabled={stage === "replies" || stage === "feedback"}
            />
          </div>
        )}

        {/* Divider */}
        {(stage === "replies" || stage === "feedback") && (
          <div className="border-t-2 border-dashed border-purple-100" />
        )}

        {/* Step 3: Reply cards */}
        {(stage === "replies" || stage === "feedback") && scenario && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              {stepNumber(3, "bg-green-500")}
              <p className="text-base font-bold text-gray-700">
                Pick the reply that feels right:
              </p>
            </div>
            <p className="text-sm text-gray-400 pl-11">
              All three are good — they just have different styles!
            </p>
            {scenario.replies.map((reply: ReplyOption) => (
              <ReplyCard
                key={reply.id}
                reply={reply}
                onSelect={handleReplySelect}
                selected={selectedReply?.id === reply.id}
              />
            ))}
          </div>
        )}

        {/* Step 4: Feedback */}
        {stage === "feedback" && selectedReply && (
          <>
            <div className="border-t-2 border-dashed border-purple-100" />
            <FeedbackBanner
              emoji={selectedReply.feedbackEmoji}
              message={selectedReply.feedback}
              onTryAgain={handleTryAgain}
            />
          </>
        )}

        {/* Empty state */}
        {stage === "pick" && (
          <div className="text-center text-purple-300 text-sm py-2">
            ☝️ Start by picking a situation above!
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-purple-400 text-center max-w-xs leading-relaxed">
        This is a safe space to practise. There are no wrong answers here. 💜
      </p>
    </div>
  );
}