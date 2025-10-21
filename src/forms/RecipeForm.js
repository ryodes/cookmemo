import { useState } from "react";
import { useDispatch } from "react-redux";
import { Slider } from "@mui/material";
import InputIngredient from "components/InputIngredient";
import ImageListComponent from "components/ImageListComponent";
import { postRecipe } from "features/user/usersSlice";
import { enqueueSnackbar } from "notistack";

export default function DynamicForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageChoosed, setImageChoosed] = useState(null);
  const [ingredients, setIngredients] = useState([""]);
  const [nbPart, setNbPart] = useState(4);
  const [steps, setSteps] = useState([]);

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
    const filteredIngredients = ingredients.filter((el) => el !== "");
    const filteredSteps = steps.filter((el) => el !== "");
    if (!title || !filteredIngredients || !imageChoosed) {
      alert(
        `Des champs sont vide: ${!true || "titre, "}${
          !true || "Ingrédients, "
        }${!true || "image, "}`
      );
      return null;
    }
    dispatch(
      postRecipe(
        title,
        filteredIngredients,
        filteredSteps,
        imageChoosed,
        nbPart
      )
    );
    enqueueSnackbar("Recette créée.", {
      autoHideDuration: 3000,
      variant: "success",
      anchorOrigin: { horizontal: "right", vertical: "top" },
    });
    setTitle("");
    setImageChoosed(null);
    setIngredients([""]);
    setNbPart(4);
    setSteps([]);
  };

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
        className="bg-green-600 text-white py-2 px-4 rounded-xl hover:bg-green-700 transition"
      >
        En cuisine
      </button>
    </form>
  );
}
