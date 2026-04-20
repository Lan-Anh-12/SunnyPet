"use client";

import React, { useRef } from 'react';
import Link from 'next/link'; // Thêm Link để điều hướng trang
import { useReactToPrint } from 'react-to-print';
import { Card } from "@/components/ui/card";
import { 
  Printer, Clock, CheckCircle2, XCircle, 
  CalendarDays, Package, AlertTriangle, ClipboardList 
} from "lucide-react";

import PrintableTemplate from "@/components/web/modules/admin/PrintableTemplate";
import LeaveRequestList from "@/components/web/modules/admin/LeaveRequestList";

const DASHBOARD_MOCK = {
  stats: [
    { id: 'pending', label: "Chờ duyệt", value: "08", icon: Clock, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 'confirmed', label: "Đã xác nhận", value: "15", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50" },
    { id: 'cancelled', label: "Đã hủy", value: "03", icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  ],
  appointments: [
    { id: 1, time: "08:00", pet: "LuLu (Cún)", service: "Tiêm chủng", doctor: "BS. Minh" },
    { id: 2, time: "09:30", pet: "Miu (Mèo)", service: "Phẫu thuật", doctor: "BS. Lan" },
    { id: 3, time: "10:15", pet: "Bơ (Cún)", service: "Khám tổng quát", doctor: "BS. Minh" },
  ],
  lowStockMeds: [
    { id: 101, name: "Kháng sinh Amox", stock: 2, unit: "Hộp", status: "Báo động" },
    { id: 102, name: "Vaccine 5 bệnh", stock: 5, unit: "Liều", status: "Sắp hết" },
  ]
};

export default function AdminOverviewPage() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `SunnyPet_LichVanHanh`,
  });

  return (
    <div className="p-8 space-y-8 bg-[#FDFDFD] min-h-screen relative italic">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm !important; }
          body { margin: 0 !important; -webkit-print-color-adjust: exact !important; }
        }
      `}</style>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Tổng quan</h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mt-1">Hệ thống quản lý Sunny Pet</p>
        </div>
        <button 
          onClick={() => handlePrint()}
          className="flex items-center gap-3 bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-rose-500 transition-all shadow-xl active:scale-95"
        >
          <Printer size={22} /> IN LỊCH LỄ TÂN
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {DASHBOARD_MOCK.stats.map((item) => (
          <Card key={item.id} className="p-7 rounded-[2.5rem] border-none shadow-sm flex items-center justify-between bg-white hover:shadow-md transition-shadow">
            <div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
              <h3 className="text-5xl font-black mt-1 tracking-tighter text-gray-800 tabular-nums leading-none">{item.value}</h3>
            </div>
            <div className={`${item.bg} ${item.color} p-5 rounded-[1.8rem]`}>
              <item.icon size={32} />
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Card className="p-8 rounded-[3rem] border-none shadow-sm bg-white min-h-[600px]">
            <h2 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase text-rose-500 tracking-tighter">
              <CalendarDays size={28} /> Lịch trình dự kiến hôm nay
            </h2>
            <div className="space-y-4">
              {DASHBOARD_MOCK.appointments.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-6 bg-gray-50 rounded-[2.5rem] hover:bg-white border-2 border-transparent hover:border-rose-100 transition-all shadow-sm group">
                  <div className="flex gap-8 items-center">
                    <span className="font-black text-3xl text-gray-900 tabular-nums tracking-tighter">{item.time}</span>
                    <div>
                      <p className="font-black text-xl text-gray-800 group-hover:text-rose-500 transition-colors uppercase tracking-tight">{item.pet}</p>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest leading-none mt-1">{item.service}</p>
                    </div>
                  </div>
                  <span className="text-xs font-black text-gray-500 bg-white border-2 px-5 py-2.5 rounded-2xl shadow-sm italic uppercase tracking-tighter">{item.doctor}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* PHẦN 1: DUYỆT LỊCH NGHỈ - Giữ nguyên Popup nhưng đổi tên trong Component */}
          <LeaveRequestList />

          {/* PHẦN 2: KHO THUỐC */}
          <Card className="p-8 rounded-[2.5rem] border-none shadow-sm bg-white border-t-8 border-t-rose-500">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter">
              <Package className="text-rose-500" size={24} /> Vật tư sắp hết
            </h2>
            <div className="space-y-5">
              {DASHBOARD_MOCK.lowStockMeds.map((med) => (
                <div key={med.id} className="flex justify-between items-center group">
                  <p className="text-sm font-black text-gray-800 group-hover:text-rose-500 transition-colors uppercase italic">{med.name}</p>
                  <span className="font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg text-sm tabular-nums border border-rose-100">{med.stock} {med.unit}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* PHẦN 3: LỊCH CHỜ - CHỈNH THÀNH LINK SANG TRANG LỊCH HẸN */}
          <Link href="/admin/appointments">
            <Card className="p-8 rounded-[2.5rem] bg-[#1a1a1a] text-white relative overflow-hidden group cursor-pointer hover:bg-rose-600 transition-all shadow-xl active:scale-95">
              <div className="relative z-10">
                <AlertTriangle className="text-orange-400 mb-4 group-hover:text-white transition-colors" size={24} />
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">08 Lịch chờ</h3>
                <p className="text-[10px] font-bold opacity-60 uppercase mt-1 tracking-widest">Đi đến trang duyệt lịch</p>
              </div>
              <ClipboardList className="absolute -right-6 -bottom-6 text-white/5 rotate-12 group-hover:scale-110 transition-transform" size={140} />
            </Card>
          </Link>
        </div>
      </div>

      <div className="hidden">
        <div style={{ position: "absolute", top: "-9999px" }}>
          <PrintableTemplate ref={printRef} appointments={DASHBOARD_MOCK.appointments} />
        </div>
      </div>
    </div>
  );
}