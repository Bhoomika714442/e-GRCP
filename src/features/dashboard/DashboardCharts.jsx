import { Grid, Paper, Typography } from "@mui/material";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

const pieData = [
  { name: "Approved", value: 48 },
  { name: "Pending", value: 18 },
  { name: "Rejected", value: 10 },
];

const lineData = [
  { month: "Jan", value: 20 },
  { month: "Feb", value: 25 },
  { month: "Mar", value: 32 },
  { month: "Apr", value: 38 },
  { month: "May", value: 42 },
  { month: "Jun", value: 50 },
];

const COLORS = [
  "#4caf50",
  "#ff9800",
  "#f44336",
];

const paperStyle = {
  p: 3,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  boxShadow: 1,
};

const DashboardCharts = () => {
  return (
    <Grid container spacing={3}>

      <Grid
        item
        xs={12}
        md={8}
      >
        <Paper sx={paperStyle}>
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Monthly Procurement Trend
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="value"
                stroke="#1976d2"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid
        item
        xs={12}
        md={4}
      >
        <Paper sx={paperStyle}>
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Procurement Status
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={320}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={95}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
      >
        <Paper sx={paperStyle}>
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Vendor Growth
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <BarChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#4caf50"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

      <Grid
        item
        xs={12}
        md={6}
      >
        <Paper sx={paperStyle}>
          <Typography
            variant="h6"
            fontWeight={600}
            mb={2}
          >
            Compliance Trend
          </Typography>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <AreaChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Area
                type="monotone"
                dataKey="value"
                stroke="#7b1fa2"
                fill="#e1bee7"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>

    </Grid>
  );
};

export default DashboardCharts;