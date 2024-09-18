import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Modal,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ChangePasswordComponent from "./ChangePasswordComponent";
import { logout_call } from "../store/slices/AuthSlice";
import { userChangePassword } from "../store/slices/UserSlice";
import { useDispatch } from "react-redux";

const formStructure = {
  oldPassword: {
    name: "oldPassword",
    label: "Old Password",
    type: "password",
    required: true,
    min: 6,
  },
  newPassword: {
    name: "newPassword",
    label: "New Password",
    type: "password",
    required: true,
    min: 6,
  },
  confirmPassword: {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    match: "newPassword",
  },
};

const AppBarComponent = ({ handleDrawerOpen, role }) => {
  const dispatch = useDispatch();

  const [changePasswordModal, setChangePasswordModal] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const logout = async () => {
    const token = localStorage.getItem("token");
    const response = await dispatch(logout_call({ token }));
    if (response.payload) {
      localStorage.clear();
      window.location.href = "/login";
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changePasswordModalClose = () => {
    setChangePasswordModal(false);
  };

  const changePasswordModalOpen = () => {
    setChangePasswordModal(true);
  };

  const changePasswordSubmit = async (values) => {
    const response = await dispatch(userChangePassword(values));
    console.log(response);
    if (response.payload) {
      alert("Password updated successfully");
      setOpen(false);
    }
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
          Welcome to Zaven -{" "}
          {role === "LS"
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
            <MenuItem onClick={changePasswordModalOpen}>
              change password
            </MenuItem>
            <MenuItem sx={{ justifyContent: "center" }} onClick={logout}>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
      <Modal
        open={changePasswordModal}
        onClose={changePasswordModalClose}
        sx={{ top: "10%" }}
      >
        <ChangePasswordComponent
          formStructure={formStructure}
          onSubmit={changePasswordSubmit}
        />
      </Modal>
    </AppBar>
  );
};

export default AppBarComponent;
