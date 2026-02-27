import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { Layout } from "@/components/Layout";
import NotFound from "./pages/NotFound";

// User pages
import UserWallet from "./pages/user/UserWallet";
import QRUpload from "./pages/user/QRUpload";
import UserTransactions from "./pages/user/UserTransactions";
import Deposit from "./pages/user/Deposit";
import Withdraw from "./pages/user/Withdraw";

// Merchant pages
import MerchantDashboard from "./pages/merchant/MerchantDashboard";
import QRGenerator from "./pages/merchant/QRGenerator";
import MerchantPayments from "./pages/merchant/MerchantPayments";
import MerchantAnalytics from "./pages/merchant/MerchantAnalytics";
import Settlement from "./pages/merchant/Settlement";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import LedgerViewer from "./pages/admin/LedgerViewer";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminAlerts from "./pages/admin/AdminAlerts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/wallet" replace />} />
            <Route element={<Layout />}>
              {/* User routes */}
              <Route path="/wallet" element={<UserWallet />} />
              <Route path="/pay" element={<QRUpload />} />
              <Route path="/transactions" element={<UserTransactions />} />
              <Route path="/deposit" element={<Deposit />} />
              <Route path="/withdraw" element={<Withdraw />} />

              {/* Merchant routes */}
              <Route path="/merchant" element={<MerchantDashboard />} />
              <Route path="/merchant/qr" element={<QRGenerator />} />
              <Route path="/merchant/payments" element={<MerchantPayments />} />
              <Route path="/merchant/analytics" element={<MerchantAnalytics />} />
              <Route path="/merchant/settlement" element={<Settlement />} />

              {/* Admin routes */}
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/ledger" element={<LedgerViewer />} />
              <Route path="/admin/transactions" element={<AdminTransactions />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/alerts" element={<AdminAlerts />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
