// Pages
import Analytics from "../pages/Analytics";
import Compliance from "../pages/Compliance";
import RQC, { RFQ } from "../pages/RFQ"
import Products from "../pages/Products";

// Icons
import AppsIcon from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import InboxIcon from "@material-ui/icons/Inbox";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import AssessmentIcon from "@material-ui/icons/Assessment";
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import { Dash } from "../pages/Dash";

export default {
  items: [
    {
      path: "",
      name: "Dashboard",
      type: "link",
      icon: DashboardIcon,
      component: <Dash/>,
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
      type: "link",
      icon: RequestQuoteIcon,
      component: <RFQ/>,
    },
  ],
};
