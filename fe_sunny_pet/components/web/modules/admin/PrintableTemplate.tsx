"use client";
import React from 'react';
import { CalendarDays, MapPin, Phone } from "lucide-react";

interface Appointment {
  id: number | string;
  time: string;
  pet: string;
  service: string;
  doctor: string;
}

interface PrintableTemplateProps {
  appointments: Appointment[];
}

const PrintableTemplate = React.forwardRef<HTMLDivElement, PrintableTemplateProps>((props, ref) => {
  const { appointments } = props;
  const today = new Date().toLocaleDateString('vi-VN');

  return (
    <div 
      ref={ref} 
      className="font-sans text-gray-800 bg-white box-border shadow-2xl"
      style={{ 
        width: '210mm', 
        minHeight: '297mm', 
        padding: '20mm', 
        margin: '0 auto',
        display: 'block' 
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-rose-500 pb-10 mb-10 w-full">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center text-white font-black italic text-3xl shadow-lg">S</div>
            <div>
              <h1 className="text-4xl font-black text-gray-950 uppercase tracking-tighter italic leading-none">Sunny Pet Clinic</h1>
              <p className="text-gray-400 font-bold text-xs mt-1 uppercase tracking-widest">Hệ thống quản lý thú y cao cấp</p>
            </div>
          </div>
          <div className="flex gap-8 mt-6 text-[11px] font-bold text-gray-400 uppercase tracking-tight">
            <span className="flex items-center gap-2"><MapPin size={14} className="text-rose-500"/> Hà Nội, Việt Nam</span>
            <span className="flex items-center gap-2"><Phone size={14} className="text-rose-500"/> 1800-XXXX-XXXX</span>
          </div>
        </div>
        <div className="text-right border-l-2 border-gray-100 pl-10">
          <p className="text-[10px] font-black text-rose-500 uppercase tracking-[0.3em] mb-1">Ngày vận hành</p>
          <p className="text-4xl font-black text-gray-900 tracking-tighter tabular-nums">{today}</p>
          <div className="mt-4 py-1 px-3 bg-gray-950 text-white text-[9px] font-black uppercase tracking-widest rounded-full inline-block">
            Internal Document
          </div>
        </div>
      </div>

      {/* Body Table */}
      <div className="mb-10 w-full">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-3 uppercase tracking-tight italic">
          <CalendarDays size={24} className="text-rose-500" /> I. Danh sách điều phối lịch trình
        </h3>
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-gray-50 border-y-2 border-gray-200 uppercase tracking-widest text-[11px] font-black text-gray-400">
              <th className="p-5 w-[15%]">Giờ</th>
              <th className="p-5 w-[40%]">Pet & Dịch vụ</th>
              <th className="p-5 w-[20%] text-center">Bác sĩ</th>
              <th className="p-5 w-[25%] text-center">Xác nhận</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((item) => (
              <tr key={item.id} className="border-b border-gray-100">
                <td className="p-5 font-black text-3xl text-gray-950 tabular-nums">{item.time}</td>
                <td className="p-5">
                  <p className="font-black text-xl text-gray-900 uppercase tracking-tight">{item.pet}</p>
                  <p className="text-xs text-rose-500 font-bold uppercase tracking-tight mt-1">{item.service}</p>
                </td>
                <td className="p-5 text-center text-sm font-bold text-gray-500 italic uppercase tracking-tighter">{item.doctor}</td>
                <td className="p-5 border-l border-dashed border-gray-200 h-24">
                  <div className="w-full h-full bg-gray-50/50 rounded-xl"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Ghi chú */}
      <div className="mt-10 border-2 border-dashed border-gray-100 rounded-[2.5rem] p-8 min-h-[150px]">
        <p className="text-[10px] font-black text-gray-300 uppercase mb-6 tracking-[0.2em]">Ghi chú phát sinh & Báo cáo khẩn cấp:</p>
        <div className="space-y-6">
          <div className="border-b border-gray-100 h-6"></div>
          <div className="border-b border-gray-100 h-6"></div>
        </div>
      </div>

      {/* Footer Signature */}
      <div className="mt-20 flex justify-between items-end border-t border-gray-100 pt-8">
        <div className="text-[9px] font-black text-gray-300 tracking-widest uppercase italic">
          Sunny Pet Clinic Management System 2026
        </div>
        <div className="text-center w-64">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 mb-16 italic">Xác nhận quản trị viên</p>
          <div className="w-full border-b-2 border-gray-900"></div>
          <p className="text-[9px] text-gray-400 mt-2 italic font-medium">(Ký và ghi rõ họ tên)</p>
        </div>
      </div>
    </div>
  );
});

PrintableTemplate.displayName = "PrintableTemplate";
export default PrintableTemplate;