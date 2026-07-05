import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { fetchComplianceById } from "../../store/complianceSlice";

const ComplianceDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedCompliance, loading, error } = useSelector(
    (state) => state.compliance
  );

  const [tab, setTab] = useState(0);

  useEffect(() => {
    dispatch(fetchComplianceById(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Alert severity="error">
          {error}
        </Alert>
      </Box>
    );
  }

  if (!selectedCompliance) return null;

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        Compliance Details
      </Typography>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        mb={3}
      >
        {selectedCompliance.vendorName}
      </Typography>

      <Card elevation={3}>
        <CardContent>

          <Tabs
            value={tab}
            onChange={(e, value) => setTab(value)}
            variant="scrollable"
          >
            <Tab label="Overview" />
            <Tab label="Violations" />
            <Tab label="Missing Documents" />
            <Tab label="Certifications" />
            <Tab label="Audit History" />
          </Tabs>

          <Divider sx={{ mb: 3 }} />

          {tab === 0 && (
            <Grid container spacing={3}>

              <Grid item xs={12} md={6}>
                <Typography><strong>ID</strong></Typography>
                <Typography>{selectedCompliance.id}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Vendor</strong></Typography>
                <Typography>{selectedCompliance.vendorName}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Regulation</strong></Typography>
                <Typography>{selectedCompliance.regulation}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Category</strong></Typography>
                <Typography>{selectedCompliance.category}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Compliance Score</strong></Typography>
                <Typography>
                  {selectedCompliance.complianceScore}%
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Officer</strong></Typography>
                <Typography>{selectedCompliance.officer}</Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Status</strong></Typography>

                <Chip
                  label={selectedCompliance.status}
                  color={
                    selectedCompliance.status === "Compliant"
                      ? "success"
                      : selectedCompliance.status === "Pending"
                      ? "warning"
                      : "error"
                  }
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography><strong>Audit Date</strong></Typography>
                <Typography>
                  {selectedCompliance.auditDate}
                </Typography>
              </Grid>

            </Grid>
          )}

          {tab === 1 && (
            <>
              {selectedCompliance.violations.length > 0 ? (
                <List>

                  {selectedCompliance.violations.map(
                    (violation, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={violation}
                        />
                      </ListItem>
                    )
                  )}

                </List>
              ) : (
                <Alert severity="success">
                  No Violations Found
                </Alert>
              )}
            </>
          )}

          {tab === 2 && (
            <>
              {selectedCompliance.missingDocuments.length > 0 ? (
                <List>

                  {selectedCompliance.missingDocuments.map(
                    (doc, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={doc}
                        />
                      </ListItem>
                    )
                  )}

                </List>
              ) : (
                <Alert severity="success">
                  No Missing Documents
                </Alert>
              )}
            </>
          )}

          {tab === 3 && (
            <List>

              {selectedCompliance.certifications.map(
                (certificate, index) => (
                  <ListItem key={index}>
                    <ListItemText
                      primary={certificate.name}
                      secondary={`Expiry : ${certificate.expiry}`}
                    />

                    <Chip
                      label={certificate.status}
                      color={
                        certificate.status === "Valid"
                          ? "success"
                          : certificate.status === "Expiring Soon"
                          ? "warning"
                          : "error"
                      }
                    />

                  </ListItem>
                )
              )}

            </List>
          )}

          {tab === 4 && (
            <Grid container spacing={2}>

              <Grid item xs={12}>
                <Typography>
                  Last Audit Date
                </Typography>

                <Typography fontWeight="bold">
                  {selectedCompliance.auditDate}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  Next Review
                </Typography>

                <Typography fontWeight="bold">
                  {selectedCompliance.expiryDate}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography>
                  Compliance Officer
                </Typography>

                <Typography fontWeight="bold">
                  {selectedCompliance.officer}
                </Typography>
              </Grid>

            </Grid>
          )}

        </CardContent>
      </Card>
    </Box>
  );
};

export default ComplianceDetails;