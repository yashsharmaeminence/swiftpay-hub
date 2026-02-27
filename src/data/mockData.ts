export type Role = "user" | "merchant" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
  role: "user";
  status: "active" | "suspended";
  createdAt: string;
}

export interface Merchant {
  id: string;
  businessName: string;
  email: string;
  balance: number;
  totalReceived: number;
  totalCommission: number;
  role: "merchant";
  status: "active" | "pending" | "suspended";
  walletAddress: string;
  autoWithdrawThreshold: number;
  createdAt: string;
}

export interface LedgerEntry {
  id: string;
  transactionId: string;
  timestamp: string;
  accountId: string;
  accountName: string;
  type: "debit" | "credit";
  amount: number;
  balanceAfter: number;
  description: string;
  category: "transfer" | "commission" | "deposit" | "withdrawal";
}

export interface Transaction {
  id: string;
  timestamp: string;
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
  commission: number;
  netAmount: number;
  type: "qr_payment" | "deposit" | "withdrawal" | "settlement";
  status: "completed" | "pending" | "failed";
  description: string;
}

export const users: User[] = [
  { id: "U001", name: "Alice Chen", email: "alice@email.com", balance: 1250.00, role: "user", status: "active", createdAt: "2025-11-15" },
  { id: "U002", name: "Bob Martinez", email: "bob@email.com", balance: 3420.50, role: "user", status: "active", createdAt: "2025-12-01" },
  { id: "U003", name: "Carol Williams", email: "carol@email.com", balance: 780.25, role: "user", status: "active", createdAt: "2026-01-05" },
  { id: "U004", name: "David Kim", email: "david@email.com", balance: 5100.00, role: "user", status: "active", createdAt: "2026-01-20" },
  { id: "U005", name: "Eva Thompson", email: "eva@email.com", balance: 290.75, role: "user", status: "suspended", createdAt: "2026-02-01" },
];

export const merchants: Merchant[] = [
  { id: "M001", businessName: "TechGadgets Pro", email: "pay@techgadgets.com", balance: 12450.80, totalReceived: 45200.00, totalCommission: 90.40, role: "merchant", status: "active", walletAddress: "0x1a2b...9f0e", autoWithdrawThreshold: 5000, createdAt: "2025-10-01" },
  { id: "M002", businessName: "Green Bistro", email: "orders@greenbistro.com", balance: 3280.60, totalReceived: 18900.00, totalCommission: 37.80, role: "merchant", status: "active", walletAddress: "0x3c4d...7h8i", autoWithdrawThreshold: 2000, createdAt: "2025-11-15" },
  { id: "M003", businessName: "CloudBooks Store", email: "sales@cloudbooks.io", balance: 890.20, totalReceived: 7600.00, totalCommission: 15.20, role: "merchant", status: "pending", walletAddress: "0x5e6f...3j4k", autoWithdrawThreshold: 1000, createdAt: "2026-01-10" },
];

const txBase: Omit<Transaction, "id" | "timestamp" | "fromId" | "fromName" | "toId" | "toName" | "amount" | "commission" | "netAmount" | "description">[] = [];

function generateTransactions(): Transaction[] {
  const txs: Transaction[] = [];
  const descs = [
    "Coffee & pastry", "Electronics purchase", "Book order", "Lunch special",
    "Phone accessories", "Dinner for two", "Monthly subscription", "Online course",
    "Grocery delivery", "Gadget repair", "Art supplies", "Music streaming",
  ];
  const pairs: [string, string, string, string][] = [
    ["U001", "Alice Chen", "M001", "TechGadgets Pro"],
    ["U002", "Bob Martinez", "M002", "Green Bistro"],
    ["U003", "Carol Williams", "M001", "TechGadgets Pro"],
    ["U001", "Alice Chen", "M002", "Green Bistro"],
    ["U004", "David Kim", "M003", "CloudBooks Store"],
    ["U002", "Bob Martinez", "M001", "TechGadgets Pro"],
    ["U003", "Carol Williams", "M003", "CloudBooks Store"],
    ["U005", "Eva Thompson", "M002", "Green Bistro"],
    ["U004", "David Kim", "M002", "Green Bistro"],
    ["U001", "Alice Chen", "M003", "CloudBooks Store"],
  ];

  for (let i = 0; i < 50; i++) {
    const pair = pairs[i % pairs.length];
    const amount = Math.round((Math.random() * 200 + 5) * 100) / 100;
    const commission = Math.round(amount * 0.002 * 100) / 100;
    const day = Math.floor(i / 2) + 1;
    const hour = 8 + (i % 14);
    const date = new Date(2026, 1, Math.min(day, 27), hour, Math.floor(Math.random() * 60));

    txs.push({
      id: `TX${String(i + 1).padStart(4, "0")}`,
      timestamp: date.toISOString(),
      fromId: pair[0],
      fromName: pair[1],
      toId: pair[2],
      toName: pair[3],
      amount,
      commission,
      netAmount: Math.round((amount - commission) * 100) / 100,
      type: "qr_payment",
      status: i < 47 ? "completed" : i < 49 ? "pending" : "failed",
      description: descs[i % descs.length],
    });
  }

  // Add some deposits and withdrawals
  txs.push(
    { id: "TX0051", timestamp: "2026-02-10T09:00:00Z", fromId: "SYSTEM", fromName: "External Deposit", toId: "U001", toName: "Alice Chen", amount: 2000, commission: 0, netAmount: 2000, type: "deposit", status: "completed", description: "USDT deposit from external wallet" },
    { id: "TX0052", timestamp: "2026-02-15T14:00:00Z", fromId: "M001", fromName: "TechGadgets Pro", toId: "SYSTEM", toName: "External Withdrawal", amount: 5000, commission: 0, netAmount: 5000, type: "settlement", status: "completed", description: "Merchant settlement to external wallet" },
  );

  return txs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

export const transactions = generateTransactions();

export function generateLedgerEntries(txs: Transaction[]): LedgerEntry[] {
  const entries: LedgerEntry[] = [];
  let counter = 1;

  for (const tx of txs) {
    if (tx.status === "failed") continue;

    // Debit from sender
    if (tx.fromId !== "SYSTEM") {
      entries.push({
        id: `LE${String(counter++).padStart(4, "0")}`,
        transactionId: tx.id,
        timestamp: tx.timestamp,
        accountId: tx.fromId,
        accountName: tx.fromName,
        type: "debit",
        amount: tx.amount,
        balanceAfter: 0, // simplified
        description: tx.description,
        category: tx.type === "qr_payment" ? "transfer" : tx.type === "settlement" ? "withdrawal" : "transfer",
      });
    }

    // Credit to receiver (net of commission for QR payments)
    if (tx.toId !== "SYSTEM") {
      entries.push({
        id: `LE${String(counter++).padStart(4, "0")}`,
        transactionId: tx.id,
        timestamp: tx.timestamp,
        accountId: tx.toId,
        accountName: tx.toName,
        type: "credit",
        amount: tx.netAmount,
        balanceAfter: 0,
        description: tx.description,
        category: tx.type === "qr_payment" ? "transfer" : tx.type === "deposit" ? "deposit" : "transfer",
      });
    }

    // Commission entry
    if (tx.commission > 0) {
      entries.push({
        id: `LE${String(counter++).padStart(4, "0")}`,
        transactionId: tx.id,
        timestamp: tx.timestamp,
        accountId: "COMMISSION",
        accountName: "Commission Wallet",
        type: "credit",
        amount: tx.commission,
        balanceAfter: 0,
        description: `Commission on ${tx.id}`,
        category: "commission",
      });
    }
  }

  return entries;
}

export const ledgerEntries = generateLedgerEntries(transactions);

export const systemStats = {
  totalCirculation: 26272.10,
  treasuryReserve: 27500.00,
  totalCommissions: 143.40,
  totalTransactions: transactions.length,
  activeUsers: users.filter(u => u.status === "active").length,
  activeMerchants: merchants.filter(m => m.status === "active").length,
};

// Daily revenue data for charts
export const dailyRevenue = Array.from({ length: 14 }, (_, i) => {
  const date = new Date(2026, 1, i + 14);
  return {
    date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    revenue: Math.round((Math.random() * 1500 + 500) * 100) / 100,
    transactions: Math.floor(Math.random() * 20 + 5),
  };
});
