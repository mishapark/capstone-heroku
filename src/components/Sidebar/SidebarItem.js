import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { NavLink } from "react-router-dom";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme) => ({
  badge: {
    width: "20px",
    height: "20px",
    display: "flex",
    zIndex: 1,
    flexWrap: "wrap",
    fontSize: "0.75rem",
    alignItems: "center",
    borderRadius: "50%",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  menuLink: {
    position: "relative",
    display: "block",
  },
  menuItem: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: theme.spacing(1) * 1.5,
    paddingBottom: theme.spacing(1) * 1.5,
  },
  menuIcon: {
    marginLeft: theme.spacing(1) * 2,
    marginRight: theme.spacing(1) * 2,
  },
  menuSubItem: {
    paddingLeft: "55px",
    paddingRight: "55px",
    paddingTop: theme.spacing(1) * 1.5,
    paddingBottom: theme.spacing(1) * 1.5,
  },
  menuCollapsed: {
    backgroundColor: theme.palette.action.hover,
  },
  menuActive: {
    backgroundColor: theme.palette.action.hover,
  },
  menuClosed: {
    backgroundColor: "transparent",
  },
  caret: {
    marginLeft: theme.spacing(1) * 2,
    marginRight: theme.spacing(1) * 2,
    minWidth: 0,
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  error: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
}));

const SidebarItem = ({ route, index, toggleMenu }) => {
  const classes = useStyles();

  const badge = (badge) => {
    if (!badge) return;
    const badgeClassName = classNames(classes.badge, {
      [classes[`${badge.type}`]]: badge.type !== "default",
    });
    return (
      <Typography
        className={classNames(classes.badge, badgeClassName)}
        component="div"
      >
        {badge.value}
      </Typography>
    );
  };

  return (
    <NavLink to={route.path} className={classes.menuLink} key={index}>
      <ListItem
        className={classes.menuItem}
        button
        onClick={() => toggleMenu(index)}
      >
        <ListItemIcon>
          <route.icon className={classes.menuIcon} />
        </ListItemIcon>
        <Typography variant="body1" className="flexSpacer">
          <FormattedMessage id={route.name}></FormattedMessage>
        </Typography>
        {badge(route.badge)}
      </ListItem>
    </NavLink>
  );
};

export default SidebarItem;
