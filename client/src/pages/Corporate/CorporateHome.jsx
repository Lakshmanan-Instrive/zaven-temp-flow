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
import CorporateList from "../../components/Admin/CorporateList";

const CorporateHome = () => {
  const token = localStorage.getItem("token");
  const [tab, setTab] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
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
                  setTab(0);
                  handleDrawerClose();
                }}
              >
                <ListItemText primary="Corporate" />
              </ListItem>
            </List>
          </Drawer>
          {tab === 0 && <CorporateList role={true} />}
        </Box>
      </Container>
    </>
  );
};

export default CorporateHome;
