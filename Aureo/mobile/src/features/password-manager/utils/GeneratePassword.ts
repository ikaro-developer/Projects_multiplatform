import { useState } from "react";
import { GeneratorSettings } from "@/features/password-manager/types/passwordTypes";

export const usePasswordGenerator = () => {
  const [settings, setSettings] = useState<GeneratorSettings>({
    length: 20,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
  });

  const generatePassword = (): string => {
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

    if (!chars) chars = lowercase;

    let password = "";

    if (settings.uppercase)
      password += uppercase[Math.floor(Math.random() * uppercase.length)];
    if (settings.lowercase)
      password += lowercase[Math.floor(Math.random() * lowercase.length)];
    if (settings.numbers)
      password += numbers[Math.floor(Math.random() * numbers.length)];
    if (settings.symbols)
      password += symbols[Math.floor(Math.random() * symbols.length)];

    while (password.length < settings.length) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }

    return password
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("")
      .slice(0, settings.length);
  };

  return {
    settings,
    setSettings,
    generatePassword,
  };
};
