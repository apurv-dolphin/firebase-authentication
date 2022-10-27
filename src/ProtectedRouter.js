import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";

export const ProtectedRouter = () => {
  const { user } = useUserAuth();
  return !user ? <Navigate to="/login" /> : <Outlet />;
};
