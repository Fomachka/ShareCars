import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useContext } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ThemeContext } from "../../../hooks/useContext";
import { BookingStats } from "../DashboardLayout";

function SalesChart({
  bookings,
  numOfDays,
}: {
  bookings: BookingStats[];
  numOfDays: number;
}) {
  const [themeContext] = useContext(ThemeContext);

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numOfDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMMM dd"),
      totalPrice: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.totalPrice, 0),
      extraPrice: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, curr) => acc + curr.extraPrice, 0),
    };
  });

  return (
    <div className="bg-white py-8 pb-6 px-6 rounded-md dark:bg-slate-900 ">
      <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-gray-300  mb-8 px-2 ">
        Earnings from {format(allDates.at(0) as Date, "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1) as Date, "MMM dd yyyy")}
      </h4>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{
              fill: `${themeContext === "light" ? "#334155" : "#d1d5db"}`,
            }}
            tickLine={{ stroke: `${themeContext === "light" ? "black" : "white"}` }}
          />
          <YAxis
            unit="$"
            tick={{
              fill: `${themeContext === "light" ? "#334155" : "#d1d5db"}`,
            }}
            tickLine={{ stroke: `${themeContext === "light" ? "black" : "white"}` }}
          />
          <CartesianGrid strokeDasharray="3" />
          <Tooltip
            contentStyle={{
              backgroundColor: `${themeContext === "light" ? "white" : "#0f172a"}`,
              color: `${themeContext === "light" ? "#6b7280" : "#e5e7eb"}`,
              borderRadius: "5px",
            }}
          />
          <Area
            dataKey="totalPrice"
            type="monotone"
            stroke={themeContext === "light" ? "#2563eb" : "#60a5fa"}
            fill="#2563eb"
            strokeWidth={1}
            name="Total profit"
            unit="$"
          />
          <Area
            dataKey="extraPrice"
            type="monotone"
            stroke={themeContext === "light" ? "#10b981" : "#14b8a6"}
            fill={themeContext === "light" ? "#a7f3d0" : "#059669"}
            strokeWidth={1}
            name="Gas card added"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesChart;
