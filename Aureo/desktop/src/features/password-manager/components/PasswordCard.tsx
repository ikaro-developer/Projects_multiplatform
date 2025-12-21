import { useContext, useState } from "react";
import {
  Copy,
  Eye,
  EyeOff,
  Globe,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Password } from "@/features/password-manager/types/SenhasType";
import usePassword from "@/features/password-manager/utils/usePassword";
import { ContextSenha } from "@/features/password-manager/context/SenhaContext";

interface PasswordCardProps {
  password: Password;
  favicon: string;
}

export default function PasswordCard({ password, favicon }: PasswordCardProps) {
  const { setViewMode, setSelectedPassword } = useContext(ContextSenha);
  const { handleCopy, getStrengthInfo } = usePassword();
  const [showPassword, setShowPassword] = useState(false);

  const {
    label,
    color: strengthColor,
    icon: StrengthIcon,
  } = getStrengthInfo(password.strength);

  function handlePasswordClick(password: Password) {
    setSelectedPassword(password);
    setViewMode("details");
  }
  return (
    <Card
      className="group hover:border-[hsl(var(--primary))]/50 transition-all cursor-pointer relative overflow-hidden"
      onClick={(e) => {
        e.stopPropagation();
        handlePasswordClick(password);
      }}
    >
      {password.strength == "weak" && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(var(--destructive))]" />
      )}
      {password.strength == "medium" && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(var(--warning))]" />
      )}

      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon/Favicon */}
          <div className="h-12 w-12 rounded-xl bg-[hsl(var(--muted))] flex items-center justify-center shrink-0 overflow-hidden">
            {favicon ? (
              <img
                src={favicon}
                alt={password.name}
                className="h-8 w-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <Globe className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{password.name}</h3>
            </div>
            <p className="text-sm text-[hsl(var(--muted-foreground))] truncate">
              {password.username}
            </p>

            {/* Password Preview */}
            <div className="flex items-center gap-2 mt-2">
              <code className="text-xs bg-[hsl(var(--muted))] px-2 py-1 rounded font-mono flex-1 truncate">
                {showPassword ? password.password : "••••••••••••"}
              </code>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? (
                  <EyeOff className="h-3 w-3" />
                ) : (
                  <Eye className="h-3 w-3" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(password.password, "Senha");
                }}
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-[hsl(var(--border))]">
          <Badge variant="secondary" className={strengthColor}>
            <StrengthIcon className="h-3 w-3 mr-1" />
            {label}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
