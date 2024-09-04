import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ChangePassword = () => {
  const [email, setEmail] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    }),
    onSubmit: (values) => {
      changePassword(values, email, accessCode);
    },
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
    const accessCode = queryParams.get("accessCode");
    console.log(email, accessCode, "email, accessCode");
    if (email && accessCode) {
      setEmail(email);
      setAccessCode(accessCode);
    } else {
      navigate("/login");
    }
  }, [navigate, location.search]);

  const changePassword = async (values, email, accessCode) => {
    console.log(values, email, accessCode);
    try {
      fetch(
        `${import.meta.env.VITE_API_ENDPOINT}/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            accessCode: accessCode,
            password: values.password,
          }),
        }
      ).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          alert(data.error);
        } else {
          alert("Password updated successfully");
          navigate("/login");
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
            }
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />
          <Button
            variant="contained"
            type="submit"
            className="mt-4 w-full"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePassword;

