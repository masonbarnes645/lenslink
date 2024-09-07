import App from "./App";
import Signup from "./signup";
import Landing from "./landing";
import { createBrowserRouter } from "react-router-dom";
import Photographers from "./browsephotographers";
import Login from "./login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path:"/photographers",
        element: <Photographers />
      },
      {
        path: "/login",
        element: <Login />
      }
    ],
  },
]);
