// src/app/components/Layout.tsx
import { useEffect, useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import { Brain, BookOpen, Gamepad2, BarChart3, Compass, LogOut } from "lucide-react";

interface NavItem {
  path: string;
  icon: any;
  label: string;
  emoji: string;
}

export function Layout() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, []);

  const navItems: NavItem[] =
    role === "parent"
      ? [
          { path: "/parent-dashboard", icon: BarChart3, label: "Dashboard", emoji: "📊" },
          { path: "/connect-child", icon: Compass, label: "Connect Child", emoji: "🔗" },
        ]
      : role === "child"
      ? [
          { path: "/social-coach", icon: Brain, label: "Social Coach", emoji: "🧠" },
          { path: "/learning", icon: BookOpen, label: "Learning", emoji: "📚" },
          { path: "/dyslexia-games", icon: Gamepad2, label: "Games", emoji: "🎮" },
        ]
      : [];

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  const isChild = role === "child";

  return (
    <div className={`min-h-screen ${isChild ? "bg-gradient-to-br from-violet-50 via-pink-50 to-yellow-50" : "bg-gradient-to-br from-slate-50 via-purple-50 to-white"}`}>

      {!isLanding && role && (
        <header className={`sticky top-0 z-50 border-b ${
          isChild
            ? "bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 border-purple-400 shadow-lg shadow-purple-200"
            : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow ${
                isChild ? "bg-white/20 text-white" : "bg-gradient-to-br from-purple-500 to-pink-500"
              }`}>
                {isChild ? "🧒" : <Brain className="w-5 h-5 text-white" />}
              </div>
              <span className={`font-black text-lg tracking-tight ${isChild ? "text-white" : "text-gray-800"}`}>
                NeuroKids
              </span>
              {isChild && (
                <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full hidden sm:block">
                  Child Mode ✨
                </span>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                      isChild
                        ? isActive
                          ? "bg-white text-purple-600 shadow-md"
                          : "text-white/80 hover:bg-white/20 hover:text-white"
                        : isActive
                        ? "bg-purple-100 text-purple-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              <button
                onClick={handleLogout}
                className={`ml-3 flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                  isChild
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-red-50 text-red-500 hover:bg-red-100 border border-red-200"
                }`}
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </nav>
          </div>
        </header>
      )}

      <main className="w-full pb-20 md:pb-4">
        <Outlet />
      </main>

      {/* Mobile Bottom Nav */}
      {!isLanding && role && (
        <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-50 border-t ${
          isChild
            ? "bg-gradient-to-r from-violet-500 to-pink-500 border-purple-400"
            : "bg-white border-gray-200 shadow-lg"
        }`}>
          <div className="flex items-center justify-around py-2 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                    isChild
                      ? isActive
                        ? "bg-white/20 text-white scale-110"
                        : "text-white/70"
                      : isActive
                      ? "text-purple-600"
                      : "text-gray-500"
                  }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-xs font-semibold">{item.label}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                isChild ? "text-white/70" : "text-red-400"
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-semibold">Exit</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}