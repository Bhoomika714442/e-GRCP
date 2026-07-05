import { lazy, Suspense, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Skeleton,
} from "@mui/material";

import requestsData from "../../mocks/requests.json";

const DashboardCards = lazy(() =>
  import("./DashboardCards")
);

const DashboardCharts = lazy(() =>
  import("./DashboardCharts")
);

const DataTable = lazy(() =>
  import("../../components/DataTable")
);

const Dashboard = () => {
  const recentRequests = useMemo(() => {
    const requestList = Array.isArray(requestsData)
      ? requestsData
      : requestsData.requests || [];

    return requestList.slice(0, 5).map((item) => ({
      id: item.id,
      vendor: item.vendor,
      department: item.department,
      status: item.status,
      amount: `$${Number(item.amount).toLocaleString()}`,
    }));
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      align: "center",
    },
    {
      field: "vendor",
      headerName: "Vendor",
    },
    {
      field: "department",
      headerName: "Department",
    },
    {
      field: "status",
      headerName: "Status",
    },
    {
      field: "amount",
      headerName: "Amount",
      align: "right",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h3"
        fontWeight={700}
      >
        Enterprise Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Monitor procurement activities, vendor performance,
        enterprise risks, compliance status and audit progress
        from one place.
      </Typography>

      <Suspense
        fallback={
          <Skeleton
            variant="rounded"
            height={240}
          />
        }
      >
        <DashboardCards />
      </Suspense>

      <Box mt={4}>
        <Suspense
          fallback={
            <Skeleton
              variant="rounded"
              height={520}
            />
          }
        >
          <DashboardCharts />
        </Suspense>
      </Box>

      <Grid
        container
        spacing={3}
        mt={1}
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Recent Procurement Requests
            </Typography>

            <Suspense
              fallback={
                <Skeleton
                  variant="rounded"
                  height={350}
                />
              }
            >
              <DataTable
                columns={columns}
                rows={recentRequests}
              />
            </Suspense>
          </Paper>
        </Grid>

        <Grid
          item
          xs={12}
          md={4}
        >
          <Paper sx={{ p: 3 }}>
            <Typography
              variant="h5"
              fontWeight={700}
              mb={2}
            >
              Recent Activity
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography mb={2}>
              • Vendor <strong>ABC Technologies</strong> was
              successfully onboarded.
            </Typography>

            <Typography mb={2}>
              • Procurement Request <strong>#102</strong> is
              awaiting approval.
            </Typography>

            <Typography mb={2}>
              • High Risk assessment completed for
              <strong> TechNova</strong>.
            </Typography>

            <Typography mb={2}>
              • Compliance Report for Q2 generated.
            </Typography>

            <Typography>
              • Internal Audit scheduled for next Monday.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;