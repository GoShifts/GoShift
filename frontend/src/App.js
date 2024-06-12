import React from "react";
import "./App.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./features/auth/components/VerifyEmail";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUpPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/auth/:id/verify/:token",
      element: <VerifyEmail />,
    },
    {
      path: "/dashboard",
      element: <div>DashBoard</div>,
    },
  ]);

  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider theme={theme}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </MantineProvider>
  );
}

export default App;
