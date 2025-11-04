import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid } from "@mui/material";
import CardRecipe from "components/CardRecipe";
import Searchbar from "components/Searchbar";
import EmptyRecipeFiltre from "components/EmptyRecipeFiltre";

export default function RecipdesDashboard({ recipes }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const sortedRecipes = [...recipes].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, "");

  const sortedRecipesFiltered = sortedRecipes.filter((recipe) => {
    if (!query) return true;

    const title = normalize(recipe.title);
    const search = normalize(query);

    return title.includes(search);
  });
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: 2,
        }}
      >
        <Searchbar handleChange={setQuery} />
        <Button
          variant="text"
          onClick={() => navigate("/newRecipe")}
          sx={{ my: 2 }}
        >
          <AddIcon size={18} />
          Ajouter une recette
        </Button>
      </Box>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        direction="row"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {sortedRecipesFiltered.length === 0 ? (
          <EmptyRecipeFiltre query={query} />
        ) : (
          sortedRecipesFiltered.map((recipe, index) => (
            <Grid key={index} sx={{ maxWidth: "240px" }}>
              <CardRecipe recipe={recipe} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
