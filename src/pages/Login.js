import { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
  Container,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "context/AuthContext";
import { enqueueSnackbar } from "notistack";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signUp } = useAuth();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignIn = async () => {
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Veuillez entrer une adresse email valide.", {
        autoHideDuration: 3000,
        variant: "warning",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }

    await login(email, password);
  };

  const handleSignUp = async () => {
    if (!emailRegex.test(email)) {
      enqueueSnackbar("Veuillez entrer une adresse email valide.", {
        autoHideDuration: 3000,
        variant: "warning",
        anchorOrigin: { horizontal: "right", vertical: "top" },
      });
      return;
    }

    await signUp(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Typography component="p" variant="p">
            <b>Connectez-vous</b> ou <b>créez un compte</b> en un{" "}
            <b>seul geste</b> : il suffit de renseigner votre e-mail et un mot
            de passe, et nous nous occupons du reste !
          </Typography>
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={email !== "" && !emailRegex.test(email)}
              helperText={
                email !== "" && !emailRegex.test(email)
                  ? "Adresse email invalide"
                  : ""
              }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              onClick={() => handleSignIn()}
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 1 }}
              disabled={!email || !password}
            >
              Se connecter
            </Button>
            <Button
              onClick={() => handleSignUp()}
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1 }}
              disabled={!email || !password}
            >
              S'inscrire
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
