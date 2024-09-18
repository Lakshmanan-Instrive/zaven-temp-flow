import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { verify_call } from "../../store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import { create_legal_call } from "../../store/slices/LegalServiceSlice";

// Example JSON structure from the database
const formStructure = {
  email: {
    type: "email",
    label: "Email",
    required: true,
  },
  accessCode: {
    type: "text",
    min: 3,
    label: "Access Code",
    required: true,
  },
};

const legalServiceForm = {
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
    label: "Zipcode",
    required: true,
  },
};

const LegalServiceRegisterPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      console.log(values);
      // Sending form data to the backend
      if (open) {
        const response = await dispatch(create_legal_call(values));
        console.log(response);
        if (response.payload) {
          alert("Legal Service Registered Successfully");
          navigate("/login");
        }
      } else {
        console.log(values);

        try {
          const data = await dispatch(verify_call(values));
          if (data.error) {
            alert(
              "Invalid Access Code, User May Already approved or waiting for approval"
            );
          } else {
            setOpen(true);
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    },
  });

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="bg-white p-8 rounded-lg shadow-lg">
        <Typography variant="h4" className="mb-4 text-center">
          Legal Services
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

      <Modal open={open} onClose={handleClose} className="h-200">
        <Box className="bg-white p-8 h-2/3 w-2/3 mx-auto mt-20 overflow-y-scroll">
          <Typography variant="h4" className="mb-4 text-center">
            Legal Services
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            {Object.keys(legalServiceForm).map((key) => (
              <div className="mb-4" key={key}>
                <TextField
                  label={legalServiceForm[key].label}
                  variant="outlined"
                  type={legalServiceForm[key].type}
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600"
              >
                Submit
              </Button>
              <Button
                variant="outlined"
                color="primary"
                type="button"
                onClick={handleClose}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300 ml-2"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </Container>
  );
};

export default LegalServiceRegisterPage;
