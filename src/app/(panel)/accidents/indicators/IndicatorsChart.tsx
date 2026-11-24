"use client";

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from "recharts";

const monthNames = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

export default function IndicatorsChart({ data }: { data: any[] }) {
  // آماده‌سازی داده‌ها برای نمودار
  const chartData = data.map((row, index) => {
    const oshaAFR = row.workHours > 0 ? parseFloat(((row.accidents * 200000) / row.workHours).toFixed(2)) : 0;
    const iloAFR = row.workHours > 0 ? parseFloat(((row.accidents * 1000000) / row.workHours).toFixed(2)) : 0;
    
    return {
      name: monthNames[index],
      "OSHA AFR": oshaAFR,
      "ILO AFR": iloAFR,
    };
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-8">
      <h3 className="font-bold text-lg text-slate-800 mb-6">نمودار مقایسه‌ای AFR (OSHA vs ILO)</h3>
      
      <div className="h-[350px] w-full" dir="ltr">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="OSHA AFR" stroke="#2e7cc4" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="ILO AFR" stroke="#e31e24" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}