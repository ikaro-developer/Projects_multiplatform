import { useState } from "react";
import { Category } from "@/types/FinancasType";
import { toast } from "sonner";
import useSupabaseCategory from "@/services/finances/supabaseCategory";

export const useFormCategory = () => {
  const { addCategory } = useSupabaseCategory();

  const colors = [
    "#10b981",
    "#3b82f6",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#14b8a6",
    "#6366f1",
    "#f97316",
    "#06b6d4",
  ];

  // Valores iniciais SEM NULOS
  const [form, setForm] = useState<Omit<Category, "id">>({
    recorrencia_id: "",
    name: "",
    type: "Despesa",
    color: colors[0],
  });

  async function onSave(
    form: Omit<Category, "id">,
    onOpenChange: (open: boolean) => void
  ) {
    try {
      if (!form.name.trim()) {
        toast.error("O nome da categoria é obrigatório.");
        return;
      }

      if (!form.recorrencia_id) {
        toast.error("Selecione uma regra de recorrência.");
        return;
      }

      if (!form.color) {
        toast.error("Selecione uma cor para a categoria.");
        return;
      }

      await toast.promise(addCategory(form), {
        loading: "Salvando categoria...",
        success: "Categoria criada com sucesso!",
        error: "Erro ao salvar categoria.",
      });

      // Reset seguro (com valores válidos)
      setForm({
        recorrencia_id: "",
        name: "",
        type: "Despesa",
        color: colors[0],
      });

      onOpenChange(false);
    } catch (err: any) {
      toast.error("Erro ao salvar categoria.");
      console.error(err);
    }
  }

  return {
    form,
    setForm,
    onSave,
    colors,
  };
};
