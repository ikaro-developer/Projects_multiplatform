import { useContext, useState } from "react";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  RefreshCw,
  Globe,
  User,
  Key,
  FileText,
  Star,
  Shield,
  Folder,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Password } from "@/features/password-manager/types/SenhasType";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { ContextSenha } from "@/features/password-manager/context/SenhaContext";
import PasswordAddForm from "@/features/password-manager/components/PasswordAddForm";
import PasswordGenerator from "@/features/password-manager/components/PasswordGenerator";

interface PasswordFormProps {
  // password: Password | null;
  // onBack: () => void;
  // onSave: () => void;
}

const generatePassword = (length: number = 16): string => {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  const all = uppercase + lowercase + numbers + symbols;

  let password = "";
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  for (let i = 4; i < length; i++) {
    password += all[Math.floor(Math.random() * all.length)];
  }

  return password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

const calculateStrength = (
  password: string
): { label: string; percent: number; color: string } => {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^a-zA-Z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Fraca", percent: 25, color: "bg-red-500" };
  if (score <= 4)
    return { label: "Média", percent: 50, color: "bg-yellow-500" };
  if (score <= 5) return { label: "Forte", percent: 75, color: "bg-green-500" };
  return { label: "Muito Forte", percent: 100, color: "bg-emerald-500" };
};

export default function PasswordForm({}: // password,
// onBack,
// onSave,
PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    url: "",
    notes: "",
    // categoryId: password?.categoryId || "",
    favorite: false,
    // twoFactorEnabled: password?.twoFactorEnabled || false,
  });

  const strength = calculateStrength(formData.password);

  const handleGeneratePassword = () => {
    setFormData((prev) => ({ ...prev, password: generatePassword(20) }));
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const { setViewMode } = useContext(ContextSenha);

  return (
    <div className="flex-1 py-6">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => setViewMode("list")}
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      <Tabs defaultValue="Nova Senha">
        <TabsList className="grid w-full grid-cols-2 bg-zinc-400/20">
          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="Nova Senha"
          >
            Nova Senha
          </TabsTrigger>

          <TabsTrigger
            className="text-white cursor-pointer data-[state=active]:bg-[hsl(42_86%_55%)] data-[state=active]:text-black"
            value="Gerador Senha"
          >
            Gerador de Senha
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Nova Senha">
          <PasswordAddForm />
        </TabsContent>

        <TabsContent value="Gerador Senha">
          <PasswordGenerator />
        </TabsContent>
      </Tabs>
    </div>
  );
}
