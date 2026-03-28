// src/components/social-coach/FeedbackBanner.tsx

type Props = {
  emoji: string;
  message: string;
  onTryAgain: () => void;
};

export default function FeedbackBanner({ emoji, message, onTryAgain }: Props) {
  return (
    <div className="w-full bg-gradient-to-br from-purple-100 via-pink-50 to-yellow-100 border-2 border-purple-300 rounded-3xl p-6 text-center shadow-lg">
      <div
        className="text-6xl mb-3"
        style={{ animation: "popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both" }}
      >
        {emoji}
      </div>
      <p className="text-purple-800 font-semibold text-base mb-2 leading-relaxed">
        {message}
      </p>
      <p className="text-purple-500 text-sm mb-5">
        You're doing amazing! Want to try another situation?
      </p>
      <button
        onClick={onTryAgain}
        className="bg-purple-500 hover:bg-purple-600 active:scale-95 text-white font-bold px-6 py-2.5 rounded-2xl transition-all shadow-md text-sm"
      >
        🔄 Try another scenario
      </button>

      <style>{`
        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}