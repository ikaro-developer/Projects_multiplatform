import { useEffect } from "react";

//COMPONENTS
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

//ICONS
import { Eye, EyeOff, Globe, Key, User } from "lucide-react";

import usePassword from "../utils/usePassword";

const PasswordAddForm = () => {
  const {
    setShowPassword,
    showPassword,
    formData,
    setFormData,
    strength,
    handleChange,
    handleSubmitAddForm,
  } = usePassword();

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      strength: strength.level,
    }));
  }, [strength]);
  return (
    <section className="mt-4">
      <form
        onSubmit={handleSubmitAddForm}
        className="max-w-2xl mx-auto space-y-6"
      >
        {/* INFORMAÇÕES BÁSICAS */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg">Informações Básicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Nome do Site / Serviço
              </Label>
              <Input
                placeholder="Ex: Google, Netflix, Banco..."
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                URL (opcional)
              </Label>
              <Input
                type="url"
                placeholder="https://exemplo.com"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* CREDENCIAIS */}
        <Card className="py-6">
          <CardHeader>
            <CardTitle className="text-lg">Credenciais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Usuário / Email
              </Label>
              <Input
                placeholder="seu@email.com"
                value={formData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Key className="h-4 w-4" />
                Senha
              </Label>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="pr-10 font-mono"
                  required
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* FORÇA DA SENHA */}
              {formData.password && (
                <div className="space-y-2 mt-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground ">
                      Força da senha
                      <Badge variant="outline" className=" ml-2">
                        {strength.bits} bits
                      </Badge>
                    </span>

                    <span
                      className={
                        strength.percent <= 25
                          ? "text-red-500"
                          : strength.percent <= 50
                          ? "text-yellow-500"
                          : strength.percent <= 75
                          ? "text-green-500"
                          : "text-emerald-500"
                      }
                    >
                      {strength.label}
                    </span>
                  </div>

                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all ${strength.color}`}
                      style={{
                        width: `${strength.percent}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full text-base cursor-pointer">
          Salvar Senha
        </Button>
      </form>
    </section>
  );
};

export default PasswordAddForm;
