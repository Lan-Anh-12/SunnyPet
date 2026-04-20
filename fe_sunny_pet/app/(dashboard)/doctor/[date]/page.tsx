"use client";

import { useParams, useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import { vi } from "date-fns/locale";
import { ArrowLeft, Plus, Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Import các component UI từ shadcn
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Giả định bạn để các component này trong folder _components
// app/doctor/[date]/page.tsx

import MedicalRecordForm from "@/components/web/modules/doctor/MedicalRecordForm";
import MedicalRecordDetail from "@/components/web/modules/doctor/MedicalRecordDetail";

export default function DayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dateStr = params.date as string;
  const date = parseISO(dateStr);

  const appointments = [
    { id: "1", time: "08:00", pet: "Mochi", species: "Mèo Ba Tư", owner: "Lan Anh", note: "Tiêm nhắc lại dại", status: "waiting" },
    { id: "2", time: "10:30", pet: "Gấu", species: "Poodle", owner: "Minh Tú", note: "Kiểm tra da liễu", status: "active" },
    { id: "3", time: "14:00", pet: "Kem", species: "Husky", owner: "Hoàng Nam", note: "Phẫu thuật triệt sản", status: "done" }
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-8 italic">
      {/* Header điều hướng */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push("/doctor")} 
            className="-ml-3 text-slate-500 hover:text-[#E5484D]"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Quay lại lịch tổng
          </Button>
          <h1 className="text-3xl font-black text-slate-900 flex items-center gap-3 tracking-tighter uppercase">
            <CalendarCheck className="text-[#E5484D]" />
            {format(date, "eeee, 'ngày' dd/MM", { locale: vi })}
          </h1>
        </div>
        
        <Button className="bg-[#E5484D] hover:bg-[#c93d42] gap-2 rounded-full font-bold">
          <Plus className="w-4 h-4" /> Thêm ca khám mới
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Tìm nhanh tên thú cưng..." className="pl-10 h-12 bg-white shadow-sm rounded-2xl border-none ring-1 ring-slate-200" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Lịch trình chi tiết</h2>
        
        <div className="relative space-y-4 before:absolute before:left-8 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          {appointments.map((item, idx) => (
            <div key={idx} className="relative flex gap-8 items-start">
              <div className="bg-white px-2 py-1 rounded-lg border-2 border-slate-100 text-[10px] font-black text-slate-500 z-10 w-16 text-center shadow-sm tabular-nums">
                {item.time}
              </div>

              <div className={`flex-1 p-5 rounded-[2rem] border-none shadow-sm bg-white flex justify-between items-center transition-all hover:shadow-md ${item.status === 'active' ? 'ring-2 ring-[#E5484D]' : ''}`}>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-xl text-slate-800 uppercase tracking-tighter">{item.pet}</span>
                    <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase">{item.species}</span>
                  </div>
                  <p className="text-sm text-slate-500 mt-1 font-bold">Chủ nuôi: {item.owner}</p>
                  <p className="text-xs text-slate-400 mt-1 italic opacity-70">"{item.note}"</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                   <div className={`text-[9px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${
                     item.status === 'active' ? 'bg-red-100 text-[#E5484D]' : 
                     item.status === 'done' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'
                   }`}>
                     {item.status === 'active' ? 'Đang khám' : item.status === 'done' ? 'Hoàn thành' : 'Chờ khám'}
                   </div>

                   {/* LOGIC GỌI SHEET TẠO/XEM BỆNH ÁN */}
                   <Sheet>
                     <SheetTrigger asChild>
                        <Button 
                          size="sm" 
                          variant={item.status === 'done' ? 'outline' : 'default'} 
                          className={`rounded-xl font-black uppercase text-[10px] tracking-wider ${item.status !== 'done' ? 'bg-[#E5484D] hover:bg-[#c93d42]' : 'border-slate-200'}`}
                        >
                          {item.status === 'done' ? 'Xem hồ sơ' : 'Tạo bệnh án'}
                        </Button>
                     </SheetTrigger>
                     <SheetContent className="w-full sm:max-w-[800px] overflow-y-auto p-0 border-none rounded-l-[3rem]">
                        <SheetHeader className="p-8 border-b bg-slate-50/50">
                          <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
                            {item.status === 'done' ? 'Thông tin bệnh án cũ' : 'Lập bệnh án mới'}
                          </SheetTitle>
                        </SheetHeader>
                        
                        <div className="p-2">
                          {/* Nếu xong rồi thì hiện bản Detail, chưa xong thì hiện bản Form */}
                          {item.status === 'done' ? (
                            <MedicalRecordDetail data={item} />
                          ) : (
                            <MedicalRecordForm appointment={item} />
                          )}
                        </div>
                     </SheetContent>
                   </Sheet>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}