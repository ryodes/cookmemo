import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import { colorBadge, formatMailBadge } from "utils";
import { Tooltip } from "@mui/material";
import { openModal } from "features/recipes/recipesSlice";
import { useDispatch } from "react-redux";

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

export default function CardRecipe({ recipe }) {
  const dispatch = useDispatch();
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
          <Tooltip title="Démarrer">
            <IconButton
              aria-label="settings"
              onClick={() => dispatch(openModal(steps))}
            >
              <CallMissedOutgoingIcon />
            </IconButton>
          </Tooltip>
        }
        title={title}
        subheader={formattedDate}
      />
      <CardMedia
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
          {ingredients.map((ingredient, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{ color: "text.secondary" }}
            >
              {ingredient}
            </Typography>
          ))}
        </CardContent>
        <CardContent>
          {steps.map((step, index) => (
            <Typography key={index} sx={{ marginBottom: 0 }}>
              {step}
            </Typography>
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}
