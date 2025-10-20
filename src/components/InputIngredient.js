import * as React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function InputIngredient({
  value,
  onChange,
  onDelete,
  placeholder,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        color: "rgb(135 138 255 / 87%)",
      }}
    >
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border block w-full rounded-md bg-white/5 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
      />
      <Button onClick={onDelete} className="text-red-500">
        ✕
      </Button>
    </Box>
  );
}
