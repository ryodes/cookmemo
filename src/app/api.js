import axios from "axios";
import { enqueueSnackbar } from "notistack";

// eslint-disable-next-line
let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true, // (refresh_token)
});

// Interceptor pour ajouter le token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.msg === "Token has expired"
    ) {
      console.log("Token has expired");
      try {
        const refreshResponse = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newToken = refreshResponse.data.access_token;
        setAccessToken(newToken); // 👈 tu réutilises ta fonction globale
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return axios(error.config); // 🔄 rejoue la requête originale
      } catch (refreshError) {
        enqueueSnackbar("Session expiré, veuillez-vous reconnectrer.", {
          autoHideDuration: 3000,
          variant: "warning",
          anchorOrigin: { horizontal: "right", vertical: "top" },
        });
        console.error("Impossible de rafraîchir le token :", refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
