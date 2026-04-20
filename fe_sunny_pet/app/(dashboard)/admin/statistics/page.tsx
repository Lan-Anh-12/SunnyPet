"use client";

import React, { useState } from "react";
import { 
  LineChart, 
  BarChart, 
  PieChart, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Calendar as CalendarIcon,
  Download
} from "lucide-react";
// Giả định bạn dùng các component từ Shadcn/UI
// Nếu chưa có, bạn có thể thay thế bằng thẻ div bình thường với Tailwind
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function StatisticsPage() {
  const [dateRange, setDateRange] = useState("Tháng này");

  return (
    <div className="p-6 space-y-6">
      {/* Header & Bộ lọc */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Thống kê doanh thu</h1>
          <p className="text-sm text-slate-500">Theo dõi hiệu quả kinh doanh của Sunny Pet</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border shadow-sm">
          {["Hôm nay", "Tuần này", "Tháng này", "Năm nay"].map((period) => (
            <Button
              key={period}
              variant={dateRange === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setDateRange(period)}
              className={dateRange === period ? "bg-red-500 hover:bg-red-600" : ""}
            >
              {period}
            </Button>
          ))}
          <div className="h-6 w-[1px] bg-slate-200 mx-1" />
          <Button variant="outline" size="sm" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Chọn ngày
          </Button>
        </div>
      </div>

      {/* Hàng 1: Các con số tổng quát (Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Tổng doanh thu" 
          value="125.400.000đ" 
          detail="+12% so với tháng trước" 
          icon={<DollarSign className="text-emerald-500" />} 
        />
        <StatCard 
          title="Hóa đơn mới" 
          value="342" 
          detail="+5.4% so với tháng trước" 
          icon={<ShoppingBag className="text-blue-500" />} 
        />
        <StatCard 
          title="Khách hàng mới" 
          value="86" 
          detail="+22% so với tháng trước" 
          icon={<Users className="text-orange-500" />} 
        />
        <StatCard 
          title="Tỷ lệ quay lại" 
          value="64%" 
          detail="-2% so với tháng trước" 
          icon={<LineChart className="text-purple-500" />} 
        />
      </div>

      {/* Hàng 2: Biểu đồ và Top sản phẩm */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ doanh thu (Chiếm 2/3) */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Biểu đồ tăng trưởng</CardTitle>
            <Download className="w-4 h-4 text-slate-400 cursor-pointer" />
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-xl bg-slate-50 text-slate-400">
              {/* Ở đây bạn sẽ dùng <ResponsiveContainer> từ recharts */}
              Biểu đồ Line Chart (Recharts) sẽ hiển thị ở đây
            </div>
          </CardContent>
        </Card>

        {/* Cơ cấu doanh thu (Chiếm 1/3) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-medium">Nguồn doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RevenueSourceItem label="Dịch vụ khám" percent={45} color="bg-emerald-500" />
            <RevenueSourceItem label="Bán lẻ thuốc" percent={30} color="bg-blue-500" />
            <RevenueSourceItem label="Spa & Làm đẹp" percent={20} color="bg-orange-500" />
            <RevenueSourceItem label="Khác" percent={5} color="bg-slate-400" />
            <div className="pt-4 border-t flex justify-center">
               <div className="h-32 w-32 rounded-full border-[10px] border-emerald-500 border-t-blue-500 border-r-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hàng 3: Bảng danh sách giao dịch gần đây */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Giao dịch gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b text-slate-500">
                  <th className="pb-3 font-medium">Mã đơn</th>
                  <th className="pb-3 font-medium">Khách hàng</th>
                  <th className="pb-3 font-medium">Dịch vụ/Thuốc</th>
                  <th className="pb-3 font-medium text-right">Số tiền</th>
                  <th className="pb-3 font-medium text-center">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[1, 2, 3].map((i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 font-medium text-red-600">#HD-00{i}</td>
                    <td className="py-4">Nguyễn Văn A</td>
                    <td className="py-4 text-slate-500">Tiêm chủng, Kháng sinh Type-A</td>
                    <td className="py-4 text-right font-semibold">450.000đ</td>
                    <td className="py-4 text-center">
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs">Thành công</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Component phụ cho Card chỉ số
function StatCard({ title, value, detail, icon }: any) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-xs text-slate-400">{detail}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl">{icon}</div>
        </div>
      </CardContent>
    </Card>
  );
}

// Component phụ cho dòng cơ cấu doanh thu
function RevenueSourceItem({ label, percent, color }: any) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs font-medium">
        <span>{label}</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}