import { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ContextFinance } from "@/features/finance-manager/context/FinanceContext";
import { useFormCategory } from "@/features/finance-manager/utils/useFormCategory";

export function CategoryDialogFinancas({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (n: boolean) => void;
}) {
  const { form, setForm, colors, onSave } = useFormCategory();
  const { rule } = useContext(ContextFinance);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await onSave(form, onOpenChange);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950 ">
        <DialogHeader>
          <DialogTitle className="text-white">Nova Categoria</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Nome</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ex: Aluguel, Água, Salário..."
              required
              className="focus-visible:ring-amber-400"
            />
          </div>

          {/* Tipo */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Tipo</Label>

            <Select
              value={form.type}
              onValueChange={(v: "Despesa" | "Receita") =>
                setForm((f) => ({ ...f, type: v }))
              }
            >
              <SelectTrigger className="focus-visible:ring-amber-400 cursor-pointer">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="bg-zinc-900 text-white ">
                <SelectItem className="cursor-pointer" value="Receita">
                  Receita
                </SelectItem>
                <SelectItem className="cursor-pointer" value="Despesa">
                  Despesa
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Regra de Recorrência */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Regra de Recorrência</Label>

            <Select
              value={form.recorrencia_id}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, recorrencia_id: v }))
              }
            >
              <SelectTrigger className="focus-visible:ring-amber-400 w-full cursor-pointer">
                <SelectValue placeholder="Selecione uma regra" />
              </SelectTrigger>

              <SelectContent className="bg-zinc-900 text-white">
                {rule.map((r) => (
                  <SelectItem
                    key={r.id}
                    value={r.id}
                    className="data-highlighted:bg-amber-400 data-highlighted:text-black cursor-pointer"
                  >
                    {r.descricao_regra ? `${r.descricao_regra} — ` : ""}

                    {r.tipo === "fixed" && `Fixo - R$ ${r.valor_fixo ?? 0}`}
                    {r.tipo === "variable" && "Variável"}
                    {r.tipo === "fixed-variable" && "Fixo com Valor Variável"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Cor */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Cor</Label>
            {/* Preview */}
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl border-2"
                style={{
                  backgroundColor: form.color,
                  borderColor: "rgb(251 191 36)",
                }}
              />
              <span className="text-zinc-300 text-sm">{form.color}</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, color: c }))}
                  className="w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110"
                  style={{
                    backgroundColor: c,
                    border:
                      form.color === c
                        ? "3px solid rgb(251 191 36)"
                        : "2px solid transparent",
                  }}
                />
              ))}
              {/* Color Picker */}
              <label className="relative w-8 h-8 rounded-full cursor-pointer border border-zinc-600 flex items-center justify-center text-xs text-zinc-300 hover:border-amber-400 transition">
                +
                <input
                  type="color"
                  defaultValue={form.color} // NÃO usar value!
                  onChange={(e) =>
                    setForm((f) => ({ ...f, color: e.target.value }))
                  }
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer hover:border-amber-400 hover:bg-amber-400 bg-zinc-950"
            >
              Cancelar
            </Button>

            <Button
              type="submit"
              className="cursor-pointer bg-amber-400 hover:bg-amber-500"
            >
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
