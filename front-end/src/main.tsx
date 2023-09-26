import React from "react";
import ReactDOM from "react-dom/client";
import "./scss/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header/Header";
import {
  homeRoute,
  loginRoute,
  registerRoute,
  unknownRoute,
} from "./exports/appRoutes";
import NotFoundPage from "./components/NotFoundPage/NotFoundPage";
import RegistrationPage from "./components/RegistrationPage/RegistrationPage";
import LoginPage from "./components/LoginPage/LoginPage";

const router = createBrowserRouter([
  {
    path: homeRoute,
    element: <Header />,
    children: [
      {
        path: loginRoute,
        element: <LoginPage />,
      },
      {
        path: registerRoute,
        element: <RegistrationPage />,
      },
      {
        path: unknownRoute,
        element: <NotFoundPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
