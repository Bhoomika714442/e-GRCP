import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AssessmentIcon from "@mui/icons-material/Assessment";
import SettingsIcon from "@mui/icons-material/Settings";
import ApprovalIcon from "@mui/icons-material/FactCheck";

import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const menuItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon />,
  },
  {
    label: "Procurement",
    path: "/procurement",
    icon: <ShoppingCartIcon />,
  },
  {
    label: "Vendors",
    path: "/vendors",
    icon: <BusinessIcon />,
  },
  {
    label: "Risk",
    path: "/risk",
    icon: <SecurityIcon />,
  },
  {
    label: "Compliance",
    path: "/compliance",
    icon: <VerifiedUserIcon />,
  },
  {
    label: "Audit",
    path: "/audit",
    icon: <FactCheckIcon />,
  },
  {
    label: "Approval Workbench",
    path: "/approval",
    icon: <ApprovalIcon />,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: <AssessmentIcon />,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: <SettingsIcon />,
  },
];

const Sidebar = () => {
  const theme = useTheme();

  const sidebarBg =
    theme.palette.mode === "dark"
      ? "#1c1c1c"
      : "#1E293B";

  return (
    <Box
      sx={{
        width: 280,
        minHeight: "100vh",
        bgcolor: sidebarBg,
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "all .3s ease",
      }}
    >
      <Box
        sx={{
          py: 3,
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
        >
          Enterprise GRC
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: .7,
          }}
        >
          Governance Platform
        </Typography>
      </Box>

      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={NavLink}
            to={item.path}
            sx={{
              mx: 1.5,
              mb: 0.5,
              borderRadius: 2,
              color: "#fff",

              "&.active": {
                bgcolor: "primary.main",
              },

              "&:hover": {
                bgcolor: "rgba(255,255,255,.08)",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: "#fff",
                minWidth: 42,
              }}
            >
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;