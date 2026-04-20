"use client";

import React from 'react';
import { User, Phone, Calendar, Clock, Check, Stethoscope, ChevronRight, Trash2 } from 'lucide-react';

// Sửa lỗi: Thêm kiểm tra type để tránh lỗi .toLowerCase() của undefined
const PetIcon = ({ type }: { type?: string }) => {
  if (!type) return <span className="text-2xl">🐾</span>;
  const lowerType = type.toLowerCase();
  if (lowerType === 'chó') return <span className="text-2xl">🐶</span>;
  if (lowerType === 'mèo') return <span className="text-2xl">🐱</span>;
  return <span className="text-2xl">🐾</span>;
};

interface Appointment {
  id: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  petName: string;
  petType?: string; // Đánh dấu ? để không bắt buộc
  breed: string;
  doctorName: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
}

export const AppointmentItem = ({ apt, onConfirm, onCancel }: { 
  apt: Appointment, 
  onConfirm: (id: string) => void, 
  onCancel: (id: string) => void 
}) => {
  return (
    <div className="group bg-white rounded-[2.5rem] p-4 pl-8 mb-5 flex flex-wrap md:flex-nowrap items-center justify-between gap-6 shadow-sm border border-gray-50 hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-300 italic font-sans relative overflow-hidden">
      
      {/* Decor line */}
      <div className="absolute left-0 top-0 bottom-0 w-2 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* 1. Thời gian */}
      <div className="flex items-center gap-6 min-w-[180px]">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">Tháng 04</p>
          <div className="text-3xl font-black text-slate-800 tracking-tighter leading-none">
            {apt.date ? apt.date.split('-')[2] : '15'}
          </div>
        </div>
        <div className="h-10 w-[1px] bg-gray-100" />
        <div className="flex flex-col">
          <span className="flex items-center gap-2 text-rose-500 font-black text-lg tracking-tighter">
            <Clock size={16} strokeWidth={3} /> {apt.time || "--:--"}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight flex items-center gap-1">
             <Calendar size={10} /> {apt.date || "Chưa rõ"}
          </span>
        </div>
      </div>

      {/* 2. Thông tin chính */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="flex items-center gap-4">
          <div className="size-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-rose-50 group-hover:text-rose-500 transition-colors">
            <User size={20} />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-800 tracking-tight">{apt.customerName || "Khách lạ"}</h3>
            <p className="text-xs font-bold text-gray-400 flex items-center gap-1 mt-0.5">
              <Phone size={12} /> {apt.phone || "Trống"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="size-12 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
            <PetIcon type={apt.petType} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-black text-rose-500 tracking-tight">{apt.petName || "Thú cưng"}</h3>
              {apt.breed && <span className="px-2 py-0.5 bg-gray-100 rounded-md text-[9px] font-black uppercase text-gray-400">{apt.breed}</span>}
            </div>
            <p className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-0.5">
              <Stethoscope size={12} className="text-blue-400" /> BS. {apt.doctorName || "Đang xếp"}
            </p>
          </div>
        </div>
      </div>

      {/* 3. Nút Thao tác */}
      <div className="flex items-center gap-3 pr-4">
        {apt.status === 'PENDING' ? (
          <>
            <button onClick={() => onCancel(apt.id)} className="px-6 py-4 rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:bg-gray-50 transition-all italic">
              Từ chối
            </button>
            <button onClick={() => onConfirm(apt.id)} className="px-10 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-[1.5rem] font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-rose-200 hover:shadow-rose-300 transition-all flex items-center gap-2 italic active:scale-95">
              Xác nhận <ChevronRight size={14} strokeWidth={4} />
            </button>
          </>
        ) : (
          <div className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest italic border-2 ${
            apt.status === 'CONFIRMED' ? 'bg-white text-green-500 border-green-100' : 'bg-white text-gray-300 border-gray-100'
          }`}>
            {apt.status === 'CONFIRMED' ? 'Đã duyệt' : 'Đã hủy'}
          </div>
        )}
      </div>
    </div>
  );
};