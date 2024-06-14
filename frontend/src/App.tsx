import "./App.css";
import "@mantine/core/styles.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import DashboardPage from "./Pages/DashboardPage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import VerifyEmail from "./Components/auth/VerifyEmail";

function App() {
  const router = createBrowserRouter([
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
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
