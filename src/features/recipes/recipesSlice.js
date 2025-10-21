import { createSlice } from "@reduxjs/toolkit";

import api from "app/api";

const initialState = {
  recipes: [],
  open: false,
  steps: [],
  loading: false,
  error: null,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.steps = action.payload || [];
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
    console.error("Erreur lors de l'ajout:", error);
  }
};
