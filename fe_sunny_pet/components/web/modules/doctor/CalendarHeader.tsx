import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { vi } from "date-fns/locale";

interface HeaderProps {
  view: "month" | "week";
  setView: (v: "month" | "week") => void;
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

export default function CalendarHeader({ view, setView, currentDate, onPrev, onNext, onToday }: HeaderProps) {
  const getRangeText = () => {
    if (view === "month") return format(currentDate, "MMMM yyyy", { locale: vi });
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return `${format(start, "dd/MM")} - ${format(end, "dd/MM")}`;
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 border rounded-t-xl shadow-sm">
      <div className="flex gap-1">
        <Button variant="outline" size="sm" onClick={onToday}>Hôm nay</Button>
        <Button variant="outline" size="icon" onClick={onPrev}><ChevronLeft className="w-4 h-4" /></Button>
        <Button variant="outline" size="icon" onClick={onNext}><ChevronRight className="w-4 h-4" /></Button>
      </div>

      <div className="text-lg font-bold uppercase text-slate-700">{getRangeText()}</div>

      <div className="flex bg-slate-100 p-1 rounded-lg">
        <Button 
          variant={view === "month" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setView("month")}
          className={view === "month" ? "bg-white shadow-sm" : ""}
        >Tháng</Button>
        <Button 
          variant={view === "week" ? "secondary" : "ghost"} 
          size="sm" 
          onClick={() => setView("week")}
          className={view === "week" ? "bg-white shadow-sm" : ""}
        >Tuần</Button>
      </div>
    </div>
  );
}