import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const AuditTrendChart = () => {
  const { audits } = useSelector((state) => state.audit);

  const chartData = useMemo(() => {
    const completed = audits.filter(
      (audit) => audit.status === "Completed"
    ).length;

    const inProgress = audits.filter(
      (audit) => audit.status === "In Progress"
    ).length;

    const scheduled = audits.filter(
      (audit) => audit.status === "Scheduled"
    ).length;

    return [
      {
        name: "Completed",
        count: completed,
      },
      {
        name: "In Progress",
        count: inProgress,
      },
      {
        name: "Scheduled",
        count: scheduled,
      },
    ];
  }, [audits]);

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
        >
          Audit Status Overview
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="count"
              fill="#1976d2"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AuditTrendChart;