// src/app/pages/Landing.tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export function Landing() {
  const [isLoggedInWithGoogle, setIsLoggedInWithGoogle] = useState(false);
  const [roleSelected, setRoleSelected] = useState<"parent" | "child" | null>(null);
  const navigate = useNavigate();

  const handleGoogleSuccess = (credentialResponse: CredentialResponse) => {
    if (credentialResponse.credential) {
      setIsLoggedInWithGoogle(true);
      localStorage.setItem("googleCredential", credentialResponse.credential);
    }
  };

  const handleLogin = () => {
    if (!roleSelected) return;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", roleSelected);
    if (roleSelected === "parent") navigate("/parent-dashboard");
    else navigate("/social-coach");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-6 overflow-hidden relative">

      {/* Floating blobs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-yellow-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300 rounded-full opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-blue-300 rounded-full opacity-10 blur-3xl pointer-events-none" />

      {/* Floating emoji characters */}
      <div className="absolute top-12 left-[8%] text-5xl animate-bounce" style={{ animationDelay: "0s", animationDuration: "3s" }}>🌟</div>
      <div className="absolute top-24 right-[10%] text-4xl animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "2.5s" }}>🧠</div>
      <div className="absolute bottom-32 left-[12%] text-4xl animate-bounce" style={{ animationDelay: "1s", animationDuration: "3.5s" }}>🎮</div>
      <div className="absolute bottom-20 right-[8%] text-5xl animate-bounce" style={{ animationDelay: "0.3s", animationDuration: "2.8s" }}>🏆</div>
      <div className="absolute top-1/3 right-[5%] text-3xl animate-bounce" style={{ animationDelay: "1.5s", animationDuration: "3s" }}>💡</div>
      <div className="absolute top-1/3 left-[5%] text-3xl animate-bounce" style={{ animationDelay: "0.8s", animationDuration: "2.7s" }}>📚</div>

      {/* Logo + Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl text-3xl">
            🧒
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-3 tracking-tight drop-shadow-lg">
          NeuroKids
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-medium max-w-md mx-auto leading-relaxed">
          A safe space to learn, play and grow — built for every kind of mind 💜
        </p>
        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          {["🧩 ADHD-Friendly", "🔤 Dyslexia Tools", "💬 Social Skills", "🎯 Personalised"].map(pill => (
            <span key={pill} className="bg-white/20 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30">
              {pill}
            </span>
          ))}
        </div>
      </div>

      {/* Auth card */}
      <div className="w-full max-w-sm relative z-10">
        {!isLoggedInWithGoogle ? (
          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-4">
            <div className="text-center mb-2">
              <h2 className="text-xl font-bold text-gray-800">Get Started</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in with your Google account</p>
            </div>
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={() => console.log("Login Failed")}
            />
            <p className="text-xs text-gray-400 text-center mt-2">
              Safe, secure & private. We never share your data.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-8 flex flex-col items-center gap-5">
            <div className="text-center">
              <div className="text-4xl mb-2">👋</div>
              <h2 className="text-xl font-bold text-gray-800">Who's logging in?</h2>
              <p className="text-gray-500 text-sm mt-1">Select your role to continue</p>
            </div>

            <div className="grid grid-cols-2 gap-3 w-full">
              <button
                onClick={() => setRoleSelected("parent")}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  roleSelected === "parent"
                    ? "border-purple-500 bg-purple-50 shadow-md scale-105"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <span className="text-3xl">👨‍👩‍👧</span>
                <span className="font-bold text-gray-800 text-sm">Parent</span>
                <span className="text-xs text-gray-500 text-center leading-tight">Track & support your child</span>
              </button>

              <button
                onClick={() => setRoleSelected("child")}
                className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all ${
                  roleSelected === "child"
                    ? "border-pink-500 bg-pink-50 shadow-md scale-105"
                    : "border-gray-200 hover:border-pink-300 hover:bg-pink-50"
                }`}
              >
                <span className="text-3xl">🧒</span>
                <span className="font-bold text-gray-800 text-sm">Child</span>
                <span className="text-xs text-gray-500 text-center leading-tight">Learn, play & grow!</span>
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={!roleSelected}
              className={`w-full py-3.5 rounded-2xl font-bold text-white text-base transition-all shadow-lg ${
                roleSelected
                  ? roleSelected === "parent"
                    ? "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 active:scale-95"
                    : "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 active:scale-95"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              {roleSelected ? `Continue as ${roleSelected === "parent" ? "Parent 👨‍👩‍👧" : "Child 🧒"}` : "Select a role first"}
            </button>
          </div>
        )}
      </div>

      {/* Bottom credit */}
      <p className="text-white/50 text-xs mt-8 relative z-10">
        Made with 💜 for neurodivergent children & families
      </p>
    </div>
  );
}