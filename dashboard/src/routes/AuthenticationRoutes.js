import React, { lazy } from "react";
import Loadable from "ui-component/Loadable";
import { Navigate } from "react-router-dom";

// project imports
import MinimalLayout from "layout/MinimalLayout";
import ViewForm from "views/dashboard/Observers/ViewForm";

// login option 3 routing
const AuthLogin3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Login3"))
);
const AuthRegister3 = Loadable(
  lazy(() => import("views/pages/authentication/authentication3/Register3"))
);

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "/pages/login/login3",
      element: <AuthLogin3 />,
    },
    {
      path: "/pages/register/register3",
      element: <AuthRegister3 />,
    },
    {
      path: "/viewform/:id",
      element: <ViewForm />,
    },
  ],
};

export default AuthenticationRoutes;
