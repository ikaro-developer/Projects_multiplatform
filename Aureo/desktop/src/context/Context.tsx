import React, { createContext } from "react";

//INTERFACE
interface InterfaceContext {}

// ================== CONTEXT ==================
const initialValue: InterfaceContext = {};

export const Context = createContext<InterfaceContext>(initialValue);

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <Context.Provider value={{}}>{children}</Context.Provider>;
};
