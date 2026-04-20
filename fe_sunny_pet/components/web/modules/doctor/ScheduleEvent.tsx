interface EventProps {
  title: string;
  time: string;
  type: "primary" | "warning" | "danger";
}

export default function ScheduleEvent({ title, time, type }: EventProps) {
  const colors = {
    primary: "bg-[#67d3d9] border-[#4bb8be]",
    warning: "bg-orange-400 border-orange-500",
    danger: "bg-[#E5484D] border-[#c93d42]"
  };

  return (
    <div className={`absolute inset-x-0.5 top-0.5 bottom-0.5 z-10 p-1 rounded-sm border-l-4 text-white shadow-sm cursor-pointer transition-transform hover:scale-[1.02] ${colors[type]}`}>
      <div className="text-[9px] font-bold leading-tight uppercase">{time}</div>
      <div className="text-[10px] font-medium leading-tight line-clamp-2">{title}</div>
    </div>
  );
}