import { Password } from "@/features/password-manager/types/SenhasType";
import React, { createContext, useState } from "react";

// -------------- INTERFACES ----------------
export interface InterfaceContextSenha {
  viewMode: "list" | "details" | "form" | "generator";
  setViewMode: (mode: "list" | "details" | "form" | "generator") => void;

  selectedPassword: Password | null;
  setSelectedPassword: (password: Password | null) => void;
}

// -------------- CONTEXT -------------------
export const ContextSenha = createContext<InterfaceContextSenha>({
  viewMode: "list",
  setViewMode: () => {},

  selectedPassword: null,
  setSelectedPassword: () => {},
});

// -------------- PROVIDER ------------------
export const ContextSenhaProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
      }}
    >
      {children}
    </ContextSenha.Provider>
  );
};
