import React, { useState } from "react";
import { Container, Typography, Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CorporateList from "../../components/Admin/CorporateList";

const AdminCorporate = () => {
  return (
    <Container maxWidth="xl" sx={{ padding: "20px", mt: "30px" }}>
      <Box sx={{ mb: 5 }}>
        <Box
          sx={{
            mt: 3,
            borderRadius: "10px",
            // border: "1px solid black",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ padding: "10px" }}
              variant="h6"
              align="center"
              gutterBottom
            >
              Welcome to Zaven - Corporate
            </Typography>
          </Box>
          <CorporateList />
        </Box>
      </Box>
    </Container>
  );
};

export default AdminCorporate;
