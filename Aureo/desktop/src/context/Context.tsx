import type { Category, Transaction } from "@/types/FinancasType";
import { createContext, useState } from "react";

interface InterfaceContext {
  category: Category[];
  setCategory: React.Dispatch<React.SetStateAction<Category[]>>;

  transaction: Transaction[];
  setTransaction: React.Dispatch<React.SetStateAction<Transaction[]>>;
}
const initialValue: InterfaceContext = {
  category: [
    {
      id: "1",
      title: "rede",
      color: "blue",
      icon: "red",
      recorrencia: "fixed",
      type: "Despesa",
      transaction: [],
    },
  ],
  setCategory: () => {},
  transaction: [],
  setTransaction: () => {},
};

export const Context = createContext<InterfaceContext>(initialValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [transaction, setTransaction] = useState<Transaction[]>([]);
  return (
    <Context.Provider
      value={{
        category,
        setCategory,
        transaction,
        setTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
