import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";

const ReportsFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  format,
  setFormat,
}) => {
  return (
    <Card elevation={2}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Search Report"
              placeholder="Enter report name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Procurement">
                Procurement
              </MenuItem>
              <MenuItem value="Vendor">
                Vendor
              </MenuItem>
              <MenuItem value="Risk">
                Risk
              </MenuItem>
              <MenuItem value="Compliance">
                Compliance
              </MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              select
              label="Format"
              value={format}
              onChange={(e) =>
                setFormat(e.target.value)
              }
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="PDF">PDF</MenuItem>
              <MenuItem value="Excel">
                Excel
              </MenuItem>
              <MenuItem value="CSV">CSV</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReportsFilters;