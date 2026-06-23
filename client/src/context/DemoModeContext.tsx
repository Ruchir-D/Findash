import { createContext, useContext, ReactNode } from "react";
import { useDemoMode } from "@/hooks/useDemoMode";

interface DemoModeContextType {
  isDemoMode: boolean;
  toggleDemoMode: () => void;
  enableDemoMode: () => void;
  disableDemoMode: () => void;
}

const DemoModeContext = createContext<DemoModeContextType | undefined>(undefined);

export const DemoModeProvider = ({ children }: { children: ReactNode }) => {
  const demoMode = useDemoMode();

  return <DemoModeContext.Provider value={demoMode}>{children}</DemoModeContext.Provider>;
};

export const useDemoModeContext = () => {
  const context = useContext(DemoModeContext);
  if (!context) {
    throw new Error("useDemoModeContext must be used within DemoModeProvider");
  }
  return context;
};
