import { Password } from "../types/passwordTypes";
import React, { createContext, useState } from "react";

// -------------- INTERFACES ----------------
export interface InterfaceContextPassword {
  selectedPassword: Password | null;
  setSelectedPassword: (password: Password | null) => void;

  Password: Password[];
  setPassword: React.Dispatch<React.SetStateAction<Password[]>>;

    navigationOpenHeader: boolean;
  setNavigationOpenHeader: (password: boolean) => void;
}

// -------------- CONTEXT -------------------

const initialValuePassword: InterfaceContextPassword = {
  selectedPassword: null,
  setSelectedPassword: () => {},

  Password: [],
  setPassword: () => {},
  navigationOpenHeader: true,
  setNavigationOpenHeader: () => {},
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

  const [navigationOpenHeader, setNavigationOpenHeader] = useState<boolean>(
    initialValuePassword.navigationOpenHeader
  );

  return (
    <ContextPassword.Provider
      value={{
        
        selectedPassword,
        setSelectedPassword,
        Password,
        setPassword,
        navigationOpenHeader,
        setNavigationOpenHeader,
      }}
    >
      {children}
    </ContextPassword.Provider>
  );
};
