import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Example JSON structure from the database
const formStructure = {
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
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  companyName: {
    type: "text",
    label: "Company Name",
    required: true,
  },
  contactPerson: {
    type: "text",
    label: "Contact Person",
    required: true,
  },
  phoneNumber: {
    type: "text",
    label: "Phone Number",
    required: true,
  },
  companyAddress: {
    type: "text",
    label: "Company Address",
    required: true,
  },
  zipCode: {
    type: "text",
    label: "Zip Code",
    required: true,
  },
};

const CompanyRegisterPage = () => {
  const navigate = useNavigate();
  // Generate initial values and validation schema based on formStructure
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

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // Sending form data to the backend
      console.log(values);
      fetch(`${import.meta.env.VITE_API_ENDPOINT}/corporate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            alert("Company registered successfully and Waiting for approval");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          // Display an error message
        });
    },
  });

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="bg-white p-8 rounded-lg shadow-lg">
        <Typography variant="h4" className="mb-4 text-center">
          Company
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
            Register
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            onClick={() => navigate("/login")}
            sx={{ mt: 3, mb: 2 }}
            fullWidth
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CompanyRegisterPage;
