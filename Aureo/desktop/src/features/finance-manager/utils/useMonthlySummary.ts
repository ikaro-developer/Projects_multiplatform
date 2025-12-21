import { useMemo } from "react";
import type {
  Transaction,
  Category,
} from "@/features/finance-manager/types/FinancasType";

export const useMonthlySummary = (
  transaction: Transaction[],
  category: Category[],
  selectedMonth: Date
) => {
  return useMemo(() => {
    const ano = selectedMonth.getFullYear();
    const mes = selectedMonth.getMonth() + 1;

    const totals = { totalDespesa: 0, totalReceita: 0, totalLucro: 0 };

    const categoriesMap = Object.fromEntries(category.map((c) => [c.id, c]));

    transaction.forEach((t) => {
      const cat = categoriesMap[t.categoria_id];
      if (!cat) return;

      const tYear = Number(t.data.slice(0, 4));
      const tMonth = Number(t.data.slice(5, 7));
      if (tYear !== ano || tMonth !== mes) return;

      if (cat.type === "Despesa") totals.totalDespesa += t.valor;
      else totals.totalReceita += t.valor;

      totals.totalLucro = totals.totalReceita - totals.totalDespesa;
    });

    return totals;
  }, [transaction, category, selectedMonth]);
};
