import { 
  Users, 
  Syringe, 
  PawPrint, 
  TrendingUp,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboard() {
  const stats = [
    { title: "Tổng doanh thu", value: "45.200.000đ", icon: TrendingUp, trend: "+12%" },
    { title: "Dịch vụ đang chạy", value: "24", icon: Syringe, trend: "Ổn định" },
    { title: "Bác sĩ trực", value: "08", icon: Users, trend: "+2 mới" },
    { title: "Thú cưng đã khám", value: "1,240", icon: PawPrint, trend: "+18%" },
  ];

  return (
    <div className="space-y-8">
      {/* Tiêu đề trang */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quản trị hệ thống</h1>
        <p className="text-gray-500 font-medium">Chào mừng trở lại, Lan Anh. Dưới đây là thống kê hôm nay.</p>
      </div>

      {/* Grid các thẻ thống kê nhanh */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm rounded-[2rem] bg-white overflow-hidden group hover:shadow-md transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-gray-400">
                {stat.title}
              </CardTitle>
              <div className="p-2 bg-red-50 rounded-xl group-hover:bg-[#E5484D] transition-colors">
                <stat.icon className="size-4 text-[#E5484D] group-hover:text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-black text-gray-900">{stat.value}</div>
              <div className="flex items-center mt-1 text-[10px] font-bold text-emerald-500">
                <ArrowUpRight className="mr-1 size-3" />
                {stat.trend} <span className="text-gray-400 ml-1">so với tháng trước</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Khu vực danh sách ca khám gần đây (Placeholder) */}
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm min-h-[300px] flex flex-col items-center justify-center text-center">
        <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <LayoutDashboard className="text-gray-200 size-8" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Chưa có dữ liệu giao dịch mới</h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">Các hoạt động thanh toán và dịch vụ sẽ được cập nhật liên tục tại đây.</p>
      </div>
    </div>
  );
}

// Icon cho placeholder
function LayoutDashboard(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
  )
}