import { React } from "react";
import TextField from "@mui/material/TextField";

function Searchbar({ handleChange }) {
  return (
    <div className="search">
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="Recherche"
        onChange={(e) => handleChange(e.target.value)}
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "#1976d2",
            "& fieldset": {
              borderColor: "#1976d2",
            },
            "&:hover fieldset": {
              borderColor: "#1565c0",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#1976d2",
          },
        }}
      />
    </div>
  );
}

export default Searchbar;
