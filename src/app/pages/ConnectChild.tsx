// src/app/pages/ConnectChild.tsx
import { useState } from "react";
import { Card } from "../components/ui/card";

export default function ConnectChild() {
  const [childEmail, setChildEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [message, setMessage] = useState("");
  const [connected, setConnected] = useState(false);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSendOTP = () => {
    if (!childEmail.includes("@")) { setMessage("Please enter a valid email."); return; }
    const otp = generateOTP();
    setGeneratedOtp(otp);
    localStorage.setItem("childConnection", JSON.stringify({ childEmail, otp, verified: false }));
    setOtpSent(true);
    setMessage("");
  };

  const handleVerifyOTP = () => {
    const stored = localStorage.getItem("childConnection");
    if (!stored) return;
    const data = JSON.parse(stored);
    if (otpInput === data.otp) {
      data.verified = true;
      localStorage.setItem("childConnection", JSON.stringify(data));
      const children = JSON.parse(localStorage.getItem("parentChildren") || "[]");
      if (!children.includes(data.childEmail)) children.push(data.childEmail);
      localStorage.setItem("parentChildren", JSON.stringify(children));
      setConnected(true);
      setMessage("");
    } else {
      setMessage("Incorrect OTP. Try again.");
    }
  };

  const steps = [
    { n: 1, label: "Enter email", done: otpSent || connected },
    { n: 2, label: "Verify OTP", done: connected },
    { n: 3, label: "Connected!", done: connected },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-white flex items-start justify-center pt-12 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🔗</div>
          <h1 className="text-3xl font-black text-gray-900">Connect Your Child</h1>
          <p className="text-gray-500 mt-2 leading-relaxed">
            Link your child's account to track their progress and provide support.
          </p>
        </div>

        {/* Steps */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {steps.map((step, i) => (
            <div key={step.n} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm transition-all ${
                  step.done
                    ? "bg-emerald-500 text-white shadow-md"
                    : (i === 0 && !otpSent) || (i === 1 && otpSent && !connected)
                    ? "bg-purple-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-400"
                }`}>
                  {step.done ? "✓" : step.n}
                </div>
                <span className={`text-xs font-semibold mt-1 ${step.done ? "text-emerald-500" : "text-gray-400"}`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-0.5 mb-4 transition-all ${step.done ? "bg-emerald-400" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        <Card className="p-7 rounded-3xl border-0 shadow-lg bg-white">
          {!connected ? (
            <>
              {!otpSent ? (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Child's Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="child@email.com"
                      value={childEmail}
                      onChange={(e) => setChildEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendOTP()}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-800 transition-all"
                    />
                    {message && <p className="text-red-500 text-sm mt-1.5 font-medium">{message}</p>}
                  </div>
                  <button
                    onClick={handleSendOTP}
                    className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-violet-700 transition active:scale-95 shadow-md"
                  >
                    Send OTP →
                  </button>
                  <p className="text-xs text-gray-400 text-center">
                    We'll generate a demo OTP for testing purposes.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-2xl border border-purple-100">
                    <span className="text-xl">📧</span>
                    <div>
                      <p className="text-xs text-purple-500 font-semibold">Sending OTP to</p>
                      <p className="font-bold text-purple-800 text-sm">{childEmail}</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-2xl text-center">
                    <p className="text-xs text-amber-600 font-semibold mb-1">🔑 Demo OTP (for testing)</p>
                    <p className="text-3xl font-black text-amber-700 tracking-widest">{generatedOtp}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleVerifyOTP()}
                      maxLength={6}
                      className="w-full border-2 border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 text-gray-800 text-center text-xl font-black tracking-widest transition-all"
                    />
                    {message && <p className="text-red-500 text-sm mt-1.5 font-medium text-center">{message}</p>}
                  </div>

                  <button
                    onClick={handleVerifyOTP}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold rounded-2xl hover:from-emerald-600 hover:to-green-700 transition active:scale-95 shadow-md"
                  >
                    Verify & Connect ✓
                  </button>

                  <button
                    onClick={() => { setOtpSent(false); setOtpInput(""); setMessage(""); }}
                    className="text-sm text-gray-400 hover:text-gray-600 text-center transition"
                  >
                    ← Use a different email
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-black text-gray-800 mb-2">Child Connected!</h2>
              <p className="text-gray-500 mb-2">
                <span className="font-bold text-purple-600">{childEmail}</span> has been linked to your account.
              </p>
              <p className="text-sm text-gray-400 mb-6">You can now track their progress from the dashboard.</p>
              <a
                href="/parent-dashboard"
                className="inline-block px-6 py-3 bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-violet-700 transition shadow-md"
              >
                Go to Dashboard →
              </a>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}