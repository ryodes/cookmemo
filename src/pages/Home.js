import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyRecipe from "components/EmptyRecipe";
import RecipdesDashboard from "components/RecipesDashboard";
import { getRecipes } from "features/recipes/recipesSlice";

function Home() {
  const dispatch = useDispatch();
  const { recipes } = useSelector((state) => state.recipes);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Bienvenue dans la cuisine de tous</h1>
      <p className="mt-4 mx-auto max-w-3xl text-lg sm:text-xl text-gray-500 leading-relaxed">
        Ici, chacun partage ses recettes, ses saveurs et un peu de son histoire.
        Découvrez les plats des autres passionnés et laissez-vous inspirer pour
        créer les vôtres.
      </p>
      {recipes.length > 0 ? (
        <RecipdesDashboard recipes={recipes} />
      ) : (
        <EmptyRecipe />
      )}
    </div>
  );
}

export default Home;
