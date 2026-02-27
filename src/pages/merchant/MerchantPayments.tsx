import { useApp } from "@/contexts/AppContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MerchantPayments() {
  const { currentMerchantId, allTransactions } = useApp();
  const txs = allTransactions.filter(tx => tx.toId === currentMerchantId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Incoming Payments</h1>
      <Card className="glass-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
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
              {txs.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell className="font-mono text-xs">{new Date(tx.timestamp).toLocaleString()}</TableCell>
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
