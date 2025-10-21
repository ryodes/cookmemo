import { useAuth } from "context/AuthContext";
import { Navigate } from "react-router-dom";

export default function GuestGuard({ children }) {
  const { user } = useAuth();
  if (localStorage.getItem("token") && user.email) {
    return <Navigate to="/recipes" replace />;
  }

  return children;
}
