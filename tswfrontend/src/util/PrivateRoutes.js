import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoutes = () => {
  let { user } = useContext(AuthContext);

  if (user) {
    sessionStorage.setItem("user", "#88f7%s5X5v%x&");
  }

  let data = sessionStorage.getItem("user");

  return data ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
