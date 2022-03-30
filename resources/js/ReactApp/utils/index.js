import { Navigate } from "react-router-dom";


const isLogin = () => {
  var userCurrent = sessionStorage.getItem("AUTHORIZATION");
  if (userCurrent) return true;
  return false;
}

export const  RequireAuth = ({ children, redirectTo }) => {
  let isAuthenticated = isLogin();
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export const  Authenticated = ({ children, redirectTo }) => {
  let isAuthenticated = isLogin();
  return isAuthenticated ? <Navigate to={redirectTo} /> : children ;
}