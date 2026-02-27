import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { RoleSwitcher } from "@/components/RoleSwitcher";
import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center justify-between border-b px-4 bg-background/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-muted-foreground" />
              <div className="hidden sm:block h-5 w-px bg-border" />
              <span className="hidden sm:block text-sm font-medium text-muted-foreground">SwiftLedger</span>
            </div>
            <RoleSwitcher />
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
