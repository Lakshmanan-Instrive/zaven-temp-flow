import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Grid, Typography } from "@mui/material";

const ProfileComponent = ({profile}) => {
    const type = profile.role == "LS" ? "legalService" : "corporate";
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: "70px", textAlign: "center" }}>
        <Container
          sx={{
            border: "1px solid #ccc",
            borderRadius: "20px",
            padding: "20px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Profile Details
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4} sx={{ textAlign: "left" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Name:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                E-mail:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Role:
              </Typography>
            </Grid>

            {profile && (
              <Grid item xs={8} sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile.firstName} {profile.surName}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile.email}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile.role == "LS" ? "Legal Service" : "Corporate"}
                </Typography>
              </Grid>
            )}
          </Grid>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {profile && profile.role == "LS"
              ? "Legal Service Details"
              : "Corporate Details"}
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={4} sx={{ textAlign: "left" }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Company Name:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Address:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Contact Person:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Phone Number:
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#2c3e50" }}
              >
                Zip Code:
              </Typography>
            </Grid>

            {profile && profile[type] && (
              <Grid item xs={8} sx={{ textAlign: "left" }}>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile[type].companyName}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile[type].companyAddress}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile[type].contactPerson}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile[type].phoneNumber}
                </Typography>
                <Typography variant="h6" sx={{ color: "#2c3e50" }}>
                  {profile[type].zipCode}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Container>
      </Box>
    </Container>
  );
};

export default ProfileComponent;
