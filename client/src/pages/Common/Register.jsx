import { useState } from "react";
import {
  Container,
  Grid,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import LegalServicesRegisterPage from "../../components/Common/LegalServicesRegister";
import CompanyRegisterPage from "../../components/Common/CompanyRegister";

const Register = () => {
  const [registerType, setRegisterType] = useState("legalservice");
  const [registerPage, setRegisterPage] = useState(
    <LegalServicesRegisterPage />
  );

  const handleRegisterType = (event) => {
    setRegisterType(event.target.value);
    setRegisterPage(
      event.target.value === "legalservice" ? (
        <LegalServicesRegisterPage />
      ) : (
        <CompanyRegisterPage />
      )
    );
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id="register-type-label">Register Type</InputLabel>
              <Select
                labelId="register-type-label"
                id="register-type-select"
                value={registerType}
                label="Register Type"
                onChange={handleRegisterType}
              >
                <MenuItem value="legalservice">Legal Service</MenuItem>
                <MenuItem value="company">Company</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ my: 2 }}>{registerPage}</Box>
      </Box>
    </Container>
  );
};

export default Register;
