import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
};

export const PrivateRoute = ({ isAuthenticated }: Props) => {
  console.log("private", isAuthenticated)
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
