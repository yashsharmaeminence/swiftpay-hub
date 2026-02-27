import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUpFromLine } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Withdraw() {
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Withdraw Swift-USDT</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ArrowUpFromLine className="h-5 w-5 text-destructive" /> Withdraw to External Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Amount (USDT)</Label>
            <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="font-mono text-lg" />
          </div>
          <div className="space-y-2">
            <Label>Wallet Address</Label>
            <Input placeholder="0x..." value={address} onChange={e => setAddress(e.target.value)} className="font-mono" />
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Simulated withdrawal. In production, this triggers an on-chain USDT transfer.</p>
          </div>
          <Button variant="destructive" className="w-full" onClick={() => { toast.success(`Withdrawal of $${amount} initiated (simulated)`); setAmount(""); setAddress(""); }}>
            Withdraw
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
