"use client";

import React from 'react';
import { Card } from "@/components/ui/card";
import { 
  Stethoscope, Pill, Activity, Clipboard, 
  User, DollarSign 
} from "lucide-react";

// 1. Định nghĩa khuôn dữ liệu nhận từ page.tsx
interface MedicalRecordDetailProps {
  data: {
    id: string;
    time: string;
    pet: string;
    species: string;
    owner: string;
    note: string;
    status: string;
  };
}

export default function MedicalRecordDetail({ data }: MedicalRecordDetailProps) {
  // 2. Logic: Kết hợp dữ liệu từ Props (thông tin ca khám) 
  // và dữ liệu chi tiết (sau này Lan Anh sẽ lấy từ SQL)
  const displayData = {
    ...data,
    created_at: "2026-04-11 02:44:45", // Giả lập ngày giờ từ DB
    pet_type: data.species,
    symptoms: "Nôn mửa, bỏ ăn 2 bữa, bụng chướng nhẹ", 
    diagnosis: "Rối loạn tiêu hóa / Nghi nhiễm khuẩn đường ruột",
    notes: data.note || "Theo dõi tại nhà trong 24h.",
    services: [
      { name: "Khám tổng quát", price: 200000 },
      { name: "Xét nghiệm máu", price: 600000 }
    ],
    medicines: [
      { name: "Men tiêu hóa", quantity: 5, unit: "Gói", price: 7000 },
      { name: "Kháng sinh Amox", quantity: 10, unit: "Viên", price: 25000 }
    ]
  };

  // Tính tổng tiền tự động thay vì viết cứng
  const totalAmount = displayData.services.reduce((sum, s) => sum + s.price, 0) + 
                      displayData.medicines.reduce((sum, m) => sum + (m.price * m.quantity), 0);

  return (
    <div className="max-w-6xl mx-auto p-8 italic bg-slate-50/30">
      {/* Header: Thông tin chung */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <div className="flex items-center gap-3 text-rose-500 mb-2">
            <Stethoscope size={32} />
            <h1 className="text-5xl font-black uppercase tracking-tighter">Bệnh án chi tiết</h1>
          </div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] ml-1">
            Sunny Pet Medical Center — {displayData.id}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-gray-800 uppercase tabular-nums">Ngày khám: {displayData.created_at}</p>
          <span className="inline-block mt-2 px-4 py-1 bg-green-100 text-green-600 text-[10px] font-black uppercase rounded-full tracking-widest">
            {displayData.status === 'done' ? 'Hoàn thành' : 'Đang xử lý'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Cột trái: Chẩn đoán & Triệu chứng */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <Card className="p-10 rounded-[3.5rem] border-none shadow-sm bg-white space-y-8">
            <div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter text-gray-800">
                <Activity className="text-rose-500" size={24} /> Tình trạng lâm sàng
              </h2>
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[2rem] border-l-8 border-slate-200">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1 tracking-widest">Triệu chứng</p>
                  <p className="text-lg font-bold text-gray-700 leading-relaxed">{displayData.symptoms}</p>
                </div>
                <div className="p-6 bg-rose-50 rounded-[2rem] border-l-8 border-rose-500">
                  <p className="text-[10px] font-black text-rose-400 uppercase mb-1 tracking-widest">Chẩn đoán xác định</p>
                  <p className="text-xl font-black text-rose-600 leading-tight uppercase">{displayData.diagnosis}</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-black mb-4 flex items-center gap-2 uppercase tracking-tighter text-gray-800">
                <Clipboard className="text-blue-500" size={22} /> Ghi chú bác sĩ
              </h2>
              <p className="text-sm font-bold text-gray-500 italic pl-4 border-l-2 border-gray-100">
                "{displayData.notes}"
              </p>
            </div>
          </Card>

          {/* Table Thuốc kê đơn */}
          <Card className="p-10 rounded-[3.5rem] border-none shadow-sm bg-white">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-gray-800">
              <Pill className="text-orange-500" size={24} /> Đơn thuốc chỉ định
            </h2>
            <div className="overflow-hidden">
              <table className="w-full text-left border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    <th className="px-4">Tên thuốc</th>
                    <th className="px-4 text-center">Số lượng</th>
                    <th className="px-4 text-right">Đơn giá</th>
                  </tr>
                </thead>
                <tbody>
                  {displayData.medicines.map((med, idx) => (
                    <tr key={idx} className="group hover:bg-slate-50 transition-colors">
                      <td className="p-4 bg-slate-50 group-hover:bg-transparent rounded-l-2xl font-black text-gray-800 uppercase italic text-sm">{med.name}</td>
                      <td className="p-4 bg-slate-50 group-hover:bg-transparent text-center font-bold text-gray-600 tabular-nums">{med.quantity} {med.unit}</td>
                      <td className="p-4 bg-slate-50 group-hover:bg-transparent rounded-r-2xl text-right font-black text-gray-900 tabular-nums">
                        {med.price.toLocaleString()}đ
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Cột phải: Thông tin Pet & Dịch vụ */}
        <div className="col-span-12 lg:col-span-5 space-y-8">
          <Card className="p-8 rounded-[3.5rem] border-none shadow-sm bg-[#1a1a1a] text-white">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20">
                  <User size={28} className="text-rose-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Bệnh nhân & Chủ nuôi</p>
                  <h3 className="text-2xl font-black uppercase tracking-tight">{displayData.pet}</h3>
                  <p className="text-xs font-bold text-gray-400 italic">Chủ: {displayData.owner}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase mt-1">{displayData.species}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-10 rounded-[3.5rem] border-none shadow-sm bg-white">
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter text-gray-800">
              <DollarSign className="text-green-500" size={24} /> Dịch vụ thực hiện
            </h2>
            <div className="space-y-4">
              {displayData.services.map((svc, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 rounded-2xl border-2 border-dashed border-gray-100 hover:border-green-200 transition-colors">
                  <span className="text-sm font-black text-gray-700 uppercase italic">{svc.name}</span>
                  <span className="font-black text-green-600 tabular-nums">{svc.price.toLocaleString()}đ</span>
                </div>
              ))}
              <div className="pt-6 border-t-4 border-double border-gray-100 flex justify-between items-center">
                <span className="text-lg font-black uppercase tracking-tighter text-gray-400">Tổng phí</span>
                <span className="text-3xl font-black text-gray-900 tabular-nums tracking-tighter">
                  {totalAmount.toLocaleString()}đ
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}