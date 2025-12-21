import {
  Password,
  GeneratorSettings,
} from "@/features/password-manager/types/SenhasType";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const usePassword = () => {
  const [settings, setSettings] = useState<GeneratorSettings>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });

  const getFaviconUrl = (url: string) => {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  };
  const generatePassword = (settings: GeneratorSettings): string => {
    let chars = "";

    const uppercase = settings.excludeAmbiguous
      ? "ABCDEFGHJKMNPQRSTUVWXYZ"
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = settings.excludeAmbiguous
      ? "abcdefghjkmnpqrstuvwxyz"
      : "abcdefghijklmnopqrstuvwxyz";
    const numbers = settings.excludeAmbiguous ? "23456789" : "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (settings.uppercase) chars += uppercase;
    if (settings.lowercase) chars += lowercase;
    if (settings.numbers) chars += numbers;
    if (settings.symbols) chars += symbols;

    if (chars.length === 0) chars = lowercase;

    let password = "";

    // Ensure at least one of each selected type
    if (settings.uppercase)
      password += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (settings.lowercase)
      password += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (settings.numbers)
      password += numbers[Math.floor(Math.random() * numbers.length)];
    if (settings.symbols)
      password += symbols[Math.floor(Math.random() * symbols.length)];

    // Fill the rest
    while (password.length < settings.length) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    // Shuffle
    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, settings.length);
  };

  const calculateStrengthPassWord = (
    password: string,
    settings: GeneratorSettings
  ): {
    label: string;
    percent: number;
    color: string;
    bits: number;
  } => {
    let poolSize = 0;
    if (settings.uppercase) poolSize += 26;
    if (settings.lowercase) poolSize += 26;
    if (settings.numbers) poolSize += 10;
    if (settings.symbols) poolSize += 32;
    if (settings.excludeAmbiguous) poolSize -= 4;

    const bits = Math.floor(password.length * Math.log2(poolSize || 1));
    if (bits < 100)
      return { label: "Fraca", percent: 25, color: "bg-red-500", bits };
    if (bits < 140)
      return { label: "Média", percent: 50, color: "bg-yellow-500", bits };
    if (bits < 180)
      return { label: "Forte", percent: 75, color: "bg-green-500", bits };
    return {
      label: "Muito Forte",
      percent: 100,
      color: "bg-emerald-500",
      bits,
    };
  };
  const getStrengthInfo = (strength: Password["strength"]) => {
    switch (strength) {
      case "weak":
        return {
          label: "Fraca",
          color:
            "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10",
          icon: ShieldAlert,
        };

      case "medium":
        return {
          label: "Média",
          color: "text-[hsl(var(--warning))] bg-[hsl(var(--warning))]/10",
          icon: Shield,
        };

      case "strong":
        return {
          label: "Forte",
          color: "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10",
          icon: ShieldCheck,
        };

      case "very-strong":
        return {
          label: "Muito Forte",
          color: "text-[hsl(var(--success))] bg-[hsl(var(--success))]/10",
          icon: ShieldCheck,
        };
    }
  };
  const mockPasswords: Password[] = [
    {
      id: "1",
      name: "Google",
      username: "usuario.pessoal@gmail.com",
      password: "S3nh@F0rt3!2024",
      url: "https://google.com",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-06-20"),
      lastUsed: new Date("2024-12-01"),
      strength: "very-strong",
    },
    {
      id: "1b",
      name: "Google",
      username: "usuario.trabalho@gmail.com",
      password: "Tr@b@lh0!2024",
      url: "https://google.com",
      createdAt: new Date("2024-02-10"),
      updatedAt: new Date("2024-07-15"),
      lastUsed: new Date("2024-12-02"),
      strength: "strong",
    },
    {
      id: "2",
      name: "GitHub",
      username: "dev_user_pessoal",
      password: "github123!@#",
      url: "https://github.com",
      createdAt: new Date("2023-08-10"),
      updatedAt: new Date("2024-03-15"),
      lastUsed: new Date("2024-12-02"),
      strength: "strong",
    },
    {
      id: "2b",
      name: "GitHub",
      username: "dev_user_empresa",
      password: "gitEmpresa@2024!",
      url: "https://github.com",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-06-10"),
      lastUsed: new Date("2024-12-01"),
      strength: "very-strong",
    },
    {
      id: "3",
      name: "Netflix",
      username: "usuario@email.com",
      password: "netflix2024",
      url: "https://netflix.com",
      createdAt: new Date("2024-02-20"),
      updatedAt: new Date("2024-02-20"),
      strength: "medium",
    },
    {
      id: "4",
      name: "Banco Itaú",
      username: "12345678901",
      password: "banco@Seguro123",
      url: "https://itau.com.br",
      createdAt: new Date("2023-05-10"),
      updatedAt: new Date("2024-11-01"),
      strength: "very-strong",
    },
    {
      id: "5",
      name: "Amazon",
      username: "compras@email.com",
      password: "123456",
      url: "https://amazon.com.br",
      createdAt: new Date("2022-12-01"),
      updatedAt: new Date("2022-12-01"),
      strength: "weak",
    },
    {
      id: "6",
      name: "LinkedIn",
      username: "profissional@email.com",
      password: "linkedin2024!",
      url: "https://linkedin.com",
      createdAt: new Date("2024-04-15"),
      updatedAt: new Date("2024-04-15"),
      strength: "medium",
    },
  ];
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copiado!", {
      description: `${label} copiado para a área de transferência.`,
    });
  };

  return {
    // VARIABLES
    mockPasswords,

    settings,
    setSettings,
    //FUNCTIONS
    handleCopy,
    getStrengthInfo,
    getFaviconUrl,
    generatePassword,
    calculateStrengthPassWord,
  };
};

export default usePassword;
