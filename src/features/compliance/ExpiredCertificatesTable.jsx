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

const ExpiredCertificatesTable = ({ complianceList }) => {
  const certificates = [];

  complianceList.forEach((item) => {
    item.certifications.forEach((certificate) => {
      certificates.push({
        vendorName: item.vendorName,
        regulation: item.regulation,
        officer: item.officer,
        certificateName: certificate.name,
        expiryDate: certificate.expiry,
        status: certificate.status,
      });
    });
  });

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);

    const difference =
      expiry.getTime() - today.getTime();

    return Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );
  };

  const getChipColor = (status) => {
    switch (status) {
      case "Valid":
        return "success";

      case "Expiring Soon":
        return "warning";

      case "Expired":
        return "error";

      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Vendor</strong>
            </TableCell>

            <TableCell>
              <strong>Certificate</strong>
            </TableCell>

            <TableCell>
              <strong>Regulation</strong>
            </TableCell>

            <TableCell>
              <strong>Expiry Date</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Days Remaining</strong>
            </TableCell>

            <TableCell align="center">
              <strong>Status</strong>
            </TableCell>

            <TableCell>
              <strong>Officer</strong>
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {certificates.length > 0 ? (
            certificates.map((certificate, index) => (
              <TableRow hover key={index}>
                <TableCell>
                  {certificate.vendorName}
                </TableCell>

                <TableCell>
                  {certificate.certificateName}
                </TableCell>

                <TableCell>
                  {certificate.regulation}
                </TableCell>

                <TableCell>
                  {certificate.expiryDate}
                </TableCell>

                <TableCell align="center">
                  {getDaysRemaining(
                    certificate.expiryDate
                  )}
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={certificate.status}
                    color={getChipColor(
                      certificate.status
                    )}
                    size="small"
                  />
                </TableCell>

                <TableCell>
                  {certificate.officer}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                align="center"
              >
                No Certification Records Found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExpiredCertificatesTable;