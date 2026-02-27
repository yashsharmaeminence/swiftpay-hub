import React, { createContext, useContext, useState, useCallback } from "react";
import { Role, users, merchants, transactions, Transaction } from "@/data/mockData";

interface AppState {
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  currentUserId: string;
  currentMerchantId: string;
  allTransactions: Transaction[];
  addTransaction: (tx: Transaction) => void;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<Role>("user");
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(transactions);

  const addTransaction = useCallback((tx: Transaction) => {
    setAllTransactions(prev => [tx, ...prev]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        currentUserId: "U001",
        currentMerchantId: "M001",
        allTransactions,
        addTransaction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
