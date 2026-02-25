import React, { createContext, useState } from "react";

// -------------- INTERFACES ----------------
export interface InterfaceContext {

    navigationOpenHeader: boolean;
  setNavigationOpenHeader: (value: boolean) => void;
}

// -------------- CONTEXT -------------------

const initialValue: InterfaceContext = {

  navigationOpenHeader: true,
  setNavigationOpenHeader: () => {},
};

export const Context =
  createContext<InterfaceContext>(initialValue);

// -------------- PROVIDER ------------------
export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [navigationOpenHeader, setNavigationOpenHeader] = useState<boolean>(
    initialValue.navigationOpenHeader
  );

  return (
    <Context.Provider
      value={{
        navigationOpenHeader,
        setNavigationOpenHeader,
      }}
    >
      {children}
    </Context.Provider>
  );
};
