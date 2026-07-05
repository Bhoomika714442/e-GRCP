import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

const ComplianceList = () => {
  const navigate = useNavigate();

  const { complianceList } = useSelector(
    (state) => state.compliance
  );

  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");

  const {
    searchTerm,
    setSearchTerm,
    filteredData,
  } = useSearch(complianceList, [
    "vendorName",
    "regulation",
    "category",
    "officer",
    "status",
  ]);

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(0, 5);

  const filtered = useMemo(() => {
    return filteredData.filter((item) => {
      const matchesStatus =
        status === "All" ||
        item.status === status;

      const matchesCategory =
        category === "All" ||
        item.category === category;

      return (
        matchesStatus &&
        matchesCategory
      );
    });
  }, [
    filteredData,
    status,
    category,
  ]);

  const exportCSV = () => {
    const headers = [
      "ID",
      "Vendor",
      "Regulation",
      "Category",
      "Status",
      "Score",
      "Officer",
    ];

    const rows = filtered.map((item) => [
      item.id,
      item.vendorName,
      item.regulation,
      item.category,
      item.status,
      item.complianceScore,
      item.officer,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "ComplianceReport.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Compliant":
        return "success";

      case "Violation":
        return "error";

      case "Pending":
        return "warning";

      case "Expired":
        return "default";

      default:
        return "primary";
    }
  };

  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Compliance Records
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid
          container
          spacing={2}
          mb={3}
        >
          <Grid
            item
            xs={12}
            md={4}
          >
            <TextField
              fullWidth
              label="Search"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
          >
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>

              <Select
                value={status}
                label="Status"
                onChange={(e) =>
                  setStatus(e.target.value)
                }
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                <MenuItem value="Compliant">
                  Compliant
                </MenuItem>

                <MenuItem value="Violation">
                  Violation
                </MenuItem>

                <MenuItem value="Pending">
                  Pending
                </MenuItem>

                <MenuItem value="Expired">
                  Expired
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            md={3}
          >
            <FormControl fullWidth>
              <InputLabel>
                Category
              </InputLabel>

              <Select
                value={category}
                label="Category"
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <MenuItem value="All">
                  All
                </MenuItem>

                {[
                  ...new Set(
                    complianceList.map(
                      (item) =>
                        item.category
                    )
                  ),
                ].map((cat) => (
                  <MenuItem
                    key={cat}
                    value={cat}
                  >
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            md={2}
          >
            <Button
              fullWidth
              variant="contained"
              startIcon={
                <DownloadIcon />
              }
              onClick={exportCSV}
              sx={{
                height: "56px",
              }}
            >
              Export
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>

            <TableHead>

              <TableRow>

                <TableCell>ID</TableCell>

                <TableCell>
                  Vendor
                </TableCell>

                <TableCell>
                  Regulation
                </TableCell>

                <TableCell>
                  Category
                </TableCell>

                <TableCell>
                  Status
                </TableCell>

                <TableCell align="center">
                  Score
                </TableCell>

                <TableCell>
                  Officer
                </TableCell>

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

                .map((item) => (

                  <TableRow
                    hover
                    key={item.id}
                  >

                    <TableCell>
                      {item.id}
                    </TableCell>

                    <TableCell>
                      {item.vendorName}
                    </TableCell>

                    <TableCell>
                      {item.regulation}
                    </TableCell>

                    <TableCell>
                      {item.category}
                    </TableCell>

                    <TableCell>

                      <Chip
                        label={item.status}
                        color={getStatusColor(
                          item.status
                        )}
                        size="small"
                      />

                    </TableCell>

                    <TableCell align="center">
                      {item.complianceScore}%
                    </TableCell>

                    <TableCell>
                      {item.officer}
                    </TableCell>

                    <TableCell align="center">

                      <Button
                        size="small"
                        startIcon={
                          <VisibilityIcon />
                        }
                        onClick={() =>
                          navigate(
                            `/compliance/${item.id}`
                          )
                        }
                      >
                        View
                      </Button>

                    </TableCell>

                  </TableRow>

                ))}

            </TableBody>

          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[
            5,
            10,
            20,
          ]}
          onPageChange={
            handleChangePage
          }
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
        />
      </Paper>
    </Box>
  );
};

export default ComplianceList;