import {
  Box,
  Button,
  Paper,
  Typography,
} from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorFallback = ({
  title,
  message,
  onRetry,
}) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={5}
        sx={{
          p: 5,
          width: 450,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <ErrorOutlineIcon
          color="error"
          sx={{
            fontSize: 70,
            mb: 2,
          }}
        />

        <Typography
          variant="h5"
          fontWeight={700}
          gutterBottom
        >
          {title}
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          {message}
        </Typography>

        <Button
          variant="contained"
          onClick={onRetry}
        >
          Reload Application
        </Button>
      </Paper>
    </Box>
  );
};

export default ErrorFallback;