import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
export const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      const url = `${import.meta.env.VITE_API_ENDPOINT}/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      };
      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          if (data?.session?.accessToken) {
            setToken(data.session.accessToken);
          }
          if (data.error) {
            alert(data.error);
          } else {
            console.log(data);
            navigate("/", { replace: true });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  return (
    <Container maxWidth="sm" className="mt-10">
      <Box className="bg-white p-8 rounded-lg shadow-lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            {...formik.getFieldProps("email")}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            color="primary"
            type="button"
            fullWidth
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
