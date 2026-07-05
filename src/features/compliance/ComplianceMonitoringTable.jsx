import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Chip,
  FormControl,
  IconButton,
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
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

const ComplianceMonitoringTable = ({ complianceList }) => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    return complianceList.filter((item) => {
      const matchesSearch =
        item.vendorName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.regulation
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        item.category
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [complianceList, searchTerm, statusFilter]);

  const getChipColor = (status) => {
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
    <>

      <Box
        display="flex"
        gap={2}
        flexWrap="wrap"
        mb={3}
      >
        <TextField
          label="Search"
          placeholder="Vendor, Regulation..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          size="small"
        />

        <FormControl
          size="small"
          sx={{ minWidth: 180 }}
        >
          <InputLabel>Status</InputLabel>

          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) =>
              setStatusFilter(e.target.value)
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
      </Box>

      <Paper elevation={0}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>ID</strong>
                </TableCell>

                <TableCell>
                  <strong>Vendor</strong>
                </TableCell>

                <TableCell>
                  <strong>Regulation</strong>
                </TableCell>

                <TableCell>
                  <strong>Category</strong>
                </TableCell>

                <TableCell>
                  <strong>Status</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Score</strong>
                </TableCell>

                <TableCell>
                  <strong>Officer</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage +
                    rowsPerPage
                )
                .map((item) => (
                  <TableRow
                    key={item.id}
                    hover
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
                        color={getChipColor(
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
                      <Tooltip title="View Details">
                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(
                              `/compliance/${item.id}`
                            )
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filteredData.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(event, newPage) =>
            setPage(newPage)
          }
          onRowsPerPageChange={(event) => {
            setRowsPerPage(
              parseInt(event.target.value, 10)
            );
            setPage(0);
          }}
          rowsPerPageOptions={[5, 10, 15]}
        />
      </Paper>
    </>
  );
};

export default ComplianceMonitoringTable;