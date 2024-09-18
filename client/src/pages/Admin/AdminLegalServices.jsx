import React, { useState } from "react";
import { Container, Typography, Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CorporateList from "../../components/Admin/CorporateList";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LegalServicesList from "../../components/Admin/LegalServicesList";
import UserInviteComponent from "../../reusable/UserInviteComponent";
import { invite_call } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";

const formStructure = {
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  firstName: {
    type: "text",
    min: 3,
    max: 20,
    label: "First Name",
    required: true,
  },
  surName: {
    type: "text",
    min: 1,
    max: 20,
    label: "Surname",
    required: true,
  },
};
const AdminLegalServices = () => {
  const dispatch = useDispatch();

  const [legalInviteModel, setLegalInviteModel] = useState(false);

  const handleLegalInviteOpen = () => {
    console.log("invite");
    setLegalInviteModel(true);
  };

  const handleLegalInviteClose = () => {
    setLegalInviteModel(false);
  };

  const onSubmit = async (values) => {
    const response = await dispatch(invite_call(values));
    console.log(response);
    if (response.payload.message) {
      alert(response.payload.message);
      handleLegalInviteClose();
    } else if (response.payload) {
      alert("Invite sent successfully");
    }
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
            <Button variant="contained" onClick={handleLegalInviteOpen}>
              Invite Legal Service Providers
            </Button>
          </Box>
          <LegalServicesList />
        </Box>
        <UserInviteComponent
          inviteModel={legalInviteModel}
          handleInviteClose={handleLegalInviteClose}
          onSubmit={onSubmit}
          formStructure={formStructure}
        />
      </Box>
    </Container>
  );
};

export default AdminLegalServices;
