import Grid from "@mui/material/Grid";

import StatCard from "../../components/StatCard";

import AssignmentIcon from "@mui/icons-material/Assignment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BusinessIcon from "@mui/icons-material/Business";
import SecurityIcon from "@mui/icons-material/Security";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Requests",
      value: 120,
      icon: <AssignmentIcon />,
      color: "#1976d2",
      change: "+12%",
    },
    {
      title: "Pending Requests",
      value: 24,
      icon: <PendingActionsIcon />,
      color: "#ff9800",
      change: "+4%",
    },
    {
      title: "Approved Requests",
      value: 82,
      icon: <CheckCircleIcon />,
      color: "#4caf50",
      change: "+18%",
    },
    {
      title: "Vendors",
      value: 58,
      icon: <BusinessIcon />,
      color: "#1976d2",
      change: "+9%",
    },
    {
      title: "Risk Cases",
      value: 12,
      icon: <SecurityIcon />,
      color: "#d32f2f",
      change: "-2%",
      changeType: "down",
    },
    {
      title: "Audits",
      value: 16,
      icon: <AssignmentIcon />,
      color: "#4caf50",
      change: "+6%",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          item
          xs={12}
          sm={6}
          md={4}
        >
          <StatCard {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default DashboardCards;