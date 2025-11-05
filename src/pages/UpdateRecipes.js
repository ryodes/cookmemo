import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneRecipe } from "features/user/usersSlice";
import { useParams } from "react-router-dom";
import RecipeFormEdit from "forms/RecipeFormEdit";

function UpdateRecipe() {
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);

  const { id } = useParams(); // id dans l'URL ex: /recipes/edit/123

  useEffect(() => {
    dispatch(getOneRecipe(id));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Modifier la recette</h1>
      <RecipeFormEdit id={id} />
    </div>
  );
}

export default UpdateRecipe;
