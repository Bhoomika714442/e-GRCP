import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts";

import ChartCard from "../../components/ChartCard";

const data = [
  { month: "Jan", risks: 5 },
  { month: "Feb", risks: 8 },
  { month: "Mar", risks: 6 },
  { month: "Apr", risks: 10 },
  { month: "May", risks: 7 },
  { month: "Jun", risks: 9 },
];

const RiskTrendBarChart = () => {
  return (
    <ChartCard title="Risk Trend">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="risks"
            fill="#1976d2"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RiskTrendBarChart;