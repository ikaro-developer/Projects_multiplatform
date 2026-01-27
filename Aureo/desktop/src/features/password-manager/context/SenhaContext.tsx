import { Password } from "../types/SenhasType";
import React, { createContext, useState } from "react";

// -------------- INTERFACES ----------------
export interface InterfaceContextSenha {
  viewMode: "list" | "details" | "form" | "generator";
  setViewMode: (mode: "list" | "details" | "form" | "generator") => void;

  selectedPassword: Password | null;
  setSelectedPassword: (password: Password | null) => void;

  Password: Password[];
  setPassword: React.Dispatch<React.SetStateAction<Password[]>>;
}

// -------------- CONTEXT -------------------

const initialValuePassword: InterfaceContextSenha = {
  viewMode: "list",
  setViewMode: () => {},

  selectedPassword: null,
  setSelectedPassword: () => {},

  Password: [],
  setPassword: () => {},
};

export const ContextSenha =
  createContext<InterfaceContextSenha>(initialValuePassword);

// -------------- PROVIDER ------------------
export const ContextSenhaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [Password, setPassword] = useState<Password[]>(
    initialValuePassword.Password
  );
  const [viewMode, setViewMode] = useState<
    "list" | "details" | "form" | "generator"
  >("list");

  const [selectedPassword, setSelectedPassword] = useState<Password | null>(
    null
  );

  return (
    <ContextSenha.Provider
      value={{
        viewMode,
        setViewMode,
        selectedPassword,
        setSelectedPassword,
        Password,
        setPassword,
      }}
    >
      {children}
    </ContextSenha.Provider>
  );
};
