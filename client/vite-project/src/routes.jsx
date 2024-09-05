import App from "./App";
import Signup from "./signup";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "/signup",
        element: <Signup />,
      }
    ],
  },
]);
