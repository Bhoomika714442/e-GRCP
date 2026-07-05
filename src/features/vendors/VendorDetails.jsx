import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    Paper,
    Typography,
    Tabs,
    Tab,
    Box,
    Grid,
    Divider,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import vendorData from "../../mocks/vendors.json";

const VendorDetails = () => {
    const { id } = useParams();

    const [tab, setTab] = useState(0);

    const vendorList = Array.isArray(vendorData.vendors)
        ? vendorData.vendors
        : [];

    const vendor = vendorList.find(
        (item) => item.id === Number(id)
    );

    if (!vendor) {
        return (
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" color="error">
                    Vendor Not Found
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 4 }}>
            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Vendor Profile
            </Typography>

            <Tabs
                value={tab}
                onChange={(e, newValue) => setTab(newValue)}
                sx={{ mb: 3 }}
            >
                <Tab label="Basic Details" />
                <Tab label="Contacts" />
                <Tab label="Documents" />
                <Tab label="Risk Information" />
                <Tab label="History" />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            {tab === 0 && (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Vendor Name
                        </Typography>
                        <Typography>{vendor.name}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Category
                        </Typography>
                        <Typography>{vendor.category}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Status
                        </Typography>
                        <Chip
                            label={vendor.status}
                            color={
                                vendor.status === "Active"
                                    ? "success"
                                    : "error"
                            }
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Vendor ID
                        </Typography>
                        <Typography>{vendor.id}</Typography>
                    </Grid>
                </Grid>
            )}

            {tab === 1 && (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Contact Person
                        </Typography>
                        <Typography>{vendor.contact}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Email
                        </Typography>
                        <Typography>{vendor.email}</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Phone
                        </Typography>
                        <Typography>{vendor.phone}</Typography>
                    </Grid>
                </Grid>
            )}

            {tab === 2 && (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Document</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow>
                                <TableCell>NDA Agreement</TableCell>
                                <TableCell>Uploaded</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>GST Certificate</TableCell>
                                <TableCell>Uploaded</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>ISO Certificate</TableCell>
                                <TableCell>Pending</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Contract</TableCell>
                                <TableCell>Uploaded</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {tab === 3 && (
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Risk Score
                        </Typography>
                        <Typography>78%</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Risk Level
                        </Typography>
                        <Chip
                            label="Medium"
                            color="warning"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Compliance Score
                        </Typography>
                        <Typography>92%</Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600}>
                            Last Audit
                        </Typography>
                        <Typography>20-Jan-2025</Typography>
                    </Grid>
                </Grid>
            )}

            {tab === 4 && (
                <Box>
                    <Typography mb={2}>
                        ✔ Vendor Registered
                    </Typography>

                    <Typography mb={2}>
                        ✔ Contract Signed
                    </Typography>

                    <Typography mb={2}>
                        ✔ Compliance Review Completed
                    </Typography>

                    <Typography mb={2}>
                        ✔ Risk Assessment Updated
                    </Typography>

                    <Typography>
                        ✔ Last Modified by Admin
                    </Typography>
                </Box>
            )}
        </Paper>
    );
};

export default VendorDetails;