import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import { UI_ENDPOINTS } from "../utils/endpoints";
const AuthPage = lazy(() => import("../pages/AuthPage"));

const PublicRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Suspense>
          <IntroPage />
        </Suspense>
      } />
      <Route
        path={UI_ENDPOINTS.AUTH}
        element={
          <Suspense>
            <AuthPage />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default PublicRoute;
