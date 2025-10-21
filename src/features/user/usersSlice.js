import { Alert } from "@mui/material";
import { createSlice } from "@reduxjs/toolkit";
import api, { setAccessToken } from "app/api";
import { enqueueSnackbar } from "notistack";

const initialState = {
  user: null,
  recipes: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getLoadingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUserSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    getRecipesSuccess: (state, action) => {
      state.recipes = action.payload;
      state.loading = false;
    },
    postRecipeSuccess: (state, action) => {
      state.recipes.push(action.payload);
      state.loading = false;
    },
    getError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getRecipes.pending, (state) => {
  //       state.loading = true;
  //       state.error = null;
  //     })
  //     .addCase(getRecipes.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.recipes = action.payload;
  //     })
  //     .addCase(getRecipes.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const {
  getLoadingStart,
  getRecipesSuccess,
  postRecipeSuccess,
  getUserSuccess,
  getError,
} = usersSlice.actions;
export default usersSlice.reducer;

export const getUsers = () => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const response = await api.get("/users");
    dispatch(getUserSuccess(response.data));
  } catch (error) {
    console.error("Erreur lors du fetch des users:", error);
    dispatch(
      getError(error.message || "Erreur lors du chargement des utilisateurs")
    );
  }
};

export const postUsers = (email, password) => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200) {
      enqueueSnackbar("Connexion réussie !", {
        autoHideDuration: 3000,
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } else if (response.status === 201) {
      enqueueSnackbar("Utilisateur créé avec succès !", {
        autoHideDuration: 3000,
        variant: "success",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
    setAccessToken(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    dispatch(getUserSuccess(response.data));
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      <Alert severity="warning">Mot de passe incorrect.</Alert>;
    } else {
      <Alert severity="error">Une erreur est survenue, réessayez.</Alert>;
    }
    console.error("Erreur lors du login:", error);
    dispatch(
      getError(
        error.message ||
          "Erreur lors du chargement de la tentative de connexion"
      )
    );
  }
};

export const getRecipes = () => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const token = localStorage.getItem("token");
    const response = await api.get("/users/recipes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getRecipesSuccess(response.data.recipes));
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout:", error);
    dispatch(
      getError(error.message || "Erreur lors du chargement des recettes")
    );
  }
};

export const postRecipe =
  (title, ingredients, steps, imageChoosed, nbPart) => async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        "/recipes",
        { title, ingredients, steps, image: imageChoosed, nb_part: nbPart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(postRecipeSuccess(response.data.recipe));

      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      // return rejectWithValue(error.response?.data?.msg || "Erreur inconnue");
    }
  };
