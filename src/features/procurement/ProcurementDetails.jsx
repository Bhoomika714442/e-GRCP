import { useState } from "react";
import { useParams } from "react-router-dom";

import {
    Box,
    Typography,
    Paper,
    Tabs,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    List,
    ListItem,
    Divider,
} from "@mui/material";

const ProcurementDetails = () => {

    const { id } = useParams();
    const [tab, setTab] = useState(0);

    return (
        <Box>
            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Procurement Request #{id}
            </Typography>

            <Paper>

                <Tabs
                    value={tab}
                    onChange={(e, value) => setTab(value)}
                >
                    <Tab label="Overview" />
                    <Tab label="Attachments" />
                    <Tab label="Approval History" />
                    <Tab label="Comments" />
                    <Tab label="Audit Logs" />
                </Tabs>
                <Box p={3}>

                    {tab === 0 && (

                        <Box>
                            <Typography variant="h6">
                                Request Overview
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography>
                                Vendor : ABC Technologies
                            </Typography>

                            <Typography>
                                Department : IT
                            </Typography>

                            <Typography>
                                Amount : $12,000
                            </Typography>

                            <Typography>
                                Status : Approved
                            </Typography>

                            <Typography>
                                Requested By : Rahul Sharma
                            </Typography>

                        </Box>

                    )}

                    {tab === 1 && (

                        <List>
                            <ListItem>
                                Quotation.pdf
                            </ListItem>

                            <ListItem>
                                VendorAgreement.pdf
                            </ListItem>

                            <ListItem>
                                TechnicalSpecification.docx
                            </ListItem>
                        </List>

                    )}

                    {tab === 2 && (

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Approver</TableCell>
                                        <TableCell>Status</TableCell>
                                        <TableCell>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Manager</TableCell>
                                        <TableCell>Approved</TableCell>
                                        <TableCell>10-Jul-2025</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finance</TableCell>
                                        <TableCell>Approved</TableCell>
                                        <TableCell>12-Jul-2025</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Director</TableCell>
                                        <TableCell>Approved</TableCell>
                                        <TableCell>13-Jul-2025</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>

                    )}

                    {tab === 3 && (

                        <List>

                            <ListItem>
                                Vendor quotation verified.
                            </ListItem>

                            <ListItem>
                                Budget approved by Finance.
                            </ListItem>

                            <ListItem>
                                Procurement completed successfully.
                            </ListItem>

                        </List>

                    )}
                    {tab === 4 && (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>User</TableCell>
                                        <TableCell>Action</TableCell>
                                        <TableCell>Time</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Admin</TableCell>
                                        <TableCell>Created Request</TableCell>
                                        <TableCell>09-Jul-2025</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Finance</TableCell>
                                        <TableCell>Approved</TableCell>
                                        <TableCell>12-Jul-2025</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>System</TableCell>
                                        <TableCell>Notification Sent</TableCell>
                                        <TableCell>13-Jul-2025</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default ProcurementDetails;