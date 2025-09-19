import { Outlet, Link, useLocation } from "react-router";
import { useTheme } from "~/lib/contexts/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";

export default function Layout({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const { menuMode, isMobile } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "仪表板", href: "/dashboard", icon: "📊" },
    { name: "资产管理", href: "/assets", icon: "📦" },
    { name: "采购管理", href: "/procurement", icon: "🛒" },
    { name: "销售管理", href: "/sales", icon: "💰" },
    { name: "供应商管理", href: "/suppliers", icon: "🏢" },
    { name: "客户管理", href: "/customers", icon: "👥" },
    { name: "用户管理", href: "/users", icon: "👤" },
    { name: "主题演示", href: "/demo", icon: "🎨" },
  ];

  // 渲染侧边栏导航
  const renderSidebarNav = () => (
    <nav className="mt-6 px-3">
      <ul className="space-y-1">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  // 渲染顶部导航
  const renderTopNav = () => (
    <nav className="flex space-x-8 px-6">
      {navigation.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
            location.pathname === item.href
              ? "bg-primary/10 text-primary"
              : "text-foreground/70 hover:bg-secondary hover:text-foreground"
          }`}
        >
          <span className="mr-2 text-lg">{item.icon}</span>
          {item.name}
        </Link>
      ))}
    </nav>
  );

  // 渲染移动端导航
  const renderMobileNav = () => (
    <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileMenuOpen(false)} />
      <div className="fixed inset-y-0 left-0 w-64 bg-card shadow-lg">
        <div className="flex h-16 items-center justify-between px-6 border-b border-border">
          <h1 className="text-xl font-bold text-card-foreground">资产管理系统</h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {renderSidebarNav()}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 侧边栏模式 */}
      {menuMode === "sidebar" && !isMobile && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg">
          <div className="flex h-16 items-center px-6 border-b border-border">
            <h1 className="text-xl font-bold text-card-foreground">资产管理系统</h1>
          </div>
          {renderSidebarNav()}
        </div>
      )}

      {/* 顶部导航模式 */}
      {menuMode === "topbar" && !isMobile && (
        <div className="bg-card shadow-sm border-b border-border">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-card-foreground mr-8">资产管理系统</h1>
              {renderTopNav()}
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-foreground/70">管理员</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 移动端模式 */}
      {isMobile && (
        <header className="bg-card shadow-sm border-b border-border">
          <div className="flex h-16 items-center justify-between px-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-foreground/60 hover:text-foreground"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-card-foreground">资产管理系统</h1>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>
      )}

      {/* 移动端导航菜单 */}
      {renderMobileNav()}

      {/* 主内容区域 */}
      <div className={menuMode === "sidebar" && !isMobile ? "pl-64" : ""}>
        {/* 侧边栏模式的顶部导航栏 */}
        {menuMode === "sidebar" && !isMobile && (
          <header className="bg-card shadow-sm border-b border-border">
            <div className="flex h-16 items-center justify-between px-6">
              <div className="flex items-center">
                <h2 className="text-lg font-semibold text-card-foreground">
                  {navigation.find(item => item.href === location.pathname)?.name || "页面"}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">A</span>
                  </div>
                  <span className="text-sm font-medium text-foreground/70">管理员</span>
                </div>
              </div>
            </div>
          </header>
        )}

        {/* 页面内容 */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}
