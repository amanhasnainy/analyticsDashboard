import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';

const data = [
  { name:'Mon', value: 30 },
  { name:'Tue', value: 45 },
  { name:'Wed', value: 40 },
  { name:'Thu', value: 55 },
  { name:'Fri', value: 50 },
  { name:'Sat', value: 60 },
];

export default function MiniLine() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#2563EB" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
