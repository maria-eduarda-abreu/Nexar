
// src/App.jsx
import React, { useState } from "react";
import BottomNav       from "./components/BottomNav";
import InterestsPage   from "./pages/InterestsPage";
import DashboardPage   from "./pages/DashboardPage";
import SkillsPage      from "./pages/SkillsPage";
import ConnectionsPage from "./pages/ConnectionsPage";

/**
 * Screens:
 *   onboarding  → InterestsPage (sem nav)
 *   home        → alias para dashboard
 *   dashboard   → DashboardPage
 *   skills      → SkillsPage
 *   connections → ConnectionsPage
 */
export default function App() {
  const [screen, setScreen] = useState("onboarding");

  const navigate = (key) => setScreen(key);

  const showNav = screen !== "onboarding";

  return (
    <>
      {screen === "onboarding" && (
        <InterestsPage onComplete={() => navigate("dashboard")} />
      )}
      {(screen === "home" || screen === "dashboard") && (
        <DashboardPage onNavigate={navigate} />
      )}
      {screen === "skills" && (
        <SkillsPage onNavigate={navigate} />
      )}
      {screen === "connections" && (
        <ConnectionsPage />
      )}

      {showNav && (
        <BottomNav active={screen === "home" ? "dashboard" : screen} onNavigate={navigate} />
      )}
    </>
  );
}

