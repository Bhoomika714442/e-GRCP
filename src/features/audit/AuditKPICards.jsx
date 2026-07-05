import { useMemo } from "react";
import { useSelector } from "react-redux";

import { Grid } from "@mui/material";

import FactCheckIcon from "@mui/icons-material/FactCheck";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import StatCard from "../../components/StatCard";

const AuditKPICards = () => {
  const { audits = [] } = useSelector((state) => state.audit);

  const statistics = useMemo(() => {
    const totalAudits = audits.length;

    const completedAudits = audits.filter(
      (audit) => audit.status === "Completed"
    ).length;

    const openAudits = audits.filter(
      (audit) => audit.status === "In Progress"
    ).length;

    const criticalAudits = audits.filter(
      (audit) => audit.severity === "Critical"
    ).length;

    return {
      totalAudits,
      completedAudits,
      openAudits,
      criticalAudits,
    };
  }, [audits]);

  const cards = [
    {
      title: "Total Audits",
      value: statistics.totalAudits,
      icon: <FactCheckIcon />,
      color: "#1976d2",
    },
    {
      title: "Completed Audits",
      value: statistics.completedAudits,
      icon: <CheckCircleIcon />,
      color: "#2e7d32",
    },
    {
      title: "Open Audits",
      value: statistics.openAudits,
      icon: <WarningAmberIcon />,
      color: "#ed6c02",
    },
    {
      title: "Critical Audits",
      value: statistics.criticalAudits,
      icon: <ErrorOutlineIcon />,
      color: "#d32f2f",
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card) => (
        <Grid
          key={card.title}
          item
          xs={12}
          sm={6}
          md={3}
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

export default AuditKPICards;