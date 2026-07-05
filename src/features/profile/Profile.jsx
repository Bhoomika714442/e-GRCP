import {
  Avatar,
  Box,
  Paper,
  Typography,
  Divider,
  Grid,
} from "@mui/material";

const Profile = () => {
  return (
    <Box p={3}>
      <Typography
        variant="h4"
        fontWeight={700}
        mb={3}
      >
        My Profile
      </Typography>

      <Paper sx={{ p: 4 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            md={3}
          >
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: 42,
              }}
            >
              B
            </Avatar>
          </Grid>

          <Grid
            item
            xs={12}
            md={9}
          >
            <Typography variant="h6">
              Bhoomika T M
            </Typography>

            <Typography color="text.secondary">
              bhoomikatm@enterprise.com
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography>
              Role: System Administrator
            </Typography>

            <Typography>
              Department: Procurement
            </Typography>

            <Typography>
              Last Login: Today
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;