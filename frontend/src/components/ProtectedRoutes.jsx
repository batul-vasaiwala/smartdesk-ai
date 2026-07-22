import { Navigate } from "react-router-dom";
import { getUser, isLoggedIn } from "../services/authService";

export default function ProtectedRoutes({ children, role }) {
  // User is not logged in
  if (!isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const user = getUser();

  // Safety check
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role && user.role !== role) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }

    if (user.role === "customer") {
      return <Navigate to="/customer" replace />;
    }

    return <Navigate to="/" replace />;
  }

  return children;
}