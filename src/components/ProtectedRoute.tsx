import { Navigate } from "react-router-dom";
import { useUser } from "./UserContext"; // or your context
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
