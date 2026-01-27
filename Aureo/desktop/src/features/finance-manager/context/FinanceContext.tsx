import type {
  Category,
  RecurrenceRule,
  Transaction,
} from "@/features/finance-manager/types/FinancasType";
import { createContext, useState } from "react";
//INTERFACE

interface InterfaceContextFinance {
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;

  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;

  rule: RecurrenceRule[];
  setRule: React.Dispatch<React.SetStateAction<RecurrenceRule[]>>;

  selectedMonth: Date;
  setSelectedMonth: React.Dispatch<React.SetStateAction<Date>>;
}

// ================== CONTEXT ==================
const initialValue: InterfaceContextFinance = {
  category: [],
  setCategory: () => {},

  transaction: [],
  setTransaction: () => {},
  rule: [],
  setRule: () => {},

  selectedMonth: new Date(),
  setSelectedMonth: () => {},
};

export const ContextFinance =
  createContext<InterfaceContextFinance>(initialValue);

export const ContextFinanceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<Category[]>(initialValue.category);

  const [transaction, setTransaction] = useState<Transaction[]>(
    initialValue.transaction
  );
  const [rule, setRule] = useState<RecurrenceRule[]>(initialValue.rule);

  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  return (
    <ContextFinance.Provider
      value={{
        category,
        setCategory,
        transaction,
        setTransaction,
        rule,
        setRule,
        selectedMonth,
        setSelectedMonth,
      }}
    >
      {children}
    </ContextFinance.Provider>
  );
};
