"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, UserCheck } from "lucide-react";
import Image from "next/image";

// Tận dụng dữ liệu bác sĩ từ component trước của bạn
const doctors = [
  { id: "auto", name: "Tùy phân công", major: "Bác sĩ sẽ được phân công phù hợp nhất", img: "/auto-doc.png" },
  { id: "doc1", name: "BS. Nguyễn Thị Lan", major: "Nội khoa & Ngoại khoa", img: "/doc1.png" },
  { id: "doc2", name: "BS. Trần Minh Khoa", major: "Phẫu thuật & Chỉnh hình", img: "/doc2.jpg" },
  { id: "doc3", name: "BS. Phạm Hồng Nhung", major: "Da liễu & Dinh dưỡng", img: "/doc3.png" },
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30",
  "10:00", "10:30", "11:00", "11:30",
  "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00"
];

interface StepServiceProps {
  onNext: () => void;
  onBack: () => void;
  updateData: (data: any) => void;
  data: any;
}

export default function StepService({ onNext, onBack, updateData, data }: StepServiceProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <UserCheck className="size-6 text-[#E5484D]" />
          Chọn bác sĩ & thời gian
        </h3>

        {/* CHỌN BÁC SĨ */}
        <div className="space-y-4">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500">Chọn bác sĩ</label>
          <div className="space-y-3">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                onClick={() => updateData({ ...data, doctorId: doc.id })}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                  data.doctorId === doc.id 
                  ? "border-[#E5484D] bg-[#E5484D]/5" 
                  : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0">
                  {doc.id === "auto" ? (
                    <div className="w-full h-full flex items-center justify-center bg-red-50 text-[#E5484D]">✨</div>
                  ) : (
                    <Image src={doc.img} alt={doc.name} fill className="object-cover" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{doc.name}</h4>
                  <p className="text-xs text-gray-500">{doc.major}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NGÀY KHÁM */}
        <div className="space-y-4 pt-4">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <Calendar className="size-4" /> Ngày khám *
          </label>
          <input 
            type="date" 
            className="w-full p-4 rounded-xl border border-gray-100 focus:ring-2 focus:ring-[#E5484D]/20 outline-none transition"
            onChange={(e) => updateData({ ...data, date: e.target.value })}
            value={data.date || ""}
          />
        </div>

        {/* GIỜ KHÁM */}
        <div className="space-y-4 pt-4">
          <label className="text-sm font-bold uppercase tracking-wider text-gray-500 flex items-center gap-2">
            <Clock className="size-4" /> Giờ khám *
          </label>
          <div className="grid grid-cols-4 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => updateData({ ...data, time })}
                className={`py-3 rounded-xl border font-medium transition-all ${
                  data.time === time 
                  ? "bg-[#E5484D] text-white border-[#E5484D] shadow-md shadow-[#E5484D]/30" 
                  : "border-gray-100 text-gray-600 hover:border-gray-300"
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="pt-10 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="px-8 py-4 font-bold text-gray-500 hover:text-gray-900 transition"
          >
            ← Quay lại
          </button>
          <button 
            onClick={onNext}
            disabled={!data.doctorId || !data.date || !data.time}
            className={`rounded-full px-12 py-4 font-bold text-white transition-all shadow-lg ${
              !data.doctorId || !data.date || !data.time 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-[#E5484D] hover:bg-[#C83D44] hover:scale-105"
            }`}
          >
            Tiếp theo →
          </button>
        </div>
      </div>
    </motion.div>
  );
}