import App from "./App";
import Signup from "./Signup";
import Landing from "./Landing";
import { createBrowserRouter } from "react-router-dom";
import Photographers from "./BrowsePhotographers";
import Login from "./Login";
import PhotographerDetails from "./PhotographerDetails";
import Profile from "./Profile";
import BookingDetails from "./BookingDetails";

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
      },
      {
        path: "/photographers/:photographerId",
        element: <PhotographerDetails />
      },
      {
        path:"/myprofile",
        element: <Profile />
      },
      {
        path: "/bookings/:bookingId",
        element: <BookingDetails />
      }
    ],
  },
]);
