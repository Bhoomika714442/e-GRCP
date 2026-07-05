import { Box, Grid, Typography } from "@mui/material";

import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SecurityIcon from "@mui/icons-material/Security";

import riskData from "../../mocks/riskData.json";

import StatCard from "../../components/StatCard";

import RiskTrendBarChart from "./RiskTrendBarChart";
import RiskTrendLineChart from "./RiskTrendLineChart";
import RiskDistributionChart from "./RiskDistributionChart";
import RiskHeatMap from "./RiskHeatMap";

const risks = riskData.risks || [];

const RiskDashboard = () => {
  const total = risks.length;

  const open = risks.filter(
    (risk) => risk.status === "Open"
  ).length;

  const mitigated = risks.filter(
    (risk) => risk.status === "Mitigated"
  ).length;

  const high = risks.filter(
    (risk) => risk.severity === "High"
  ).length;

  const cards = [
    {
      title: "Total Risks",
      value: total,
      icon: <SecurityIcon />,
      color: "#1976d2",
    },
    {
      title: "Open Risks",
      value: open,
      icon: <ErrorOutlineIcon />,
      color: "#d32f2f",
    },
    {
      title: "Mitigated Risks",
      value: mitigated,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
    },
    {
      title: "High Severity",
      value: high,
      icon: <WarningAmberIcon />,
      color: "#ed6c02",
    },
  ];

  return (
    <Box>

      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 3 }}
      >
        Risk Center Dashboard
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map((card) => (
          <Grid
            key={card.title}
            size={{ xs: 12, sm: 6, md: 3 }}
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

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 10, md: 6}}>
          <RiskTrendBarChart />
        </Grid>

        <Grid size={{ xs: 10, md: 3 }}>
          <RiskDistributionChart />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid size={{ xs: 8 }}>
          <RiskTrendLineChart />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 8}}>
          <RiskHeatMap />
        </Grid>
      </Grid>

    </Box>
  );
};

export default RiskDashboard;