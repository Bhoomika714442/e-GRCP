import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

import ChartCard from "../../components/ChartCard";

const data = [
  { month: "Jan", value: 5 },
  { month: "Feb", value: 8 },
  { month: "Mar", value: 6 },
  { month: "Apr", value: 10 },
  { month: "May", value: 7 },
  { month: "Jun", value: 9 },
];

const RiskTrendLineChart = () => {
  return (
    <ChartCard title="Risk Trend Over Time">
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2e7d32"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RiskTrendLineChart;