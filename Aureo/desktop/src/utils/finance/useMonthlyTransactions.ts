import { useMemo } from "react";
import type { Transaction, Category } from "@/types/FinancasType";

export const useMonthlyTransactions = (
  transaction: Transaction[],
  category: Category[],
  selectedMonth: Date
) => {
  return useMemo(() => {
    const ano = selectedMonth.getFullYear();
    const mes = selectedMonth.getMonth() + 1;

    return transaction
      .filter((t) => {
        const tYear = Number(t.data.slice(0, 4));
        const tMonth = Number(t.data.slice(5, 7));
        return tYear === ano && tMonth === mes;
      })
      .map((t) => ({
        ...t,
        category: category.find((c) => c.id === t.categoria_id),
        dateObj: new Date(t.data),
      }))
      .sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  }, [transaction, category, selectedMonth]);
};
