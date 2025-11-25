import { useMemo } from "react";
import type { Transaction, Category } from "@/types/FinancasType";
import type { PieDataItem } from "@/components/Financas/ChartFinanceiro";

export const useCategoriesPie = (
  transaction: Transaction[],
  category: Category[],
  selectedMonth: Date
): { despesas: PieDataItem[]; receitas: PieDataItem[] } => {
  return useMemo(() => {
    const ano = selectedMonth.getFullYear();
    const mes = selectedMonth.getMonth() + 1;

    const categoriasDoMes = category.map((c) => ({ ...c, valor: 0 }));
    const categoriasMap = Object.fromEntries(
      categoriasDoMes.map((c) => [c.id, c])
    );

    transaction.forEach((t) => {
      const cat = categoriasMap[t.categoria_id];
      if (!cat) return;

      const tYear = Number(t.data.slice(0, 4));
      const tMonth = Number(t.data.slice(5, 7));
      if (tYear !== ano || tMonth !== mes) return;

      categoriasMap[cat.id].valor += t.valor;
    });

    const despesas = categoriasDoMes
      .filter((c) => c.type === "Despesa")
      .map((c) => ({ name: c.name, value: c.valor, color: c.color }));

    const receitas = categoriasDoMes
      .filter((c) => c.type === "Receita")
      .map((c) => ({ name: c.name, value: c.valor, color: c.color }));

    return { despesas, receitas };
  }, [transaction, category, selectedMonth]);
};
