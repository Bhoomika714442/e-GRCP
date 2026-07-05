import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Button,
} from "@mui/material";

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        alert("Password reset successfully!");

        navigate("/login");
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: 400,
                    bgcolor: "white",
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                }}
            >
                <Typography
                    variant="h5"
                    align="center"
                    mb={2}
                >
                    Reset Password
                </Typography>

                <TextField
                    fullWidth
                    type="password"
                    label="New Password"
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Confirm Password"
                    margin="normal"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Reset Password
                </Button>
            </Box>
        </Box>
    );
};

export default ResetPassword;