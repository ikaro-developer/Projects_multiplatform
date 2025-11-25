import { ContextFinance } from "@/context/FinanceContext";
import supabase from "@/services/supabase";
import { Transaction } from "@/types/FinancasType";
import { useContext } from "react";

const useSupabaseTransaction = () => {
  const { setTransaction } = useContext(ContextFinance);

  const getTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from("transaction")
        .select("*")
        .order("data", { ascending: false });

      if (error) throw error;
      return data;
    } catch (err) {
      console.error("Erro ao buscar transactions:", err);
      return [];
    }
  };

  async function addTransaction(form: Omit<Transaction, "id">) {
    try {
      const { data: inserted, error } = await supabase
        .from("transaction")
        .insert(form)
        .select()
        .single();
      if (error) throw error;
      setTransaction((prev) => [inserted, ...prev]);
      return inserted;
    } catch (err) {
      console.error("Erro ao adicionar transação:", err);
      throw err;
    }
  }

  return {
    getTransactions,
    addTransaction,
  };
};
export default useSupabaseTransaction;
