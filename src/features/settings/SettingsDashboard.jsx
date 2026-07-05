import { Box, Typography } from "@mui/material";

import ProfileSettings from "./ProfileSettings";
import ThemeSettings from "./ThemeSettings";
import PreferenceSettings from "./PreferenceSettings";
import SecuritySettings from "./SecuritySettings";

const SettingsDashboard = () => {
  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        User Settings
      </Typography>

      <ProfileSettings />

      <Box mt={3}>
        <ThemeSettings />
      </Box>

      <Box mt={3}>
        <PreferenceSettings />
      </Box>

      <Box mt={3}>
        <SecuritySettings />
      </Box>
    </Box>
  );
};

export default SettingsDashboard;