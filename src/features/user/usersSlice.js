import { createSlice } from "@reduxjs/toolkit";
import api, { setAccessToken } from "app/api";

const initialState = {
  users: [],
  recipes: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
    },
    getRecipesSuccess: (state, action) => {
      state.recipes = action.payload;
    },
    postRecipeSuccess: (state, action) => {
      state.recipes.push(action.payload);
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

export const { getRecipesSuccess, postRecipeSuccess, getUsersSuccess } =
  usersSlice.actions;
export default usersSlice.reducer;

export const getUsers = () => async (dispatch) => {
  try {
    const response = await api.get("/users");
    dispatch(getUsersSuccess(response.data));
  } catch (error) {
    console.error("Erreur lors du fetch des users:", error);
  }
};

export const postUsers = (email, password) => async () => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.status === 200) {
      alert("✅ Connexion réussie !");
    } else if (response.status === 201) {
      alert("✔️ Utilisateur créé avec succès");
    }
    setAccessToken(response.data.access_token);
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      alert("⚠️ Mot de passe incorrect");
    } else {
      alert("❌ Une erreur est survenue, réessayez");
    }
    console.error("Erreur lors du login:", error);
  }
};

export const getRecipes = () => async (dispatch) => {
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
