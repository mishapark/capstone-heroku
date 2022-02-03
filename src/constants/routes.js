// Pages
import Analytics from "../pages/Analytics";
import BIS from "../pages/BIS";
import CE from "../pages/CE";
import Compliance from "../pages/Compliance";
import FDA from "../pages/FDA";
import Products from "../pages/Products";
import Home from "../pages/Home";
import Forgot from "../pages/Forgot";

// Icons
import AppsIcon from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AssessmentIcon from "@material-ui/icons/Assessment";

export default {
  items: [
    {
      path: "/",
      name: "Dashboard",
      type: "link",
      icon: DashboardIcon,
      component: Home,
    },
    {
      path: "/products",
      name: "Products",
      type: "link",
      icon: InboxIcon,
      component: Products,
    },
    {
      path: "/compliance",
      name: "Compliance Central",
      type: "link",
      icon: CheckBoxIcon,
      component: Compliance,
    },
    {
      path: "/analytics",
      name: "Analytics",
      type: "link",
      icon: AssessmentIcon,
      component: Analytics,
    },
    {
      path: "/submissions",
      name: "Submissions",
      type: "submenu",
      icon: AppsIcon,
      badge: {
        type: "primary",
        value: "3",
      },
      children: [
        {
          path: "/ce",
          name: "CE",
          component: CE,
        },
        {
          path: "/fda",
          name: "FDA",
          component: FDA,
        },
        {
          path: "/bis",
          name: "BIS",
          component: BIS,
        },
      ],
    },
  ],
};
