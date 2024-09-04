import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const AppBarComponent = ({ handleDrawerOpen }) => {
  const token = localStorage.getItem("token");
  const logout = () => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ token }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          alert(data.error);
          if (data.error === "Unauthorized") {
            localStorage.clear();
            window.location.href = "/login";
          }
        } else {
          localStorage.clear();
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display an error message
      });
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Zaven
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ mr: "10px", paddingRight: "10px" }}
        >
          <MenuIcon />
        </IconButton>
        <Button color="inherit" type="button" onClick={() => logout()}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
