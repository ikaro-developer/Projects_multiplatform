import { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Plus } from "lucide-react";
import { format } from "date-fns";
import { TransactionDialog } from "@/components/Financas/TransactionDialogFinancas";
import { useFinance } from "../../utils/finance/useFinance";
import { ContextFinance } from "@/context/FinanceContext";
import { Transaction } from "@/types/FinancasType";
import { TransactionDetailDialog } from "./TransactionDetailDialog";
const TransacoesFinanceiro = () => {
  const { category } = useContext(ContextFinance);
  const { transacoesOrdenadas } = useFinance();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction>();

  function openTransactionDetails(transaction: Transaction) {
    setSelectedTransaction(transaction);
    setOpenDetails(true);
  }

  return (
    <>
      {/* if () { */}
      {selectedTransaction && (
        <TransactionDetailDialog
          open={openDetails}
          onOpenChange={setOpenDetails}
          selectTransaction={selectedTransaction}
          // onBack={() => setOpenDetails(false)}
        />
      )}

      {/* } */}
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Minhas Transações</h2>

        <Button
          className="bg-[hsl(42_86%_55%)] text-black hover:bg-[hsl(42_86%_45%)] cursor-pointer"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nova Transação
        </Button>
      </div>

      {/* LISTAGEM OU VAZIO */}
      {transacoesOrdenadas.length === 0 ? (
        <Card className="p-8 text-center rounded-md bg-zinc-800/30 my-8 border-zinc-600">
          <p className="text-zinc-400">Nenhuma transação neste mês.</p>
        </Card>
      ) : (
        <div className="space-y-2 mt-6">
          {[...transacoesOrdenadas].map((transaction) => {
            const categories = category.find(
              (c) => c.id === transaction.categoria_id
            );
            if (!categories) return null;

            const isIncome = categories.type === "Receita";

            return (
              <Card
                key={transaction.id}
                onClick={() => openTransactionDetails(transaction)}
                className="p-4 rounded-md bg-zinc-800/40 border border-zinc-700 hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  {/* Ícone */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${categories.color}20` }}
                  >
                    {isIncome ? (
                      <TrendingUp
                        className="w-5 h-5"
                        style={{ color: categories.color }}
                      />
                    ) : (
                      <TrendingDown
                        className="w-5 h-5"
                        style={{ color: categories.color }}
                      />
                    )}
                  </div>

                  {/* Descrição */}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate text-white">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-zinc-400">
                      <span>{categories.name}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(transaction.data), "dd/MM/yyyy")}
                      </span>
                    </div>
                  </div>

                  {/* Valor */}
                  <p
                    className={`text-lg font-semibold ${
                      isIncome ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {isIncome ? "+" : "-"} R$ {transaction.valor.toFixed(2)}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* MODAL DE UMA NOVA TRANSAÇÃO */}
      <TransactionDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  );
};

export default TransacoesFinanceiro;
