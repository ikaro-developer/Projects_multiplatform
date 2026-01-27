import { useMemo, useState } from "react";
import { toast } from "sonner";

import { calculateStrengthPassWord } from "./StrengthPassword";
import { usePasswordGenerator } from "./GeneratePassword";
import useSupabasePassword from "../services/SupabasePassword";
import { PasswordFormData } from "../types/SenhasType";

const usePassword = () => {
  const { addPassword } = useSupabasePassword();
  const { settings } = usePasswordGenerator();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<PasswordFormData>({
    name: "",
    url: "",
    username: "",
    password: "",
    strength: "weak",
  });

  const strength = useMemo(() => {
    return calculateStrengthPassWord(formData.password, settings);
  }, [formData.password, settings]);

  function handleChange(field: keyof PasswordFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function validatePasswordForm(data: PasswordFormData): string | null {
    if (!data.name.trim()) {
      return "O nome do site é obrigatório.";
    }

    if (!data.username.trim()) {
      return "O usuário ou email é obrigatório.";
    }

    if (!data.password.trim()) {
      return "A senha é obrigatória.";
    }

    if (data.password.length < 8) {
      return "A senha deve ter pelo menos 8 caracteres.";
    }

    if (data.strength === "weak") {
      return "A senha é muito fraca. Gere uma senha mais forte.";
    }

    if (data.url) {
      try {
        new URL(data.url);
      } catch {
        return "A URL informada não é válida.";
      }
    }

    return null;
  }

  async function handleSubmitAddForm(e: React.FormEvent) {
    e.preventDefault();

    const error = validatePasswordForm(formData);
    if (error) {
      toast.error(error);
      return;
    }

    await toast.promise(
      addPassword({
        name: formData.name,
        username: formData.username,
        password: formData.password,
        url: formData.url,
        strength: formData.strength,
      }),
      {
        loading: "Salvando senha...",
        success: "Senha salva com sucesso!",
        error: "Erro ao salvar senha.",
      }
    );

    setFormData({
      name: "",
      url: "",
      username: "",
      password: "",
      strength: "weak",
    });
  }

  return {
    showPassword,
    setShowPassword,
    formData,
    setFormData,
    handleChange,
    strength,
    handleSubmitAddForm,
  };
};

export default usePassword;
