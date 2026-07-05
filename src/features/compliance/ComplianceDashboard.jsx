import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { fetchCompliance } from "../../store/complianceSlice";

import ComplianceKPICards from "./ComplianceKPICards";
import ComplianceStatusChart from "./ComplianceStatusChart";
import ComplianceMonitoringTable from "./ComplianceMonitoringTable";
import ViolationsTable from "./ViolationsTable";
import MissingDocumentsTable from "./MissingDocumentsTable";
import ExpiredCertificatesTable from "./ExpiredCertificatesTable";

const ComplianceDashboard = () => {
  const dispatch = useDispatch();

  const {
    complianceList,
    loading,
    error,
  } = useSelector((state) => state.compliance);

  useEffect(() => {
    dispatch(fetchCompliance());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Compliance Center
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={3}
      >
        Monitor compliance status, vendor certifications,
        violations, missing documents, and regulatory
        requirements.
      </Typography>

      <ComplianceKPICards
        complianceList={complianceList}
      />

      <Grid container spacing={3} mt={1}>

        <Grid item xs={12} lg={5}>
          <Paper sx={{ p: 3, height: "100%" }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Compliance Status Overview
            </Typography>

            <ComplianceStatusChart
              complianceList={complianceList}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} lg={7}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Compliance Monitoring
            </Typography>

            <ComplianceMonitoringTable
              complianceList={complianceList}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Violations
            </Typography>

            <ViolationsTable
              complianceList={complianceList}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Missing Documents
            </Typography>

            <MissingDocumentsTable
              complianceList={complianceList}
            />
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
            >
              Expired Certifications
            </Typography>

            <ExpiredCertificatesTable
              complianceList={complianceList}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ComplianceDashboard;