//ROUTER
import { createBrowserRouter } from "react-router-dom";

import { Home, NotFound } from "@/pages";

import App from "@/app/App";
import Private from "./private";

const router = createBrowserRouter([
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/",
    element: (
      <Private>
        <App />
      </Private>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export { router };
