import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOneRecipe } from "features/user/usersSlice";
import { useParams } from "react-router-dom";
import ContentSection from "components/ContentSection";

function RecipeContent() {
  const dispatch = useDispatch();

  const { id } = useParams(); // id dans l'URL ex: /recipes/edit/123

  useEffect(() => {
    dispatch(getOneRecipe(id));
  }, [dispatch, id]);

  return (
    <div className="flex flex-col items-center justify-center">
      <ContentSection id={id} />
    </div>
  );
}

export default RecipeContent;
