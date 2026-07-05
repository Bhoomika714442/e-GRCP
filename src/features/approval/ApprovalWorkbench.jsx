import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchApprovals,
  approveRequest,
  rejectRequest,
  sendBackRequest,
  delegateRequest,
} from "../../store/approvalSlice";

import DataTable from "../../components/DataTable";

import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  TextField,
  MenuItem,
  Chip,
  Button,
  Stack,
  Paper,
} from "@mui/material";

import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const ApprovalWorkbench = () => {
  const dispatch = useDispatch();

  const { approvalList, loading } = useSelector(
    (state) => state.approval
  );

  const [tab, setTab] = useState("Pending");
  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(fetchApprovals());
  }, [dispatch]);

  useEffect(() => {
    setPage(0);
  }, [tab, search, priority]);

  const filteredData = useMemo(() => {
    return approvalList.filter((item) => {
      const statusMatch = item.status === tab;

      const priorityMatch =
        priority === "All" ||
        item.priority === priority;

      const searchMatch =
        item.requestName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        item.vendor
          .toLowerCase()
          .includes(search.toLowerCase());

      return (
        statusMatch &&
        priorityMatch &&
        searchMatch
      );
    });
  }, [
    approvalList,
    tab,
    priority,
    search,
  ]);

  const paginatedRows = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const summary = [
    {
      title: "Pending",
      value: approvalList.filter(
        (x) => x.status === "Pending"
      ).length,
      color: "#1976d2",
      icon: <HourglassEmptyIcon />,
    },

    {
      title: "Approved",
      value: approvalList.filter(
        (x) => x.status === "Approved"
      ).length,
      color: "#2e7d32",
      icon: <CheckCircleIcon />,
    },

    {
      title: "Rejected",
      value: approvalList.filter(
        (x) => x.status === "Rejected"
      ).length,
      color: "#d32f2f",
      icon: <CancelIcon />,
    },

    {
      title: "Escalated",
      value: approvalList.filter(
        (x) => x.status === "Escalated"
      ).length,
      color: "#ed6c02",
      icon: <TrendingUpIcon />,
    },
  ];

  const columns = [
    {
      field: "requestName",
      headerName: "Request",
    },

    {
      field: "vendor",
      headerName: "Vendor",
    },

    {
      field: "requestedBy",
      headerName: "Requested By",
    },

    {
      field: "date",
      headerName: "Date",
    },

    {
      field: "priority",
      headerName: "Priority",

      render: (row) => (
        <Chip
          size="small"
          label={row.priority}
          color={
            row.priority === "Critical"
              ? "error"
              : row.priority === "High"
              ? "warning"
              : row.priority === "Medium"
              ? "primary"
              : "success"
          }
        />
      ),
    },

    {
      field: "status",
      headerName: "Status",

      render: (row) => (
        <Chip
          size="small"
          label={row.status}
          color={
            row.status === "Approved"
              ? "success"
              : row.status === "Rejected"
              ? "error"
              : row.status === "Escalated"
              ? "warning"
              : "info"
          }
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",

      render: (row) =>
        row.status === "Pending" ? (
          <Stack direction="row" spacing={1}>
            <Button
              size="small"
              variant="contained"
              color="success"
              onClick={() =>
                dispatch(approveRequest(row.id))
              }
            >
              Approve
            </Button>

            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() =>
                dispatch(rejectRequest(row.id))
              }
            >
              Reject
            </Button>

            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={() =>
                dispatch(sendBackRequest(row.id))
              }
            >
              Send Back
            </Button>

            <Button
              size="small"
              variant="contained"
              onClick={() =>
                dispatch(delegateRequest(row.id))
              }
            >
              Delegate
            </Button>
          </Stack>
        ) : (
          <Typography
            variant="body2"
            color="text.secondary"
          >
            Completed
          </Typography>
        ),
    },
  ];
    return (
    <Box p={3}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          underline="hover"
          color="inherit"
          href="/dashboard"
        >
          Dashboard
        </Link>

        <Typography color="text.primary">
          Approval Workbench
        </Typography>
      </Breadcrumbs>

      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Approval Workbench
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        Manage approval requests and workflow actions.
      </Typography>

      <Grid container spacing={2} mb={3}>
        {summary.map((item) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={item.title}
          >
            <Card
              sx={{
                borderLeft: `5px solid ${item.color}`,
                height: "100%",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      variant="h4"
                      fontWeight={700}
                    >
                      {item.value}
                    </Typography>
                  </Box>

                  <Box sx={{ color: item.color }}>
                    {item.icon}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          spacing={2}
        >
          <TextField
            fullWidth
            label="Search Vendor / Request"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <TextField
            select
            label="Priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
            sx={{ width: 200 }}
          >
            <MenuItem value="All">
              All
            </MenuItem>

            <MenuItem value="Critical">
              Critical
            </MenuItem>

            <MenuItem value="High">
              High
            </MenuItem>

            <MenuItem value="Medium">
              Medium
            </MenuItem>

            <MenuItem value="Low">
              Low
            </MenuItem>
          </TextField>
        </Stack>
      </Paper>

      <Tabs
        value={tab}
        onChange={(e, value) =>
          setTab(value)
        }
        sx={{ mb: 3 }}
      >
        <Tab
          value="Pending"
          label={`Pending (${summary[0].value})`}
        />

        <Tab
          value="Approved"
          label={`Approved (${summary[1].value})`}
        />

        <Tab
          value="Rejected"
          label={`Rejected (${summary[2].value})`}
        />

        <Tab
          value="Escalated"
          label={`Escalated (${summary[3].value})`}
        />
      </Tabs>

      <DataTable
        columns={columns}
        rows={paginatedRows}
        loading={loading}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={filteredData.length}
        onPageChange={(event, newPage) =>
          setPage(newPage)
        }
        onRowsPerPageChange={(event) => {
          setRowsPerPage(
            parseInt(event.target.value, 10)
          );
          setPage(0);
        }}
      />
    </Box>
  );
};

export default ApprovalWorkbench;