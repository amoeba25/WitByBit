import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check if the user is authenticated
  const isAuthenticatedFromStorage = localStorage.getItem("isAuthenticated");

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return isAuthenticatedFromStorage ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
