import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDownToLine } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Deposit() {
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Deposit Swift-USDT</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ArrowDownToLine className="h-5 w-5 text-success" /> Fund Your Wallet</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Amount (USDT)</Label>
            <Input type="number" placeholder="0.00" value={amount} onChange={e => setAmount(e.target.value)} className="font-mono text-lg" />
          </div>
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">In production, this would connect to an on-chain USDT deposit flow. For this demo, the deposit is simulated.</p>
          </div>
          <Button className="w-full" onClick={() => { toast.success(`Deposited $${amount} Swift-USDT (simulated)`); setAmount(""); }}>
            Deposit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
