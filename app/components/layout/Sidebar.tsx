import { Link, useLocation } from "@remix-run/react";
import { 
  Home, 
  DollarSign, 
  BarChart3, 
  Settings,
  Users,
  FileText,
  ChevronDown,
  ChevronRight,
  Plus,
  List,
  PieChart,
  TrendingUp,
  UserPlus,
  Shield
} from "lucide-react";
import { cn } from "~/lib/utils";
import { useLayout } from "~/lib/contexts/LayoutContext";
import { useState, useEffect } from "react";

const navigation = [
  { 
    name: "首页", 
    href: "/", 
    icon: Home,
    isDirectory: false
  },
  { 
    name: "经费管理", 
    href: "#", 
    icon: DollarSign,
    isDirectory: true,
    children: [
      { name: "预算列表", href: "/budgets", icon: List, isDirectory: false },
      { name: "新增预算", href: "/budgets/new", icon: Plus, isDirectory: false },
      { name: "预算分析", href: "/budgets/analysis", icon: PieChart, isDirectory: false }
    ]
  },
  { 
    name: "统计报表", 
    href: "#", 
    icon: BarChart3,
    isDirectory: true,
    children: [
      { name: "财务报表", href: "/reports/financial", icon: TrendingUp, isDirectory: false },
      { name: "预算报表", href: "/reports/budget", icon: BarChart3, isDirectory: false },
      { name: "支出分析", href: "/reports/expense", icon: PieChart, isDirectory: false }
    ]
  },
  { 
    name: "用户管理", 
    href: "#", 
    icon: Users,
    isDirectory: true,
    children: [
      { name: "用户列表", href: "/users", icon: Users, isDirectory: false },
      { name: "添加用户", href: "/users/new", icon: UserPlus, isDirectory: false },
      { name: "权限管理", href: "/users/permissions", icon: Shield, isDirectory: false }
    ]
  },
  { 
    name: "系统设置", 
    href: "#", 
    icon: Settings,
    isDirectory: true,
    children: [
      { name: "基本设置", href: "/settings/general", icon: Settings, isDirectory: false },
      { name: "预算分类", href: "/settings/categories", icon: List, isDirectory: false },
      { name: "系统配置", href: "/settings/system", icon: Shield, isDirectory: false }
    ]
  },
];

export function Sidebar() {
  const location = useLocation();
  const { layoutMode, isSidebarOpen } = useLayout();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // 在顶部菜单模式下隐藏侧边栏
  if (layoutMode === "topbar") {
    return null;
  }

  // 根据当前路由自动展开对应的父菜单
  useEffect(() => {
    const currentPath = location.pathname;
    const parentMenus: string[] = [];
    
    navigation.forEach(item => {
      if (item.children) {
        const hasActiveChild = item.children.some(child => child.href === currentPath);
        if (hasActiveChild) {
          parentMenus.push(item.name);
        }
      }
    });
    
    if (parentMenus.length > 0) {
      setExpandedItems(prev => {
        const newExpanded = [...new Set([...prev, ...parentMenus])];
        return newExpanded;
      });
    }
  }, [location.pathname]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const isItemActive = (item: any) => {
    if (location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child: any) => location.pathname === child.href);
    }
    return false;
  };

  return (
    <div className={`border-r bg-muted/40 w-48 flex-shrink-0 h-full ${isSidebarOpen ? 'block' : 'hidden'} md:block`}>
      <div className="flex h-full flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-base font-medium">
            {navigation.map((item) => {
              const isActive = isItemActive(item);
              const isExpanded = expandedItems.includes(item.name);
              const hasChildren = item.children && item.children.length > 0;
              const isDirectory = item.isDirectory;

              return (
                <div key={item.name}>
                  <div className="flex items-center">
                    {isDirectory ? (
                      <button
                        onClick={() => toggleExpanded(item.name)}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary flex-1 text-left",
                          isActive && "bg-muted text-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base">{item.name}</span>
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4 ml-auto" />
                        ) : (
                          <ChevronRight className="h-4 w-4 ml-auto" />
                        )}
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary flex-1",
                          isActive && "bg-muted text-primary"
                        )}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base">{item.name}</span>
                      </Link>
                    )}
                  </div>
                  
                  {hasChildren && isExpanded && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.children.map((child) => {
                        const isChildActive = location.pathname === child.href;
                        return (
                          <Link
                            key={child.name}
                            to={child.href}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-all hover:text-primary",
                              isChildActive && "bg-muted text-primary"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
