import { useMemo, useState } from "react";
import {
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { Link } from "react-router-dom";

import VendorDashboard from "./VendorDashboard";
import vendorData from "../../mocks/vendors.json";

import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

const vendors = vendorData.vendors || [];

const VendorList = () => {
  const [status, setStatus] = useState("All");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");

  const {
    searchTerm,
    setSearchTerm,
    filteredData,
  } = useSearch(vendors, [
    "name",
    "category",
    "contact",
    "status",
  ]);

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(0, 5);

  const filtered = useMemo(() => {
    const safeData = Array.isArray(filteredData)
      ? filteredData
      : [];

    return safeData
      .filter(
        (vendor) =>
          status === "All" || vendor.status === status
      )
      .filter(
        (vendor) =>
          category === "All" ||
          vendor.category === category
      )
      .sort((a, b) => {
        const first = a?.[sortBy]?.toString() ?? "";
        const second = b?.[sortBy]?.toString() ?? "";

        return first.localeCompare(second);
      });
  }, [
    filteredData,
    status,
    category,
    sortBy,
  ]);

  return (
    <>
      <Typography variant="h3" fontWeight={700} mb={3}>
        Vendor Governance
      </Typography>

      <VendorDashboard />

      <Stack direction="row" spacing={2} mb={3} flexWrap="wrap">
        <TextField
          label="Search Vendor"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TextField
          select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ width: 170 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </TextField>

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="IT Services">IT Services</MenuItem>
          <MenuItem value="Software">Software</MenuItem>
          <MenuItem value="Cloud">Cloud</MenuItem>
          <MenuItem value="Finance">Finance</MenuItem>
          <MenuItem value="Consulting">Consulting</MenuItem>
        </TextField>

        <TextField
          select
          label="Sort By"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{ width: 180 }}
        >
          <MenuItem value="name">Vendor Name</MenuItem>
          <MenuItem value="category">Category</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </TextField>

        <Button
          variant="contained"
          component={Link}
          to="/vendors/new"
        >
          Add Vendor
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Contact</TableCell>
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
                page * rowsPerPage + rowsPerPage
              )
              .map((vendor) => (
                <TableRow key={vendor.id} hover>
                  <TableCell>{vendor.id}</TableCell>
                  <TableCell>{vendor.name}</TableCell>
                  <TableCell>{vendor.category}</TableCell>
                  <TableCell>{vendor.contact}</TableCell>
                  <TableCell>{vendor.status}</TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      size="small"
                      component={Link}
                      to={`/vendors/${vendor.id}`}
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
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
        />
      </TableContainer>
    </>
  );
};

export default VendorList;