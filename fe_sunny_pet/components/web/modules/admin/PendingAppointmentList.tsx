"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ClipboardList, Check, X, Clock, User, Mail, Dog, AlertTriangle } from "lucide-react";

export default function PendingAppointmentList() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="p-8 rounded-[2.5rem] bg-[#1a1a1a] text-white relative overflow-hidden group cursor-pointer hover:bg-rose-600 transition-all shadow-xl active:scale-95">
          <div className="relative z-10">
            <AlertTriangle className="text-orange-400 mb-4 group-hover:text-white transition-colors" size={24} />
            <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">08 Lịch chờ</h3>
            <p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest">Cần xác nhận</p>
          </div>
          <ClipboardList className="absolute -right-6 -bottom-6 text-white/5 rotate-12 group-hover:scale-110 transition-transform" size={140} />
        </Card>
      </DialogTrigger>

      {/* TĂNG LÊN max-w-5xl (1024px) ĐỂ Ô GHI CHÚ RỘNG THOẢI MÁI */}
      <DialogContent className="max-w-5xl rounded-[3rem] p-0 border-none overflow-hidden bg-white shadow-2xl italic">
        <DialogHeader className="p-10 bg-[#1a1a1a] text-white flex flex-row items-center gap-6">
          <div className="w-16 h-16 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg"><ClipboardList size={32} /></div>
          <div>
            <DialogTitle className="text-4xl font-black uppercase tracking-tighter">Duyệt lịch đăng ký</DialogTitle>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.3em] mt-1">Sunny Pet Appointment Queue</p>
          </div>
        </DialogHeader>

        <div className="p-10 space-y-6 max-h-[70vh] overflow-y-auto bg-gray-50/50 scrollbar-hide">
          {[1, 2].map((i) => (
            <div key={i} className="p-8 bg-white rounded-[3.5rem] border-2 border-transparent hover:border-rose-100 transition-all shadow-sm space-y-6 group">
              <div className="flex items-start justify-between gap-10">
                {/* Thông tin khách & Pet dàn ngang cho thoáng */}
                <div className="flex gap-12 flex-1">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400"><User size={14} className="text-rose-500" /><p className="text-[10px] font-black uppercase tracking-widest">Khách hàng</p></div>
                    <p className="font-black text-2xl text-gray-800 uppercase pl-6">Lê Thị Lan</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-400"><Dog size={14} className="text-rose-500" /><p className="text-[10px] font-black uppercase tracking-widest">Thú cưng</p></div>
                    <p className="font-black text-2xl text-rose-500 uppercase pl-6">Bánh Bao (Mèo)</p>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 text-gray-400"><Mail size={14} className="text-blue-500" /><p className="text-[10px] font-black uppercase tracking-widest">Liên hệ & Thời gian</p></div>
                    <p className="text-sm font-bold text-gray-600 pl-6 uppercase">{i === 1 ? 'lanle99@gmail.com' : 'duchoang.vet@gmail.com'}</p>
                    <p className="text-sm font-black text-gray-900 pl-6 mt-1 flex items-center gap-2"><Clock size={14} className="text-orange-500" /> 14:30 - 15/04/2026</p>
                  </div>
                </div>
              </div>

              {/* Ô ghi chú siêu dài và nút bấm to */}
              <div className="flex gap-4 pt-6 border-t border-dashed border-gray-100">
                <div className="flex-1 relative group/input">
                  <span className="absolute -top-3 left-4 bg-white px-2 text-[9px] font-black text-gray-400 uppercase tracking-widest">Ghi chú gửi khách</span>
                  <Input placeholder="Nhập lưu ý hoặc lý do từ chối tại đây..." className="w-full bg-gray-50 border-2 border-transparent focus:border-rose-200 rounded-2xl text-sm h-14 italic px-6 shadow-inner transition-all" />
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-3 bg-green-500 text-white px-10 rounded-2xl font-black text-xs uppercase hover:bg-green-600 transition-all shadow-lg active:scale-95"><Check size={20} /> Xác nhận</button>
                  <button className="flex items-center gap-3 bg-rose-500 text-white px-10 rounded-2xl font-black text-xs uppercase hover:bg-rose-600 transition-all shadow-lg active:scale-95"><X size={20} /> Từ chối</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}