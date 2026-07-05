import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ChartCard = React.memo(
  ({ title, children }) => {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: 1,
          border: "1px solid",
          borderColor: "divider",
          borderTop: "5px solid #1976d2",
          bgcolor: "background.paper",
          minHeight: 300,
        }}
      >
        <CardContent>
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: 300,
              textTransform: "uppercase",
              color: "text.secondary",
            }}
          >
            {title}
          </Typography>

          {children}
        </CardContent>
      </Card>
    );
  }
);

ChartCard.displayName = "ChartCard";

export default ChartCard;