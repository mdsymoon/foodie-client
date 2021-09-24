import React, { useContext } from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BorderAllIcon from "@mui/icons-material/BorderAll";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import MoreIcon from "@mui/icons-material/MoreVert";
import iconImg from "../../../Images/pizza.png";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleOutlineSharpIcon from "@mui/icons-material/AddCircleOutlineSharp";
import { Tooltip } from "@mui/material";
import { useHistory } from "react-router";
import { UserContext } from "./../../../App";

const DashboardAppBar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };


  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => history.push('/')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HomeIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Home</p>
      </MenuItem>

      <MenuItem onClick={() => history.push('/dashboard/allItem')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <BorderAllIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>All Items</p>
      </MenuItem>

      <MenuItem onClick={() => history.push('/dashboard/orderItem')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <RestaurantMenuIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Order</p>
      </MenuItem>

      <MenuItem onClick={() => history.push('/dashboard/addProduct')}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <AddCircleOutlineSharpIcon />
        </IconButton>
        <p style={{ marginTop: "15px" }}>Add Product</p>
      </MenuItem>

      <MenuItem onClick={() => {setLoggedInUser({}); history.push('/')}  }>
        
        <div className="d-flex">
        <img
          style={{ marginLeft: "10px" }}
          className="userImg"
          src={loggedInUser.photo}
          alt=""
        />

        <p style={{ marginTop: "10px", marginLeft: "10px" }}>Log Out</p>
        </div>
        
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="AppBar-background-dashboard">
        <Toolbar>
          <img className="iconImg" src={iconImg} alt="" />
          <h2>Foodie</h2>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title="Home" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  history.push("/");
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="All Items" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  history.push("/dashboard/allItem");
                }}
              >
                <BorderAllIcon />
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
            <Tooltip title="Add Product" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  history.push("/dashboard/addProduct");
                }}
              >
                <AddCircleOutlineSharpIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Log Out" placement="bottom">
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => {
                  setLoggedInUser({});
                  history.push("/");
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>

            <img className="userImg" src={loggedInUser.photo} alt="" />

            {/* <Tooltip title="Login" placement="bottom">
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip> */}
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

export default DashboardAppBar;
