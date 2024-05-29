import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RecipesListPage from "../pages/RecipesListPage";
import CreateRecipe from "../pages/CreateRecipePage";
const RecipeComponent = lazy(() => import("../container/RecipeComponent"));
const PrivateRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="">
        <Route
          path="/recipes"
          element={
            <Suspense>
              <RecipesListPage />
            </Suspense>
          }
        />
      </Route>
      <Route
          path="/create-recipe"
          element={
            <Suspense>
              <CreateRecipe />
            </Suspense>
          }
        />
    </Routes>
  );
};

export default PrivateRoute;
