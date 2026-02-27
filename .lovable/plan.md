

# SwiftLedger — Full Demo Build Plan

## 1. App Shell & Navigation
- Create a top-level layout with a **role switcher** (User / Merchant / Admin tabs) that changes the entire dashboard context
- Sidebar navigation specific to each role
- Dark, fintech-style design with a blue/teal accent palette

## 2. User Wallet Dashboard
- **Balance card** showing Swift-USDT balance (mock: 1,250.00)
- **"Upload QR to Pay"** module: file upload (PNG/JPG), parse QR using `jsQR` library in-browser, display extracted payment details (Merchant name, amount), confirmation screen with success animation
- **Transaction history** table with sortable columns (date, type, amount, status, counterparty)
- **Deposit/Withdraw** mock buttons with confirmation dialogs

## 3. Merchant Business Suite
- **QR Code Generator**: input amount + description → generate dynamic QR code displayed on-screen (downloadable as PNG)
- **Incoming Payments** real-time feed (mock data with auto-refresh animation)
- **Commission tracker**: shows 0.2% deducted per transaction, total commissions paid
- **Settlement settings**: configure auto-withdrawal threshold and external wallet address (mock form)
- **Revenue analytics**: daily/weekly chart of incoming payments using Recharts

## 4. Admin Command Center
- **Liquidity Monitor**: total Swift-USDT in circulation vs. treasury reserves, with a health indicator gauge
- **System-wide transaction log** with filters (by user, merchant, date range, type)
- **Commission Wallet** balance and history
- **Rebalancing alerts** panel with mock warning/critical states
- **User & Merchant directory** with status indicators

## 5. Double-Entry Ledger Viewer
- Accessible from Admin panel — a ledger explorer showing paired debit/credit entries for every transaction
- Each transaction shows: timestamp, from-account, to-account, debit amount, credit amount, balance after
- Commission entries shown as separate paired entries routing to the Commission Wallet

## 6. Mock Data Engine
- Generate realistic mock users (5), merchants (3), and ~50 transactions with proper double-entry pairs
- QR codes encode JSON with merchant ID, amount, and asset type
- All state managed via React context — no backend needed

