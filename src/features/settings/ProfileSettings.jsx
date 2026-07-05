import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

const ProfileSettings = () => {
  return (
    <Card elevation={3}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Profile
        </Typography>

        <Grid container spacing={2}>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Full Name"
              defaultValue="Bhoomika T M"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              defaultValue="bhoomikatm@enterprise.com"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Role"
              defaultValue="Administrator"
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Department"
              defaultValue="Procurement"
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              variant="contained"
            >
              Update Profile
            </Button>
          </Grid>

        </Grid>

      </CardContent>
    </Card>
  );
};

export default ProfileSettings;