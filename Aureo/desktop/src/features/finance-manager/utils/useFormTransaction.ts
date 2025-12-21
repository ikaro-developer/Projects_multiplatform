import { useState } from "react";
import { Transaction } from "@/features/finance-manager/types/FinancasType";
import { toast } from "sonner";
import useSupabaseTransaction from "@/features/finance-manager/services/supabaseTransactions";

export const useFormTransaction = () => {
  const { addTransaction } = useSupabaseTransaction();

  const [form, setForm] = useState<Omit<Transaction, "id">>({
    categoria_id: "",
    valor: 0,
    description: "",
    data: new Date().toISOString().split("T")[0],
    comprovantes: "",
  });
  const getMinDate = () => {
    const hoje = new Date();
    hoje.setMonth(hoje.getMonth() - 12);
    return hoje.toISOString().split("T")[0];
  };

  async function onSave(
    form: Omit<Transaction, "id">,
    onOpenChange: (open: boolean) => void
  ) {
    try {
      if (!form.categoria_id) {
        toast.error("Selecione uma categoria.");
        return;
      }

      if (!form.valor || form.valor <= 0) {
        toast.error("O valor deve ser maior que zero.");
        return;
      }

      if (!form.description.trim()) {
        toast.error("A descrição é obrigatória.");
        return;
      }
      if (!form.comprovantes || form.comprovantes.trim() === "") {
        toast.error("O comprovante é obrigatório.");
        return;
      }

      const hoje = new Date();
      hoje.setHours(0, 0, 0, 0);

      const dataForm = new Date(form.data);
      dataForm.setHours(0, 0, 0, 0);

      if (dataForm > hoje) {
        toast.error("A data não pode ser maior que hoje.");
        return;
      }

      await toast.promise(addTransaction(form), {
        loading: "Salvando transação...",
        success: "Transação salva com sucesso!",
        error: "Erro ao salvar transação.",
      });

      setForm({
        categoria_id: "",
        valor: 0,
        description: "",
        data: new Date().toISOString().split("T")[0],
        comprovantes: "",
      });
      onOpenChange(false);
    } catch (err: any) {
      toast.error("Erro ao salvar transação.");
      console.error(err);
    }
  }

  return {
    form,
    setForm,
    onSave,
    getMinDate,
  };
};
