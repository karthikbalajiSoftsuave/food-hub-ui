import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import { UI_ENDPOINTS } from "../utils/endpoints";
import { useSelector } from "react-redux";
import { PublicRoute } from "./PublicRoutes";
import { PrivateRoute } from "./PrivateRoutes";
import TopNavigation from "../layouts/TopNavigation";
const AuthPage = lazy(() => import("../pages/AuthPage"));
const RecipeComponent = lazy(() => import("../container/RecipeComponent"));

const AppRouter = () => {
  const userData = useSelector((state: any) => state.user);
  //   const dispatch = useDispatch();
  //   const Navigate = useNavigate();
  // //   dispatch(clearUser());

  //   useEffect(() => {
  //     if (userData?.data?.access) {
  //       Navigate("/recipes");
  //     } else {
  //       Navigate("/");
  //     }
  //   }, [userData]);

  //   return <>{userData?.data?.access ? <PrivateRoute /> : <PublicRoute />}</>;

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
        element={<PrivateRoute isAuthenticated={!!userData?.data?.access} />}
      >
        <Route path={UI_ENDPOINTS.APP} element={<TopNavigation />}>
          <Route
            path={UI_ENDPOINTS.RECIPES_LIST}
            element={
              <Suspense>
                <RecipeComponent />
              </Suspense>
            }
          />
        </Route>
      </Route>
      <Route
        element={<PublicRoute isAuthenticated={!!userData?.data?.access} />}
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
