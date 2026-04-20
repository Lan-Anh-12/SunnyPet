"use client";

import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { AppointmentItem } from "@/components/web/modules/admin/AppointmentItem";

export default function AppointmentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dữ liệu mẫu chuẩn chỉnh cho Lan Anh
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      date: "2026-04-15",
      time: "09:30",
      customerName: "Nguyễn Văn An",
      phone: "0901 111 222",
      petName: "Milo",
      petType: "Chó",
      breed: "Poodle",
      doctorName: "Trần Minh Khoa",
      status: "PENDING"
    },
    {
      id: "2",
      date: "2026-04-15",
      time: "14:00",
      customerName: "Lê Thị Bưởi",
      phone: "0988 777 666",
      petName: "Mimi",
      petType: "Mèo",
      breed: "Mèo Anh Lông Ngắn",
      doctorName: "Nguyễn Tuyết Mai",
      status: "PENDING"
    }
  ]);

  const handleConfirm = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? {...a, status: 'CONFIRMED'} : a));
  };

  const handleCancel = (id: string) => {
    setAppointments(prev => prev.map(a => a.id === id ? {...a, status: 'CANCELLED'} : a));
  };

  const filteredApts = appointments.filter(a => 
    a.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    a.petName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-10 bg-[#FAFAFA] min-h-screen italic font-sans">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Style Sunny Pet */}
        <header className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-slate-800 uppercase tracking-tighter italic">
              Lịch hẹn <span className="text-rose-500">khám bệnh</span>
            </h1>
            <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] mt-2">
              Quản lý danh sách đặt lịch trong ngày
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="relative group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-500 transition-colors" size={20} />
              <input 
                type="text"
                placeholder="Tìm tên khách, tên pet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-16 pr-8 py-4 bg-white rounded-2xl shadow-sm border border-transparent focus:border-rose-100 outline-none font-bold text-sm w-80 transition-all"
              />
            </div>
          </div>
        </header>

        {/* Danh sách Item */}
        <div className="space-y-2">
          {filteredApts.length > 0 ? (
            filteredApts.map(apt => (
              <AppointmentItem 
                key={apt.id} 
                apt={apt as any} 
                onConfirm={handleConfirm} 
                onCancel={handleCancel} 
              />
            ))
          ) : (
            <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100 font-black text-gray-200 uppercase tracking-widest">
              Không tìm thấy lịch hẹn nào
            </div>
          )}
        </div>
      </div>
    </div>
  );
}