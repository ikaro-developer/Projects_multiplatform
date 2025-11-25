import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ContextFinance } from "@/context/FinanceContext";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react";
import { Category } from "@/types/FinancasType";

export default function CategoriaDetail({
  selectedCategorie,
  onBack,
}: {
  selectedCategorie: Category;
  onBack: (n: boolean) => void;
}) {
  const isIncome = selectedCategorie.type === "Receita";

  // PUXA TODAS AS TRANSAÇÕES COMPLETAS
  const { transaction } = useContext(ContextFinance);

  // Filtra apenas as transações da categoria selecionada
  const transacoesFiltradas = transaction.filter(
    (t) => t.categoria_id === selectedCategorie.id
  );

  //  Calcula o total da categoria
  const totalCategoria = transacoesFiltradas.reduce(
    (sum, t) => sum + t.valor,
    0
  );

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBack(false)}
          className="text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <h1 className="text-2xl font-bold">{selectedCategorie.name}</h1>

        <Badge className={`ml-2 ${isIncome ? "bg-green-600" : "bg-red-600"}`}>
          {isIncome ? "Receita" : "Despesa"}
        </Badge>
      </div>

      {/* TOTAL */}
      <Card className="mt-4 bg-zinc-800 p-4">
        <p className="text-zinc-400 text-sm">Total da categoria</p>

        <p
          className={`text-3xl font-bold ${
            isIncome ? "text-green-500" : "text-red-500"
          }`}
        >
          R$ {totalCategoria.toFixed(2)}
        </p>
      </Card>

      {/* LISTA */}
      <h2 className="mt-6 mb-3 text-xl font-bold">Transações</h2>

      <div className="space-y-3">
        {transacoesFiltradas.length === 0 ? (
          <Card className="p-4 bg-zinc-800 text-zinc-400">
            Nenhuma transação nessa categoria.
          </Card>
        ) : (
          transacoesFiltradas.map((t) => (
            <Card
              key={t.id}
              className="p-4 bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer"
            >
              <div className="flex items-center gap-4">
                {/* Ícone */}
                <div
                  className="w-12 h-12 flex items-center justify-center rounded-xl"
                  style={{ backgroundColor: `${selectedCategorie.color}30` }}
                >
                  {isIncome ? (
                    <TrendingUp
                      className="w-6 h-6"
                      style={{ color: selectedCategorie.color }}
                    />
                  ) : (
                    <TrendingDown
                      className="w-6 h-6"
                      style={{ color: selectedCategorie.color }}
                    />
                  )}
                </div>

                {/* Descrição */}
                <div className="flex-1">
                  <p className="font-semibold">{t.description}</p>
                  <p className="text-zinc-400 text-sm">{t.data}</p>
                </div>

                {/* Valor */}
                <p
                  className={`text-lg font-bold ${
                    isIncome ? "text-green-500" : "text-red-500"
                  }`}
                >
                  R$ {t.valor.toFixed(2)}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
