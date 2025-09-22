import { createContext, useContext, useEffect, useState } from "react";
import { themes, getThemeById, getDefaultTheme, type ThemeConfig } from "~/lib/config/themes";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultColorTheme?: string;
  colorThemeStorageKey?: string;
};

type ThemeProviderState = {
  colorTheme: string;
  setColorTheme: (colorTheme: string) => void;
  currentThemeConfig: ThemeConfig;
};

const initialState: ThemeProviderState = {
  colorTheme: "default",
  setColorTheme: () => null,
  currentThemeConfig: getDefaultTheme(),
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultColorTheme = "default",
  colorThemeStorageKey = "vite-ui-color-theme",
  ...props
}: ThemeProviderProps) {
  const [colorTheme, setColorTheme] = useState<string>(
    () => {
      if (typeof window !== "undefined") {
        return localStorage.getItem(colorThemeStorageKey) || defaultColorTheme;
      }
      return defaultColorTheme;
    }
  );

  const currentThemeConfig = getThemeById(colorTheme) || getDefaultTheme();

  // 应用颜色主题的 CSS 变量
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const root = window.document.documentElement;
    
    // 应用当前主题的 CSS 变量
    Object.entries(currentThemeConfig.cssVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }, [currentThemeConfig]);

  const value = {
    colorTheme,
    setColorTheme: (colorTheme: string) => {
      if (typeof window !== "undefined") {
        localStorage.setItem(colorThemeStorageKey, colorTheme);
      }
      setColorTheme(colorTheme);
    },
    currentThemeConfig,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
