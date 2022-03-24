import React, { useState, useEffect, useRef } from "react";

import AccountBoxIcon from "@material-ui/icons/AccountBox";
import AppBar from "@material-ui/core/AppBar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Box, Hidden, Paper } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@material-ui/core/IconButton";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import LogoutIcon from "@mui/icons-material/Logout";
import PaymentsIcon from "@mui/icons-material/Payments";
import axios from "axios";
import useProducts from "../../hooks/useProducts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import useLogout from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "0 1px 8px rgba(0,0,0,.3)",
    position: "relative",
    zIndex: theme.zIndex.drawer + 100,
    [theme.breakpoints.down("sm")]: {
      position: "fixed",
    },
  },
  toolBar: {
    paddingLeft: theme.spacing(1) / 2,
    paddingRight: theme.spacing(1) / 2,
  },
  branding: {
    display: "flex",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    margin: "auto 0",
    lineHeight: "50px",
    padding: `0 64px 0 0`,
  },
  logo: {
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "80px",
    },
  },
  searchWrapper: {
    flex: "1 1 0%",
    boxSizing: " border-box",
    maxWidth: "500px",
  },
  searchForm: {
    background: "white",
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(1) * 2,
    display: "block",
    maxWidth: "500px",
  },
  searchInput: {
    fontSize: "1rem",
    padding: theme.spacing(1) * 1.9,
    [theme.breakpoints.down("xs")]: {
      padding: theme.spacing(1) * 1.2,
    },
    cursor: "text",
    textIndent: "30px",
    border: "none",
    background: "transparent",
    width: "100%",
    color: "black",
    maxWidth: "300px",
    outline: "0",
  },
  searchIcon: {
    position: "absolute",
    top: "50%",
    left: "0",
    marginTop: "-24px",
    color: "rgba(0,0,0,.87)",
  },
}));

const Header = ({ logo, logoAltText, toggleFullscreen, toggleDrawer }) => {
  const navigate = useNavigate();
  const logout = useLogout();
  const signOut = async () => {
    await logout();
    navigate("../", { replace: true });
  };

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [product, setProduct] = useState([]);

  const handleSettingdToggle = (event) => setAnchorEl(event.currentTarget);

  const handleCloseMenu = () => setAnchorEl(null);

  const handleSearchExpandToggle = () => setSearchExpanded(!searchExpanded);

  const handleDrawerToggle = () => {
    toggleDrawer();
    if (searchExpanded) handleSearchExpandToggle();
  };

  const { products } = useProducts(
    "https://humber-capstone-backend.herokuapp.com/products"
  );

  useEffect(() => {
    setProduct(products);
  }, [products]);

  let [isShown, setIsShown] = useState(true);
  let searchRef = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsShown(false);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    console.log(isShown);
    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = product.filter((value) => {
      if (value["product_details"]["product_name"]) {
        return value["product_details"]["product_name"]
          .toLowerCase()
          .includes(searchWord.toLowerCase());
      }
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const searchInput = useRef();

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.branding}>
            <img src={logo} alt={logoAltText} className={classes.logo} />
          </div>

          <Hidden xsDown>
            <div
              className={classes.searchWrapper}
              ref={searchRef}
              onClick={() => setIsShown((isShown) => !isShown)}
            >
              <form className={classes.searchForm}>
                <IconButton aria-label="Search" className={classes.searchIcon}>
                  <SearchIcon />
                </IconButton>
                <input
                  className={classes.searchInput}
                  ref={searchInput}
                  type="text"
                  placeholder="Search"
                  autoFocus={true}
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </form>
              {filteredData.length != 0 &&
                (isShown ? (
                  <Paper style={{ position: "absolute" }}>
                    <List
                      component="nav"
                      aria-label="Products search results"
                      sx={{
                        width: "500px",
                        marginLeft: "auto",
                        marginRight: "auto",
                        top: "7%",
                        zIndex: 2000,
                        backgroundColor: "white",
                        backgroundColor: "white",
                        borderBottom: "1px solid gray",
                        borderLeft: "1px solid gray",
                        borderRight: "1px solid gray",
                        borderRadius: "5px",
                        boxShadow: "5px 10px 8px #888888",
                      }}
                    >
                      {filteredData.slice(0, 15).map((value, key) => {
                        return (
                          <Link to={`/products/${value["_id"]}`}>
                            <ListItem button divider>
                              <p>{value["product_details"]["product_name"]}</p>
                            </ListItem>
                          </Link>
                        );
                      })}
                    </List>
                  </Paper>
                ) : null)}
            </div>
          </Hidden>

          <Hidden smUp>
            <span className="flexSpacer" />
          </Hidden>

          <Hidden smUp>
            <IconButton
              color="inherit"
              onClick={handleSearchExpandToggle}
              aria-expanded={searchExpanded}
              aria-label="Show searchbar"
            >
              <SearchIcon />
            </IconButton>
          </Hidden>

          <span className="flexSpacer" />

          <IconButton
            aria-label="User Settings"
            aria-owns={anchorEl ? "user-menu" : null}
            aria-haspopup="true"
            color="inherit"
            onClick={handleSettingdToggle}
          >
            <MoreVertIcon />
          </IconButton>

          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {/* My Prefernces Settings Billing Logout*/}
            <Link to="mypreferences">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary="My Preferences" />
              </MenuItem>
            </Link>
            <Link to="settings">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </MenuItem>
            </Link>
            <Link to="billing">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <ListItemText primary="Billing" />
              </MenuItem>
            </Link>
            <Link to="logout">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" onClick={signOut} />
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
