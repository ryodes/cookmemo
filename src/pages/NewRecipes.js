import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "features/user/usersSlice";
import RecipeForm from "forms/RecipeForm";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Nouvelle recette</h1>
      <RecipeForm />
    </div>
  );
}

export default Home;
