import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/contexts/AppContext";
import { merchants } from "@/data/mockData";
import { Download, QrCode } from "lucide-react";

export default function QRGenerator() {
  const { currentMerchantId } = useApp();
  const merchant = merchants.find(m => m.id === currentMerchantId)!;
  const [amount, setAmount] = useState("25.00");
  const [description, setDescription] = useState("Payment");

  const qrData = JSON.stringify({
    merchantId: merchant.id,
    amount: parseFloat(amount) || 0,
    asset: "Swift-USDT",
    description,
  });

  const downloadQR = () => {
    const svg = document.getElementById("merchant-qr");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 400, 400);
      ctx.drawImage(img, 0, 0, 400, 400);
      const a = document.createElement("a");
      a.download = `swiftledger-qr-${amount}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Generate QR Code</h1>
        <p className="text-muted-foreground text-sm">Create a payment QR code for customers</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-primary" /> Payment Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Amount (Swift-USDT)</Label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="font-mono text-lg" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Input value={description} onChange={e => setDescription(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card glow-primary">
        <CardContent className="flex flex-col items-center py-8 gap-4">
          <div className="bg-white p-4 rounded-xl">
            <QRCodeSVG id="merchant-qr" value={qrData} size={240} level="H" />
          </div>
          <div className="text-center">
            <p className="font-medium">{merchant.businessName}</p>
            <p className="text-2xl font-bold font-mono mt-1">${parseFloat(amount || "0").toFixed(2)}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Button onClick={downloadQR} variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Download QR as PNG
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
