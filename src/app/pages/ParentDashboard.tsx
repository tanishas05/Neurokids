import { useState, useEffect } from "react";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Progress } from "../components/ui/progress";
import { Link } from "react-router";

import {
  BarChart3,
  TrendingUp,
  AlertCircle,
  Lightbulb,
  Activity,
  Clock,
  Users,
  Plus
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

    if (storedChildren.length > 0) {
      setSelectedChild(storedChildren[0]);
    }
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const { gameId, score, total, completedAt } =
      (e as CustomEvent).detail;
      console.log("Game completed:", {
        gameId,
        score,
        total,
        completedAt,
      });
  };

  window.addEventListener("neurokids:gameComplete", handler);

  return () => {
    window.removeEventListener("neurokids:gameComplete", handler);
  };
}, []);

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: "1",
      module: "Social Coach",
      activity: "Completed 3 scenarios",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      duration: 15,
      performance: 85,
    },
    {
      id: "2",
      module: "Learning Engine",
      activity: "Solved 5 math problems",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
      duration: 20,
      performance: 80,
    },
    {
      id: "3",
      module: "Dyslexia Games",
      activity: "Word scramble practice",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      duration: 12,
      performance: 90,
    },
  ]);

  const stats = {
    totalSessions: 12,
    averageSessionTime: 18,
    weeklyProgress: 75,
    favoriteModule: "Learning Engine",
  };

  const insights = [
    {
      title: "Great Progress in Learning!",
      message: "Your child completed 80% of math problems correctly this week.",
      icon: TrendingUp,
    },
    {
      title: "Social Practice Needed",
      message: "It's been 2 days since the last Social Coach session.",
      icon: AlertCircle,
    },
    {
      title: "Reading Improvement Tip",
      message: "Your child shows strong phonetic matching progress.",
      icon: Lightbulb,
    },
  ];

  const communicationStrategies = [
    {
      strategy: "Visual Schedules",
      description: "Use visual timers and schedules to help transitions.",
      impact: "High",
    },
    {
      strategy: "Clear Instructions",
      description: "Break instructions into smaller steps.",
      impact: "High",
    },
    {
      strategy: "Positive Reinforcement",
      description: "Celebrate small wins and effort.",
      impact: "Medium",
    },
    {
      strategy: "Sensory Breaks",
      description: "Allow movement breaks every 20–30 minutes.",
      impact: "Medium",
    },
  ];

  const learningPatterns = [
    {
      pattern: "Best Learning Time",
      value: "Morning (9AM – 11AM)",
      insight: "Focus levels are highest during morning sessions.",
    },
    {
      pattern: "Strongest Skill",
      value: "Visual Pattern Recognition",
      insight: "Shape-based tasks show high accuracy.",
    },
    {
      pattern: "Challenge Area",
      value: "Social Cue Interpretation",
      insight: "More Social Coach practice recommended.",
    },
    {
      pattern: "Preferred Style",
      value: "Interactive Games",
      insight: "Game-based sessions have highest engagement.",
    },
  ];

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor(
      (new Date().getTime() - date.getTime()) / 1000
    );

    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;

    return `${Math.floor(seconds / 86400)}d ago`;
  };

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Parent Dashboard
          </h1>
          <p className="text-gray-600">
            Track progress and insights
          </p>
        </div>

      </div>

      {/* Children Section */}

      <Card className="p-6 mb-8">

        <div className="flex items-center justify-between mb-4">

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">
              Connected Children
            </h2>
          </div>

          <Link to="/connect-child">

            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">

              <Plus className="w-4 h-4" />
              Connect Child

            </button>

          </Link>

        </div>

        {children.length === 0 ? (
          <p className="text-gray-500">
            No children connected yet.
          </p>
        ) : (

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">

            {children.map((child, index) => (

              <div
                key={index}
                onClick={() => setSelectedChild(child)}
                className={`p-4 border rounded-xl cursor-pointer transition
                ${
                  selectedChild === child
                    ? "bg-purple-100 border-purple-400"
                    : "bg-purple-50 border-purple-200 hover:bg-purple-100"
                }`}
              >
                <p className="font-medium text-gray-800">
                  {child}
                </p>

                <p className="text-sm text-gray-500">
                  Child Account
                </p>

              </div>

            ))}

          </div>

        )}

      </Card>

      {selectedChild && (

        <Card className="p-4 mb-8 bg-blue-50 border-blue-200">

          <p className="text-sm text-blue-700">
            Viewing analytics for
          </p>

          <p className="text-lg font-semibold text-blue-900">
            {selectedChild}
          </p>

        </Card>

      )}

      {/* Stats */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <Card className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Total Sessions
            </span>
            <Activity className="w-4 h-4 text-purple-600" />
          </div>

          <p className="text-3xl font-bold">
            {stats.totalSessions}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Avg Session
            </span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>

          <p className="text-3xl font-bold">
            {stats.averageSessionTime}m
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Weekly Progress
            </span>
            <TrendingUp className="w-4 h-4 text-green-600" />
          </div>

          <p className="text-3xl font-bold">
            {stats.weeklyProgress}%
          </p>

          <Progress value={stats.weeklyProgress} className="mt-2" />
        </Card>

        <Card className="p-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">
              Favorite Module
            </span>
            <Lightbulb className="w-4 h-4 text-yellow-600" />
          </div>

          <p className="text-lg font-bold">
            {stats.favoriteModule}
          </p>
        </Card>

      </div>

      {/* Tabs */}

      <Tabs defaultValue="insights">

        <TabsList className="grid grid-cols-4 mb-6">

          <TabsTrigger value="insights">
            Insights
          </TabsTrigger>

          <TabsTrigger value="activity">
            Activity
          </TabsTrigger>

          <TabsTrigger value="strategies">
            Strategies
          </TabsTrigger>

          <TabsTrigger value="patterns">
            Patterns
          </TabsTrigger>

        </TabsList>

        {/* Insights */}

        <TabsContent value="insights">

          <div className="space-y-4">

            {insights.map((insight, index) => {

              const Icon = insight.icon;

              return (

                <Card key={index} className="p-6">

                  <div className="flex gap-4">

                    <Icon className="w-6 h-6 text-purple-600" />

                    <div>

                      <h3 className="font-bold text-lg">
                        {insight.title}
                      </h3>

                      <p className="text-gray-600">
                        {insight.message}
                      </p>

                    </div>

                  </div>

                </Card>

              );

            })}

          </div>

        </TabsContent>

        {/* Activity */}

        <TabsContent value="activity">

          <Card className="p-6">

            <div className="space-y-4">

              {activityLogs.map((log) => (

                <div
                  key={log.id}
                  className="p-4 border rounded-lg flex justify-between"
                >

                  <div>

                    <p className="font-medium">
                      {log.module}
                    </p>

                    <p className="text-sm text-gray-600">
                      {log.activity}
                    </p>

                    <p className="text-xs text-gray-500">
                      {formatTimeAgo(log.timestamp)}
                    </p>

                  </div>

                  <div className="text-right">

                    <Badge>
                      {log.performance}%
                    </Badge>

                    <p className="text-xs text-gray-500">
                      {log.duration} min
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </Card>

        </TabsContent>

        {/* Strategies */}

        <TabsContent value="strategies">

          <Card className="p-6">

            <div className="space-y-4">

              {communicationStrategies.map((strategy, index) => (

                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg flex justify-between"
                >

                  <div>

                    <p className="font-medium">
                      {strategy.strategy}
                    </p>

                    <p className="text-sm text-gray-600">
                      {strategy.description}
                    </p>

                  </div>

                  <Badge variant="outline">
                    {strategy.impact}
                  </Badge>

                </div>

              ))}

            </div>

          </Card>

        </TabsContent>

        {/* Patterns */}

        <TabsContent value="patterns">

          <Card className="p-6">

            <div className="space-y-4">

              {learningPatterns.map((pattern, index) => (

                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg"
                >

                  <p className="font-medium">
                    {pattern.pattern}
                  </p>

                  <p className="text-purple-600 font-semibold">
                    {pattern.value}
                  </p>

                  <p className="text-sm text-gray-600">
                    {pattern.insight}
                  </p>

                </div>

              ))}

            </div>

          </Card>

        </TabsContent>

      </Tabs>

    </div>
  );
}
