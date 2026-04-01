// src/app/pages/ParentDashboard.tsx
import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router";
import {
  BarChart3, TrendingUp, AlertCircle, Lightbulb,
  Activity, Clock, Users, Plus
} from "lucide-react";

interface ActivityLog {
  id: string;
  module: string;
  activity: string;
  timestamp: Date;
  duration: number;
  performance: number;
}

export function ParentDashboard() {
  const [children, setChildren] = useState<string[]>([]);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  useEffect(() => {
    const storedChildren = JSON.parse(localStorage.getItem("parentChildren") || "[]");
    setChildren(storedChildren);
    if (storedChildren.length > 0) setSelectedChild(storedChildren[0]);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { gameId, score, total, completedAt } = (e as CustomEvent).detail;
      console.log("Game completed:", { gameId, score, total, completedAt });
    };
    window.addEventListener("neurokids:gameComplete", handler);
    return () => window.removeEventListener("neurokids:gameComplete", handler);
  }, []);

  const [activityLogs] = useState<ActivityLog[]>([
    { id: "1", module: "Social Coach", activity: "Completed 3 scenarios", timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), duration: 15, performance: 85 },
    { id: "2", module: "Learning Engine", activity: "Solved 5 math problems", timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), duration: 20, performance: 80 },
    { id: "3", module: "Dyslexia Games", activity: "Word scramble practice", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), duration: 12, performance: 90 },
  ]);

  const stats = { totalSessions: 12, averageSessionTime: 18, weeklyProgress: 75, favoriteModule: "Learning Engine" };

  const insights = [
    { title: "Great Progress in Learning!", message: "Your child completed 80% of math problems correctly this week.", icon: TrendingUp, color: "bg-emerald-50 border-emerald-200", iconColor: "text-emerald-500", dot: "bg-emerald-400" },
    { title: "Social Practice Needed", message: "It's been 2 days since the last Social Coach session.", icon: AlertCircle, color: "bg-amber-50 border-amber-200", iconColor: "text-amber-500", dot: "bg-amber-400" },
    { title: "Reading Improvement Tip", message: "Your child shows strong phonetic matching progress.", icon: Lightbulb, color: "bg-blue-50 border-blue-200", iconColor: "text-blue-500", dot: "bg-blue-400" },
  ];

  const communicationStrategies = [
    { strategy: "Visual Schedules", description: "Use visual timers and schedules to help transitions.", impact: "High", emoji: "📅" },
    { strategy: "Clear Instructions", description: "Break instructions into smaller steps.", impact: "High", emoji: "📋" },
    { strategy: "Positive Reinforcement", description: "Celebrate small wins and effort.", impact: "Medium", emoji: "🌟" },
    { strategy: "Sensory Breaks", description: "Allow movement breaks every 20–30 minutes.", impact: "Medium", emoji: "🧘" },
  ];

  const learningPatterns = [
    { pattern: "Best Learning Time", value: "Morning (9AM – 11AM)", insight: "Focus levels are highest during morning sessions.", emoji: "☀️" },
    { pattern: "Strongest Skill", value: "Visual Pattern Recognition", insight: "Shape-based tasks show high accuracy.", emoji: "👁️" },
    { pattern: "Challenge Area", value: "Social Cue Interpretation", insight: "More Social Coach practice recommended.", emoji: "💬" },
    { pattern: "Preferred Style", value: "Interactive Games", insight: "Game-based sessions have highest engagement.", emoji: "🎮" },
  ];

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
  };

  const moduleColors: Record<string, string> = {
    "Social Coach": "bg-purple-100 text-purple-700",
    "Learning Engine": "bg-blue-100 text-blue-700",
    "Dyslexia Games": "bg-pink-100 text-pink-700",
  };

  const moduleEmojis: Record<string, string> = {
    "Social Coach": "🧠",
    "Learning Engine": "📚",
    "Dyslexia Games": "🎮",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900">Parent Dashboard</h1>
            <p className="text-gray-500 mt-1">Monitor your child's learning journey</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Children */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-500" />
              <h2 className="text-lg font-black text-gray-800">Connected Children</h2>
            </div>
            <Link to="/connect-child">
              <button className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-purple-500 to-violet-600 text-white rounded-xl font-semibold text-sm hover:from-purple-600 hover:to-violet-700 transition shadow-sm">
                <Plus className="w-4 h-4" />
                Connect Child
              </button>
            </Link>
          </div>

          {children.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-3">👧</div>
              <p className="text-gray-500 font-medium">No children connected yet.</p>
              <p className="text-gray-400 text-sm mt-1">Use "Connect Child" to get started.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {children.map((child, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedChild(child)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedChild === child
                      ? "border-purple-400 bg-purple-50 shadow-md"
                      : "border-gray-100 bg-gray-50 hover:border-purple-200 hover:bg-purple-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center text-white font-black">
                      {child[0]?.toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{child}</p>
                      <p className="text-xs text-gray-400">Child Account</p>
                    </div>
                  </div>
                  {selectedChild === child && (
                    <div className="mt-2 text-xs text-purple-500 font-semibold">● Currently viewing</div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Sessions", value: stats.totalSessions, icon: Activity, color: "from-purple-400 to-violet-500", suffix: "" },
            { label: "Avg Session", value: stats.averageSessionTime, icon: Clock, color: "from-blue-400 to-indigo-500", suffix: "min" },
            { label: "Weekly Progress", value: stats.weeklyProgress, icon: TrendingUp, color: "from-emerald-400 to-green-500", suffix: "%" },
            { label: "Fav Module", value: null, icon: Lightbulb, color: "from-amber-400 to-orange-500", suffix: "", text: "Learning" },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="p-5 border-0 shadow-sm overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                <div className={`w-9 h-9 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-3 shadow`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs text-gray-500 font-semibold mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-gray-800">
                  {stat.value !== null ? `${stat.value}${stat.suffix}` : stat.text}
                </p>
                {stat.label === "Weekly Progress" && (
                  <Progress value={stat.value ?? 0} className="mt-2 h-1.5" />
                )}
              </Card>
            );
          })}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="insights">
          <TabsList className="grid grid-cols-4 mb-5 bg-purple-50 p-1 rounded-2xl h-auto">
            {["insights", "activity", "strategies", "patterns"].map(tab => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-xl capitalize font-semibold text-sm py-2 data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-700"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="insights">
            <div className="space-y-3">
              {insights.map((insight, i) => {
                const Icon = insight.icon;
                return (
                  <div key={i} className={`flex gap-4 p-5 rounded-2xl border ${insight.color}`}>
                    <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm shrink-0`}>
                      <Icon className={`w-5 h-5 ${insight.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-black text-gray-800">{insight.title}</h3>
                      <p className="text-gray-600 text-sm mt-0.5">{insight.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-3">
              {activityLogs.map((log) => (
                <div key={log.id} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center text-xl shrink-0">
                    {moduleEmojis[log.module] || "📌"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${moduleColors[log.module] || "bg-gray-100 text-gray-600"}`}>
                        {log.module}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{log.activity}</p>
                    <p className="text-xs text-gray-400">{formatTimeAgo(log.timestamp)} · {log.duration} min</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`text-lg font-black ${log.performance >= 85 ? "text-emerald-500" : log.performance >= 70 ? "text-amber-500" : "text-red-400"}`}>
                      {log.performance}%
                    </div>
                    <div className="flex gap-0.5 justify-end mt-1">
                      {[1,2,3].map(star => (
                        <span key={star} className="text-xs" style={{ opacity: star <= (log.performance >= 90 ? 3 : log.performance >= 70 ? 2 : 1) ? 1 : 0.2 }}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="strategies">
            <div className="grid sm:grid-cols-2 gap-3">
              {communicationStrategies.map((s, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{s.emoji}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-black text-gray-800">{s.strategy}</p>
                        <Badge variant="outline" className={s.impact === "High" ? "border-emerald-300 text-emerald-600 bg-emerald-50" : "border-amber-300 text-amber-600 bg-amber-50"}>
                          {s.impact}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="patterns">
            <div className="grid sm:grid-cols-2 gap-3">
              {learningPatterns.map((p, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{p.emoji}</span>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{p.pattern}</p>
                      <p className="font-black text-purple-600 mt-0.5">{p.value}</p>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{p.insight}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}