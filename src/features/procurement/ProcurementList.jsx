import { useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
  Stack,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import requests from "../../mocks/requests.json";
import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";
import useSort from "../../hooks/useSort";
import useExport from "../../hooks/useExport";

const ProcurementList = () => {
  const [status, setStatus] = useState("All");
  const [department, setDepartment] = useState("All");

  const {
    searchTerm,
    setSearchTerm,
    filteredData,
  } = useSearch(requests, [
    "vendor",
    "department",
    "status",
  ]);

  const {
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    sortedData,
  } = useSort(filteredData, "id");

  const filtered = sortedData.filter((item) => {
    const statusMatch =
      status === "All" || item.status === status;
    const departmentMatch =
      department === "All" ||
      item.department === department;

    return statusMatch && departmentMatch;
  });

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(0, 5);

  const { exportCSV } = useExport();
  
  <br></br>
  const handleExport = () => {
    exportCSV(
      filtered,
      [
        "id",
        "vendor",
        "status",
        "department",
        "amount",
      ],
      "procurement-report"
    );
  };

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={700}
        mb={3}
      >
        Procurement Requests
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        flexWrap="wrap"
        mb={3}
      >
        <TextField
          label="Search Vendor"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          sx={{ width: 170 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Approved">
            Approved
          </MenuItem>
          <MenuItem value="Pending">
            Pending
          </MenuItem>
          <MenuItem value="Rejected">
            Rejected
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Department"
          value={department}
          onChange={(e) =>
            setDepartment(e.target.value)
          }
          sx={{ width: 170 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="IT">IT</MenuItem>
          <MenuItem value="Finance">
            Finance
          </MenuItem>
          <MenuItem value="HR">HR</MenuItem>
          <MenuItem value="Operations">
            Operations
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value)
          }
          sx={{ width: 150 }}
        >
          <MenuItem value="id">ID</MenuItem>
          <MenuItem value="vendor">
            Vendor
          </MenuItem>
          <MenuItem value="department">
            Department
          </MenuItem>
          <MenuItem value="amount">
            Amount
          </MenuItem>
        </TextField>

        <TextField
          select
          label="Order"
          value={sortOrder}
          onChange={(e) =>
            setSortOrder(e.target.value)
          }
          sx={{ width: 150 }}
        >
          <MenuItem value="asc">
            Ascending
          </MenuItem>
          <MenuItem value="desc">
            Descending
          </MenuItem>
        </TextField>

        <Button
          variant="contained"
          component={Link}
          to="/procurement/new"
        >
          New Request
        </Button>
        <br></br><br></br>

        <Button
          variant="outlined"
          onClick={handleExport}
        ><br></br>
          Export CSV
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Action</TableCell>
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
                  <TableCell>{item.id}</TableCell>

                  <TableCell>
                    {item.vendor}
                  </TableCell>

                  <TableCell>
                    {item.status}
                  </TableCell>

                  <TableCell>
                    {item.department}
                  </TableCell>

                  <TableCell>
                    ${item.amount}
                  </TableCell>

                  <TableCell>
                    <Button
                      component={Link}
                      to={`/procurement/${item.id}`}
                      size="small"
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
            5,
            10,
            25,
          ]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
        />
      </TableContainer>
    </>
  );
};

export default ProcurementList;