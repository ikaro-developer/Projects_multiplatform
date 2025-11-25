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

import { useFormRecurrenceRule } from "@/utils/finance/useFormRecurrenceRule";

export default function RuleFinanceiro({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (n: boolean) => void;
}) {
  const { form, setForm, onSave } = useFormRecurrenceRule();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSave(form, onOpenChange);
  }

  const showValorFixo = form.tipo === "fixed" || form.tipo === "fixed-variable";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950">
        <DialogHeader>
          <DialogTitle className="text-white">Nova Regra</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* DESCRIÇÃO */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Descrição</Label>
            <Input
              value={form.descricao_regra ?? ""}
              onChange={(e) =>
                setForm((f) => ({ ...f, descricao_regra: e.target.value }))
              }
              placeholder="Ex: Mensal, Anual, Semanal..."
              className="focus-visible:ring-amber-400"
            />
          </div>

          {/* TIPO */}
          <div className="space-y-2">
            <Label className="text-zinc-300">Tipo da Regra</Label>

            <Select
              value={form.tipo}
              onValueChange={(v: "fixed" | "variable" | "fixed-variable") =>
                setForm((f) => ({ ...f, tipo: v }))
              }
            >
              <SelectTrigger className="cursor-pointer focus-visible:ring-amber-400">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>

              <SelectContent className="bg-zinc-900 text-white">
                <SelectItem value="fixed">Fixo</SelectItem>
                <SelectItem value="variable">Variável</SelectItem>
                <SelectItem value="fixed-variable">Fixo + Variável</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* VALOR FIXO */}
          {showValorFixo && (
            <div className="space-y-2">
              <Label className="text-zinc-300">Valor Fixo</Label>
              <Input
                type="number"
                value={form.valor_fixo ?? ""}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    valor_fixo: Number(e.target.value),
                  }))
                }
                placeholder="Ex: 50.00"
                className="focus-visible:ring-amber-400"
              />
            </div>
          )}

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
              Criar Regra
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
