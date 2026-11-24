"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default function CompareChart({ 
  data, 
  currentYear, 
  previousYear 
}: { 
  data: any[]; 
  currentYear: number; 
  previousYear: number;
}) {
  // آماده‌سازی داده‌ها برای نمودار (اضافه کردن نام ماه)
  const chartData = data.map((item) => ({
    ...item,
    monthName: monthNames[item.month - 1],
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
        <XAxis dataKey="monthName" tick={{ fontSize: 12, fill: '#475569' }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#475569' }} />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', direction: 'rtl' }}
        />
        <Legend wrapperStyle={{ paddingTop: '20px' }} />
        <Bar 
          dataKey="currentYearAccidents" 
          name={`سال ${currentYear}`} 
          fill="#0a1f38" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={40}
        />
        <Bar 
          dataKey="previousYearAccidents" 
          name={`سال ${previousYear}`} 
          fill="#94a3b8" 
          radius={[4, 4, 0, 0]} 
          maxBarSize={40}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}