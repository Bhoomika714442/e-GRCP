import { Chip } from "@mui/material";

const statusColors = {
  Approved: "success",
  Active: "success",
  Compliant: "success",
  Completed: "success",
  Closed: "success",

  Pending: "warning",
  InProgress: "warning",

  Rejected: "error",
  Violation: "error",
  Critical: "error",

  High: "error",
  Medium: "warning",
  Low: "success",

  Read: "info",
  Unread: "primary",

  Expired: "default",
  Inactive: "default",
};

const StatusChip = ({
  status,
  size = "small",
}) => {
  return (
    <Chip
      label={status}
      size={size}
      color={
        statusColors[status] || "default"
      }
      variant="filled"
    />
  );
};

export default StatusChip;