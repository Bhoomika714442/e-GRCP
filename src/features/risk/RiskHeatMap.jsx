import {
  Paper,
  Typography,
  Box,
} from "@mui/material";

import ChartCard from "../../components/ChartCard";

const levels = [
  ["Low", "Low", "Medium"],
  ["Low", "Medium", "High"],
  ["Medium", "High", "Critical"],
];

const colors = {
  Low: "#81c784",
  Medium: "#ffb74d",
  High: "#ef5350",
  Critical: "#b71c1c",
};

const labels = ["Low", "Medium", "High"];

const RiskHeatMap = () => {
  return (
    <ChartCard title="Risk Heat Map">
      <Box
        display="grid"
        gridTemplateColumns="120px repeat(3,1fr)"
        gap={1}
      >
        <Box />

        {labels.map((item) => (
          <Paper
            key={item}
            sx={{
              p: 1,
              textAlign: "center",
              fontWeight: 700,
            }}
          >
            {item}
          </Paper>
        ))}

        {labels.map((impact, row) => (
          <>
            <Paper
              key={impact}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
              }}
            >
              {impact}
            </Paper>

            {levels[row].map((value, col) => (
              <Paper
                key={col}
                sx={{
                  bgcolor: colors[value],
                  color: "#fff",
                  height: 50,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {value}
              </Paper>
            ))}
          </>
        ))}
      </Box>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 2 }}
      >
        Impact →
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        Likelihood ↓
      </Typography>
    </ChartCard>
  );
};

export default RiskHeatMap;