import { ContextFinance } from "@/features/finance-manager/context/FinanceContext";
import supabase from "@/services/supabase";
import { Category } from "@/features/finance-manager/types/FinancasType";
import { useContext } from "react";

const useSupabaseCategory = () => {
  const { setCategory } = useContext(ContextFinance);
  async function getCategory() {
    try {
      const { data, error } = await supabase.from("category").select("*");
      if (error) throw error;

      return data || [];
    } catch (err) {
      console.error("Erro ao buscar category:", err);
      return [];
    }
  }

  async function addCategory(form: Omit<Category, "id">) {
    try {
      const { data: inserted, error } = await supabase
        .from("category")
        .insert(form)
        .select()
        .single();
      if (error) throw error;
      setCategory((prev) => [inserted, ...prev]);
      return inserted;
    } catch (err) {
      console.error("Erro ao adicionar categoria:", err);
      throw err;
    }
  }

  return {
    getCategory,
    addCategory,
  };
};
export default useSupabaseCategory;
