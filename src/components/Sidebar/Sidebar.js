import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { SidebarData } from "./SidebarData";

import * as FaIcons from "react-icons/fa";

import { Link } from "react-router-dom";
import { IconContext } from "react-icons/lib";

function SideBar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {SidebarData.map((sidebarMenu, index) =>
          !sidebarMenu.subNav ? (
            <Link to={sidebarMenu.path} key={index}>
              <ListItem button onClick={toggleDrawer(anchor, false)}>
                <IconContext.Provider value={{ color: "#3F50B5" }}>
                  <ListItemIcon>{sidebarMenu.icon}</ListItemIcon>
                </IconContext.Provider>
                <ListItemText primary={sidebarMenu.title} />
              </ListItem>
            </Link>
          ) : (
            <>
              <ListItem button onClick={handleClick}>
                <IconContext.Provider value={{ color: "#3F50B5" }}>
                  <ListItemIcon>{sidebarMenu.icon}</ListItemIcon>
                </IconContext.Provider>
                <ListItemText primary={sidebarMenu.title} />
                {open ? sidebarMenu.iconOpened : sidebarMenu.iconClosed}
              </ListItem>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {sidebarMenu.subNav.map((submenu) => (
                    <Link to={submenu.path} key={submenu.title}>
                      <ListItem
                        button
                        sx={{ pl: 4 }}
                        onClick={toggleDrawer(anchor, false)}
                      >
                        <ListItemIcon>{submenu.icon}</ListItemIcon>
                        <ListItemText primary={submenu.title} />
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Collapse>
            </>
          )
        )}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer("left", true)}>
        <IconContext.Provider value={{ color: "#fff", size: "30px" }}>
          <FaIcons.FaBars />
        </IconContext.Provider>
      </Button>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </React.Fragment>
  );
}

export default SideBar;
