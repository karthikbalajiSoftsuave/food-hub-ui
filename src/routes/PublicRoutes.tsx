import { Navigate, Outlet } from "react-router-dom";
import { UI_ENDPOINTS } from "../utils/endpoints";

type Props = {
  isAuthenticated: boolean;
};

export const PublicRoute = ({ isAuthenticated }: Props) => {
  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={UI_ENDPOINTS.RECIPES_LIST} />
  );
};
