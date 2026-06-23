import { createContext, useContext, ReactNode, useCallback } from "react";
import { useDemoMode } from "@/hooks/useDemoMode";
import { useDispatch } from "react-redux";
import { api } from "@/state/api";

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider = ({ children }: { children: ReactNode }) => {
  const demoMode = useDemoMode();
  const dispatch = useDispatch();

  // Wrap toggle functions to invalidate cache when demo mode changes
  const toggleDemoMode = useCallback(() => {
    demoMode.toggleDemoMode();
    dispatch(api.util.invalidateTags(["Kpis", "Products", "Transactions"]));
  }, [demoMode, dispatch]);

  const enableDemoMode = useCallback(() => {
    demoMode.enableDemoMode();
    dispatch(api.util.invalidateTags(["Kpis", "Products", "Transactions"]));
  }, [demoMode, dispatch]);

  const disableDemoMode = useCallback(() => {
    demoMode.disableDemoMode();
    dispatch(api.util.invalidateTags(["Kpis", "Products", "Transactions"]));
  }, [demoMode, dispatch]);

  return (
    <DemoModeContext.Provider
      value={{
        isDemoMode: demoMode.isDemoMode,
        toggleDemoMode,
        enableDemoMode,
        disableDemoMode,
      }}
    >
      {children}
    </DemoModeContext.Provider>
  );
};

export const useDemoModeContext = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error("useDemoModeContext must be used within DemoModeProvider");
  }
  return context;
};
