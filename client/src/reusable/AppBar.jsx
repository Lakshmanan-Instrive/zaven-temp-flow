import React from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

const AppBarComponent = ({ handleDrawerOpen, role }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
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

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ mr: "10px", paddingRight: "10px" }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome to Zaven - {role === "LS"
                ? " Legal Service"
                : role === "CP"
                ? "Corporate"
                : "Admin"}
        </Typography>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ mr: "10px", paddingRight: "10px" }}
        ></IconButton>
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            sx={{ mt: "30px" }}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem sx={{ pointerEvents: "none" }}>
              <strong>Role: </strong>{" "}
              {role === "LS"
                ? " Legal Service"
                : role === "CP"
                ? "Corporate"
                : "Admin"}
            </MenuItem>
            <MenuItem sx={{ justifyContent: "center" }} onClick={logout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarComponent;
