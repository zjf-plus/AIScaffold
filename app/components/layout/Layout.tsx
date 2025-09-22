import { Outlet } from "@remix-run/react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { LayoutProvider } from "~/lib/contexts/LayoutContext";

interface LayoutProps {
  children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <LayoutProvider>
      <div className="h-screen bg-background">
        <div className="flex w-full max-w-none h-full">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 h-full">
            <Header />
            <main className="flex-1 p-6 w-full max-w-none overflow-auto">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
}
