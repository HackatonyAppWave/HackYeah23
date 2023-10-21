import React from "react";
import {
  Routes,
  Route,
  Link,
  NavLink,
  Router,
  BrowserRouter,
  Navigate,
  useNavigate,
  Outlet,
} from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AboutUs from "../Pages/AboutUs";
import Help from "../Pages/Help";
import Hero from "../Pages/Hero";
import Login from "../Pages/Login";
import PlatformPage from "../Pages/PlatformPage";
import ProfesorPage from "../Pages/ProfesorPage";
import Survey from "../Pages/Survey";

const AppRouter: React.FC = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Hero />
                <AboutUs />
                <Help />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/platform"
            element={
              <PrivateRoute>
                <PlatformPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profesor"
            element={
              <PrivateRoute>
                <ProfesorPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ankieta"
            element={
              <PrivateRoute>
                <Survey />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default AppRouter;
