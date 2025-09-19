import React, { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark" | "blue" | "green" | "purple";
export type MenuMode = "sidebar" | "topbar" | "mobile";

interface ThemeContextType {
  theme: Theme;
  menuMode: MenuMode;
  setTheme: (theme: Theme) => void;
  setMenuMode: (mode: MenuMode) => void;
  isMobile: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("theme") as Theme) || "light";
    }
    return "light";
  });

  const [menuMode, setMenuMode] = useState<MenuMode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("menuMode") as MenuMode) || "sidebar";
    }
    return "sidebar";
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      // 设置HTML元素的类名和data属性
      document.documentElement.className = theme;
      document.documentElement.setAttribute("data-theme", theme);
      // 根据主题设置body类名
      document.body.className = theme;
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("menuMode", menuMode);
    }
  }, [menuMode]);

  // 自动切换到移动端模式
  useEffect(() => {
    if (isMobile && menuMode !== "mobile") {
      setMenuMode("mobile");
    } else if (!isMobile && menuMode === "mobile") {
      setMenuMode("sidebar");
    }
  }, [isMobile, menuMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        menuMode,
        setTheme,
        setMenuMode,
        isMobile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
