import { Grid } from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import vendorData from "../../mocks/vendors.json";
import StatCard from "../../components/StatCard";

const vendors = Array.isArray(vendorData)
  ? vendorData
  : vendorData.vendors || [];

const VendorDashboard = () => {
  const total = vendors.length;

  const active = vendors.filter(
    (vendor) => vendor.status === "Active"
  ).length;

  const inactive = vendors.filter(
    (vendor) => vendor.status === "Inactive"
  ).length;

  const highRisk = 2;

  const cards = [
    {
      title: "Total Vendors",
      value: total,
      icon: <BusinessIcon />,
      color: "#1976d2",
    },
    {
      title: "Active Vendors",
      value: active,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
    },
    {
      title: "Inactive Vendors",
      value: inactive,
      icon: <CancelIcon />,
      color: "#757575",
    },
    {
      title: "High Risk Vendors",
      value: highRisk,
      icon: <WarningAmberIcon />,
      color: "#ed6c02",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={card.title}
        >
          <StatCard
            title={card.title}
            value={card.value}
            icon={card.icon}
            color={card.color}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default VendorDashboard;