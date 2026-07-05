import React from "react";
import {
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

const getSeverity = (score) => {
  if (score < 70) {
    return {
      label: "High",
      color: "error",
    };
  }

  if (score < 85) {
    return {
      label: "Medium",
      color: "warning",
    };
  }

  return {
    label: "Low",
    color: "success",
  };
};

const ViolationsTable = ({ complianceList }) => {
  const violations = complianceList.filter(
    (item) => item.violations.length > 0
  );

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Vendor</strong>
            </TableCell>

            <TableCell>
              <strong>Regulation</strong>
            </TableCell>

            <TableCell>
              <strong>Violation</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Severity</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Action Required</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {violations.length > 0 ? (
            violations.flatMap((item) =>
              item.violations.map((violation, index) => {
                const severity = getSeverity(
                  item.complianceScore
                );

                return (
                  <TableRow
                    hover
                    key={`${item.id}-${index}`}
                  >
                    <TableCell>
                      {item.vendorName}
                    </TableCell>

                    <TableCell>
                      {item.regulation}
                    </TableCell>

                    <TableCell>
                      <Typography color="error">
                        {violation}
                      </Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={severity.label}
                        color={severity.color}
                        size="small"
                      />
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={item.status}
                        color="error"
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      Immediate corrective action required
                    </TableCell>
                  </TableRow>
                );
              })
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
              >
                No Violations Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ViolationsTable;