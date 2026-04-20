"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, UserCheck, ChevronDown } from "lucide-react";
import Image from "next/image";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const doctors = [
  { id: "doc1", name: "BS. Nguyễn Thị Lan", major: "Nội khoa & Ngoại khoa" },
  { id: "doc2", name: "BS. Trần Minh Khoa", major: "Phẫu thuật & Chỉnh hình" },
  { id: "doc3", name: "BS. Phạm Hồng Nhung", major: "Da liễu & Dinh dưỡng" },
  { id: "doc4", name: "BS. Lê Văn Đức", major: "Chẩn đoán hình ảnh" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"
];

export default function StepService({ onNext, onBack, updateData, data }: any) {
  
  // Kiểm tra xem bác sĩ đang chọn có phải là bác sĩ cụ thể không
  const isSpecificDoctor = data.doctorId && data.doctorId !== "auto";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <UserCheck className="size-6 text-[#E5484D]" />
          Thiết lập lịch khám
        </h3>

        {/* CHỌN BÁC SĨ */}
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 px-1">Chọn bác sĩ</label>
          
          <div className="space-y-3">
            {/* OPTION 1: HỆ THỐNG TỰ PHÂN CÔNG (Giữ nguyên Card nổi bật) */}
            <div
              onClick={() => updateData({ ...data, doctorId: "auto" })}
              className={cn(
                "flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer",
                data.doctorId === "auto" 
                  ? "border-[#E5484D] bg-[#E5484D]/5" 
                  : "border-gray-50 hover:border-gray-200"
              )}
            >
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center bg-red-50 text-[#E5484D] font-bold text-xl shrink-0">
                ✨
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">Tùy hệ thống phân công</h4>
                <p className="text-xs text-gray-400 font-medium">Bác sĩ trống lịch sẽ được chỉ định phù hợp nhất</p>
              </div>
            </div>

            {/* OPTION 2: CHỌN BÁC SĨ CỤ THỂ (Dùng Select để tiết kiệm diện tích) */}
            <div className="relative">
              <select
                value={isSpecificDoctor ? data.doctorId : ""}
                onChange={(e) => updateData({ ...data, doctorId: e.target.value })}
                className={cn(
                  "w-full p-4 h-14 rounded-2xl border-2 transition-all appearance-none outline-none font-bold text-sm pl-12",
                  isSpecificDoctor 
                    ? "border-[#E5484D] bg-[#E5484D]/5 text-gray-900" 
                    : "border-gray-50 bg-gray-50/30 text-gray-500 hover:border-gray-200"
                )}
              >
                <option value="" disabled>Hoặc chọn bác sĩ cụ thể...</option>
                {doctors.map((doc) => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} - {doc.major}
                  </option>
                ))}
              </select>
              <UserCheck className={cn(
                "absolute left-4 top-1/2 -translate-y-1/2 size-5",
                isSpecificDoctor ? "text-[#E5484D]" : "text-gray-300"
              )} />
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* NGÀY KHÁM (Sử dụng Calendar UI) */}
        <div className="space-y-4 pt-4 border-t border-gray-50">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2 px-1">
            <CalendarIcon className="size-4" /> Ngày khám *
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-14 justify-start text-left font-bold rounded-2xl border-2 transition-all px-5",
                  !data.date ? "border-gray-50 bg-gray-50/30 text-gray-400" : "border-[#E5484D] bg-white text-gray-900 shadow-sm shadow-red-50"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-[#E5484D]" />
                {data.date ? format(new Date(data.date), "dd/MM/yyyy", { locale: vi }) : <span>Chọn ngày khám...</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-[2rem] border-none shadow-2xl overflow-hidden" align="start">
              <div className="bg-[#E5484D] p-4 text-white text-center font-black text-xs uppercase tracking-widest">Lịch Sunny Pet</div>
              <div className="p-2 bg-white">
                <Calendar
                  mode="single"
                  selected={data.date ? new Date(data.date) : undefined}
                  onSelect={(date) => updateData({ ...data, date: date?.toISOString() })}
                  initialFocus
                  locale={vi}
                />
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* GIỜ KHÁM */}
        <div className="space-y-4 pt-4">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2 px-1">
            <Clock className="size-4" /> Giờ khám *
          </label>
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => updateData({ ...data, time })}
                className={cn(
                  "py-3 rounded-xl border-2 font-bold transition-all text-sm",
                  data.time === time 
                  ? "bg-[#E5484D] text-white border-[#E5484D] shadow-md shadow-red-100 scale-105" 
                  : "border-gray-50 bg-gray-50/30 text-gray-500 hover:border-red-100"
                )}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="pt-8 flex items-center justify-between border-t border-gray-50">
          <button onClick={onBack} className="font-bold text-gray-400 hover:text-gray-900 transition">← Quay lại</button>
          <button 
            onClick={onNext}
            disabled={!data.doctorId || !data.date || !data.time}
            className={cn(
              "rounded-full px-12 py-4 font-black text-white transition-all shadow-lg",
              !data.doctorId || !data.date || !data.time 
                ? "bg-gray-200 cursor-not-allowed" 
                : "bg-[#E5484D] hover:bg-[#C83D44] hover:scale-105 active:scale-95"
            )}
          >
            Tiếp theo →
          </button>
        </div>
      </div>
    </motion.div>
  );
}