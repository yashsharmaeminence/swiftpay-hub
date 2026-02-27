import { ledgerEntries } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function LedgerViewer() {
  const [filter, setFilter] = useState("");

  const filtered = ledgerEntries.filter(e =>
    !filter || e.transactionId.toLowerCase().includes(filter.toLowerCase()) ||
    e.accountName.toLowerCase().includes(filter.toLowerCase()) ||
    e.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><BookOpen className="h-6 w-6 text-primary" /> Double-Entry Ledger</h1>
        <p className="text-muted-foreground text-sm">Every transaction creates paired debit/credit entries</p>
      </div>

      <Input placeholder="Filter by transaction ID, account, or description..." value={filter} onChange={e => setFilter(e.target.value)} className="max-w-md" />

      <Card className="glass-card">
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Entry ID</TableHead>
                <TableHead>Tx ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.slice(0, 50).map(entry => (
                <TableRow key={entry.id}>
                  <TableCell className="font-mono text-xs">{entry.id}</TableCell>
                  <TableCell className="font-mono text-xs">{entry.transactionId}</TableCell>
                  <TableCell className="font-mono text-xs">{new Date(entry.timestamp).toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{entry.accountName}</TableCell>
                  <TableCell>
                    <Badge variant={entry.type === "debit" ? "destructive" : "default"} className="text-xs font-mono">
                      {entry.type.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-xs">{entry.category}</Badge>
                  </TableCell>
                  <TableCell className={`text-right font-mono font-medium ${entry.type === "debit" ? "text-destructive" : "text-success"}`}>
                    {entry.type === "debit" ? "-" : "+"}${entry.amount.toFixed(2)}
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
