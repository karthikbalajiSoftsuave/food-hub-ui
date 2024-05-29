import { Navigate, Outlet } from "react-router-dom";

type Props = {
  isAuthenticated: boolean;
};

export const PrivateRoute = ({ isAuthenticated }: Props) => {
  return true ? (
    <Outlet />
  ) : (
    <Navigate to={"/"} />
  );
};
