import React, { lazy } from "react";

// project imports
import MainLayout from "layout/MainLayout";
import Loadable from "ui-component/Loadable";
import Reports from "views/dashboard/Observation/Reports";
import Forms from "views/dashboard/Observation/Forms";
import Categories from "views/dashboard/Observation/Categories";
import Level from "views/dashboard/Classes/Level";
import List from "views/dashboard/Classes/List";
import Subjects from "views/dashboard/Classes/Subjects";
import ClassesReports from "views/dashboard/Classes/Reports";
import TeacherReports from "views/dashboard/Teachers/Reports";
import TeacherList from "views/dashboard/Teachers/List";
import ObserverReport from "views/dashboard/Observers/Reports";
import ObserverList from "views/dashboard/Observers/List";
import TrainingReport from "views/dashboard/Training/Reports";
import TrainingList from "views/dashboard/Training/List";
import { Navigate } from "react-router-dom";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("views/dashboard/Default"))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("views/utilities/Shadow")));
const UtilsMaterialIcons = Loadable(
  lazy(() => import("views/utilities/MaterialIcons"))
);
const UtilsTablerIcons = Loadable(
  lazy(() => import("views/utilities/TablerIcons"))
);

// sample page routing
const SamplePage = Loadable(lazy(() => import("views/sample-page")));

// ===========================|| MAIN ROUTING ||=========================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "/", element: <Navigate to="/pages/login/login3" replace /> },
    {
      path: "/dashboard/default",
      element: <DashboardDefault />,
    },
    {
      path: "/dashboard/observation/reports",
      element: <Reports />,
    },
    {
      path: "/dashboard/observation/forms",
      element: <Forms />,
    },
    {
      path: "/dashboard/observation/categories",
      element: <Categories />,
    },
    {
      path: "/dashboard/classes/level",
      element: <Level />,
    },
    {
      path: "/dashboard/classes/list",
      element: <List />,
    },
    {
      path: "/dashboard/classes/reports",
      element: <ClassesReports />,
    },
    {
      path: "/dashboard/classes/subjects",
      element: <Subjects />,
    },
    {
      path: "/dashboard/teacher/report",
      element: <TeacherList />,
    },
    {
      path: "/dashboard/teacher/list",
      element: <TeacherReports />,
    },
    {
      path: "/dashboard/observer/report",
      element: <ObserverReport />,
    },
    {
      path: "/dashboard/observer/list",
      element: <ObserverList />,
    },
    {
      path: "/dashboard/training/report",
      element: <TrainingReport />,
    },
    {
      path: "/dashboard/training/list",
      element: <TrainingList />,
    },
    {
      path: "/utils/util-typography",
      element: <UtilsTypography />,
    },
    {
      path: "/utils/util-color",
      element: <UtilsColor />,
    },
    {
      path: "/utils/util-shadow",
      element: <UtilsShadow />,
    },
    {
      path: "/icons/tabler-icons",
      element: <UtilsTablerIcons />,
    },
    {
      path: "/icons/material-icons",
      element: <UtilsMaterialIcons />,
    },

    {
      path: "/sample-page",
      element: <SamplePage />,
    },
  ],
};

export default MainRoutes;
