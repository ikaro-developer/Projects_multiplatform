import { createBrowserRouter } from "react-router-dom";
import { CreatePoint, Home } from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/createPoint",
    element: <CreatePoint />,
  },
]);

export { router };
