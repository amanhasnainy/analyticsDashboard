// src/components/charts/ProLine.jsx
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "15 Dec", value: 0 },
  { name: "25 Dec", value: 20 },
  { name: "4 Jan", value: 40 },
  { name: "14 Jan", value: 5 },
  { name: "24 Jan", value: 60 },
  { name: "3 Feb", value: 70 },
  { name: "13 Feb", value: 70 },
  { name: "23 Feb", value: 50 },
  { name: "2 Mar", value: 70 },
  { name: "12 Mar", value: 100 },
];

export default function ProLine() {
  return (
    <div className="w-full h-[320px] rounded-xl bg-white dark:bg-gray-900 p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          
          {/* Gradient fill for the area under the line */}
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7eb3" stopOpacity={0.4} />
              <stop offset="50%" stopColor="#ffb68b" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#ffe9cc" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#374151" }} />
          <YAxis tick={{ fontSize: 12, fill: "#374151" }} />

          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          />

          {/* The line + dots */}
          <Area
            type="monotone"
            dataKey="value"
            stroke="#ff375f"
            strokeWidth={3}
            fill="url(#chartFill)"
            activeDot={{
              r: 6,
              fill: "#ffffff",
              stroke: "#ff375f",
              strokeWidth: 3,
            }}
            dot={{
              r: 4,
              fill: "#ffffff",
              stroke: "#ff375f",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
