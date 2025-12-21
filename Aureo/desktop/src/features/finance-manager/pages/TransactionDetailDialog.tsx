import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useContext, useState } from "react";
import { Transaction } from "@/features/finance-manager/types/FinancasType";
import { ContextFinance } from "@/features/finance-manager/context/FinanceContext";

export function TransactionDetailDialog({
  open,
  onOpenChange,
  selectTransaction,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectTransaction: Transaction;
}) {
  const { category } = useContext(ContextFinance);

  const categorie = category.find(
    (c) => c.id === selectTransaction?.categoria_id
  );

  // Modal para visualizar imagem
  const [imgPreview, setImgPreview] = useState<string | null>(null);

  return (
    <>
      {/* Modal principal */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="bg-zinc-950">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {selectTransaction.description}
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-6">
            {/* Categoria */}
            <div className="flex items-center gap-3">
              {categorie ? (
                <div>
                  <p className="font-medium">{categorie.name}</p>
                  <Badge
                    className="mt-1 text-black"
                    style={{ backgroundColor: categorie.color }}
                  >
                    {categorie.type}
                  </Badge>
                </div>
              ) : (
                <p className="text-red-500">Categoria não encontrada</p>
              )}
            </div>

            {/* Valor + Data */}
            <div>
              <p className="text-lg font-semibold">
                R$ {selectTransaction.valor.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">
                {new Date(selectTransaction.data).toLocaleDateString("pt-BR")}
              </p>
            </div>

            {/* Comprovantes */}
            <div className="space-y-3">
              <h3 className="font-semibold">Comprovantes</h3>

              {selectTransaction.comprovantes.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Nenhum comprovante enviado.
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="relative"
                    onClick={() =>
                      setImgPreview(selectTransaction.comprovantes)
                    }
                  >
                    <img
                      src={selectTransaction.comprovantes}
                      className="rounded-lg border h-32 object-cover w-full hover:opacity-80 transition"
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de visualização ampliada */}
      <Dialog open={!!imgPreview} onOpenChange={() => setImgPreview(null)}>
        <DialogContent className="bg-black p-0 max-w-3xl">
          <img
            src={imgPreview ?? ""}
            className="w-full h-full object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
