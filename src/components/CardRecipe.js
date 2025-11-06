import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInBrowserIcon from "@mui/icons-material/OpenInBrowser";
import ModeIcon from "@mui/icons-material/Mode";
import { colorBadge, formatMailBadge } from "utils";
import { Tooltip } from "@mui/material";
import { openModal } from "features/recipes/recipesSlice";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function CardRecipe({ recipe, edit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const { title, ingredients, steps, author_email, image, created_at } = recipe;

  const formattedDate = new Date(created_at).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ minHeight: 200 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: colorBadge(author_email) }}
            aria-label="recipe"
          >
            {formatMailBadge(author_email)}
          </Avatar>
        }
        action={
          <span>
            <Tooltip title="Démarrer">
              <IconButton
                aria-label="settings"
                onClick={() =>
                  dispatch(openModal({ steps, ingredients, title }))
                }
              >
                <OpenInBrowserIcon />
              </IconButton>
            </Tooltip>
            {edit && (
              <Tooltip title="Modifier">
                <IconButton
                  aria-label="settings"
                  onClick={() => edit(recipe.id)}
                >
                  <ModeIcon />
                </IconButton>
              </Tooltip>
            )}
          </span>
        }
        title={title}
        subheader={formattedDate}
        sx={{ maxHeight: "73px" }}
      />
      <CardMedia
        onClick={() => navigate(`/recipe/${recipe.id}`)}
        component="img"
        image={image}
        alt={title}
        sx={{ height: "150px" }}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-500">
                {ingredient}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardContent>
          <ul className="list-disc pl-6 space-y-2">
            {steps.map((step, index) => (
              <li key={index} className="text-gray-800">
                {step}
              </li>
            ))}
          </ul>
        </CardContent>
      </Collapse>
    </Card>
  );
}
