import React from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function EmptyRecipeFiltre({ query }) {
  return (
    <div className="flex flex-col items-center justify-center h-[300px] w-[300px] rounded-lg border border-[#1a2235] text-center">
      <div className="mb-3 flex items-center justify-center w-12 h-12 rounded-md bg-[#1a2235]">
        <MenuBookIcon className="text-gray-300" size={24} />
      </div>
      <h2 className=" font-semibold text-lg mb-1">
        Aucun résultat pour {query}
      </h2>
    </div>
  );
}
