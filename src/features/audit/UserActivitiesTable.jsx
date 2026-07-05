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

const UserActivitiesTable = () => {
  const { userActivities } = useSelector(
    (state) => state.audit
  );

  const getActivityColor = (activity) => {
    const text = activity.toLowerCase();

    if (text.includes("verified")) return "success";

    if (text.includes("review")) return "primary";

    if (text.includes("checked")) return "warning";

    if (text.includes("uploaded")) return "info";

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
          User Activities
        </Typography>

        <TableContainer component={Paper}>
          <Table>

            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Audit</strong>
                </TableCell>

                <TableCell>
                  <strong>Auditor</strong>
                </TableCell>

                <TableCell>
                  <strong>Activity</strong>
                </TableCell>

                <TableCell>
                  <strong>Audit Date</strong>
                </TableCell>

                <TableCell align="center">
                  <strong>Status</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {userActivities.length > 0 ? (
                userActivities.map((activity, index) => (
                  <TableRow
                    key={`${activity.auditId}-${index}`}
                    hover
                  >
                    <TableCell>
                      {activity.auditName}
                    </TableCell>

                    <TableCell>
                      {activity.auditor}
                    </TableCell>

                    <TableCell>
                      {activity.activity}
                    </TableCell>

                    <TableCell>
                      {activity.auditDate}
                    </TableCell>

                    <TableCell align="center">
                      <Chip
                        label="Completed"
                        color={getActivityColor(activity.activity)}
                        size="small"
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    align="center"
                  >
                    No user activities found.
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

export default UserActivitiesTable;