import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Mon", value: 40 },
  { name: "Tue", value: 55 },
  { name: "Wed", value: 50 },
  { name: "Thu", value: 70 },
  { name: "Fri", value: 60 },
  { name: "Sat", value: 80 },
  { name: "Sun", value: 75 },
];

export default function ProLine() {
  return (
    <div className="w-full h-[300px] rounded-xl bg-white dark:bg-gray-900 p-4 shadow">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          
          {/* Gradient FIX — THIS IS THE RIGHT WAY */}
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          {/* PROFESSIONAL STOCK-LIKE LINE */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
            fill="url(#lineGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
