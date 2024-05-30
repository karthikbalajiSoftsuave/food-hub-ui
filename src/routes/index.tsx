import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import { UI_ENDPOINTS } from "../utils/endpoints";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoutes";
import { PrivateRoute } from "./PrivateRoutes";
import TopNavigation from "../layouts/TopNavigation";
import CreateRecipe from "../pages/CreateRecipePage";
const AuthPage = lazy(() => import("../pages/AuthPage"));
const RecipesListPage = lazy(() => import("../pages/RecipesListPage"));

const AppRouter = () => {
  const userData = useSelector((state: any) => state.user);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <IntroPage />
          </Suspense>
        }
      />
      <Route
        element={<PrivateRoute isAuthenticated={userData?.access} />}
      >
        <Route path={UI_ENDPOINTS.APP} element={<TopNavigation />}>
          <Route
            path={UI_ENDPOINTS.RECIPES_LIST}
            element={
              <Suspense>
                <RecipesListPage />
              </Suspense>
            }
          />
          <Route
            path={UI_ENDPOINTS.CREATE_RECIPE}
            element={
              <Suspense>
                <CreateRecipe />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        element={<PublicRoute isAuthenticated={userData?.data?.access} />}
      >
        <Route
          path={UI_ENDPOINTS.AUTH}
          element={
            <Suspense>
              <AuthPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRouter;
