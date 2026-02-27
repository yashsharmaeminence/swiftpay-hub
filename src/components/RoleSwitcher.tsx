import { useApp } from "@/contexts/AppContext";
import { Role } from "@/data/mockData";
import { User, Store, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

const roles: { value: Role; label: string; icon: typeof User; path: string }[] = [
  { value: "user", label: "User", icon: User, path: "/wallet" },
  { value: "merchant", label: "Merchant", icon: Store, path: "/merchant" },
  { value: "admin", label: "Admin", icon: Shield, path: "/admin" },
];

export function RoleSwitcher() {
  const { currentRole, setCurrentRole } = useApp();
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-1 rounded-lg bg-muted p-1">
      {roles.map(({ value, label, icon: Icon, path }) => (
        <button
          key={value}
          onClick={() => { setCurrentRole(value); navigate(path); }}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
            currentRole === value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground hover:bg-background/50"
          }`}
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
}
