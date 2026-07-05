import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import EmptyState from "./EmptyState";
import PageLoader from "./PageLoader";
const DataTable = ({
  columns = [],
  rows = [],
  loading = false,
  page = 0,
  rowsPerPage = 5,
  totalCount = 0,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},
}) => {
  if (loading) {
    return (
      <PageLoader message="Loading data..." />
    );
  }

  if (!Array.isArray(columns) || columns.length === 0) {
    return (
      <EmptyState
        title="No Columns Available"
        description="No table columns were provided."
      />
    );
  }

  if (!Array.isArray(rows) || rows.length === 0) {
    return (
      <EmptyState
        title="No Records Found"
        description="Try changing your filters."
      />
    );
  }

  return (
    <Paper elevation={3}>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.field}
                  align={column.align || "left"}
                  sx={{
                    fontWeight: 700,
                    bgcolor: "#f5f5f5",
                  }}
                >
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                key={row.id}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    align={column.align || "left"}
                  >
                    {column.render
                      ? column.render(row)
                      : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount || rows.length}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50]}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </Paper>
  );
};

export default DataTable;