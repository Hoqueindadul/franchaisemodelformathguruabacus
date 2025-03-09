import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";

const ProtectRoute = ({ children }) => {
  const { isAuthenticated, userRole } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Define role-based dashboards
  const roleBasedRoutes = {
    student: "/student-dashboard",
    franchise: "/franchise-dashboard",
    admin: "/admin-dashboard",
  };

  // If the user is already on their dashboard, allow access
  if (location.pathname === roleBasedRoutes[userRole]) {
    return children;
  }

  // Redirect users to their respective dashboards if they are not already there
  if (userRole in roleBasedRoutes) {
    return <Navigate to={roleBasedRoutes[userRole]} replace />;
  }

  // If no specific role, allow access to the requested route
  return children;
};

export default ProtectRoute;
