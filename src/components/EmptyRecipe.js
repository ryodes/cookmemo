import React from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function EmptyRecipe() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] min-w-[300px] rounded-lg border border-[#1a2235] text-center">
      <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-md bg-[#1a2235]">
        <MenuBookIcon className="text-gray-300" size={24} />
      </div>

      <h2 className=" font-semibold text-lg mb-1">Pas de recette</h2>
      <p className=" text-sm mb-5">Commencez par créer une nouvelle recette</p>

      <button
        className="flex items-center gap-2 bg-[#6b4eff] hover:bg-[#5a3fee] text-white font-medium px-4 py-2 rounded-md transition"
        onClick={() => navigate("/newRecipe")}
      >
        <AddIcon size={18} />
        Nouvelle recette
      </button>
    </div>
  );
}
