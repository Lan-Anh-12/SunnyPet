"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from "@/components/ui/card";
import { 
  BarChart3, 
  TrendingUp, 
  ArrowUpRight, 
  DollarSign, 
  Users, 
  CalendarCheck 
} from "lucide-react";
const serviceData = [
  { name: 'Khám bệnh', value: 45 },
  { name: 'Tiêm chủng', value: 32 },
  { name: 'Spa/Tắm', value: 28 },
  { name: 'Phẫu thuật', value: 15 },
  { name: 'Xét nghiệm', value: 22 },
  { name: 'Lưu trú', value: 10 },
];

export default function AdminStatisticsPage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Thống kê <span className="text-[#E5484D]">Tăng trưởng</span></h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Biểu đồ 6 cột dịch vụ */}
        <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white">
          <h2 className="text-xl font-black mb-8">Dịch vụ "Hái ra tiền" nhất</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-[10px] font-bold" />
                <YAxis axisLine={false} tickLine={false} className="text-[10px] font-bold" />
                <Tooltip cursor={{fill: '#fff5f5'}} contentStyle={{borderRadius: '16px', border: 'none', fontWeight: 'bold'}} />
                <Bar dataKey="value" fill="#E5484D" radius={[10, 10, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Thống kê doanh thu theo tuần/tháng (Dùng số liệu Number như m yêu cầu) */}
        <div className="grid grid-cols-1 gap-6">
            <Card className="p-8 rounded-[2.5rem] bg-[#E5484D] text-white">
                <span className="text-xs font-black uppercase tracking-widest opacity-70">Tổng doanh thu tháng này</span>
                <div className="text-5xl font-black mt-2 tracking-tighter">45.200.000đ</div>
                <div className="mt-4 inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase">
                    <TrendingUp className="size-3" /> +12% so với tháng trước
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}