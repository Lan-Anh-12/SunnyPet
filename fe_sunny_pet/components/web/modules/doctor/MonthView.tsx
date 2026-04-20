import { format, startOfMonth, endOfMonth, eachDayOfInterval, startOfWeek, endOfWeek, isSameDay, isSameMonth } from "date-fns";
import { useRouter } from "next/navigation";

export default function MonthView({ currentDate }: { currentDate: Date }) {
  const router = useRouter();
  const start = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(currentDate), { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return (
    <div className="grid grid-cols-7 bg-slate-200 gap-[1px] border-x border-b">
      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(d => (
        <div key={d} className="bg-slate-50 p-2 text-center text-xs font-bold text-slate-500">{d}</div>
      ))}
      {days.map((day, i) => (
        <div 
          key={i}
          onClick={() => router.push(`/doctor/${format(day, "yyyy-MM-dd")}`)}
          className={`h-24 p-2 cursor-pointer transition-all hover:bg-red-50 bg-white ${
            !isSameMonth(day, currentDate) ? "text-slate-300" : "text-slate-700"
          }`}
        >
          <span className={`text-sm font-bold ${isSameDay(day, new Date()) ? "bg-[#E5484D] text-white px-1.5 rounded-full" : ""}`}>
            {format(day, "d")}
          </span>
          {/* Ví dụ hiện số ca khám */}
          {isSameMonth(day, currentDate) && i % 3 === 0 && (
            <div className="mt-1 text-[10px] bg-blue-100 text-blue-600 p-0.5 rounded truncate">3 Ca khám</div>
          )}
        </div>
      ))}
    </div>
  );
}