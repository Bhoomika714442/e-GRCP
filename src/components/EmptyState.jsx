import {
  Box,
  Typography,
} from "@mui/material";

import InboxIcon from "@mui/icons-material/Inbox";

const EmptyState = ({
  title = "No Data Found",
  description = "There are no records available."
}) => {
  return (
    <Box
      sx={{
        py: 8,
        textAlign: "center",
      }}
    >
      <InboxIcon
        sx={{
          fontSize: 70,
          color: "grey.500",
        }}
      />

      <Typography
        variant="h6"
        mt={2}
      >
        {title}
      </Typography>

      <Typography
        color="text.secondary"
      >
        {description}
      </Typography>
    </Box>
  );
};

export default EmptyState;