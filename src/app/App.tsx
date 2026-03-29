// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Import your pages/components
import { ParentDashboard } from "./pages/ParentDashboard";
import  ConnectChild from "./pages/ConnectChild";
import { SocialCoach } from "./pages/SocialCoach";
import { Landing } from "./pages/Landing";
import LearningEnginePage from "./pages/LearningEngine";
import DyslexiaGamesPage from "./pages/DyslexiaGames";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* All protected routes wrapped in Layout */}
        <Route element={<Layout />}>
          {/* Parent Routes */}
          <Route
            path="/parent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <ParentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/connect-child"
            element={
              <ProtectedRoute allowedRoles={["parent"]}>
                <ConnectChild />
              </ProtectedRoute>
            }
          />

          {/* Child Routes */}
          <Route
            path="/social-coach"
            element={
              <ProtectedRoute allowedRoles={["child"]}>
                <SocialCoach />
              </ProtectedRoute>
            }
          />
          <Route
            path="/learning"
            element={
              <ProtectedRoute allowedRoles={["child"]}>
                <LearningEnginePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dyslexia-games"
            element={
              <ProtectedRoute allowedRoles={["child"]}>
                <DyslexiaGamesPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all: redirect to landing page */}
        <Route path="*" element={<Landing />} />
        
        <Route path="/learning-engine" element={<LearningEnginePage />} />
        <Route path="/dyslexia-games"  element={<DyslexiaGamesPage />} />
      </Routes>
    </Router>
  );
}