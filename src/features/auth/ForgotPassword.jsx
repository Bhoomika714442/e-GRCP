import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
} from "@mui/material";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Reset link sent successfully!");

        navigate("/reset-password");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#f5f5f5",
                px: 2,
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: 450,
                    p: 4,
                    borderRadius: 3,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    fontWeight={600}
                    gutterBottom
                >
                    Forgot Password
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                    mb={3}
                >
                    Enter your registered email address to receive a password
                    reset link.
                </Typography>

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        type="email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        sx={{ mt: 3 }}
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default ForgotPassword;