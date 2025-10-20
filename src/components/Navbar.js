import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { Avatar, Tooltip } from "@mui/material";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import CustomizedSwitches from "components/SwitchMui";
import { useNavigate } from "react-router-dom";
import { useAuth } from "context/AuthContext";
import { colorBadge, formatMailBadge } from "utils";
import { jwtDecode } from "jwt-decode";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const token = localStorage.getItem("token");
  let decoded = "";
  if (token) decoded = jwtDecode(token);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ gap: "10px" }}>
          {token && (
            <Avatar
              sx={{ bgcolor: colorBadge(decoded.sub) }}
              aria-label="recipe"
            >
              {formatMailBadge(decoded.sub)}
            </Avatar>
          )}
          <Tooltip title="Accueil">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              onClick={() => navigate("/")}
              sx={{ justifyContent: "flex-start" }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          {token && (
            <Tooltip title="Mes recettes">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="home"
                onClick={() => navigate("/recipes")}
              >
                <ImportContactsIcon />
              </IconButton>
            </Tooltip>
          )}

          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <CustomizedSwitches />
            {token ? (
              <Button
                variant="outlined"
                onClick={() => logout()}
                sx={{ textTransform: "capitalize" }}
              >
                au revoir
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{ textTransform: "capitalize" }}
              >
                c'est parti
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
