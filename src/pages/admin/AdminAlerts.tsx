import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, XCircle, Bell } from "lucide-react";
import { systemStats } from "@/data/mockData";

const alerts = [
  { id: 1, severity: "critical" as const, message: "Merchant M003 (CloudBooks Store) status is 'pending' — KYC review required", time: "2 hours ago" },
  { id: 2, severity: "warning" as const, message: "User U005 (Eva Thompson) account suspended — unusual activity detected", time: "5 hours ago" },
  { id: 3, severity: "info" as const, message: "Treasury reserve exceeds circulation by 4.7% — system is over-collateralized", time: "1 day ago" },
  { id: 4, severity: "info" as const, message: "Daily settlement completed for Merchant M001 — $5,000 withdrawn", time: "1 day ago" },
  { id: 5, severity: "warning" as const, message: "Commission wallet approaching $150 threshold — consider redistribution", time: "2 days ago" },
];

const severityConfig = {
  critical: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", badge: "destructive" as const },
  warning: { icon: AlertTriangle, color: "text-warning", bg: "bg-warning/10", badge: "secondary" as const },
  info: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10", badge: "default" as const },
};

export default function AdminAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Bell className="h-6 w-6 text-primary" /> Rebalancing Alerts</h1>
        <p className="text-muted-foreground text-sm">System alerts and monitoring notifications</p>
      </div>

      <div className="space-y-3">
        {alerts.map(alert => {
          const config = severityConfig[alert.severity];
          const Icon = config.icon;
          return (
            <Card key={alert.id} className={`glass-card border-l-4 ${alert.severity === "critical" ? "border-l-destructive" : alert.severity === "warning" ? "border-l-warning" : "border-l-success"}`}>
              <CardContent className="flex items-start gap-3 py-4">
                <div className={`rounded-full p-2 ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
                <Badge variant={config.badge} className="text-xs shrink-0">{alert.severity}</Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
