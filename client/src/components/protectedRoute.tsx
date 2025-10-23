import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const token = localStorage.getItem("token"); // או userRole אם את רוצה גם תפקיד

  if (!token) {
    // אם אין token → שולח ל-login
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
