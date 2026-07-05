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
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

const AuditReportsTable = () => {
  const navigate = useNavigate();

  const { auditReports } = useSelector(
    (state) => state.audit
  );

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
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Audit Reports
        </Typography>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Audit</strong>
                </TableCell>

                <TableCell>
                  <strong>Auditor</strong>
                </TableCell>

                <TableCell>
                  <strong>Report Date</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Findings</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {auditReports.map((report) => (
                <TableRow
                  hover
                  key={report.id}
                >
                  <TableCell>
                    {report.auditName}
                  </TableCell>

                  <TableCell>
                    {report.auditor}
                  </TableCell>

                  <TableCell>
                    {report.reportDate || "-"}
                  </TableCell>

                  <TableCell align="center">
                    {report.findings}
                  </TableCell>

                  <TableCell align="center">
                    <Chip
                      size="small"
                      label={report.status}
                      color={getStatusColor(report.status)}
                    />
                  </TableCell>

                  <TableCell align="center">

                    <Tooltip title="View Report">
                      <IconButton
                        color="primary"
                        onClick={() =>
                          navigate(`/audit/${report.id}`)
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download Report">
                      <IconButton color="success">
                        <DownloadIcon />
                      </IconButton>
                    </Tooltip>

                  </TableCell>
                </TableRow>
              ))}

              {auditReports.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                  >
                    No audit reports available.
                  </TableCell>
                </TableRow>
              )}

            </TableBody>

          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default AuditReportsTable;