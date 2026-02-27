import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/AppContext";
import { merchants } from "@/data/mockData";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function Settlement() {
  const { currentMerchantId } = useApp();
  const merchant = merchants.find(m => m.id === currentMerchantId)!;
  const [threshold, setThreshold] = useState(String(merchant.autoWithdrawThreshold));
  const [wallet, setWallet] = useState(merchant.walletAddress);

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Settlement Settings</h1>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-primary" /> Auto-Settlement Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Auto-Withdrawal Threshold (USDT)</Label>
            <Input type="number" value={threshold} onChange={e => setThreshold(e.target.value)} className="font-mono" />
            <p className="text-xs text-muted-foreground">Automatically settle when balance exceeds this amount</p>
          </div>
          <div className="space-y-2">
            <Label>External Wallet Address</Label>
            <Input value={wallet} onChange={e => setWallet(e.target.value)} className="font-mono" />
          </div>
          <Button className="w-full" onClick={() => toast.success("Settlement settings updated (simulated)")}>
            Save Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
