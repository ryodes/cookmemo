import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { postUsers } from "features/user/usersSlice";
import { setAccessToken } from "app/api";

let logoutCallback = null;
export const setLogoutCallback = (callback) => {
  logoutCallback = callback;
};
export const triggerLogout = () => {
  if (logoutCallback) logoutCallback();
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      setUser({ email: decoded.sub, id: decoded.csrf });
    }
  }, []);

  const login = async (email, password) => {
    const res = await dispatch(postUsers(email, password));
    if (res?.access_token) {
      const decoded = jwtDecode(res.access_token);
      setUser({ email: decoded.sub, id: decoded.csrf });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    setAccessToken(null);
  };

  useEffect(() => {
    setLogoutCallback(() => logout);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
