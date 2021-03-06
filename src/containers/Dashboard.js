import { Header, Sidebar, Workspace } from "../components";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import classNames from "classnames";
import makeStyles from "@mui/styles/makeStyles";
import routes from "../constants/routes";
import settingsRoutes from "../constants/settingsRoutes";
import Settings from "../pages/Settings";
import Billing from "../pages/Billing";
import { Logout } from "../pages/Logout";
import MyPreferences from "../pages/MyPreferences";
import ProductInfo from "../pages/ProductInfo";
import { RFQInfo } from "../pages/RFQInfo";
import { TaskInfo } from "../pages/TaskInfo";
import ComplianceList from "../pages/ComplianceList";
import useAuth from "../hooks/useAuth";

const useStyles = makeStyles((theme) => ({
  panel: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.down("md")]: {
      height: "auto",
      minHeight: "calc(100vh - 64px)",
      paddingTop: "64px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "calc(100vh - 56px)",
      paddingTop: "56px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "calc(100vh - 64px)",
    },
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(1) * 2,
    right: theme.spacing(1) * 3,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [opened, setOpened] = useState(true);

  const resizeDispatch = () => {
    if (typeof Event === "function") {
      window.dispatchEvent(new Event("resize"));
    } else {
      const evt = window.document.createEvent("UIEvents");
      evt.initUIEvent("resize", true, false, window, 0);
      window.dispatchEvent(evt);
    }
  };

  const handleDrawerToggle = () => {
    setOpened(!opened);
    resizeDispatch();
  };

  const handleFullscreenToggle = () => {
    const element = document.querySelector("#root");
    const isFullscreen =
      document.webkitIsFullScreen || document.mozFullScreen || false;

    element.requestFullScreen =
      element.requestFullScreen ||
      element.webkitRequestFullScreen ||
      element.mozRequestFullScreen ||
      function () {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function () {
        return false;
      };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  const getRoutes = (
    <Routes>
      {routes.items.map((item, index) => (
        <Route key={index} path={item.path} element={item.component} />
      ))}
      {settingsRoutes.map((item, index) => (
        <Route
          key={index}
          path={`/settings/${item.path}`}
          element={item.component}
        />
      ))}
      <Route path="/settings" element={<Settings />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/billing" element={<Billing />} />
      <Route path="/mypreferences" element={<MyPreferences />} />
      <Route path="/products/:id" element={<ProductInfo />} />
      <Route path="/rfq/:id" element={<RFQInfo />} />
      <Route path="/tasks/:id" element={<TaskInfo />} />
      <Route path="/compliancelist" element={<ComplianceList />} />
    </Routes>
  );

  const { auth } = useAuth();

  return (
    <>
      <Header
        logoAltText="The Daily Compliance"
        logo={`/logo.svg`}
        toggleDrawer={handleDrawerToggle}
        toggleFullscreen={handleFullscreenToggle}
      />
      <div className={classNames(classes.panel, "theme-dark")}>
        <Sidebar
          routes={routes.items}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
        />

        {/*{auth.subscriptionStatus === "alive" ||
        auth.roles.includes("Super_Admin") ? (*/}
          <Workspace opened={opened}>{getRoutes}</Workspace>
        {/*}) : (
          <Billing></Billing>
        )}*/}
      </div>
    </>
  );
};

export default Dashboard;
