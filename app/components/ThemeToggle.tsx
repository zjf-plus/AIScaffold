import { useTheme } from "~/lib/contexts/ThemeContext";

const themes = [
  { name: "浅色", value: "light", icon: "☀️" },
  { name: "深色", value: "dark", icon: "🌙" },
  { name: "蓝色", value: "blue", icon: "🔵" },
  { name: "绿色", value: "green", icon: "🟢" },
  { name: "紫色", value: "purple", icon: "🟣" },
];

const menuModes = [
  { name: "侧边栏", value: "sidebar", icon: "📋" },
  { name: "顶部栏", value: "topbar", icon: "📊" },
];

export default function ThemeToggle() {
  const { theme, menuMode, setTheme, setMenuMode, isMobile } = useTheme();

  return (
    <div className="flex items-center space-x-4">
      {/* 主题切换 */}
      <div className="relative group">
        <button className="p-2 text-foreground/60 hover:text-foreground transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
          </svg>
        </button>
        
        {/* 主题选择下拉菜单 */}
        <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <div className="text-xs font-medium text-foreground/60 mb-2">选择主题</div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value as any)}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    theme === t.value
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/70 hover:bg-secondary"
                  }`}
                >
                  <span className="mr-3">{t.icon}</span>
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 菜单模式切换 - 仅在非移动端显示 */}
      {!isMobile && (
        <div className="relative group">
          <button className="p-2 text-foreground/60 hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* 菜单模式选择下拉菜单 */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="p-2">
              <div className="text-xs font-medium text-foreground/60 mb-2">菜单布局</div>
              <div className="space-y-1">
                {menuModes.map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => setMenuMode(mode.value as any)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                      menuMode === mode.value
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:bg-secondary"
                    }`}
                  >
                    <span className="mr-3">{mode.icon}</span>
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 移动端菜单按钮 */}
      {isMobile && (
        <button className="p-2 text-foreground/60 hover:text-foreground transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </div>
  );
}
