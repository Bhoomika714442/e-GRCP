import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import ChartCard from "../../components/ChartCard";
import riskData from "../../mocks/riskData.json";

const COLORS = [
  "#d32f2f",
  "#ed6c02",
  "#2e7d32",
];

const risks = riskData.risks;

const data = [
  {
    name: "High",
    value: risks.filter(
      (r) => r.severity === "High"
    ).length,
  },
  {
    name: "Medium",
    value: risks.filter(
      (r) => r.severity === "Medium"
    ).length,
  },
  {
    name: "Low",
    value: risks.filter(
      (r) => r.severity === "Low"
    ).length,
  },
];

const RiskDistributionChart = () => {
  return (
    <ChartCard title="Risk Distribution">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={95}
            label
          >
            {data.map((item, index) => (
              <Cell
                key={item.name}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default RiskDistributionChart;