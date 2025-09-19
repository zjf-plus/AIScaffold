import { useTheme } from "~/lib/contexts/ThemeContext";

export default function Demo() {
  const { theme, menuMode, isMobile } = useTheme();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-card-foreground mb-6">
          主题和菜单模式演示
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 当前设置 */}
          <div className="bg-secondary rounded-lg p-4">
            <h2 className="text-xl font-semibold text-secondary-foreground mb-4">
              当前设置
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">主题:</span>
                <span className="font-medium text-secondary-foreground capitalize">{theme}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">菜单模式:</span>
                <span className="font-medium text-secondary-foreground capitalize">{menuMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-secondary-foreground/70">设备类型:</span>
                <span className="font-medium text-secondary-foreground">
                  {isMobile ? "移动端" : "桌面端"}
                </span>
              </div>
            </div>
          </div>

          {/* 功能说明 */}
          <div className="bg-secondary rounded-lg p-4">
            <h2 className="text-xl font-semibold text-secondary-foreground mb-4">
              功能说明
            </h2>
            <ul className="space-y-2 text-secondary-foreground/70">
              <li>• 点击右上角的主题按钮切换配色</li>
              <li>• 支持浅色、深色、蓝色、绿色、紫色主题</li>
              <li>• 桌面端可切换侧边栏和顶部菜单模式</li>
              <li>• 移动端自动使用移动端菜单样式</li>
              <li>• 设置会自动保存到本地存储</li>
            </ul>
          </div>
        </div>

        {/* 主题预览 */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-card-foreground mb-4">
            主题预览
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: "浅色", value: "light", color: "bg-gray-100" },
              { name: "深色", value: "dark", color: "bg-gray-800" },
              { name: "蓝色", value: "blue", color: "bg-blue-100" },
              { name: "绿色", value: "green", color: "bg-green-100" },
              { name: "紫色", value: "purple", color: "bg-purple-100" },
            ].map((t) => (
              <div
                key={t.value}
                className={`${t.color} rounded-lg p-4 text-center ${
                  theme === t.value ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="font-medium text-foreground">{t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
