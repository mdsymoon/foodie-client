import React, { useContext } from "react";
import "./Navigation.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircle from "@mui/icons-material/AccountCircle";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MoreIcon from "@mui/icons-material/MoreVert";
import iconImg from "../../../Images/pizza.png";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Tooltip } from "@mui/material";
import { useHistory } from "react-router";
import { UserContext } from "./../../../App";

const Navigation = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const [setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push('/dashboard/allItem')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <DashboardIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Dashboard</p>
      </MenuItem>

      <MenuItem onClick={() => history.push('/dashboard/orderItem')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <RestaurantMenuIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Order</p>
      </MenuItem>


    {loggedInUser.email? (
      <MenuItem onClick={() => setLoggedInUser({})}>
      
         <img style={{ marginLeft: "15px" }} className="userImg" src={loggedInUser.photo} alt="" />
     
      <p style={{ paddingTop: "15px" , marginLeft:"20px" }}>Log Out</p>
    </MenuItem>
    ): (
      <MenuItem onClick={() => history.push('/login')}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Login</p>
      </MenuItem>
    )}
     

      
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="AppBar-background">
        <Toolbar>
          <img className="iconImg" src={iconImg} alt="" />
          <h2>Foodie</h2>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Dashboard" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  history.push("/dashboard/allItem");
                }}
              >
                <DashboardIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Order" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  history.push("/dashboard/orderItem");
                }}
              >
                <RestaurantMenuIcon />
              </IconButton>
            </Tooltip>
            {loggedInUser.email && (
              <Tooltip title="Log Out" placement="bottom">
                <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => {
                    setLoggedInUser({});
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}

            {loggedInUser.email ? (
              <img className="userImg" src={loggedInUser.photo} alt="" />
            ) : (
              <Tooltip title="Login" placement="bottom">
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  color="inherit"
                  onClick={() => {
                    history.push("/login");
                  }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};

export default Navigation;
