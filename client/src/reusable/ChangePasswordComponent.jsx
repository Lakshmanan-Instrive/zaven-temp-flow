import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

const ChangePasswordComponent = ({ formStructure, onSubmit }) => {
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

    if (formStructure[key].name === "password") {
      validator = validator
        .required(`${formStructure[key].label} is required`)
        .min(6, `${formStructure[key].label} must be at least 6 characters`);
    }

    if (formStructure[key].name === "confirmPassword") {
      validator = validator
        .required(`${formStructure[key].label} is required`)
        .oneOf([Yup.ref("password"), null], "Passwords must match");
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

    if (formStructure[key].type === "checkbox") {
      initialValues[key] = false;
    }
  });

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // Sending form data to the backend
      console.log(values);
      await onSubmit(values);
    },
  });
  return (
    <Container
      maxWidth="sm"
      className="mt-10 flex flex-col items-center justify-center"
    >
      <Box className="bg-white p-8 rounded-lg shadow-lg w-full">
        <Typography variant="h4" component="h1" gutterBottom>
          Change Password
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          {Object.keys(formStructure).map((key) => (
            <div className="mb-4" key={key}>
              {formStructure[key].type === "checkbox" ? (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={key}
                      checked={formik.values[key]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      color="primary"
                    />
                  }
                  label={formStructure[key].label}
                />
              ) : (
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
              )}
            </div>
          ))}
          <Button variant="contained" type="submit" className="mt-4 w-full">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePasswordComponent;
