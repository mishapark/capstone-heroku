// Pages
import Analytics from "../pages/Analytics";
import Compliance from "../pages/Compliance";
import RQC, { RFQ } from "../pages/RFQ"
import Products from "../pages/Products";
import Home from "../pages/Home";

// Icons
import AppsIcon from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AssessmentIcon from "@material-ui/icons/Assessment";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export default {
  items: [
    {
      path: "",
      name: "Dashboard",
      type: "link",
      icon: DashboardIcon,
      component: <Home/>,
    },
    {
      path: "products",
      name: "Products",
      type: "link",
      icon: InboxIcon,
      component: <Products/>,
    },
    {
      path: "compliance",
      name: "Compliance Central",
      type: "link",
      icon: CheckBoxIcon,
      component: <Compliance/> ,
    },
    {
      path: "analytics",
      name: "Analytics",
      type: "link",
      icon: AssessmentIcon,
      component: Analytics,
    },
    {
      path: "rfq",
      name: "RFQ Manager",
      type: "submenu",
      icon: RequestQuoteIcon,
      children: [
        {
          path: "createrfq",
          name: "Create",
          component: <RFQ/>,
        },
      ],
    },
  ],
};
