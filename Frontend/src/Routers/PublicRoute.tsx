import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from "../utils";

export const PublicRoute = ({ children }: any) => {
  return getFromLocalStorage("email") == null ? children: <Navigate to="/login" />;
};

export default PublicRoute;
