import { Sidebar, LayoutGrid } from "lucide-react";
import { Button } from "~/components/ui/button";
import { useLayout } from "~/lib/contexts/LayoutContext";

export function LayoutToggle() {
  const { layoutMode, setLayoutMode } = useLayout();

  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant={layoutMode === "sidebar" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLayoutMode("sidebar")}
        className="h-8 w-8 p-0"
      >
        <Sidebar className="h-4 w-4" />
        <span className="sr-only">左侧菜单</span>
      </Button>
      <Button
        variant={layoutMode === "topbar" ? "default" : "ghost"}
        size="sm"
        onClick={() => setLayoutMode("topbar")}
        className="h-8 w-8 p-0"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">顶部菜单</span>
      </Button>
    </div>
  );
}
