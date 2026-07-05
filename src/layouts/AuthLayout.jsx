import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f7fb",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;