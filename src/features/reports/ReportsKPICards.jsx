import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import DescriptionIcon from "@mui/icons-material/Description";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BusinessIcon from "@mui/icons-material/Business";
import SecurityIcon from "@mui/icons-material/Security";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import StatCard from "../../components/StatCard";

const ReportsKPICards = () => {
  const { reports = [] } = useSelector(
    (state) => state.reports
  );

  const procurement = reports.filter(
    (report) => report.category === "Procurement"
  ).length;

  const vendor = reports.filter(
    (report) => report.category === "Vendor"
  ).length;

  const risk = reports.filter(
    (report) => report.category === "Risk"
  ).length;

  const compliance = reports.filter(
    (report) => report.category === "Compliance"
  ).length;

  const totalReports = reports.length;

  const cards = [
    {
      title: "Total Reports",
      value: totalReports,
      icon: <DescriptionIcon />,
      color: "#3949ab",
    },
    {
      title: "Procurement",
      value: procurement,
      icon: <ShoppingCartIcon />,
      color: "#1976d2",
    },
    {
      title: "Vendor",
      value: vendor,
      icon: <BusinessIcon />,
      color: "#2e7d32",
    },
    {
      title: "Risk",
      value: risk,
      icon: <SecurityIcon />,
      color: "#ed6c02",
    },
    {
      title: "Compliance",
      value: compliance,
      icon: <VerifiedUserIcon />,
      color: "#9c27b0",
    },
  ];

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mb: 4,
      }}
    >
      {cards.map((card) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={2.4}
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

export default ReportsKPICards;