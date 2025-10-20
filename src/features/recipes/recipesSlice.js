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
    getRecipeSuccess: (state, action) => {
      state.recipes = action.payload;
    },
  },
});

export const { openModal, closeModal, getRecipeSuccess } = recipesSlice.actions;
export default recipesSlice.reducer;

export const getRecipes = () => async (dispatch) => {
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
    console.error("Erreur lors de l'ajout:", error);
  }
};
