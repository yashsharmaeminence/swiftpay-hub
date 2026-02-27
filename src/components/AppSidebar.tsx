import {
  Wallet, QrCode, History, LayoutDashboard, Settings,
  BarChart3, Users, BookOpen, AlertTriangle, CreditCard,
  ArrowDownToLine, ArrowUpFromLine, Shield
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

const roleMenus = {
  user: [
    { title: "Wallet", url: "/wallet", icon: Wallet },
    { title: "Pay via QR", url: "/pay", icon: QrCode },
    { title: "Transactions", url: "/transactions", icon: History },
    { title: "Deposit", url: "/deposit", icon: ArrowDownToLine },
    { title: "Withdraw", url: "/withdraw", icon: ArrowUpFromLine },
  ],
  merchant: [
    { title: "Dashboard", url: "/merchant", icon: LayoutDashboard },
    { title: "Generate QR", url: "/merchant/qr", icon: QrCode },
    { title: "Payments", url: "/merchant/payments", icon: CreditCard },
    { title: "Analytics", url: "/merchant/analytics", icon: BarChart3 },
    { title: "Settlement", url: "/merchant/settlement", icon: Settings },
  ],
  admin: [
    { title: "Command Center", url: "/admin", icon: Shield },
    { title: "Ledger", url: "/admin/ledger", icon: BookOpen },
    { title: "Transactions", url: "/admin/transactions", icon: History },
    { title: "Users", url: "/admin/users", icon: Users },
    { title: "Alerts", url: "/admin/alerts", icon: AlertTriangle },
  ],
};

const roleLabels = { user: "User Wallet", merchant: "Merchant Suite", admin: "Admin Panel" };

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { currentRole } = useApp();
  const items = roleMenus[currentRole];

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarContent className="pt-4">
        {!collapsed && (
          <div className="px-4 pb-4 mb-2 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                <span className="text-sm font-bold text-primary-foreground">SL</span>
              </div>
              <div>
                <h2 className="text-sm font-semibold text-sidebar-primary-foreground">SwiftLedger</h2>
                <p className="text-xs text-sidebar-foreground/60">{roleLabels[currentRole]}</p>
              </div>
            </div>
          </div>
        )}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-sidebar-accent/50 transition-colors"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
