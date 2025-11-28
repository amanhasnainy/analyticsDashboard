import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const COLORS = ['#10B981','#F59E0B','#3B82F6','#9CA3AF'];

export default function MiniPie({ data=[] }) {
  if (!data || data.reduce((s, d) => s + d.value, 0) === 0) {
    // sample fallback
    data = [{name:'Working', value:1},{name:'Break', value:1}];
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" innerRadius={40} outerRadius={70} label={false}>
          {data.map((entry, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
