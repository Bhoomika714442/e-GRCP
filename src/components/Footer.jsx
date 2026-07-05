import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        px: 3,
        py: 2,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
        textAlign: "center",
      }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        © 2026 Enterprise Governance Platform. All Rights Reserved.
      </Typography>
    </Box>
  );
};

export default Footer;