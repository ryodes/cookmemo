import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import RecipdesDashboard from "components/RecipesDashboard";
import EmptyRecipe from "components/EmptyRecipe";
import { getRecipes } from "features/user/usersSlice";
import LoadingSpinner from "components/LoadingSpinner";

function Recipe() {
  const { recipes, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-[24px] text-4xl font-bold">Mes recettes</h1>
      {loading ? (
        <LoadingSpinner />
      ) : recipes.length > 0 ? (
        <RecipdesDashboard recipes={recipes} />
      ) : (
        <EmptyRecipe />
      )}
    </div>
  );
}

export default Recipe;
