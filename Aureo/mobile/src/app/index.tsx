import "react-native-gesture-handler";
import "react-native-reanimated";

import React from "react";
import Routes from "./routes";
import { ToastProvider } from "@/components";
import { ContextProvider } from "@/context/Context";

const App = () => {
  return (
    <ContextProvider>
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </ContextProvider>

  );

};

export default App;
