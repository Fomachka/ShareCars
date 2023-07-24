import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ThemeContext } from "../../../hooks/useContext";
import { useContext } from "react";
import { differenceInDays, parseISO } from "date-fns";
import { Booking } from "../../bookings/BookingTable";

type ResultProps = {
  name: string;
  value: number;
};

function DurationChart({ renters }: { renters: Booking[] }) {
  const [themeContext] = useContext(ThemeContext);

  const createChartData = () => {
    const finalResult = [
      {
        name: "0 - 3 days",
        value: 0,
      },
      {
        name: "4 to 7 days",
        value: 0,
      },
      {
        name: "More than 7 days",
        value: 0,
      },
    ];

    const difference = renters.map((rent) => {
      const startingDate = parseISO(rent.checkInDate);
      const endingDate = parseISO(rent.checkOutDate);
      const difference = differenceInDays(startingDate, endingDate);

      if (Math.abs(difference) > 3 && Math.abs(difference) <= 7) {
        return { name: "4 to 7 days", value: Math.abs(difference) };
      } else if (Math.abs(difference) <= 3) {
        return { name: "0 - 3 days", value: Math.abs(difference) };
      } else if (Math.abs(difference) > 7) {
        return { name: "More than 7 days", value: Math.abs(difference) };
      }

      return { name: Math.abs(difference) + " days", value: Math.abs(difference) };
    });

    const result = Object.values(
      difference.reduce((acc, obj) => ({ ...acc, [obj.value]: obj }), {})
    ) as ResultProps[];

    result.forEach((result) => {
      if (result.value <= 3) {
        finalResult[0].value += result.value;
      } else if (result.value > 3 && result.value <= 7) {
        finalResult[1].value += result.value;
      } else if (result.value > 7) {
        finalResult[2].value += result.value;
      }
    });

    return finalResult;
  };

  const COLORS = [
    "#14B8A6",
    "#22C55E",
    "#2563EB",
    "#ef4444",
    "#8b5cf6",
    "#ec4899",
    "#f43f5e",
    "#EAB308",
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div
      className="bg-white dark:bg-slate-900
       mb-8 rounded-md xl:max-w-[400px] w-full p-6 max-w-none shadow-sm"
    >
      <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-gray-300 ">
        Average renting days
      </h4>
      <div className="w-[100%] h-[250px] overflow-auto ">
        <ResponsiveContainer minWidth={340}>
          <PieChart>
            <Pie
              data={createChartData()}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {createChartData().map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  stroke={themeContext === "light" ? "white" : "#0f172a"}
                  strokeWidth={2}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              verticalAlign="bottom"
              align="right"
              layout="vertical"
              iconSize={8}
              iconType="circle"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DurationChart;
