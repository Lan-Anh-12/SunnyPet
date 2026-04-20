"use client";

import React, { useState } from "react";
import { addMonths, addWeeks, subMonths, subWeeks } from "date-fns";
import CalendarHeader from "@/components/web/modules/doctor/CalendarHeader";
import MonthView from "@/components/web/modules/doctor/MonthView";
import WeekView from "@/components/web/modules/doctor/WeekView";

export default function DoctorRootPage() {
  const [view, setView] = useState<"month" | "week">("month");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Xử lý nút "Trước"
  const handlePrev = () => {
    if (view === "month") {
      setCurrentDate(subMonths(currentDate, 1));
    } else {
      setCurrentDate(subWeeks(currentDate, 1));
    }
  };

  // Xử lý nút "Sau"
  const handleNext = () => {
    if (view === "month") {
      setCurrentDate(addMonths(currentDate, 1));
    } else {
      setCurrentDate(addWeeks(currentDate, 1));
    }
  };

  const handleToday = () => setCurrentDate(new Date());

  return (
    <div className="p-6 min-h-screen bg-slate-50/50">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Thanh điều hướng */}
        <CalendarHeader 
          view={view}
          setView={setView}
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onToday={handleToday}
        />

        {/* Khu vực hiển thị Lịch */}
        <div className="bg-white rounded-b-xl shadow-sm border border-t-0 overflow-hidden">
          {view === "month" ? (
            <MonthView currentDate={currentDate} />
          ) : (
            <WeekView currentDate={currentDate} />
          )}
        </div>
        
        {/* Chú thích nhỏ bên dưới */}
        <div className="flex gap-4 px-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-sm"></div>
            <span>Ca khám thường</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <div className="w-3 h-3 bg-red-100 border border-red-300 rounded-sm"></div>
            <span>Ca mổ/Cấp cứu</span>
          </div>
        </div>
      </div>
    </div>
  );
}