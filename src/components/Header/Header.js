import React, { useState, useEffect, useRef } from "react";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AppBar from "@mui/material/AppBar";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Box, Hidden, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Toolbar from "@mui/material/Toolbar";
import makeStyles from "@mui/styles/makeStyles";
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
import { FormattedMessage } from "react-intl";
import useAuth from "../../hooks/useAuth";
import { getProductsWithToken } from "../../api/products";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: "0 1px 8px rgba(0,0,0,.3)",
    position: "relative",
    background: "#101637",
    zIndex: theme.zIndex.drawer + 100,
    [theme.breakpoints.down("md")]: {
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
    [theme.breakpoints.down("md")]: {
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
    padding: "10px",
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

  let [isShown, setIsShown] = useState(true);
  let searchRef = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!searchRef.current?.contains(event.target)) {
        setIsShown(false);
        setWordEntered("");
        setFilteredData([]);
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    // console.log(isShown);
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

  const { auth, setAuth } = useAuth();

  React.useEffect(() => {
    getProductsWithToken(auth.accessToken).then((data) => {
      setProduct(data);
    });
  }, []);

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            size="large"
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.branding}>
            <img
              src={logo}
              alt={logoAltText}
              className={classes.logo}
              style={{ maxWidth: "30px" }}
            />
            &nbsp;&nbsp; Daily Compliance
          </div>

          <Hidden smDown>
            <div
              className={classes.searchWrapper}
              ref={searchRef}
              onClick={() => setIsShown((isShown) => !isShown)}
            >
              <form className={classes.searchForm}>
                <IconButton
                  aria-label="Search"
                  className={classes.searchIcon}
                  size="large"
                >
                  <SearchIcon />
                </IconButton>
                <FormattedMessage
                  id="header.searchLabel"
                  defaultMessage="search"
                >
                  {(placeholder) => (
                    <input
                      className={classes.searchInput}
                      ref={searchInput}
                      type="text"
                      placeholder={placeholder}
                      autoFocus={true}
                      value={wordEntered}
                      onChange={handleFilter}
                    />
                  )}
                </FormattedMessage>
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
                          <Link
                            to={`/products/${value["_id"]}`}
                            onClick={() => {
                              setWordEntered("");
                              setFilteredData([]);
                            }}
                          >
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
              size="large"
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
            size="large"
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
                <FormattedMessage id="myPreferences">
                  {(placeholder) => <ListItemText primary={placeholder} />}
                </FormattedMessage>
              </MenuItem>
            </Link>
            <Link to="settings">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <SettingsApplicationsIcon />
                </ListItemIcon>
                <FormattedMessage id="settings">
                  {(placeholder) => <ListItemText primary={placeholder} />}
                </FormattedMessage>
              </MenuItem>
            </Link>
            <Link to="billing">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <PaymentsIcon />
                </ListItemIcon>
                <FormattedMessage id="billing">
                  {(placeholder) => <ListItemText primary={placeholder} />}
                </FormattedMessage>
              </MenuItem>
            </Link>
            <Link to="logout">
              <MenuItem onClick={handleCloseMenu}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <FormattedMessage id="logout">
                  {(placeholder) => (
                    <ListItemText primary={placeholder} onClick={signOut} />
                  )}
                </FormattedMessage>
              </MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
