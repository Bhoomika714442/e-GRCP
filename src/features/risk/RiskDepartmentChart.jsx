import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const data = [
    {
        department: "IT",
        risks: 8,
    },
    {
        department: "Finance",
        risks: 4,
    },
    {
        department: "HR",
        risks: 3,
    },
    {
        department: "Legal",
        risks: 5,
    },
    {
        department: "Operations",
        risks: 6,
    },
];

const RiskDepartmentChart = () => {

    return (

        <ResponsiveContainer
            width="100%"
            height={300}
        >

            <BarChart data={data}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="department" />

                <YAxis />

                <Tooltip />

                <Bar
                    dataKey="risks"
                    fill="#ff9800"
                />

            </BarChart>

        </ResponsiveContainer>

    );

};

export default RiskDepartmentChart;