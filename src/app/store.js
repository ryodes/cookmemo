import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "features/recipes/recipesSlice";
import userReducer from "features/user/usersSlice";

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    user: userReducer,
  },
});
