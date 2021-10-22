// assets
import { IconDashboard, IconDeviceAnalytics } from "@tabler/icons";

// constant
const icons = {
  IconDashboard,
  IconDeviceAnalytics,
};

// ===========================|| DASHBOARD MENU ITEMS ||=========================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/default",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    // {
    //   id: "observation",
    //   title: "Observation",
    //   type: "collapse",
    //   icon: icons.IconKey,
    //   children: [
    //     {
    //       id: "default21",
    //       title: "Reports",
    //       type: "item",
    //       url: "/dashboard/observation/reports",
    //       //   target: true,
    //     },
    //     {
    //       id: "default22",
    //       title: "Observation forms",
    //       type: "item",
    //       url: "/dashboard/observation/forms",
    //       //   target: true,
    //     },
    //     {
    //       id: "default23",
    //       title: "Categories",
    //       type: "item",
    //       url: "/dashboard/observation/categories",
    //       //   target: true,
    //     },
    //   ],
    // },
    {
      id: "classes",
      title: "Classes",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "default31",
          title: "Reports",
          type: "item",
          url: "/dashboard/classes/reports",
          //   target: true,
        },
        {
          id: "default36",
          title: "Subject Reports",
          type: "item",
          url: "/dashboard/classes/subject-report",
          //   target: true,
        },
        {
          id: "default32",
          title: "Class list",
          type: "item",
          url: "/dashboard/classes/list",
          //   target: true,
        },
        {
          id: "default33",
          title: "Subjects",
          type: "item",
          url: "/dashboard/classes/subjects",
          //   target: true,
        },
        {
          id: "default34",
          title: "Level",
          type: "item",
          url: "/dashboard/classes/level",
          //   target: true,
        },
      ],
    },
    {
      id: "teacher",
      title: "Teachers",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "default41",
          title: "Reports",
          type: "item",
          url: "/dashboard/teacher/report",
          //   target: true,
        },
        {
          id: "default42",
          title: "Teacher list",
          type: "item",
          url: "/dashboard/teacher/list",
          //   target: true,
        },
      ],
    },
    {
      id: "observer",
      title: "Observers / Observations",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "default51",
          title: "Reports",
          type: "item",
          url: "/dashboard/observer/report",
          //   target: true,
        },
        {
          id: "default52",
          title: "Observation Form",
          type: "item",
          url: "/dashboard/observer/list",
          //   target: true,
        },
        {
          id: "default53",
          title: "Observers",
          type: "item",
          url: "/dashboard/observer/all",
          //   target: true,
        },
        {
          id: "default54",
          title: "Appointments",
          type: "item",
          url: "/dashboard/observer/appointments",
          //   target: true,
        },
      ],
    },
    {
      id: "training",
      title: "Training",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "default61",
          title: "Reports",
          type: "item",
          url: "/dashboard/training/report",
          //   target: true,
        },
        {
          id: "default62",
          title: "Training list / Courses",
          type: "item",
          url: "/dashboard/training/list",
          //   target: true,
        },
      ],
    },
  ],
};

export default dashboard;
