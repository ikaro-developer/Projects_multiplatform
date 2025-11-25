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
import { useFormTransaction } from "@/utils/finance/useFormTransaction";
import { ContextFinance } from "@/context/FinanceContext";
import { toast } from "sonner";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TransactionDialog({
  open,
  onOpenChange,
}: TransactionDialogProps) {
  const { category } = useContext(ContextFinance);
  const { form, setForm, onSave, getMinDate } = useFormTransaction();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(form, onOpenChange);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-zinc-950">
        <DialogHeader>
          <DialogTitle>Nova Transação</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Categoria */}
          <div className="space-y-2">
            <Label htmlFor="category">Categoria</Label>
            <Select
              value={form.categoria_id}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, categoria_id: value }))
              }
              required
            >
              <SelectTrigger
                id="category"
                className="focus-visible:ring-amber-400 w-full "
              >
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>

              <SelectContent className=" bg-zinc-900 text-white">
                {category.map((cat) => (
                  <SelectItem
                    key={cat.id}
                    value={cat.id}
                    className="data-highlighted:bg-amber-400 data-highlighted:text-black "
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      {cat.name} (
                      {cat.type === "Receita" ? "Receita" : "Despesa"})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor */}
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={form.valor}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  valor: parseFloat(value.target.value),
                }))
              }
              placeholder="0.00"
              required
              className="focus-visible:ring-amber-400"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={form.description || ""}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  description: value.target.value,
                }))
              }
              placeholder="Descrição da transação"
              required
              className="focus-visible:ring-amber-400"
            />
          </div>

          {/* Data */}
          <div className="space-y-2">
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={form.data}
              min={getMinDate()}
              max={new Date().toISOString().split("T")[0]}
              onChange={(value) =>
                setForm((prev) => ({
                  ...prev,
                  data: value.target.value,
                }))
              }
              required
              className="focus-visible:ring-amber-400  "
            />
            <style>{`
    input[type="date"]::-webkit-calendar-picker-indicator {
      filter: invert(1);
    }
  `}</style>
          </div>

          {/* Comprovante */}
          <div className="space-y-2">
            <Label
              htmlFor="comprovante"
              className="border py-2.5  cursor-pointer rounded-md px-3"
            >
              Comprovante (somente imagem)
            </Label>
            <Input
              id="comprovante"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                if (!file.type.startsWith("image/")) {
                  toast.error("Apenas imagens são permitidas.");
                  setForm((prev) => ({ ...prev, comprovantes: "" }));
                  return;
                }
                const reader = new FileReader();
                reader.onload = () => {
                  setForm((prev) => ({
                    ...prev,
                    comprovantes: reader.result as string,
                  }));
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />
          </div>
          {/* Preview + remover */}
          {form.comprovantes && (
            <div className="mt-2 space-y-2 flex flex-col items-center justify-center">
              <img
                src={form.comprovantes}
                alt="Prévia do comprovante"
                className="w-32 h-32 object-cover items-center rounded-md border border-zinc-700"
              />

              <Button
                type="button"
                variant="outline"
                className="border-red-500 w-full cursor-pointer text-red-400 hover:bg-red-500 hover:text-black"
                onClick={() =>
                  setForm((prev) => ({
                    ...prev,
                    comprovantes: "",
                  }))
                }
              >
                Remover imagem
              </Button>
            </div>
          )}

          {/* Footer */}
          <DialogFooter>
            {/* Botão Cancelar com outline amber */}
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className=" cursor-pointer hover:border-amber-400  hover:bg-amber-400 bg-zinc-950"
            >
              Cancelar
            </Button>

            {/* Botão principal */}
            <Button
              type="submit"
              className=" cursor-pointer bg-amber-400 hover:bg-amber-500"
            >
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
