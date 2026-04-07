// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const loginType = localStorage.getItem("loginType");

  // SOLO tiene acceso si loginType === "1"
  if (loginType !== "1") {
    return <Navigate to="/" replace />;
  }

  return children;
}
