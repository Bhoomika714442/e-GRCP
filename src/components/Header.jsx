import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

import NotificationBell from "./NotificationBell";
import UserMenu from "./UserMenu";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      color="inherit"
      sx={{
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        zIndex: 1200,
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          px: 4,
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
        }}
      >
        <Box
          sx={{
            minWidth: 220,
          }}
        >
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            size="small"
            placeholder="Search..."
            sx={{
              width: 420,

              "& .MuiOutlinedInput-root": {
                borderRadius: 8,
                bgcolor: "background.default",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
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