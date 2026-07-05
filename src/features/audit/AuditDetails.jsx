import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { fetchAuditById } from "../../store/auditSlice";

const AuditDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { selectedAudit, loading } = useSelector(
    (state) => state.audit
  );

  useEffect(() => {
    dispatch(fetchAuditById(id));
  }, [dispatch, id]);

  if (loading || !selectedAudit) {
    return (
      <Box p={3}>
        <Typography>Loading audit details...</Typography>
      </Box>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";

      case "In Progress":
        return "warning";

      case "Scheduled":
        return "info";

      default:
        return "default";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "error";

      case "High":
        return "warning";

      case "Medium":
        return "info";

      case "Low":
        return "success";

      default:
        return "default";
    }
  };

  return (
    <Box p={3}>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/audit")}
        sx={{ mb: 3 }}
      >
        Back to Audit Center
      </Button>

      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Audit Details
      </Typography>

      <Grid container spacing={3}>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                Audit Summary
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>Audit Name:</strong>{" "}
                {selectedAudit.auditName}
              </Typography>

              <Typography>
                <strong>Module:</strong>{" "}
                {selectedAudit.module}
              </Typography>

              <Typography>
                <strong>Auditor:</strong>{" "}
                {selectedAudit.auditor}
              </Typography>

              <Typography>
                <strong>Audit Date:</strong>{" "}
                {selectedAudit.auditDate}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Status:</strong>
              </Typography>

              <Chip
                label={selectedAudit.status}
                color={getStatusColor(
                  selectedAudit.status
                )}
                sx={{ mt: 1 }}
              />

            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                Findings
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <Typography>
                <strong>Total Findings:</strong>{" "}
                {selectedAudit.findings}
              </Typography>

              <Typography sx={{ mt: 2 }}>
                <strong>Severity:</strong>
              </Typography>

              <Chip
                label={selectedAudit.severity}
                color={getSeverityColor(
                  selectedAudit.severity
                )}
                sx={{ mt: 1 }}
              />

            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                Audit Activities
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <List dense>

                {selectedAudit.activities.map(
                  (activity, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={activity}
                      />
                    </ListItem>
                  )
                )}

              </List>

            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>

              <Typography
                variant="h6"
                gutterBottom
              >
                System Logs
              </Typography>

              <Divider sx={{ mb: 2 }} />

              <List dense>

                {selectedAudit.logs.map(
                  (log, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={log}
                      />
                    </ListItem>
                  )
                )}

              </List>

            </CardContent>
          </Card>
        </Grid>

      </Grid>

    </Box>
  );
};

export default AuditDetails;