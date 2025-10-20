import { Navigate } from "react-router-dom";

export default function GuestGuard({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/recipes" replace />;
  }

  return children;
}
