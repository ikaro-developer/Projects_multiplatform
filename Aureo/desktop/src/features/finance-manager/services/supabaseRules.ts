import { ContextFinance } from "@/features/finance-manager/context/FinanceContext";
import supabase from "@/services/supabase";
import { RecurrenceRule } from "@/features/finance-manager/types/FinancasType";
import { useContext } from "react";

const useSupabaseRules = () => {
  const { setRule } = useContext(ContextFinance);

  async function getRule() {
    try {
      const { data, error } = await supabase
        .from("recurrence_rule")
        .select("*");

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error("Erro ao buscar recurrence_rule:", err);
      return [];
    }
  }
  async function addRule(form: Omit<RecurrenceRule, "id">) {
    try {
      const { data: inserted, error } = await supabase
        .from("recurrence_rule")

        .insert(form)
        .select()
        .single();
      if (error) throw error;
      setRule((prev) => [inserted, ...prev]);
      return inserted;
    } catch (err) {
      console.error("Erro ao adicionar recurrence_rule:", err);
      throw err;
    }
  }
  return {
    getRule,
    addRule,
  };
};
export default useSupabaseRules;
