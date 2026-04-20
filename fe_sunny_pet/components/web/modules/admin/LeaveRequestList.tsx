"use client";

import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserX, Check, X, Clock, UserCircle } from "lucide-react";

const LEAVE_DATA = [
  { id: 1, name: "Nguyễn Văn A", role: "Bác sĩ", reason: "Khám bệnh định kỳ", date: "12/04/2026" },
  { id: 2, name: "Trần Thị B", role: "Lễ tân", reason: "Việc gia đình", date: "13/04/2026" },
];

export default function LeaveRequestList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-8 rounded-[2.5rem] bg-amber-50 border-none shadow-sm relative overflow-hidden group cursor-pointer active:scale-95 transition-transform">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-amber-200">
              <UserX size={24} />
            </div>
            <h3 className="text-3xl font-black text-amber-900 tracking-tighter uppercase leading-none">
              {LEAVE_DATA.length.toString().padStart(2, '0')} Đơn nghỉ
            </h3>
            <p className="text-[10px] font-black text-amber-600 uppercase mt-1 tracking-widest leading-none">Bấm để duyệt</p>
          </div>
          <UserX className="absolute -right-4 -bottom-4 text-amber-200/50 rotate-12 group-hover:scale-110 transition-transform" size={120} />
        </Card>
      </DialogTrigger>

      {/* POP UP NHỎ GỌN (max-w-xl) - KHÔNG BỊ BÉ TÍ NHƯ ẢNH TRƯỚC */}
      <DialogContent className="max-w-xl rounded-[2.5rem] p-0 border-none overflow-hidden bg-white shadow-2xl italic">
        <DialogHeader className="p-6 bg-rose-500 text-white flex flex-row items-center gap-4">
          <UserX size={28} />
          <div>
            <DialogTitle className="text-2xl font-black uppercase tracking-tighter leading-none">Duyệt đơn nghỉ</DialogTitle>
            <p className="text-[9px] font-bold text-rose-100 uppercase tracking-widest mt-1 opacity-70">Sunny Pet Personnel</p>
          </div>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto bg-slate-50/50 scrollbar-hide">
          {LEAVE_DATA.map((request) => (
            <div key={request.id} className="p-5 bg-white rounded-[2rem] border border-gray-100 shadow-sm space-y-4 group">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-center">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center border shadow-inner group-hover:border-rose-100">
                    <UserCircle className="text-gray-300 group-hover:text-rose-400" size={20} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-gray-800 uppercase leading-none">{request.name}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-1 flex items-center gap-1 uppercase tracking-tight">
                      <Clock size={10} className="text-rose-400" /> {request.date}
                    </p>
                  </div>
                </div>
                <span className="text-[9px] font-black bg-gray-100 text-gray-400 px-2 py-0.5 rounded uppercase">{request.role}</span>
              </div>
              
              <p className="text-[11px] font-bold text-gray-500 pl-2 border-l-2 border-rose-200 uppercase tracking-tight">
                Lý do: {request.reason}
              </p>

              <div className="flex gap-2 pt-2">
                <Input 
                  placeholder="Ghi chú..." 
                  className="flex-1 bg-gray-50 border-none rounded-lg text-[11px] h-9 italic shadow-inner focus-visible:ring-rose-500"
                />
                <button className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 shadow-md active:scale-90 transition-all">
                  <Check size={14} />
                </button>
                <button className="p-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 shadow-md active:scale-90 transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}