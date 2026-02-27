import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useApp } from "@/contexts/AppContext";
import { merchants, dailyRevenue } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CreditCard, TrendingUp, Percent } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function MerchantDashboard() {
  const { currentMerchantId, allTransactions } = useApp();
  const merchant = merchants.find(m => m.id === currentMerchantId)!;
  const incomingTxs = allTransactions.filter(tx => tx.toId === currentMerchantId).slice(0, 8);
  const totalCommission = incomingTxs.reduce((s, t) => s + t.commission, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{merchant.businessName}</h1>
        <p className="text-muted-foreground text-sm">Merchant dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card glow-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">${merchant.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Received</CardTitle>
            <CreditCard className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${merchant.totalReceived.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Commissions Paid</CardTitle>
            <Percent className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${merchant.totalCommission.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">0.2% per transaction</p>
          </CardContent>
        </Card>
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Transactions</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incomingTxs.length}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-lg">Revenue Trend (14 days)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={dailyRevenue}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(195, 90%, 50%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 88%)" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 10%, 50%)" />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="hsl(195, 90%, 50%)" fill="url(#colorRevenue)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-lg">Recent Incoming Payments</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Gross</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead className="text-right">Net</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomingTxs.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{new Date(tx.timestamp).toLocaleDateString()}</TableCell>
                  <TableCell>{tx.fromName}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{tx.description}</TableCell>
                  <TableCell className="text-right font-mono">${tx.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-mono text-warning">${tx.commission.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-mono text-success">${tx.netAmount.toFixed(2)}</TableCell>
                  <TableCell><Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">{tx.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
