import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Landing } from "./pages/Landing";
import { Explore } from "./pages/Explore";
import { SocialCoach } from "./pages/SocialCoach";
import DyslexiaGames from "./pages/DyslexiaGames";
import LearningEngine from "./pages/LearningEngine";
import { ParentDashboard } from "./pages/ParentDashboard";
import { Insights } from "./pages/Insights";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Landing },
      { path: "explore", Component: Explore },
      { path: "social-coach", Component: SocialCoach },
      { path: "learning", Component: LearningEngine },
      { path: "dyslexia-games", Component: DyslexiaGames },
      { path: "parent-dashboard", Component: ParentDashboard },
      { path: "insights", Component: Insights },
      { path: "*", Component: NotFound },
    ],
  },
]);