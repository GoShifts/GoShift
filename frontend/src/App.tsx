import "./App.css";
import "@mantine/core/styles.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/auth/SignUpPage";
import LogInPage from "./Pages/auth/LogInPage";
import VerifyEmail from "./Components/auth/VerifyEmail";
import ForgotPasswordPage from "./Pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/auth/ResetPasswordPage";
import { NavbarNested } from "./Components/NavbarNested/NavbarNested";
import { Header } from "./Components/Header/Header";
import ShiftPage from "./Pages/ShiftPage";
import StaffPage from "./Pages/StaffPage";
import BuildingPage from "./Pages/BuildingPage";
import AddBuilding from "./Components/Building/AddBuilding";
import AddStaff from "./Components/Staff/AddStaff";
import RoomPage from "./Pages/RoomPage";
import AddRoom from "./Components/Room/AddRoom";

function App() {
  const Layout = () => {
    return (
      <div className="app">
        <Header />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    // auth routes
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/shifts",
          element: <ShiftPage />,
        },
        {
          path: "/rooms",
          element: <RoomPage />,
        },
        {
          path: "/room/add",
          element: <AddRoom />,
        },
        {
          path: "/staff",
          element: <StaffPage />,
        },
        {
          path: "/staff/add",
          element: <AddStaff />,
        },
        {
          path: "/building",
          element: <BuildingPage />,
        },
        {
          path: "/building/add",
          element: <AddBuilding />,
        },
      ],
    },
    {
      path: "/register",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
    {
      path: "/auth/:id/verify/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/forgot",
      element: <ForgotPasswordPage />,
    },
    {
      path: "/reset/:id/:token",
      element: <ResetPasswordPage />,
    },

    // shifts routes
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
