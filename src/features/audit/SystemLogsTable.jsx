import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const SystemLogsTable = () => {
  const { systemLogs } = useSelector(
    (state) => state.audit
  );

  const getLogColor = (log) => {
    const text = log.toLowerCase();

    if (text.includes("completed")) return "success";
    if (text.includes("published")) return "primary";
    if (text.includes("scheduled")) return "info";
    if (text.includes("uploaded")) return "warning";

    return "default";
  };

  return (
    <Card elevation={3} sx={{ mt: 3 }}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          System Logs
        </Typography>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>

                <TableCell>
                  <strong>Audit</strong>
                </TableCell>

                <TableCell>
                  <strong>Audit Date</strong>
                </TableCell>

                <TableCell>
                  <strong>System Event</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Severity</strong>
                </TableCell>

              </TableRow>
            </TableHead>

            <TableBody>

              {systemLogs.length > 0 ? (
                systemLogs.map((log, index) => (
                  <TableRow
                    key={`${log.auditId}-${index}`}
                    hover
                  >
                    <TableCell>
                      {log.auditName}
                    </TableCell>

                    <TableCell>
                      {log.auditDate}
                    </TableCell>

                    <TableCell>
                      {log.log}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label="Information"
                        color={getLogColor(log.log)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    align="center"
                  >
                    No system logs available.
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

export default SystemLogsTable;