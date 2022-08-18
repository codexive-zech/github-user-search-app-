import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth0(); // making use of auth0 states
  const isUser = isAuthenticated && user; // authenticated and user must be both true
  if (!isUser) {
    return <Navigate to="/login" />;
  } // if user is not authenticated redirect to the login page
  return children; // if user is authenticated then display other pages
};
export default PrivateRoute;
