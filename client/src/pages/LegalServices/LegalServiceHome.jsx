import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import LegalServicesList from "../../components/Admin/LegalServicesList";

const LegalServiceHome = () => {
  const token = localStorage.getItem("token");
  const [tab, setTab] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

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
    <>
      <Container maxWidth="xl" sx={{ padding: "20px", mt: "50px" }}>
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Welcome to Zaven
          </Typography>
          <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}>
            <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
              Zaven
            </Typography>
            <Divider />
            <List>
              <ListItem
                button
                onClick={() => {
                  setTab(1);
                  handleDrawerClose();
                }}
              >
                <ListItemText primary="Legal Service" />
              </ListItem>
            </List>
          </Drawer>
          {tab === 1 && <LegalServicesList role={true} />}
        </Box>
      </Container>
    </>
  );
};

export default LegalServiceHome;
