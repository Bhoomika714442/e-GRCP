import {
  Card,
  CardContent,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { setThemeMode } from "../../store/uiSlice";

const ThemeSettings = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector(
    (state) => state.ui.themeMode
  );

  const handleThemeChange = (event) => {
    dispatch(setThemeMode(event.target.value));
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Theme
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          mb={2}
        >
          Choose how the application appearance should be displayed.
        </Typography>

        <RadioGroup
          value={themeMode}
          onChange={handleThemeChange}
        >
          <FormControlLabel
            value="light"
            control={<Radio />}
            label="Light Theme"
          />

          <FormControlLabel
            value="dark"
            control={<Radio />}
            label="Dark Theme"
          />

          <FormControlLabel
            value="system"
            control={<Radio />}
            label="System Theme"
          />
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;