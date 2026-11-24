"use client";

import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

type Props = {
  data: any[];
};

export default function FmeaChart({ data }: Props) {
  // شمارش تعداد هر سطح ریسک (RPL)
  const rplCounts = {
    "فاجعه بار": 0,
    "بحرانی": 0,
    "مرزی": 0,
    "کم اهمیت": 0,
  };

  data.forEach((item) => {
    if (item.rpl && rplCounts[item.rpl as keyof typeof rplCounts] !== undefined) {
      rplCounts[item.rpl as keyof typeof rplCounts] += 1;
    }
  });

  const chartData = [
    { name: "فاجعه بار", count: rplCounts["فاجعه بار"], color: "#dc2626" }, // قرمز تیره
    { name: "بحرانی", count: rplCounts["بحرانی"], color: "#ef4444" }, // قرمز
    { name: "مرزی", count: rplCounts["مرزی"], color: "#f59e0b" }, // نارنجی/زرد
    { name: "کم اهمیت", count: rplCounts["کم اهمیت"], color: "#10b981" }, // سبز
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-[16px] font-bold text-[#0f2c4c] mb-6 text-center">
        توزیع سطوح ریسک (RPL) در FMEA
      </h3>
      <div className="h-64 w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#475569' }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#475569' }} />
            <Tooltip 
              cursor={{ fill: '#f1f5f9' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', direction: 'rtl' }}
              formatter={(value: number) => [`${value} مورد`, 'تعداد']}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={60}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}