import { useParams, Link } from "react-router-dom";
import {
    Paper,
    Typography,
    Chip,
    Grid,
    Button,
    Divider,
    Stack,
} from "@mui/material";

import riskData from "../../mocks/riskData.json";

const RiskDetails = () => {
    const { id } = useParams();

    const risks = Array.isArray(riskData.risks)
        ? riskData.risks
        : [];

    const risk = risks.find(
        (item) => item.id === Number(id)
    );

    if (!risk) {
        return (
            <Paper sx={{ p: 4 }}>
                <Typography variant="h5" color="error">
                    Risk Not Found
                </Typography>

                <Button
                    component={Link}
                    to="/risk"
                    sx={{ mt: 2 }}
                    variant="contained"
                >
                    Back
                </Button>
            </Paper>
        );
    }

    const severityColor =
        risk.severity === "High"
            ? "error"
            : risk.severity === "Medium"
            ? "warning"
            : "success";

    const statusColor =
        risk.status === "Open"
            ? "error"
            : risk.status === "Mitigated"
            ? "warning"
            : "success";

    return (
        <Paper sx={{ p: 4 }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
            >
                <Typography variant="h4" fontWeight={700}>
                    Risk Details
                </Typography>

                <Button
                    component={Link}
                    to="/risk"
                    variant="outlined"
                >
                    Back
                </Button>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Risk ID
                    </Typography>
                    <Typography>{risk.id}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Title
                    </Typography>
                    <Typography>{risk.title}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Category
                    </Typography>
                    <Typography>{risk.category}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Department
                    </Typography>
                    <Typography>{risk.department}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Owner
                    </Typography>
                    <Typography>{risk.owner}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Severity
                    </Typography>

                    <Chip
                        label={risk.severity}
                        color={severityColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Status
                    </Typography>

                    <Chip
                        label={risk.status}
                        color={statusColor}
                    />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Impact
                    </Typography>
                    <Typography>{risk.impact}</Typography>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600}>
                        Likelihood
                    </Typography>
                    <Typography>{risk.likelihood}</Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography fontWeight={600}>
                        Description
                    </Typography>

                    <Typography>
                        {risk.description}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default RiskDetails;