import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const LoginPage = lazy(() => import("../pages/AuthPage/LoginPage"));
const RegisterPage = lazy(() => import("../pages/AuthPage/RegisterPage"));
const PublicRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="">
        <Route
          path="/login"
          element={
            <Suspense>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense>
              <RegisterPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default PublicRoute;
