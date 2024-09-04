import React, { useState } from "react";
import { Container, Typography, Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CorporateList from "../../components/Admin/CorporateList";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LegalServicesList from "../../components/Admin/LegalServicesList";
import UserInviteComponent from "../../reusable/UserInviteComponent";

const AdminLegalServices = () => {
  const token = localStorage.getItem("token");

  const [inviteModel, setInviteModel] = useState(false);

  const handleInviteOpen = () => {
    console.log("invite");
    setInviteModel(true);
  };

  const handleInviteClose = () => {
    setInviteModel(false);
  };

  const onSubmit = async (values) => {
    fetch(`${import.meta.env.VITE_API_ENDPOINT}/auth/invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
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
          alert("Legal Service Invited Successfully");
          handleInviteClose();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Display an error message
      });
  };

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
              Welcome to Zaven - Legal Service
            </Typography>
            <Button variant="contained" onClick={handleInviteOpen}>
              Invite Legal Service Providers
            </Button>
          </Box>
          <LegalServicesList />
        </Box>
        <UserInviteComponent
          inviteModel={inviteModel}
          handleInviteClose={handleInviteClose}
          onSubmit={onSubmit}
        />
      </Box>
    </Container>
  );
};

export default AdminLegalServices;
