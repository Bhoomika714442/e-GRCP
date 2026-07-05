import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const SavedReports = () => {
  const { reports } = useSelector(
    (state) => state.reports
  );

  return (
    <Card elevation={3}>
      <CardContent>

        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Saved Reports
        </Typography>

        <List>

          {reports.map((report) => (

            <ListItem
              key={report.id}
              divider
            >
              <ListItemText
                primary={report.name}
                secondary={`${report.category} • ${report.generatedDate}`}
              />
            </ListItem>

          ))}

        </List>

      </CardContent>
    </Card>
  );
};

export default SavedReports;