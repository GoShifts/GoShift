import "./App.css";
import "@mantine/core/styles.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/auth/SignUpPage";
import LogInPage from "./Pages/auth/LogInPage";
import VerifyEmail from "./Components/auth/VerifyEmail";
import ForgotPasswordPage from "./Pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/auth/ResetPasswordPage";
import { Header } from "./Components/Header/Header";
import ShiftPage from "./Pages/ShiftPage";
import StaffPage from "./Pages/StaffPage";
import BuildingPage from "./Pages/BuildingPage";
import AddBuilding from "./Components/Building/AddBuilding";
import AddStaff from "./Components/Staff/AddStaff";
import RoomPage from "./Pages/RoomPage";
import AddRoom from "./Components/Room/AddRoom";
import { useEffect, useState } from "react";
import Protected from "./Components/auth/Protected";
import AddShift from "./Components/Shift/AddShift";
import ShiftDetail from "./Components/Shift/ShiftDetail";
import Inventory from './Pages/Inventory';
import AddInventory from "./Components/Inventory/AddInventory";
import SellInventory from "./Components/Sell/SellInventory";
import LogInStaff from "./Components/auth/LoginStaff";
import ShiftsPage from "./Pages/ShiftHome";
import StaffProfilePage from './Pages/StaffProfile'
import { StaffForgotPassword } from "./Components/ForgotPassword/StaffForgotPaasword";
import StaffResetPasswordPage from "./Components/auth/StaffResetPasswordPage";

function App() {
  const [isAuth, setIsAuth] = useState(true);

  const Layout = () => {
    return (
      <div className="app">
        <Header setIsAuth={setIsAuth} />
        <Outlet />
      </div>
    );
  };

  const router = createBrowserRouter([
    // auth routes
    {
      // exact,
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          // exact,
          element: (
            <Protected isAuth={isAuth}>
              <DashboardPage />
            </Protected>
          ),
        },
        {
          path: "/shifts",
          element: (
            <Protected isAuth={isAuth}>
              <ShiftPage />
            </Protected>
          ),
        },
        {
          path: "/shifts/add",
          element: (
            <Protected isAuth={isAuth}>
              <AddShift />
            </Protected>
          ),
        },
        {
          path: "/shift/:id",
          element: (
            <Protected isAuth={isAuth}>
              <ShiftDetail />
            </Protected>
          ),
        },
        {
          path: "/rooms",
          element: (
            <Protected isAuth={isAuth}>
              <RoomPage />
            </Protected>
          ),
        },
        {
          path: "/room/add",
          element: (
            <Protected isAuth={isAuth}>
              <AddRoom />
            </Protected>
          ),
        },
        {
          path: "/staff",
          element: (
            <Protected isAuth={isAuth}>
              <StaffPage />
            </Protected>
          ),
        },
        {
          path: "/staff/add",
          element: (
            <Protected isAuth={isAuth}>
              <AddStaff />
            </Protected>
          ),
        },
        {
          path: "/building",
          element: (
            <Protected isAuth={isAuth}>
              <BuildingPage />
            </Protected>
          ),
        },
        {
          path: "/building/add",
          element: (
            <Protected isAuth={isAuth}>
              <AddBuilding />
            </Protected>
          ),
        },
        {
          path: "/inventory",
          element: (
            <Protected isAuth={isAuth}>
              <Inventory />
            </Protected>
          ),
        },
        {
          path: "/inventory/add",
          element: (
            <Protected isAuth={isAuth}>
              <AddInventory />
            </Protected>
          ),
        },

        {
          path: "/sell/add",
          element: (
            <Protected isAuth={isAuth}>
              <SellInventory />
            </Protected>
          ),
        },

       
       
      ],
    },
    // {
    //   path: "/register",
    //   element: <SignUpPage />,
    // },
    {
      path: "/login",
      element: <LogInPage setIsAuth={setIsAuth} />,
    },
    {
      path: "/login/staff",
      element: <LogInStaff setIsAuth={setIsAuth} />,
    },
    // {
    //   path: "/logout",
    //   element: <LogOut setIsAuth={setIsAuth} />,
    // },
    {
      path: "/auth/:id/verify/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/forgot",
      element: <ForgotPasswordPage />,
    },
    {
      path:"/staff/forgot",
      element:<StaffForgotPassword />
    },
    {
      path: "/reset/:id",
      element: <ResetPasswordPage />,
    },
    {
      path: "/reset/staff/:id",
      element: <StaffResetPasswordPage />,
    },
    {
      path: "/staffHomepage",
      element: (
        <Protected isAuth={isAuth}>
          <ShiftsPage />
        </Protected>
      ),
    },

    {
      path: "/staff/profile",
      element: (
        <Protected isAuth={isAuth}>
          <StaffProfilePage />
        </Protected>
      ),
    },

    
    

    // shifts routes
  ]);

  useEffect(() => {
    console.log("App Component");
  }, []);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
