'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const monthNames = [
  'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
  'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند',
];

type Props = {
  data: number[]; // آرایه ۱۲ عددی: تعداد حوادث هر ماه
};

export default function BoardChart({ data }: Props) {
  const chartData = monthNames.map((name, index) => ({
    month: name,
    accidents: data[index] ?? 0,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
        <XAxis
          dataKey="month"
          tick={{ fill: '#e2e8f0', fontSize: 12 }}
          axisLine={{ stroke: '#ffffff40' }}
          tickLine={{ stroke: '#ffffff40' }}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fill: '#e2e8f0', fontSize: 12 }}
          axisLine={{ stroke: '#ffffff40' }}
          tickLine={{ stroke: '#ffffff40' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#0a1f38',
            border: '1px solid #ffffff30',
            borderRadius: '8px',
            color: '#fff',
            direction: 'rtl',
          }}
          labelStyle={{ color: '#fff', fontWeight: 'bold' }}
          formatter={(value: number) => [`${value} حادثه`, 'تعداد']}
          labelFormatter={(label) => `ماه: ${label}`}
        />
        <Bar dataKey="accidents" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.accidents > 0 ? '#ef4444' : '#22c55e'}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}