import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  isAuth: boolean;
  children?: React.ReactNode;
};

function Protected({ isAuth, children }: Props) {
  // const [user, setUser] = useState<any | null>(null);

  // useEffect(() => {
  //   const userId = localStorage.getItem("id");
  //   console.log("protected " + userId);
  //   setUser(userId);
  // }, []);

  console.log(isAuth);

  if (!isAuth) return <Navigate to="/login" />;
  return <div>{children}</div>;
}

export default Protected;

// import { Route, RouteProps, redirect } from "react-router-dom";

// type Props = {
//   isAuth: boolean;
// };

// const Protected = ({ isAuth, ...routeProps }: Props) => {
//   if (isAuth) {
//     return <Route {...routeProps} />;
//   }
//   return redirect("/login");
// };

// export default Protected;
