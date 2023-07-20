import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { ThemeContext } from "../../hooks/useContext";
import { useContext, useEffect } from "react";
import { BookingFull } from "./useRecentStays";
import { differenceInDays, eachDayOfInterval, format, parseISO, subDays } from "date-fns";
import { Booking } from "../bookings/BookingTable";

type ResultProps = {
  name: string;
  value: number;
};

function DurationChart({
  renters,
  numOfDays,
}: {
  renters: Booking[];
  numOfDays: number;
}) {
  const [themeContext] = useContext(ThemeContext);

  const createChartData = () => {
    const finalResult = [
      {
        name: "0 - 5 days",
        value: 0,
      },
      {
        name: "More than 5 days",
        value: 0,
      },
    ];

    const difference = renters.map((rent: any) => {
      const startingDate = parseISO(rent.checkInDate);
      const endingDate = parseISO(rent.checkOutDate);
      const difference = differenceInDays(startingDate, endingDate);

      if (Math.abs(difference) > 5) {
        return { name: "More than 5 days", value: Math.abs(difference) };
      } else if (Math.abs(difference) <= 5) {
        return { name: "0-5 days", value: Math.abs(difference) };
      }

      return { name: Math.abs(difference) + " days", value: Math.abs(difference) };
    });

    const result = Object.values(
      difference.reduce((acc, obj) => ({ ...acc, [obj.value]: obj }), {})
    ) as ResultProps[];

    result.forEach((result) => {
      if (result.value > 5) {
        finalResult[1].value += result.value;
      } else {
        finalResult[0].value += result.value;
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
    index,
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
      className={`${
        themeContext === "light" ? "bg-white" : "bg-slate-900"
      } mb-8 basis-1/2 rounded-md`}
    >
      <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-gray-300 my-6 ml-8">
        Days rented
      </h4>
      <ResponsiveContainer width="100%" height={240}>
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
            verticalAlign="middle"
            align="right"
            width={300}
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DurationChart;
