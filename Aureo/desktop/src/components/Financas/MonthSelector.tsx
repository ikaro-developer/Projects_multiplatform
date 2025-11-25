import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { addMonths, subMonths } from "date-fns";
import { useContext } from "react";
import { ContextFinance } from "@/context/FinanceContext";

export function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useContext(ContextFinance);

  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setSelectedMonth((prev) => subMonths(prev, 1));
        }}
        className="text-primary-foreground hover:bg-white/20"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <div className="min-w-[200px] text-center">
        <p className="text-xl font-semibold text-primary-foreground">
          {format(selectedMonth, "MMMM 'de' yyyy", { locale: ptBR })}
        </p>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          setSelectedMonth((prev) => addMonths(prev, 1));
        }}
        className="text-primary-foreground hover:bg-white/20"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
