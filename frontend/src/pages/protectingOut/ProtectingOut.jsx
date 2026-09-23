import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectingOut = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to={"/Dashboard"} />;
  } else {
    return <Outlet />;
  }
};

export default ProtectingOut;
