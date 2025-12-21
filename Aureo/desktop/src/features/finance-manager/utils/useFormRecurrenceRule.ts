import { useState } from "react";
import { RecurrenceRule } from "@/features/finance-manager/types/FinancasType";
import { toast } from "sonner";
import useSupabaseRule from "@/features/finance-manager/services/supabaseRules";

export function useFormRecurrenceRule() {
  const { addRule } = useSupabaseRule();
  const [form, setForm] = useState<Omit<RecurrenceRule, "id">>({
    tipo: "fixed",
    valor_fixo: null,
    descricao_regra: "",
  });
  async function onSave(
    form: Omit<RecurrenceRule, "id">,
    onClose: (v: boolean) => void
  ) {
    try {
      if (!form.descricao_regra || form.descricao_regra.trim() === "") {
        toast.error("A descrição da regra é obrigatória.");
        return;
      }
      if (
        form.tipo !== "fixed" &&
        form.tipo !== "variable" &&
        form.tipo !== "fixed-variable"
      ) {
        toast.error("Tipo de regra inválido.");
        return;
      }

      await toast.promise(addRule(form), {
        loading: "Salvando regra...",
        success: "Regra salva com sucesso!",
        error: "Erro ao salvar regra.",
      });

      setForm({
        tipo: "fixed",
        valor_fixo: null,
        descricao_regra: "",
      });

      onClose(false);
    } catch (err) {
      console.error("Erro ao salvar regra:", err);
      toast.error("Erro inesperado ao salvar a regra.");
    }
  }
  return {
    form,
    setForm,
    onSave,
  };
}
