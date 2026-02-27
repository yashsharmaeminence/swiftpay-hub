import { useApp } from "@/contexts/AppContext";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserTransactions() {
  const { currentUserId, allTransactions } = useApp();
  const txs = allTransactions.filter(tx => tx.fromId === currentUserId || tx.toId === currentUserId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Transaction History</h1>
      <Card className="glass-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Counterparty</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {txs.map(tx => {
                const isSender = tx.fromId === currentUserId;
                return (
                  <TableRow key={tx.id}>
                    <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                    <TableCell className="font-mono text-xs">{new Date(tx.timestamp).toLocaleString()}</TableCell>
                    <TableCell><Badge variant="outline" className="text-xs">{tx.type.replace("_", " ")}</Badge></TableCell>
                    <TableCell>{isSender ? tx.toName : tx.fromName}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{tx.description}</TableCell>
                    <TableCell className={`text-right font-mono font-medium ${isSender ? "text-destructive" : "text-success"}`}>
                      {isSender ? "-" : "+"}${tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"} className="text-xs">
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
