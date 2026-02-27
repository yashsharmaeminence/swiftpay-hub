import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { users, merchants } from "@/data/mockData";
import { Wallet, ArrowUpRight, ArrowDownLeft, TrendingUp, QrCode } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function UserWallet() {
  const { currentUserId, allTransactions } = useApp();
  const user = users.find(u => u.id === currentUserId)!;
  const navigate = useNavigate();

  const userTxs = allTransactions
    .filter(tx => tx.fromId === currentUserId || tx.toId === currentUserId)
    .slice(0, 10);

  const totalSent = userTxs.filter(tx => tx.fromId === currentUserId && tx.type === "qr_payment").reduce((s, t) => s + t.amount, 0);
  const totalReceived = userTxs.filter(tx => tx.toId === currentUserId).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}</h1>
        <p className="text-muted-foreground text-sm">Your Swift-USDT wallet overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card glow-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Balance</CardTitle>
            <Wallet className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">${user.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground mt-1">Swift-USDT</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Sent</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${totalSent.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Received</CardTitle>
            <ArrowDownLeft className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold font-mono">${totalReceived.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="glass-card cursor-pointer hover:border-primary/50 transition-colors" onClick={() => navigate("/pay")}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Quick Pay</CardTitle>
            <QrCode className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-semibold">Upload QR</div>
            <p className="text-xs text-muted-foreground mt-1">Pay a merchant instantly</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userTxs.map(tx => {
                const isSender = tx.fromId === currentUserId;
                return (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {tx.type.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{isSender ? tx.toName : tx.fromName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{tx.description}</TableCell>
                    <TableCell className={`text-right font-mono font-medium ${isSender ? "text-destructive" : "text-success"}`}>
                      {isSender ? "-" : "+"}${tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"}
                        className="text-xs"
                      >
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
