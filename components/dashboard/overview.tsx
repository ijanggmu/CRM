'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', total: 167 },
  { name: 'Feb', total: 145 },
  { name: 'Mar', total: 189 },
  { name: 'Apr', total: 201 },
  { name: 'May', total: 178 },
  { name: 'Jun', total: 239 },
  { name: 'Jul', total: 242 },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}