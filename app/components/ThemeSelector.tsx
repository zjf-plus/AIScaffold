import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme } from "~/lib/contexts/ThemeContext";
import { themes } from "~/lib/config/themes";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/lib/utils";

export function ThemeSelector() {
  const { colorTheme, setColorTheme, currentThemeConfig } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: string) => {
    setColorTheme(themeId);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">选择主题</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>选择主题</SheetTitle>
          <SheetDescription>
            选择您喜欢的颜色主题，让系统更符合您的个人喜好
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {themes.map((theme) => {
              const isSelected = colorTheme === theme.id;
              
              return (
                <div
                  key={theme.id}
                  className={cn(
                    "relative flex items-center space-x-3 rounded-lg border p-4 cursor-pointer transition-all hover:shadow-md",
                    isSelected 
                      ? "border-primary bg-primary/5 shadow-sm" 
                      : "border-border hover:border-primary/50"
                  )}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  {/* 主题颜色预览 */}
                  <div className="flex space-x-1">
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.secondary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: theme.colors.accent }}
                    />
                  </div>
                  
                  {/* 主题信息 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-foreground">
                        {theme.name}
                      </h3>
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {theme.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* 当前主题信息 */}
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <h4 className="text-sm font-medium mb-2">当前主题</h4>
            <div className="flex items-center space-x-2">
              <div 
                className="w-6 h-6 rounded border"
                style={{ backgroundColor: currentThemeConfig.colors.primary }}
              />
              <span className="text-sm text-foreground">
                {currentThemeConfig.name}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {currentThemeConfig.description}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
