import { Link, useLocation } from "@remix-run/react";
import { cn } from "~/lib/util/utils";
import {
  Home,
  ShoppingCart,
  TrendingUp,
  Package,
  BarChart3,
  Settings,
  Users,
  FileText,
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();

  const navigation = [
    { name: "首页", href: "/", icon: Home },
    { name: "采购管理", href: "/procurement", icon: ShoppingCart },
    { name: "销售管理", href: "/sales", icon: TrendingUp },
    { name: "资产管理", href: "/assets", icon: Package },
    { name: "客户管理", href: "/customers", icon: Users },
    { name: "报表分析", href: "/reports", icon: BarChart3 },
    { name: "文档管理", href: "/documents", icon: FileText },
    { name: "系统设置", href: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-64 transform bg-background border-r transition-transform duration-300 ease-in-out md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">管理系统</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground"
                  )}
                  onClick={() => {
                    // Close mobile menu when navigating
                    if (window.innerWidth < 768) {
                      onClose();
                    }
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">
              © 2024 采购销售资产管理
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
