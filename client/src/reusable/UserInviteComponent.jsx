import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import React from "react";

const UserInviteComponent = ({
  inviteModel,
  handleInviteClose,
  onSubmit,
  formStructure,
}) => {
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
          Invite User
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
  );
};

export default UserInviteComponent;
