"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

export default function YearlyChart({ data }: { data: { year: string; accidents: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="year" tick={{ fontSize: 14, fill: '#475569' }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 14, fill: '#475569' }} />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', direction: 'rtl' }}
          formatter={(value: number) => [`${value} حادثه`, 'تعداد']}
          labelFormatter={(label) => `سال: ${label}`}
        />
        <Bar dataKey="accidents" radius={[8, 8, 0, 0]} maxBarSize={60}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#2e7cc4' : '#0a1f38'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}