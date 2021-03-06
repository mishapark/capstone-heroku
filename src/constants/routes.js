// Pages
import Analytics from "../pages/Analytics";
import Compliance from "../pages/Compliance";
import RQC, { RFQ } from "../pages/RFQ";
import Products from "../pages/Products";
import { Tasks } from "../pages/Tasks";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import InboxIcon from "@mui/icons-material/Inbox";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AssessmentIcon from "@mui/icons-material/Assessment";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import TaskIcon from "@mui/icons-material/Task";
import { Dash } from "../pages/Dash";

export default {
  items: [
    {
      path: "dash",
      name: "Dashboard",
      type: "link",
      icon: DashboardIcon,
      component: <Dash />,
    },
    {
      path: "products",
      name: "Products",
      type: "link",
      icon: InboxIcon,
      component: <Products />,
    },
    {
      path: "compliance",
      name: "Compliance Central",
      type: "link",
      icon: CheckBoxIcon,
      component: <Compliance />,
    },
    {
      path: "analytics",
      name: "Analytics",
      type: "link",
      icon: AssessmentIcon,
      component: <Analytics />,
    },
    {
      path: "rfq",
      name: "RFQ Manager",
      type: "link",
      icon: RequestQuoteIcon,
      component: <RFQ />,
    },
    {
      path: "tasks",
      name: "Tasks",
      type: "link",
      icon: TaskIcon,
      component: <Tasks />,
    },
  ],
};
