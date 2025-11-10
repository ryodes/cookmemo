import React from "react";
import { Box, Select, MenuItem, Typography } from "@mui/material";

export default function NbPartInline({ value = 4, onChange = () => {} }) {
  const handleChange = (e) => {
    const v = Number(e.target.value);
    onChange(v);
  };

  // Générer les options 1..20
  const options = Array.from({ length: 20 }, (_, i) => i + 1);

  return (
    <Box
      component="div"
      className="flex items-center gap-3"
      sx={{ display: "flex", alignItems: "baseline", gap: 2, my: 1 }}
    >
      <Typography variant="body1" color="text.secondary">
        Pour
      </Typography>

      <Select
        value={value}
        onChange={handleChange}
        size="small"
        variant="outlined"
        sx={{
          minWidth: 40,
          "& .MuiOutlinedInput-input": {
            py: "8px",
            px: "10px",
            textAlign: "center",
          },
        }}
        inputProps={{
          "aria-label": `Nombre de personnes, actuellement ${value}`,
        }}
      >
        {options.map((n) => (
          <MenuItem key={n} value={n}>
            {n}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
}
