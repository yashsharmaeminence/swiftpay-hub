import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";

export default function AdminTransactions() {
  const { allTransactions } = useApp();
  const [filter, setFilter] = useState("");

  const filtered = allTransactions.filter(tx =>
    !filter || tx.id.toLowerCase().includes(filter.toLowerCase()) ||
    tx.fromName.toLowerCase().includes(filter.toLowerCase()) ||
    tx.toName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">System Transactions</h1>
      <Input placeholder="Filter by ID, sender, or receiver..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-md" />
      <Card className="glass-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Commission</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 50).map(tx => (
                <TableRow key={tx.id}>
                  <TableCell className="font-mono text-xs">{tx.id}</TableCell>
                  <TableCell className="font-mono text-xs">{new Date(tx.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{tx.fromName}</TableCell>
                  <TableCell>{tx.toName}</TableCell>
                  <TableCell><Badge variant="outline" className="text-xs">{tx.type.replace("_", " ")}</Badge></TableCell>
                  <TableCell className="text-right font-mono">${tx.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-mono text-warning">${tx.commission.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={tx.status === "completed" ? "default" : tx.status === "pending" ? "secondary" : "destructive"} className="text-xs">
                      {tx.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
