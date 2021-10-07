// assets
import {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
} from "@tabler/icons";

// constant
const icons = {
  IconKey,
  IconReceipt2,
  IconBug,
  IconBellRinging,
  IconPhoneCall,
};

// ===========================|| EXTRA PAGES MENU ITEMS ||=========================== //

const pages = {
  id: "pages",
  title: "Evaluate",
  type: "group",
  children: [
    {
      id: "authentication",
      title: "Evaluate",
      type: "collapse",
      icon: icons.IconKey,
      children: [
        {
          id: "default31",
          title: "Evaluate Tests",
          type: "item",
          url: "/pages/login/login3",
          target: true,
        },
        {
          id: "default32",
          title: "Publish/ Approval Results",
          type: "item",
          url: "/pages/register/register3",
          target: true,
        },
      ],
    },
  ],
};

export default pages;
