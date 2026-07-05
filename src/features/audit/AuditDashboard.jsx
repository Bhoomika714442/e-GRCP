import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";

import {
  fetchAudits,
  fetchAuditHistory,
  fetchAuditReports,
  fetchUserActivities,
  fetchSystemLogs,
} from "../../store/auditSlice";

import AuditKPICards from "./AuditKPICards";
import AuditTrendChart from "./AuditTrendChart";
import AuditHistoryTable from "./AuditHistoryTable";
import AuditReportsTable from "./AuditReportsTable";
import UserActivitiesTable from "./UserActivitiesTable";
import SystemLogsTable from "./SystemLogsTable";

const AuditDashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAudits());
    dispatch(fetchAuditHistory());
    dispatch(fetchAuditReports());
    dispatch(fetchUserActivities());
    dispatch(fetchSystemLogs());
  }, [dispatch]);

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Audit Center
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={3}
      >
        Monitor audit activities, reports, user actions and system logs.
      </Typography>

      <AuditKPICards />

      <Grid container spacing={3} sx={{ mt: 1 }}>
        
        <Grid size={{ xs: 12 }}>
          <AuditTrendChart />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AuditHistoryTable />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <AuditReportsTable />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <UserActivitiesTable />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <SystemLogsTable />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuditDashboard;