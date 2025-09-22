import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LayoutProvider, useLayout } from "~/lib/contexts/LayoutContext";

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutProps) {
  const { isTransitioning } = useLayout();

  if (isTransitioning) {
    return (
      <div className="h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          <span className="text-muted-foreground">切换布局中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background">
      <div className="flex w-full max-w-none h-full">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-full">
          <Header />
          <main className="flex-1 p-6 w-full max-w-none overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  return (
    <LayoutProvider>
      <LayoutContent>{children}</LayoutContent>
    </LayoutProvider>
  );
}
