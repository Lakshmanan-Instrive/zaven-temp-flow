import React, { useState } from "react";
import {
  Drawer,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { menuConfig } from "../utils/MenuConfig";
import AppBarComponent from "./AppBar";

const MenuComponent = ({ role }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerClose = () => setIsDrawerOpen(false);
  const handleDrawerOpen = () => setIsDrawerOpen(true);

  const menuItems = menuConfig[role] || [];

  return (
    <>
      <AppBarComponent handleDrawerOpen={handleDrawerOpen} role={role} />
      <Drawer
        PaperProps={{
          sx: { width: "300px" },
        }}
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
      >
        <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
          Zaven
        </Typography>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              component={Link}
              to={item.link}
              key={index}
              onClick={handleDrawerClose}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default MenuComponent;
