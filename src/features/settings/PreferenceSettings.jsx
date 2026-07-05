import { useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const PreferenceSettings = () => {
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: false,
    autoRefresh: true,
  });

  const handleChange = (event) => {
    setPreferences({
      ...preferences,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Preferences
        </Typography>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.emailNotifications}
                onChange={handleChange}
                name="emailNotifications"
              />
            }
            label="Email Notifications"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.pushNotifications}
                onChange={handleChange}
                name="pushNotifications"
              />
            }
            label="Push Notifications"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.weeklyReports}
                onChange={handleChange}
                name="weeklyReports"
              />
            }
            label="Weekly Reports"
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={preferences.autoRefresh}
                onChange={handleChange}
                name="autoRefresh"
              />
            }
            label="Auto Refresh Dashboard"
          />
        </FormGroup>
      </CardContent>
    </Card>
  );
};

export default PreferenceSettings;