import { Link, useLocation } from "@remix-run/react";
import { Menu, X, FileText, ChevronDown, Plus, List, PieChart, TrendingUp, UserPlus, Shield, User, Settings, LogOut, Key } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeSelector } from "~/components/ThemeSelector";
import { LayoutToggle } from "~/components/LayoutToggle";
import { Button } from "~/components/ui/button";
import { useLayout } from "~/lib/contexts/LayoutContext";
import { cn } from "~/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const { layoutMode, isSidebarOpen, setIsSidebarOpen } = useLayout();

  // 用户菜单处理函数
  const handleChangePassword = () => {
    // TODO: 实现修改密码功能
    console.log("修改密码");
  };

  const handleLogout = () => {
    // TODO: 实现注销功能
    console.log("用户注销");
  };

  // 检查菜单项是否激活
  const isItemActive = (item: any) => {
    if (location.pathname === item.href) return true;
    if (item.children) {
      return item.children.some((child: any) => location.pathname === child.href);
    }
    return false;
  };

  // 切换移动端菜单项展开状态
  const toggleMobileMenu = (itemName: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  // 处理桌面端菜单点击
  const handleMenuClick = (itemName: string) => {
    if (clickedItem === itemName) {
      // 如果点击的是当前已打开的菜单，则关闭它
      setClickedItem(null);
    } else {
      // 否则打开新菜单
      setClickedItem(itemName);
    }
  };

  // 处理点击外部区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // 检查点击是否在菜单区域外
      if (!target.closest('.menu-container') && !target.closest('.dropdown-menu')) {
        setClickedItem(null);
      }
    };

    if (clickedItem) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [clickedItem]);

  const navigation = [
    { name: "首页", href: "/", isDirectory: false },
    { 
      name: "经费管理", 
      href: "#",
      isDirectory: true,
      children: [
        { name: "预算列表", href: "/budgets", isDirectory: false },
        { name: "新增预算", href: "/budgets/new", isDirectory: false },
        { name: "预算分析", href: "/budgets/analysis", isDirectory: false }
      ]
    },
    { 
      name: "统计报表", 
      href: "#",
      isDirectory: true,
      children: [
        { name: "财务报表", href: "/reports/financial", isDirectory: false },
        { name: "预算报表", href: "/reports/budget", isDirectory: false },
        { name: "支出分析", href: "/reports/expense", isDirectory: false }
      ]
    },
    { 
      name: "用户管理", 
      href: "#",
      isDirectory: true,
      children: [
        { name: "用户列表", href: "/users", isDirectory: false },
        { name: "添加用户", href: "/users/new", isDirectory: false },
        { name: "权限管理", href: "/users/permissions", isDirectory: false }
      ]
    },
    { 
      name: "系统设置", 
      href: "#",
      isDirectory: true,
      children: [
        { name: "基本设置", href: "/settings/general", isDirectory: false },
        { name: "预算分类", href: "/settings/categories", isDirectory: false },
        { name: "系统配置", href: "/settings/system", isDirectory: false }
      ]
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full max-w-none px-6 flex h-14 items-center justify-between">
        {/* 左侧区域：Logo + 导航 */}
        <div className="flex items-center">
          {/* 移动端菜单按钮 - 放在Logo旁边 */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden mr-2"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">打开菜单</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>导航菜单</SheetTitle>
                <SheetDescription>
                  选择您要访问的页面
                </SheetDescription>
              </SheetHeader>
              
              <div className="mt-6">
                <nav className="flex flex-col space-y-2">
                  {navigation.map((item) => {
                    const hasChildren = item.children && item.children.length > 0;
                    const isExpanded = expandedItems.has(item.name);
                    const isActive = isItemActive(item);
                    
                    return (
                      <div key={item.name}>
                        <div className="flex items-center">
                          {item.isDirectory ? (
                            <button
                              onClick={() => toggleMobileMenu(item.name)}
                              className={cn(
                                "flex items-center justify-between w-full px-3 py-2 text-base font-medium transition-colors hover:text-foreground/80",
                                isActive ? "text-primary bg-muted" : "text-foreground/60"
                              )}
                            >
                              <span>{item.name}</span>
                              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                          ) : (
                            <Link
                              to={item.href}
                              className={cn(
                                "flex items-center px-3 py-2 text-base font-medium transition-colors hover:text-foreground/80",
                                isActive ? "text-primary bg-muted" : "text-foreground/60"
                              )}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {item.name}
                            </Link>
                          )}
                        </div>
                        
                        {/* 子菜单 */}
                        {hasChildren && isExpanded && (
                          <div className="ml-4 mt-1 space-y-1">
                            {item.children.map((child: any) => {
                              const isChildActive = location.pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className={cn(
                                    "block px-3 py-2 text-sm transition-colors hover:text-foreground/80",
                                    isChildActive ? "text-primary bg-muted" : "text-muted-foreground"
                                  )}
                                  onClick={() => setIsMenuOpen(false)}
                                >
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
            </SheetContent>
          </Sheet>

          {/* 标题区域 */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span className="font-bold hidden sm:inline">经费管理系统</span>
            </Link>
          </div>

          {/* 顶部导航 - 只在顶部菜单模式显示 */}
          {layoutMode === "topbar" && (
            <nav className="hidden lg:flex items-center space-x-6 text-base font-medium ml-8 menu-container">
              {navigation.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isClicked = clickedItem === item.name;
                const isActive = isItemActive(item);
                
                return (
                  <div 
                    key={item.name} 
                    className="relative group"
                  >
                    {item.isDirectory ? (
                      <button 
                        onClick={() => handleMenuClick(item.name)}
                        className={cn(
                          "flex items-center space-x-1 px-3 py-2 rounded-md transition-colors hover:text-foreground/80 hover:bg-muted/50 w-full",
                          isActive ? "text-primary bg-muted/30" : "text-foreground/60"
                        )}
                      >
                        <span>{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isClicked ? 'rotate-180' : ''}`} />
                      </button>
                    ) : (
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md transition-colors hover:text-foreground/80 hover:bg-muted/50",
                          isActive ? "text-primary bg-muted/30" : "text-foreground/60"
                        )}
                      >
                        {item.name}
                      </Link>
                    )}
                    
                    {hasChildren && isClicked && (
                      <div 
                        className="absolute top-full left-0 mt-2 w-56 bg-background border rounded-lg shadow-xl z-50 dropdown-menu"
                      >
                        <div className="py-3">
                          {item.children.map((child) => {
                            const isChildActive = location.pathname === child.href;
                            return (
                              <Link
                                key={child.name}
                                to={child.href}
                                className={cn(
                                  "block px-5 py-3 text-sm hover:text-foreground/80 hover:bg-muted transition-colors rounded-md mx-2",
                                  isChildActive ? "text-primary bg-muted" : "text-foreground/60"
                                )}
                                onClick={() => setClickedItem(null)}
                              >
                                {child.name}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        {/* 右侧控制区域 */}
        <div className="flex items-center space-x-2">
          {/* 控制按钮 */}
          <div className="flex items-center space-x-2">
            {/* 布局切换按钮 - 只在桌面端显示 */}
            <div className="hidden lg:block">
              <LayoutToggle />
            </div>
            <ThemeSelector />
            
            {/* 用户头像和菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  <User className="h-4 w-4 text-white" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">当前用户</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      user@example.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleChangePassword}>
                  <Key className="mr-2 h-4 w-4" />
                  <span>修改密码</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>个人设置</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>注销</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

    </header>
  );
}