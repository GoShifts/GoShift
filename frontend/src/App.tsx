import "./App.css";
import "@mantine/core/styles.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/auth/SignUpPage";
import LogInPage from "./Pages/auth/LogInPage";
import VerifyEmail from "./Components/auth/VerifyEmail";

import ForgotPasswordPage from "./Pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/auth/ResetPasswordPage";
import StaffList from "./Pages/staffList";


function App() {
  const router = createBrowserRouter([
    // auth routes
    {
      path: "/",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LogInPage />,
    },
    {
      path: "/dashboard",
      element: <DashboardPage />,
    },
    {
      path: "/auth/:id/verify/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/staff",
      element: <StaffList />,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
