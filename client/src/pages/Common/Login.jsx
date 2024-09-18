import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthProvider";
import { useDispatch } from "react-redux";
import { login_call } from "../../store/slices/AuthSlice";
export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { setToken } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const loginResponse = await dispatch(login_call(values));
      console.log("Login response:", loginResponse);
      if (loginResponse.payload?.session?.accessToken) {
        setToken(loginResponse.payload.session.accessToken);
        navigate("/", { replace: true });
      }
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
