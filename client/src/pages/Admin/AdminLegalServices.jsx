import React, { useState } from "react";
import { Container, Typography, Button, Modal, TextField } from "@mui/material";
import { Box } from "@mui/system";
import CorporateList from "../../components/Admin/CorporateList";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import LegalServicesList from "../../components/Admin/LegalServicesList";

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
  const token = localStorage.getItem("token");
  const initialValues = {};
  const validationSchema = {};

  Object.keys(formStructure).forEach((key) => {
    initialValues[key] = "";

    let validator = Yup.string();

    if (formStructure[key].required) {
      validator = validator.required(`${formStructure[key].label} is required`);
    }

    if (formStructure[key].min) {
      validator = validator.min(
        formStructure[key].min,
        `${formStructure[key].label} must be at least ${formStructure[key].min} characters`
      );
    }

    if (formStructure[key].max) {
      validator = validator.max(
        formStructure[key].max,
        `${formStructure[key].label} must be no more than ${formStructure[key].max} characters`
      );
    }

    if (formStructure[key].validation === "email") {
      validator = validator.email("Invalid email address");
    }

    if (formStructure[key].match) {
      validator = validator.oneOf(
        [Yup.ref(formStructure[key].match), null],
        `${formStructure[key].label} must match`
      );
    }

    validationSchema[key] = validator;
  });

  const [inviteModel, setInviteModel] = useState(false);

  const handleInviteOpen = () => {
    console.log("invite");
    setInviteModel(true);
  };

  const handleInviteClose = () => {
    setInviteModel(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // Sending form data to the backend
      console.log(values);
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
    },
  });

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
        <Modal
          open={inviteModel}
          onClose={handleInviteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Invite Legal Service
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              {Object.keys(formStructure).map((key) => (
                <div className="mb-4" key={key}>
                  <TextField
                    label={formStructure[key].label}
                    variant="outlined"
                    type={formStructure[key].type}
                    fullWidth
                    name={key}
                    value={formik.values[key]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched[key] && Boolean(formik.errors[key])}
                    helperText={formik.touched[key] && formik.errors[key]}
                  />
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Invite
              </Button>
            </form>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
};

export default AdminLegalServices;
