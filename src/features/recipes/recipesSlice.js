import { createSlice } from "@reduxjs/toolkit";

import api from "app/api";

const initialState = {
  recipes: [],
  open: false,
  steps: [],
  ingredients: [],
  title: "",
  nbPart: 1,
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      const { steps, ingredients, title, nbPart } = action.payload;
      state.steps = steps;
      state.ingredients = ingredients;
      state.title = title;
      state.nbPart = nbPart;
    },
    closeModal: (state) => {
      state.open = false;
      state.steps = [];
    },
    getRecipeStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getRecipeSuccess: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    getRecipeError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  openModal,
  closeModal,
  getRecipeStart,
  getRecipeSuccess,
  getRecipeError,
} = recipesSlice.actions;
export default recipesSlice.reducer;

export const getRecipes = () => async (dispatch) => {
  dispatch(getRecipeStart());
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getRecipeSuccess(response.data.recipes));
    return response.data;
  } catch (error) {
    dispatch(
      getRecipeError(error.message || "Erreur lors du chargement des recettes")
    );
    console.error("Erreur lors du chargement des recettes", error);
  }
};
