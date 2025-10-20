import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid } from "@mui/material";
import CardRecipe from "components/CardRecipe";

export default function RecipdesDashboard({ recipes }) {
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
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
        {recipes.map((recipe, index) => (
          <Grid key={index}>
            <CardRecipe recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
