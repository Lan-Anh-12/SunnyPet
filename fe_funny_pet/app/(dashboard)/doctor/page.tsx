import { 
  ClipboardPlus, 
  Clock, 
  User, 
  Dog, 
  ChevronRight,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const upcomingAppointments = [
  {
    id: "BK-001",
    petName: "LuLu",
    breed: "Poodle",
    owner: "Nguyễn Văn A",
    time: "09:00 AM",
    status: "Đang đợi",
    service: "Tiêm phòng dại"
  },
  {
    id: "BK-002",
    petName: "Mimi",
    breed: "Mèo Anh lông ngắn",
    owner: "Trần Thị B",
    time: "10:30 AM",
    status: "Đang khám",
    service: "Khám tổng quát"
  },
  {
    id: "BK-003",
    petName: "Bốp",
    breed: "Golden Retriever",
    owner: "Lê Văn C",
    time: "02:00 PM",
    status: "Sắp tới",
    service: "Tư vấn dinh dưỡng"
  }
];

export default function DoctorAppointmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Ca khám hôm nay</h1>
          <p className="text-gray-500 font-medium">Bạn có 8 ca khám trong ngày 28/03/2026.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Tìm tên thú cưng hoặc chủ..." 
            className="pl-10 rounded-2xl border-gray-100 bg-white focus-visible:ring-[#E5484D]"
          />
        </div>
      </div>

      {/* Danh sách ca khám dạng Card */}
      <div className="grid gap-4">
        {upcomingAppointments.map((apt) => (
          <div 
            key={apt.id} 
            className="group bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-5">
              {/* Avatar thú cưng giả lập */}
              <div className="size-14 bg-red-50 rounded-[1.5rem] flex items-center justify-center text-[#E5484D]">
                <Dog className="size-7" />
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-gray-900">{apt.petName}</h3>
                  <Badge className={cn(
                    "rounded-full text-[10px] px-2 py-0 border-none",
                    apt.status === "Đang khám" ? "bg-blue-100 text-blue-600" : 
                    apt.status === "Đang đợi" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-400"
                  )}>
                    {apt.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                  <span className="flex items-center gap-1"><User className="size-3" /> {apt.owner}</span>
                  <span className="size-1 bg-gray-300 rounded-full" />
                  <span>{apt.breed}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-8 border-t md:border-none pt-4 md:pt-0">
              <div className="text-right">
                <div className="flex items-center gap-1.5 text-[#E5484D] font-black justify-end">
                  <Clock className="size-4" />
                  <span>{apt.time}</span>
                </div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">{apt.service}</p>
              </div>
              
              <Button className="bg-gray-900 hover:bg-[#E5484D] text-white rounded-2xl px-6 font-bold flex gap-2 transition-all">
                <ClipboardPlus className="size-4" />
                Khám bệnh
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hàm cn hỗ trợ class names (nếu bạn chưa có)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}