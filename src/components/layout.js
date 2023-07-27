import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Home as HomeIcon, ShoppingCart as CartIcon, Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Box from '@mui/material/Box';
import Search from "./search";

const Layout = ({ categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const renderCategories = () => {
    return categories.data.map((c) => (
      <ListItem button key={c.id} component={Link} to={`/categories/${c.id}`} onClick={toggleDrawer(false)}>
        <ListItemText primary={c.title} />
      </ListItem>
    ));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Our Store
          </Typography>
          {/* <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <HomeIcon fontSize="large" sx={{ mr: 2 }} />
          </Link> */}
          <Box sx={{ width: '75%' }}>
            <Search />
          </Box>
          <Link to="/basket" style={{ textDecoration: "none", color: "inherit" }}>
            <CartIcon fontSize="large" />
          </Link>
        </Toolbar>
      </AppBar>

      <Box sx={{ borderRadius: '16px' }}>
        <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer(false)}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/basket" onClick={toggleDrawer(false)}>
              <ListItemText primary="Basket" />
            </ListItem>
            <Divider />
            {categories.errorMessage && (
              <div>Error: {categories.errorMessage}</div>
            )}
            {categories.data && renderCategories()}
          </List>
        </Drawer>
      </Box>

      <Outlet />
    </>
  );
};

export default Layout;