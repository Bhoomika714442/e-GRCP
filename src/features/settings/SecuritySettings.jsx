import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  changePassword,
  clearError,
  clearPasswordStatus,
  logoutUser,
} from "../../store/authSlice";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

const SecuritySettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, passwordUpdated } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [successOpen, setSuccessOpen] = useState(false);

  useEffect(() => {
    dispatch(clearError());

    return () => {
      dispatch(clearPasswordStatus());
    };
  }, [dispatch]);

  useEffect(() => {
  if (passwordUpdated) {
    setSuccessOpen(true);

    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(async () => {
      await dispatch(logoutUser());

      navigate("/login", {
        replace: true,
      });
    }, 2000);
  }
}, [passwordUpdated, dispatch, navigate]);
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = () => {
    dispatch(clearError());

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return;
    }

    if (
  formData.newPassword !==
  formData.confirmPassword
) {
  dispatch(clearError());

  return alert(
    "New Password and Confirm Password do not match."
  );
}

if (formData.newPassword.length < 8) {
  return alert(
    "Password must contain at least 8 characters."
  );
}

    dispatch(
      changePassword({
        email: user.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      })
    );
  };

  return (
    <>
      <Card elevation={3}>
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={700}
            gutterBottom
          >
            Security
          </Typography>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Grid>

            {error && (
              <Grid size={{ xs: 12 }}>
                <Alert severity="error">
                  {error}
                </Alert>
              </Grid>
            )}

            <Grid size={{ xs: 12 }}>
              <Box
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Update Password
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSuccessOpen(false);
          dispatch(clearPasswordStatus());
        }}
      >
        <Alert severity="success">
          Password updated successfully.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SecuritySettings;