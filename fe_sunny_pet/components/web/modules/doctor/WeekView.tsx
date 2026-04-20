import { format, startOfWeek, addDays } from "date-fns";
import { vi } from "date-fns/locale";
import { useRouter } from "next/navigation";
import ScheduleEvent from "./ScheduleEvent";
import React from "react";

export default function WeekView({ currentDate }: { currentDate: Date }) {
  const router = useRouter();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const hours = Array.from({ length: 12 }, (_, i) => i + 7); // 7h sáng đến 18h tối
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="grid grid-cols-[70px_repeat(7,1fr)] bg-slate-200 gap-[1px] border-x border-b">
      <div className="bg-slate-50"></div>
      {weekDays.map(day => (
        <div 
          key={day.toString()} 
          onClick={() => router.push(`/doctor/${format(day, "yyyy-MM-dd")}`)}
          className="bg-slate-50 p-2 text-center cursor-pointer hover:text-[#E5484D]"
        >
          <div className="text-xs text-slate-500 uppercase">{format(day, "EEEE", { locale: vi })}</div>
          <div className="font-bold">{format(day, "dd/MM")}</div>
        </div>
      ))}

      {hours.map(h => (
        <React.Fragment key={h}>
          <div className="bg-white p-2 text-right text-xs text-slate-400 font-medium">{h}:00</div>
          {weekDays.map((day, i) => (
            <div 
              key={i} 
              className="bg-white min-h-[60px] relative group border-t border-slate-100"
              onClick={() => router.push(`/doctor/${format(day, "yyyy-MM-dd")}`)}
            >
              {/* Đổ data thật vào đây, dưới đây là demo */}
              {h === 8 && i === 2 && (
                <ScheduleEvent title="Khám định kỳ" time="08:00-10:00" type="primary" />
              )}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}