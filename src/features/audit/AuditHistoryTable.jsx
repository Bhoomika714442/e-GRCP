import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";

import useSearch from "../../hooks/useSearch";
import usePagination from "../../hooks/usePagination";

const AuditHistoryTable = () => {
  const navigate = useNavigate();

  const { auditHistory } = useSelector(
    (state) => state.audit
  );

  const {
    searchTerm,
    setSearchTerm,
    filteredData,
  } = useSearch(auditHistory, [
    "auditName",
    "module",
    "auditor",
    "status",
  ]);

  const {
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  } = usePagination(0, 5);

  const audits = useMemo(() => {
    return [...filteredData];
  }, [filteredData]);

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

  return (
    <Card
      elevation={3}
      sx={{ mt: 3 }}
    >
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Audit History
        </Typography>

        <Box mb={3}>
          <TextField
            fullWidth
            label="Search Audit"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
          />
        </Box>

        <TableContainer component={Paper}>

          <Table>

            <TableHead>

              <TableRow>

                <TableCell>
                  <strong>Audit Name</strong>
                </TableCell>

                <TableCell>
                  <strong>Module</strong>
                </TableCell>

                <TableCell>
                  <strong>Auditor</strong>
                </TableCell>

                <TableCell>
                  <strong>Audit Date</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Findings</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Action</strong>
                </TableCell>

              </TableRow>

            </TableHead>

            <TableBody>

              {audits.length > 0 ? (

                audits

                  .slice(
                    page * rowsPerPage,
                    page * rowsPerPage +
                      rowsPerPage
                  )

                  .map((audit) => (

                    <TableRow
                      hover
                      key={audit.id}
                    >

                      <TableCell>
                        {audit.auditName}
                      </TableCell>

                      <TableCell>
                        {audit.module}
                      </TableCell>

                      <TableCell>
                        {audit.auditor}
                      </TableCell>

                      <TableCell>
                        {audit.auditDate}
                      </TableCell>

                      <TableCell align="center">
                        {audit.findings}
                      </TableCell>

                      <TableCell align="center">

                        <Chip
                          label={audit.status}
                          color={getStatusColor(
                            audit.status
                          )}
                          size="small"
                        />

                      </TableCell>

                      <TableCell align="center">

                        <IconButton
                          color="primary"
                          onClick={() =>
                            navigate(
                              `/audit/${audit.id}`
                            )
                          }
                        >
                          <VisibilityIcon />
                        </IconButton>

                      </TableCell>

                    </TableRow>

                  ))

              ) : (

                <TableRow>

                  <TableCell
                    colSpan={7}
                    align="center"
                  >
                    No audit history available.
                  </TableCell>

                </TableRow>

              )}

            </TableBody>

          </Table>

        </TableContainer>

        <TablePagination
          component="div"
          count={audits.length}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={
            handleChangeRowsPerPage
          }
        />

      </CardContent>
    </Card>
  );
};

export default AuditHistoryTable;