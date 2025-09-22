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
      <div className="min-h-screen bg-background">
        <div className="flex w-full max-w-none">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0">
            <Header />
            <main className="flex-1 p-6 w-full max-w-none">
              {children || <Outlet />}
            </main>
          </div>
        </div>
      </div>
    </LayoutProvider>
  );
}
