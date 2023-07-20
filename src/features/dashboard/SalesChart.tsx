import { eachDayOfInterval, format, isDate, isSameDay, subDays } from "date-fns";
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
import { ThemeContext } from "../../hooks/useContext";
import { BookingStats } from "./DashboardLayout";

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
    <div className="bg-white py-8 pb-6 px-4 rounded-md dark:bg-slate-900 ">
      <h4 className="text-lg md:text-xl font-semibold text-slate-700 dark:text-gray-300  mb-6 ml-8">
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

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 320 - 300 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 400 - 300 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 450 - 300 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 350 - 300 },
//   { label: "Jan 13", totalSales: 700, extrasSales: 550 - 300 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 650 - 500 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 700 - 500 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 500 - 300 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 600 - 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 400 - 300 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 600 - 500 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 700 - 500 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 600 - 500 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 550 - 500 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 750 - 500 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 600 - 500 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 700 - 500 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 800 - 500 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 700 - 500 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 600 - 500 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 800 - 500 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 700 - 500 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 800 - 500 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 900 - 500 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 800 - 500 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 950 - 500 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 1000 - 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 1100 - 500 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 900 - 500 },
// ];
