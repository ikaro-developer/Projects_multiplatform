//CONTEXT
import { useContext, useState } from "react";
import { ContextSenha } from "@/features/password-manager/context/SenhaContext";

//COMPONENTS
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

//ICONS
import {
  ArrowLeft,
  Globe,
  Copy,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Clock,
  ExternalLink,
  Key,
  User,
} from "lucide-react";

//TYPE
import type { Password } from "@/features/password-manager/types/SenhasType";

//LIBS
import { format } from "date-fns";
import { handleCopy } from "../utils/HadleCopy";

interface PasswordDetailsProps {
  password: Password;
  // onEdit: () => void;
  // onCopy: (text: string, label: string) => void;
}

const getStrengthColor = (strength: Password["strength"]) => {
  switch (strength) {
    case "weak":
      return "text-red-500";
    case "medium":
      return "text-yellow-500";
    case "strong":
      return "text-green-500";
    case "very-strong":
      return "text-emerald-500";
  }
};

const getStrengthLabel = (strength: Password["strength"]) => {
  switch (strength) {
    case "weak":
      return "Fraca";
    case "medium":
      return "Média";
    case "strong":
      return "Forte";
    case "very-strong":
      return "Muito Forte";
  }
};

const getStrengthPercent = (strength: Password["strength"]) => {
  switch (strength) {
    case "weak":
      return 25;
    case "medium":
      return 50;
    case "strong":
      return 75;
    case "very-strong":
      return 100;
  }
};

export default function PasswordDetails({
  password,
}: // onEdit,
// onCopy,
PasswordDetailsProps) {
  const [showPassword, setShowPassword] = useState(false);
  console.log(password.created_at);

  const getFaviconUrl = (url?: string) => {
    if (!url) return null;
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
    } catch {
      return null;
    }
  };

  const faviconUrl = getFaviconUrl(password.url);
  const strengthPercent = getStrengthPercent(password.strength);

  const { setViewMode, setSelectedPassword } = useContext(ContextSenha);
  const handleBack = () => {
    setViewMode("list");
    setSelectedPassword(null);
  };
  return (
    <div className="flex-1 px-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={handleBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"

            // onClick={onEdit}
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button variant="destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir
          </Button>
        </div>
      </div>

      {/* Main Info Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Icon */}
            <div className="h-20 w-20 rounded-2xl bg-[hsl(var(--muted))]  flex items-center justify-center shrink-0 overflow-hidden">
              {faviconUrl ? (
                <img
                  src={faviconUrl}
                  alt={password.name}
                  className="h-12 w-12"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <Globe className="h-10 w-10 text-[hsl(var(--muted-foreground))] " />
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">{password.name}</h1>
              </div>

              {password.url && (
                <a
                  href={password.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--primary))] hover:underline flex items-center gap-1 mt-1"
                >
                  {password.url}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Credentials */}
        <Card className=" py-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Key className="h-5 w-5" />
              Credenciais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <label className="text-sm text-[hsl(var(--muted-foreground ))] flex items-center gap-2">
                <User className="h-4 w-4" />
                Usuário / Email
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-[hsl(var(--muted ))] px-4 py-3 rounded-lg font-mono text-sm">
                  {password.username}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(password.username, "Usuário")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm text-[hsl(var(--muted-foreground ))] flex items-center gap-2">
                <Key className="h-4 w-4" />
                Senha
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-[hsl(var(--muted ))] px-4 py-3 rounded-lg font-mono text-sm">
                  {showPassword ? password.password : "••••••••••••••••"}
                </code>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleCopy(password.password, "Senha")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Strength */}
            <div className="space-y-2">
              <label className="text-sm text-[hsl(var(--muted-foreground ))]">
                Força da Senha
              </label>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`font-medium ${getStrengthColor(
                      password.strength
                    )}`}
                  >
                    {getStrengthLabel(password.strength)}
                  </span>
                  <span className="text-sm text-[hsl(var(--muted-foreground ))]">
                    {strengthPercent}%
                  </span>
                </div>
                <div className="h-2 bg-[hsl(var(--muted ))] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      password.strength === "weak"
                        ? "bg-red-500"
                        : password.strength === "medium"
                        ? "bg-yellow-500"
                        : password.strength === "strong"
                        ? "bg-green-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${strengthPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Detalhes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground ))]">
                  Criado em
                </p>
                <p className="font-medium">
                  {format(new Date(password.created_at), "dd/MM/yyyy")}
                </p>
              </div>
              <div>
                <p className="text-sm text-[hsl(var(--muted-foreground ))]">
                  Atualizado em
                </p>
                <p className="font-medium">
                  {format(new Date(password.updated_at), "dd/MM/yyyy")}
                </p>
              </div>
            </div>

            <Separator />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
