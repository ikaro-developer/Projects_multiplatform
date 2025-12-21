import React from "react";

//ROUTES
import ReactDOM from "react-dom/client";
import { router } from "@/app/routes";
import { RouterProvider } from "react-router-dom";

//CONTEXT
import { AppProvider } from "./context/Context";

//CSS
import "./index.css";

//COMNENTS
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Toaster position="bottom-right" />

    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
