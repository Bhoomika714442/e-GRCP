import { Grid } from "@mui/material";

import GppGoodIcon from "@mui/icons-material/GppGood";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import DescriptionIcon from "@mui/icons-material/Description";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CancelIcon from "@mui/icons-material/Cancel";

import StatCard from "../../components/StatCard";

const ComplianceKPICards = ({ complianceList = [] }) => {
  const totalRecords = complianceList.length;

  const compliantCount = complianceList.filter(
    (item) => item.status === "Compliant"
  ).length;

  const violationCount = complianceList.filter(
    (item) => item.violations.length > 0
  ).length;

  const missingDocumentsCount = complianceList.reduce(
    (total, item) => total + item.missingDocuments.length,
    0
  );

  const expiredCertificatesCount = complianceList.reduce(
    (count, item) => {
      return (
        count +
        item.certifications.filter(
          (certificate) =>
            certificate.status === "Expired"
        ).length
      );
    },
    0
  );

  const cards = [
    {
      title: "Total Records",
      value: totalRecords,
      color: "#1976d2",
      icon: <VerifiedUserIcon />,
    },
    {
      title: "Compliant",
      value: compliantCount,
      color: "#2e7d32",
      icon: <GppGoodIcon />,
    },
    {
      title: "Violations",
      value: violationCount,
      color: "#d32f2f",
      icon: <WarningAmberIcon />,
    },
    {
      title: "Missing Documents",
      value: missingDocumentsCount,
      color: "#ed6c02",
      icon: <DescriptionIcon />,
    },
    {
      title: "Expired Certificates",
      value: expiredCertificatesCount,
      color: "#616161",
      icon: <CancelIcon />,
    },
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
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

export default ComplianceKPICards;