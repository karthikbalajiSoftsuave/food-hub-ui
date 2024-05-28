import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
const RecipeComponent = lazy(() => import("../container/RecipeComponent"));
const PrivateRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="">
        <Route
          path="/recipes"
          element={
            <Suspense>
              <RecipeComponent />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default PrivateRoute;
