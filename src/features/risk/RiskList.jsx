import { useMemo, useState, useCallback } from "react";
import {
  Typography,
  Stack,
  TextField,
  MenuItem,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";

import RiskDashboard from "./RiskDashboard";
import riskData from "../../mocks/riskData.json";

import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

// Extract the array from the JSON object
const risks = Array.isArray(riskData)
  ? riskData
  : riskData.risks || [];

const RiskList = () => {
  const [severity, setSeverity] = useState("All");
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("title");

  const {
    searchTerm,
    setSearchTerm,
    filteredData,
  } = useSearch(risks, [
    "title",
    "category",
    "owner",
    "severity",
    "status",
  ]);

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(0, 10);

  const handleSearchChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
    },
    [setSearchTerm]
  );

  const handleSeverityChange = useCallback((event) => {
    setSeverity(event.target.value);
  }, []);

  const handleStatusChange = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  const handleSortChange = useCallback((event) => {
    setSortBy(event.target.value);
  }, []);

  const filtered = useMemo(() => {
    const safeData = Array.isArray(filteredData)
      ? filteredData
      : [];

    return safeData
      .filter(
        (risk) =>
          severity === "All" ||
          risk.severity === severity
      )
      .filter(
        (risk) =>
          status === "All" ||
          risk.status === status
      )
      .sort((a, b) => {
        const first =
          a?.[sortBy]?.toString() ?? "";

        const second =
          b?.[sortBy]?.toString() ?? "";

        return first.localeCompare(second);
      });
  }, [filteredData, severity, status, sortBy]);

  const exportCSV = useCallback(() => {
    const csv = [
      [
        "ID",
        "Title",
        "Category",
        "Owner",
        "Severity",
        "Status",
      ],
      ...filtered.map((risk) => [
        risk.id,
        risk.title,
        risk.category,
        risk.owner,
        risk.severity,
        risk.status,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "RiskReport.csv";
    a.click();

    URL.revokeObjectURL(url);
  }, [filtered]);

  return (
    <>
      <RiskDashboard />

      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        Risk Center
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        mb={3}
        flexWrap="wrap"
      >
        <TextField
          label="Search Risk"
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <TextField
          select
          label="Severity"
          value={severity}
          onChange={handleSeverityChange}
          sx={{ width: 170 }}
        >
          <MenuItem value="All">
            All
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

        <TextField
          select
          label="Status"
          value={status}
          onChange={handleStatusChange}
          sx={{ width: 170 }}
        >
          <MenuItem value="All">
            All
          </MenuItem>
          <MenuItem value="Open">
            Open
          </MenuItem>
          <MenuItem value="Mitigated">
            Mitigated
          </MenuItem>
          <MenuItem value="Closed">
            Closed
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={handleSortChange}
          sx={{ width: 180 }}
        >
          <MenuItem value="title">
            Title
          </MenuItem>
          <MenuItem value="category">
            Category
          </MenuItem>
          <MenuItem value="severity">
            Severity
          </MenuItem>
          <MenuItem value="status">
            Status
          </MenuItem>
        </TextField>

        <Button
          variant="contained"
          onClick={exportCSV}
        >
          Export CSV
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Risk</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filtered
              .slice(
                page * rowsPerPage,
                page * rowsPerPage +
                  rowsPerPage
              )
              .map((risk) => (
                <TableRow
                  key={risk.id}
                  hover
                >
                  <TableCell>
                    {risk.id}
                  </TableCell>

                  <TableCell>
                    {risk.title}
                  </TableCell>

                  <TableCell>
                    {risk.category}
                  </TableCell>

                  <TableCell>
                    {risk.owner}
                  </TableCell>

                  <TableCell>
                    {risk.severity}
                  </TableCell>

                  <TableCell>
                    {risk.status}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      component={Link}
                      to={`/risk/${risk.id}`}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[
            10,
            25,
            50,
          ]}
          onPageChange={
            handleChangePage
          }
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
        />
      </TableContainer>
    </>
  );
};

export default RiskList;