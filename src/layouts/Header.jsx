import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import UserMenu from "./UserMenu";
import NotificationBell from "./NotificationBell";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        bgcolor: "#ffffff",
        color: "#000",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{
            minWidth: 280,
          }}
        >
          Enterprise Governance Platform
        </Typography>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            px: 4,
          }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 400,
              bgcolor: "#fff",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <NotificationBell />

          <UserMenu />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;