import { GeneratorSettings, Password } from "../types/passwordTypes";
import { Shield, ShieldAlert, ShieldCheck } from "lucide-react-native";

interface PasswordStrengthResult {
  label: string;
  level: "weak" | "medium" | "strong" | "very-strong";
  percent: number;
  color: string;
  bits: number;
}

export const calculateStrengthPassWord = (
  password: string,
  settings: GeneratorSettings
): PasswordStrengthResult => {
  let poolSize = 0;

  if (settings.uppercase) poolSize += 26;
  if (settings.lowercase) poolSize += 26;
  if (settings.numbers) poolSize += 10;
  if (settings.symbols) poolSize += 32;
  if (settings.excludeAmbiguous) poolSize -= 4;

  const bits = Math.floor(password.length * Math.log2(poolSize || 1));

  if (bits < 100)
    return {
      label: "Fraca",
      level: "weak",
      percent: 25,
      color: "bg-red-500",
      bits,
    };

  if (bits < 140)
    return {
      label: "Média",
      level: "medium",
      percent: 50,
      color: "bg-yellow-500",
      bits,
    };

  if (bits < 180)
    return {
      label: "Forte",
      level: "strong",
      percent: 75,
      color: "bg-green-500",
      bits,
    };

  return {
    label: "Muito Forte",
    level: "very-strong",
    percent: 100,
    color: "bg-emerald-500",
    bits,
  };
};

export const getStrengthInfo = (strength: Password["strength"]) => {
  switch (strength) {
    case "weak":
      return {
        label: "Fraca",
        color: "text-[hsl(var(--destructive))] bg-[hsl(var(--destructive))]/10",
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
