import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Slider } from "@mui/material";
import InputIngredient from "components/InputIngredient";
import ImageListComponent from "components/ImageListComponent";
import { putRecipe } from "features/user/usersSlice";
import { enqueueSnackbar } from "notistack";
import LoadingSpinner from "components/LoadingSpinner";

export default function EditRecipeForm({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipe, loading } = useSelector((state) => state.user);

  const [title, setTitle] = useState("");
  const [imageChoosed, setImageChoosed] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const [nbPart, setNbPart] = useState(4);
  const [steps, setSteps] = useState([]);

  // Pré-remplir le formulaire quand la recette arrive
  useEffect(() => {
    if (!recipe) return;
    setTitle(recipe.title);
    setImageChoosed(recipe.image);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
    setNbPart(recipe.nb_part);
  }, [recipe]);

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const handleChangeIngredients = (index, newValue) => {
    const updated = [...ingredients];
    updated[index] = newValue;
    setIngredients(updated);
  };

  const handleChangeSteps = (index, newValue) => {
    const updated = [...steps];
    updated[index] = newValue;
    setSteps(updated);
  };

  const removeIngredients = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const removeSteps = (index) => {
    setSteps(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const filteredIngredients = ingredients.filter((el) => el.trim() !== "");
    const filteredSteps = steps.filter((el) => el.trim() !== "");

    if (!title || !filteredIngredients.length || !imageChoosed) {
      enqueueSnackbar("Certains champs sont vides.", { variant: "error" });
      return;
    }

    dispatch(
      putRecipe({
        id,
        title,
        ingredients: filteredIngredients,
        steps: filteredSteps,
        image: imageChoosed,
        nbPart,
      })
    );

    enqueueSnackbar("Recette mise à jour", {
      variant: "success",
      autoHideDuration: 3000,
    });

    navigate(`/recipes`);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 w-full max-w-md mx-auto my-[24px]"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="titre recette"
        className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <p>Recette pour combien de personne:</p>
      <Slider
        value={nbPart}
        onChange={(e) => setNbPart(e.target.value)}
        valueLabelDisplay="auto"
        step={1}
        color="primary"
        sx={{
          ".MuiSlider-markLabel": {
            color: "rgb(37 99 235 / var(--tw-bg-opacity, 1))",
          },
        }}
        marks={[
          {
            value: 1,
            label: "1",
          },
          {
            value: 2,
            label: "2",
          },
          {
            value: 3,
            label: "3",
          },
          {
            value: 4,
            label: "4",
          },
          {
            value: 5,
            label: "5",
          },
          {
            value: 6,
            label: "6",
          },
          {
            value: 7,
            label: "7",
          },
          {
            value: 8,
            label: "8",
          },
          {
            value: 9,
            label: "9",
          },
          {
            value: 10,
            label: "10",
          },
        ]}
        min={1}
        max={10}
      />
      {ingredients.map((value, index) => (
        <InputIngredient
          key={index}
          value={value}
          onChange={(e) => handleChangeIngredients(index, e.target.value)}
          onDelete={() => removeIngredients(index)}
          placeholder={`Ingrédient ${index + 1}`}
        />
      ))}

      <button
        type="button"
        onClick={addIngredient}
        className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        + Ajouter un ingrédient
      </button>

      {steps.map((value, index) => (
        <InputIngredient
          key={index}
          value={value}
          onChange={(e) => handleChangeSteps(index, e.target.value)}
          onDelete={() => removeSteps(index)}
          placeholder={`étape ${index + 1}`}
        />
      ))}

      <button
        type="button"
        onClick={addStep}
        className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
      >
        + Ajouter une étape
      </button>

      <ImageListComponent
        imageChoosed={imageChoosed}
        setImageChoosed={setImageChoosed}
      />
      <button
        type="submit"
        className="bg-orange-500 text-white py-2 px-4 rounded-xl hover:bg-orange-600 transition"
      >
        Enregistrer les modifications
      </button>
    </form>
  );
}
