import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Paper,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import useAuth from "../../hooks/useAuth";
import useSnackbar from "../../hooks/useSnackbar";

import {
  clearError,
  restoreSession,
} from "../../store/authSlice";

const schema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum 6 characters"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showSnackbar = useSnackbar();

  const {
    login,
    isLoading,
    error,
    isAuthenticated,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      showSnackbar(error, "error");
    }
  }, [error, showSnackbar]);

  useEffect(() => {
    if (isAuthenticated) {
      showSnackbar(
        "Login successful. Welcome back!",
        "success"
      );

      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate, showSnackbar]);

  const onSubmit = async (data) => {
    await login(data);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        bgcolor: "#f4f7fb",
      }}
    >

      <Box
        sx={{
          width: { xs: 0, md: "58%" },
          display: {
            xs: "none",
            md: "flex",
          },
          background:
            "linear-gradient(135deg,#1565c0,#42a5f5)",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
          p: 8,
        }}
      >
        <Box maxWidth={500}>
          <Typography
            variant="h2"
            fontWeight={700}
          >
            e-GRCP
          </Typography>

          <Typography
            variant="h4"
            mt={5}
            fontWeight={700}
            lineHeight={1.4}
          >
            Enterprise Procurement &
            <br />
            Risk Compliance Platform
          </Typography>

          <Typography
            mt={4}
            fontSize={18}
            sx={{
              opacity: 0.9,
              lineHeight: 1.8,
            }}
          >
            Secure procurement management,
            vendor governance,
            risk intelligence and audit
            monitoring in one enterprise
            platform.
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: {
            xs: "100%",
            md: "42%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: 380,
            p: 4,
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
          >
            Welcome Back
          </Typography>

          <Typography
            color="text.secondary"
            mb={4}
          >
            Please login to continue
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              fullWidth
              size="small"
              label="Email Address"
              margin="normal"
              {...register("email")}
              error={!!errors.email}
              helperText={
                errors.email?.message
              }
            />

            <TextField
              fullWidth
              size="small"
              type="password"
              label="Password"
              margin="normal"
              {...register("password")}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
            />

            <Box
              mt={1}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={
                  <Checkbox size="small" />
                }
                label="Remember Me"
              />

              <Link
                to="/forgot-password"
                style={{
                  textDecoration: "none",
                  fontSize: 14,
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                mt: 3,
                py: 1.2,
                borderRadius: 1,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {isLoading ? (
                <CircularProgress
                  size={22}
                  color="inherit"
                />
              ) : (
                "LOGIN"
              )}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;