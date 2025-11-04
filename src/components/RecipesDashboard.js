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

  const sortedRecipesFiltred = sortedRecipes.filter((recipe) => {
    if (query === "") {
      return recipe;
    }
    return recipe.title.includes(query);
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
        {sortedRecipesFiltred.length === 0 ? (
          <EmptyRecipeFiltre query={query} />
        ) : (
          sortedRecipesFiltred.map((recipe, index) => (
            <Grid key={index} sx={{ maxWidth: "240px" }}>
              <CardRecipe recipe={recipe} />
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
}
