import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { systemStats, users, merchants, transactions } from "@/data/mockData";
import { Shield, DollarSign, Users, Store, Activity, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AdminDashboard() {
  const coverageRatio = (systemStats.treasuryReserve / systemStats.totalCirculation) * 100;
  const healthColor = coverageRatio >= 100 ? "text-success" : coverageRatio >= 95 ? "text-warning" : "text-destructive";
  const healthLabel = coverageRatio >= 100 ? "Fully Backed" : coverageRatio >= 95 ? "Caution" : "Under-Collateralized";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="h-6 w-6 text-primary" /> Command Center</h1>
        <p className="text-muted-foreground text-sm">System-wide overview and liquidity monitoring</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="glass-card glow-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">In Circulation</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${systemStats.totalCirculation.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Swift-USDT tokens</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Treasury Reserve</CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${systemStats.treasuryReserve.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">USDT backing</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Commission Wallet</CardTitle>
            <DollarSign className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${systemStats.totalCommissions.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total collected</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Accounts</CardTitle>
            <Users className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.activeUsers + systemStats.activeMerchants}</div>
            <p className="text-xs text-muted-foreground">{systemStats.activeUsers} users · {systemStats.activeMerchants} merchants</p>
          </CardContent>
        </Card>
      </div>

      {/* Liquidity Health */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Liquidity Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Coverage Ratio</span>
            <span className={`text-lg font-bold font-mono ${healthColor}`}>{coverageRatio.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(coverageRatio, 100)} className="h-3" />
          <div className="flex items-center gap-2">
            {coverageRatio < 100 && <AlertTriangle className="h-4 w-4 text-warning" />}
            <span className={`text-sm font-medium ${healthColor}`}>{healthLabel}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              ${systemStats.treasuryReserve.toLocaleString()} backing ${systemStats.totalCirculation.toLocaleString()} in circulation
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
