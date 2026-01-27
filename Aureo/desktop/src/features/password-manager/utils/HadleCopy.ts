import { toast } from "sonner";

export const handleCopy = (text: string, label: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copiado!", {
    description: `${label} copiado para a área de transferência.`,
  });
};
