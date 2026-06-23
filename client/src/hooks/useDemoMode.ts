import { useState, useEffect } from "react";

/**
 * Custom hook to manage demo mode state
 * Persists demo mode preference in localStorage
 */
export const useDemoMode = () => {
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("findash-demo-mode");
    return stored === "true";
  });

  useEffect(() => {
    localStorage.setItem("findash-demo-mode", String(isDemoMode));
  }, [isDemoMode]);

  const toggleDemoMode = () => {
    setIsDemoMode((prev) => !prev);
  };

  const enableDemoMode = () => {
    setIsDemoMode(true);
  };

  const disableDemoMode = () => {
    setIsDemoMode(false);
  };

  return {
    isDemoMode,
    toggleDemoMode,
    enableDemoMode,
    disableDemoMode,
  };
};
