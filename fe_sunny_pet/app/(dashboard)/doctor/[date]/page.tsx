"use client";

import React, { use } from "react"; // 1. Import hook 'use'
import { useRouter } from "next/navigation";
import { format, parseISO, isValid } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon, Clock, FilePlus2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"; 
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// 2. Định nghĩa kiểu cho params là một Promise
interface PageProps {
  params: Promise<{ date: string }>;
}

export default function DoctorDailySchedule({ params }: PageProps) {
  const router = useRouter();
  
  // 3. Sử dụng React.use() để unwrap params
  const resolvedParams = use(params);
  const dateStr = resolvedParams.date;
  if (dateStr === "records" || dateStr === "medical-record") return null;
  // 4. Chuyển chuỗi từ URL thành đối tượng Date an toàn
  const selectedDate = parseISO(dateStr);

  // Kiểm tra nếu URL không phải định dạng ngày hợp lệ
  if (!isValid(selectedDate)) {
    return (
      <div className="flex items-center justify-center h-screen font-black text-[#E5484D] uppercase">
        Định dạng ngày không hợp lệ!
      </div>
    );
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      const formatted = format(newDate, "yyyy-MM-dd");
      router.push(`/doctor/${formatted}`);
    }
  };

  const appointments = [
    { id: "1", time: "08:00", pet: "Milo (Chó)", owner: "Nguyễn Văn An", status: "Hoàn thành", type: "Khám định kỳ" },
    { id: "2", time: "09:30", pet: "Bé (Chó)", owner: "Khách vãng lai", status: "Đang khám", type: "Tiêm phòng" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Lịch làm việc</h1>
          <p className="text-[#E5484D] font-black text-sm uppercase mt-1 tracking-wider">
            {format(selectedDate, "EEEE, dd/MM/yyyy", { locale: vi })}
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="rounded-2xl border-2 h-12 gap-2 font-black border-red-50 text-[#E5484D] hover:bg-red-50 transition-all">
              <CalendarIcon className="size-5" />
              Đổi ngày
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0 rounded-3xl border-none shadow-2xl" align="end">
            <Calendar 
              mode="single" 
              selected={selectedDate} 
              onSelect={handleDateChange} 
              initialFocus 
              locale={vi} 
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="flex gap-6 items-start group">
            <div className="flex flex-col items-center pt-2 w-16">
              <span className="text-sm font-black text-gray-400 group-hover:text-gray-900 transition-colors">{apt.time}</span>
              <div className="w-0.5 h-16 bg-gray-100 my-2 group-last:hidden" />
            </div>

            <div className="flex-1 bg-white p-5 rounded-[2.2rem] border border-gray-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="size-12 bg-red-50 rounded-2xl flex items-center justify-center">
                  <Clock className="text-[#E5484D] size-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 text-lg">{apt.pet}</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">
                    {apt.owner} • <span className="text-[#E5484D]">{apt.type}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge className={cn(
                  "rounded-xl px-3 py-1 font-black text-[9px] border-none shadow-none uppercase",
                  apt.status === "Hoàn thành" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
                )}>
                  {apt.status}
                </Badge>
                <Button size="sm" className="bg-[#E5484D] hover:bg-[#c4363a] text-white rounded-xl font-bold gap-2 px-4 h-10 shadow-sm">
                  <FilePlus2 className="size-4" />
                  Nhập bệnh án
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}