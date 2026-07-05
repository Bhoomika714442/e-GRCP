import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={45} />
    </Box>
  );
};

export default PageLoader;