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
} from "@mui/material";

const getPriority = (count) => {
  if (count >= 2) {
    return {
      label: "High",
      color: "error",
    };
  }

  return {
    label: "Medium",
    color: "warning",
  };
};

const MissingDocumentsTable = ({ complianceList }) => {
  const records = complianceList.filter(
    (item) => item.missingDocuments.length > 0
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
              <strong>Missing Document</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Priority</strong>
            </TableCell>

            <TableCell>
              <strong>Responsible Officer</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {records.length > 0 ? (
            records.flatMap((item) =>
              item.missingDocuments.map((document, index) => {
                const priority = getPriority(
                  item.missingDocuments.length
                );

                return (
                  <TableRow
                    key={`${item.id}-${index}`}
                    hover
                  >
                    <TableCell>
                      {item.vendorName}
                    </TableCell>

                    <TableCell>
                      {item.regulation}
                    </TableCell>

                    <TableCell>
                      {document}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label={priority.label}
                        color={priority.color}
                        size="small"
                      />
                    </TableCell>

                    <TableCell>
                      {item.officer}
                    </TableCell>
                  </TableRow>
                );
              })
            )
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
              >
                No Missing Documents Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MissingDocumentsTable;