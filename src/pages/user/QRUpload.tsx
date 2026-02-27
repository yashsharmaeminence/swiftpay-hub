import { useState, useRef, useCallback } from "react";
import jsQR from "jsqr";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useApp } from "@/contexts/AppContext";
import { merchants } from "@/data/mockData";
import { Upload, CheckCircle2, AlertCircle, QrCode, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface QRPayload {
  merchantId: string;
  amount: number;
  asset: string;
  description: string;
}

export default function QRUpload() {
  const { addTransaction, currentUserId } = useApp();
  const [stage, setStage] = useState<"upload" | "confirm" | "success" | "error">("upload");
  const [payload, setPayload] = useState<QRPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback((file: File) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, canvas.width, canvas.height);

        if (code) {
          try {
            const data = JSON.parse(code.data) as QRPayload;
            if (data.merchantId && data.amount && data.asset) {
              setPayload(data);
              setStage("confirm");
            } else {
              setStage("error");
            }
          } catch {
            setStage("error");
          }
        } else {
          setStage("error");
        }
        setLoading(false);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processImage(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) processImage(file);
  };

  const confirmPayment = () => {
    if (!payload) return;
    const merchant = merchants.find(m => m.id === payload.merchantId);
    const commission = Math.round(payload.amount * 0.002 * 100) / 100;

    addTransaction({
      id: `TX${Date.now()}`,
      timestamp: new Date().toISOString(),
      fromId: currentUserId,
      fromName: "Alice Chen",
      toId: payload.merchantId,
      toName: merchant?.businessName || "Unknown Merchant",
      amount: payload.amount,
      commission,
      netAmount: Math.round((payload.amount - commission) * 100) / 100,
      type: "qr_payment",
      status: "completed",
      description: payload.description || "QR Payment",
    });

    setStage("success");
    toast.success("Payment sent successfully!");
  };

  const merchant = payload ? merchants.find(m => m.id === payload.merchantId) : null;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pay via QR Code</h1>
        <p className="text-muted-foreground text-sm">Upload a merchant's QR code image to initiate payment</p>
      </div>

      {stage === "upload" && (
        <Card
          className={`glass-card border-2 border-dashed transition-colors cursor-pointer ${
            dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
        >
          <CardContent className="flex flex-col items-center justify-center py-16 gap-4">
            {loading ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            ) : (
              <>
                <div className="h-16 w-16 rounded-2xl gradient-primary flex items-center justify-center">
                  <QrCode className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="text-center">
                  <p className="font-medium">Drop QR image here or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">Supports PNG, JPG up to 10MB</p>
                </div>
                <Upload className="h-5 w-5 text-muted-foreground" />
              </>
            )}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
          </CardContent>
        </Card>
      )}

      {stage === "confirm" && payload && (
        <Card className="glass-card glow-primary">
          <CardHeader>
            <CardTitle>Confirm Payment</CardTitle>
            <CardDescription>Review the payment details below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-lg bg-muted/50 p-4">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Merchant</span>
                <span className="font-medium">{merchant?.businessName || payload.merchantId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Amount</span>
                <span className="text-xl font-bold font-mono">${payload.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Asset</span>
                <span className="font-medium">{payload.asset}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Commission (0.2%)</span>
                <span className="font-mono text-sm">${(payload.amount * 0.002).toFixed(2)}</span>
              </div>
              {payload.description && (
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Description</span>
                  <span className="text-sm">{payload.description}</span>
                </div>
              )}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => { setStage("upload"); setPayload(null); }}>Cancel</Button>
              <Button className="flex-1" onClick={confirmPayment}>Confirm Payment</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {stage === "success" && (
        <Card className="glass-card glow-success">
          <CardContent className="flex flex-col items-center py-12 gap-4">
            <CheckCircle2 className="h-16 w-16 text-success" />
            <h2 className="text-xl font-bold">Payment Successful!</h2>
            <p className="text-muted-foreground">${payload?.amount.toFixed(2)} sent to {merchant?.businessName}</p>
            <Button variant="outline" onClick={() => { setStage("upload"); setPayload(null); }}>Make Another Payment</Button>
          </CardContent>
        </Card>
      )}

      {stage === "error" && (
        <Card className="glass-card glow-destructive">
          <CardContent className="flex flex-col items-center py-12 gap-4">
            <AlertCircle className="h-16 w-16 text-destructive" />
            <h2 className="text-xl font-bold">Invalid QR Code</h2>
            <p className="text-muted-foreground text-center">The uploaded image does not contain a valid SwiftLedger QR code.</p>
            <Button variant="outline" onClick={() => setStage("upload")}>Try Again</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
