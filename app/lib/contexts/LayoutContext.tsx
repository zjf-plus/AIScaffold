import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type LayoutMode = "sidebar" | "topbar";

interface LayoutContextType {
  layoutMode: LayoutMode;
  setLayoutMode: (mode: LayoutMode) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

const storageKey = "layout-mode";

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [layoutMode, setLayoutModeState] = useState<LayoutMode>(() => {
    if (typeof window === "undefined") return "sidebar";
    
    const stored = localStorage.getItem(storageKey);
    return (stored as LayoutMode) || "sidebar";
  });
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const setLayoutMode = (mode: LayoutMode) => {
    setLayoutModeState(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem(storageKey, mode);
    }
  };

  // 当布局模式改变时，关闭侧边栏
  useEffect(() => {
    if (layoutMode === "topbar") {
      setIsSidebarOpen(false);
    }
  }, [layoutMode]);

  const value = {
    layoutMode,
    setLayoutMode,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return (
    <LayoutContext.Provider value={value}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
