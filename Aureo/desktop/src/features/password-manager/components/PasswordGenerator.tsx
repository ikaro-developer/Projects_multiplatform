import { useState, useEffect } from "react";
import { Copy, RefreshCw, Check, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import usePassword from "@/features/password-manager/utils/usePassword";
import type { GeneratorSettings } from "@/features/password-manager/utils/usePassword";

export default function PasswordGenerator() {
  const {
    handleCopy,
    generatePassword,
    settings,
    setSettings,
    calculateStrengthPassWord,
  } = usePassword();

  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const strength = calculateStrengthPassWord(password, settings);

  const updateSetting = (
    key: keyof GeneratorSettings,
    value: number | boolean
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  function initialization() {
    const newPassword = generatePassword(settings);
    setPassword(newPassword);
    setCopied(false);
  }

  useEffect(() => {
    initialization();
  }, [settings]);
  return (
    <div className="flex-1 ">
      {/* Header */}
      <div className="max-w-2xl mx-auto mt-8 space-y-6">
        {/* Generated Password */}
        <Card className=" from-[hsl(var(--primary))]/5 to-[hsl(var(--accent))]/5 border-[hsl(var(--primary))]/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="relative">
                <code className="block w-full bg-[hsl(var(--background))]/80 backdrop-blur p-6 rounded-xl text-center text-xl md:text-2xl font-mono break-all border">
                  {password}
                </code>
              </div>

              <div className="flex items-center justify-center gap-3">
                <Button onClick={initialization} variant="outline" size="lg">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Gerar Nova
                </Button>
                <Button
                  onClick={() => {
                    handleCopy(password, "Senha");
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  size="lg"
                  className=" cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Copiado!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-2" />
                      Copiar
                    </>
                  )}
                </Button>
              </div>

              {/* Strength */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[hsl(var(--muted-foreground))]">
                    Força da senha
                  </span>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{strength.bits} bits</Badge>
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
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${strength.color}`}
                    style={{ width: `${strength.percent}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card className=" py-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings2 className="h-5 w-5" />
              Configurações
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Length */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Comprimento</Label>
                <Badge variant="outline" className="font-mono">
                  {settings.length}
                </Badge>
              </div>
              <Slider
                value={[settings.length]}
                onValueChange={([v]) => updateSetting("length", v)}
                min={20}
                max={200}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
                <span>20</span>
                <span>200</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
                <div>
                  <Label>Maiúsculas</Label>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    A-Z
                  </p>
                </div>
                <Switch
                  checked={settings.uppercase}
                  onCheckedChange={(v) => updateSetting("uppercase", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
                <div>
                  <Label>Minúsculas</Label>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    a-z
                  </p>
                </div>
                <Switch
                  checked={settings.lowercase}
                  onCheckedChange={(v) => updateSetting("lowercase", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
                <div>
                  <Label>Números</Label>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    0-9
                  </p>
                </div>
                <Switch
                  checked={settings.numbers}
                  onCheckedChange={(v) => updateSetting("numbers", v)}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
                <div>
                  <Label>Símbolos</Label>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    !@#$%...
                  </p>
                </div>
                <Switch
                  checked={settings.symbols}
                  onCheckedChange={(v) => updateSetting("symbols", v)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
              <div>
                <Label>Excluir ambíguos</Label>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  l, 1, O, 0
                </p>
              </div>
              <Switch
                checked={settings.excludeAmbiguous}
                onCheckedChange={(v) => updateSetting("excludeAmbiguous", v)}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
