import { Header, Sidebar, Workspace } from "../components";
import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import routes from "../constants/routes";
import Signup from "../pages/Signup";
import Forgot from "../pages/Forgot";
import Signin from "../pages/Signin";
import Settings from "../pages/Settings"
import Billing from "../pages/Billing";
import MyPreferences from "../pages/MyPreferences";

const useStyles = makeStyles((theme) => ({
  panel: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    maxWidth: "100%",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      minHeight: "calc(100vh - 64px)",
      paddingTop: "64px",
    },
    [theme.breakpoints.down("xs")]: {
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
      function() {
        return false;
      };
    document.cancelFullScreen =
      document.cancelFullScreen ||
      document.webkitCancelFullScreen ||
      document.mozCancelFullScreen ||
      function() {
        return false;
      };
    isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
  };

  const getRoutes = (
    <Switch>
      {routes.items.map((item, index) =>
        item.type === "external" ? (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
        ) : item.type === "submenu" ? (
          item.children.map((subItem) => (
            <Route
              exact
              path={`${item.path}${subItem.path}`}
              component={subItem.component}
              name={subItem.name}
            />
          ))
        ) : (
          <Route
            exact
            path={item.path}
            component={item.component}
            name={item.name}
            key={index}
          />
          
        )
      )}
      <Route exact path="/signin" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/forgot" component={Forgot} />
      <Route exact path="/settings" component={Settings} />
      <Route exact path="/logout" component={Signin} />
      <Route exact path="/billing" component={Billing} />
      <Route exact path="/mypreferences" component={MyPreferences} />
      <Redirect to="/" />
    </Switch>
  );

  return (
    <>
      <Header
        logoAltText="Capstone"
        logo={``}
        toggleDrawer={handleDrawerToggle}
        toggleFullscreen={handleFullscreenToggle}
      />
      <div className={classNames(classes.panel, "theme-dark")}>
        <Sidebar
          routes={routes.items}
          opened={opened}
          toggleDrawer={handleDrawerToggle}
        />
        <Workspace opened={opened}>{getRoutes}</Workspace>
      </div>
    </>
  );
};

export default Dashboard;
