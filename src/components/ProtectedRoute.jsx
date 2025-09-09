// src/components/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * roles: array of allowed roles for the route
 * Example: roles={["admin"]} or roles={["user"]}
 */
const ProtectedRoute = ({ roles = [], children }) => {
  const { token, user } = useSelector((state) => state.auth);

  // Not logged in
  if (!token) return <Navigate to="/login" replace />;

  // Role not allowed
  if (roles.length > 0 && !roles.includes(user?.role)) {
    return <Navigate to="/login" replace />; // Or a Not Authorized page
  }

  return children;
};

export default ProtectedRoute;
