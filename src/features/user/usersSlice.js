import { createSlice } from "@reduxjs/toolkit";
import api, { setAccessToken } from "app/api";
import { enqueueSnackbar } from "notistack";

const initialState = {
  user: null,
  recipe: null,
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
    getOneRecipeSuccess: (state, action) => {
      state.recipe = action.payload;
      state.loading = false;
    },
    postRecipeSuccess: (state, action) => {
      state.recipes.push(action.payload);
      state.loading = false;
    },
    putRecipeSuccess: (state, action) => {
      const updatedRecipe = action.payload;
      const index = state.recipes.findIndex((r) => r.id === updatedRecipe.id);

      if (index !== -1) {
        state.recipes[index] = updatedRecipe; // remplace l’élément
      }

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
  putRecipeSuccess,
  getOneRecipeSuccess,
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

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const response = await api.post("/auth/login", { email, password });

    enqueueSnackbar("Connexion réussie !", {
      autoHideDuration: 3000,
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });

    setAccessToken(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    dispatch(getUserSuccess(response.data));
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      enqueueSnackbar("Identifiants incorrects.", {
        autoHideDuration: 3000,
        variant: "warning",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } else {
      enqueueSnackbar(
        "Une erreur est survenue, veuillez réessayer ultérieurement.",
        {
          autoHideDuration: 3000,
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        }
      );
    }
    console.error("Erreur lors du login:", error);
    dispatch(
      getError(error.message || "Erreur lors de la tentative de connexion")
    );
  }
};

// --- SIGNUP ---
export const registerUser = (email, password) => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const response = await api.post("/auth/register", { email, password });

    enqueueSnackbar("Utilisateur créé avec succès !", {
      autoHideDuration: 3000,
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });

    setAccessToken(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    dispatch(getUserSuccess(response.data));
    return response.data;
  } catch (error) {
    if (error.response?.status === 409) {
      enqueueSnackbar("Cet utilisateur existe déjà.", {
        autoHideDuration: 3000,
        variant: "warning",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    } else {
      enqueueSnackbar(
        "Une erreur est survenue, veuillez réessayer ultérieurement.",
        {
          autoHideDuration: 3000,
          variant: "error",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        }
      );
    }
    dispatch(getError(error.message || "Erreur lors de l'inscription"));
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
    console.error("Erreur lors du chargement des recettes.", error);
    dispatch(
      getError(error.message || "Erreur lors du chargement des recettes")
    );
  }
};

export const postRecipe =
  (title, ingredients, steps, imageChoosed, nbPart) => async (dispatch) => {
    dispatch(getLoadingStart());
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
      enqueueSnackbar("Erreur lors de l'ajout.", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
  };

export const getOneRecipe = (id) => async (dispatch) => {
  dispatch(getLoadingStart());
  try {
    const token = localStorage.getItem("token");
    const response = await api.get(`/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getOneRecipeSuccess(response.data));
    return response.data;
  } catch (error) {
    if (error.status === 404 || error.status === 403) {
      enqueueSnackbar("La recette ne peut pas être récupéré", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }
    dispatch(
      getError(error.message || "Erreur lors du chargement des recettes")
    );
  }
};

export const putRecipe =
  ({ id, title, ingredients, steps, image, nbPart }) =>
  async (dispatch) => {
    dispatch(getLoadingStart());
    try {
      const token = localStorage.getItem("token");
      const response = await api.put(
        `/recipes/${id}`,
        { title, ingredients, steps, image, nb_part: nbPart },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(putRecipeSuccess(response.data.recipe));
      return response.data;
    } catch (error) {
      enqueueSnackbar("Erreur lors de l'ajout.", {
        autoHideDuration: 3000,
        variant: "error",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
    }
  };
