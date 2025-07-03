import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));
  return auth?.token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;