import React, { createContext, useState } from "react";
import { DollarSign, BookOpen, KeyRound, LogOut } from "lucide-react";

// -------------- INTERFACES ----------------
export interface OptionItem {
  name: string;
  icon: React.ComponentType<any>;
}

export interface AppContextProps {
  filtro: string;
  setFiltro: (value: string) => void;
  options: OptionItem[];
}

// -------------- CONTEXT -------------------
export const AppContext = createContext<AppContextProps>({
  filtro: "",
  setFiltro: () => {},
  options: [],
});

// -------------- PROVIDER ------------------
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [filtro, setFiltro] = useState("Finanças");

  const options: OptionItem[] = [
    { name: "Finanças", icon: DollarSign },
    { name: "Livros", icon: BookOpen },
    { name: "Senhas", icon: KeyRound },
    { name: "Sair", icon: LogOut },
  ];

  return (
    <AppContext.Provider value={{ filtro, setFiltro, options }}>
      {children}
    </AppContext.Provider>
  );
};
