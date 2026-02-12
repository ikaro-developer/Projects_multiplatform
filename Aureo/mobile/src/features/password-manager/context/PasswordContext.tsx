import { Password } from "../types/passwordTypes";
import React, { createContext, useState } from "react";

// -------------- INTERFACES ----------------
export interface InterfaceContextPassword {
  selectedPassword: Password | null;
  setSelectedPassword: (password: Password | null) => void;

  Password: Password[];
  setPassword: React.Dispatch<React.SetStateAction<Password[]>>;
}

// -------------- CONTEXT -------------------

const initialValuePassword: InterfaceContextPassword = {
  selectedPassword: null,
  setSelectedPassword: () => {},

  Password: [],
  setPassword: () => {},
};

export const ContextPassword =
  createContext<InterfaceContextPassword>(initialValuePassword);

// -------------- PROVIDER ------------------
export const ContextPasswordProvider = ({
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
    <ContextPassword.Provider
      value={{
        selectedPassword,
        setSelectedPassword,
        Password,
        setPassword,
      }}
    >
      {children}
    </ContextPassword.Provider>
  );
};
