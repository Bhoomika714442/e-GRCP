import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
} from "@mui/material";

import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import { logoutUser } from "../store/authSlice";

const UserMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());

    handleClose();

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="user menu"
      >
        <Avatar sx={{ bgcolor: "primary.main" }}>
          B
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={(_, reason) => {
          if (
            reason === "escapeKeyDown" ||
            reason === "backdropClick" ||
            reason === "tabKeyDown"
          ) {
            handleClose();
            return;
          }

          handleClose();
        }}
        disableAutoFocusItem
        MenuListProps={{
          autoFocus: true,
        }}
      >
        <MenuItem
          onClick={() => {
            navigate("/profile");
            handleClose();
          }}
        >
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>

          Profile
        </MenuItem>

        <MenuItem
          onClick={() => {
            navigate("/settings");
            handleClose();
          }}
        >
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>

          Settings
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon
              fontSize="small"
              color="error"
            />
          </ListItemIcon>

          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;