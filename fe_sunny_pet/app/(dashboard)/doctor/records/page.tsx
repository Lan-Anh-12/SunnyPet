"use client";

import React, { useState } from "react";
import { Search, Pill, ClipboardList, Activity, ArrowRight, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function MedicalRecordsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const records = [
    {
      id: "REC-01",
      date: "30/03/2026",
      petName: "Milo",
      owner: "Lê Anh Tuấn",
      symptoms: "Bỏ ăn, nôn mửa nhẹ",
      result: "Viêm dạ dày cấp",
      medicine: "Smeeta, Antibiotics",
      price: "350,000",
    },
    {
      id: "REC-02",
      date: "28/03/2026",
      petName: "Lu",
      owner: "Trần Thị Lan",
      symptoms: "Ngứa tai, đỏ vùng da bụng",
      result: "Viêm da dị ứng",
      medicine: "Ointment X, Vitamin",
      price: "200,000",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-10">
      {/* Header & Search Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E5484D] text-[10px] font-black uppercase tracking-[0.2em]">
            <Activity className="size-3" /> Dashboard Bác Sĩ
          </div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">
            Tra cứu <span className="text-[#E5484D]">Hồ sơ bệnh án</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm italic">
            Lịch sử khám chữa bệnh chi tiết của từng thú cưng tại Sunny Pet.
          </p>
        </div>

        <div className="relative group w-full md:w-[400px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5 group-focus-within:text-[#E5484D] transition-colors" />
          <Input
            placeholder="Tìm tên bé hoặc chủ nuôi..."
            className="h-16 pl-14 pr-6 rounded-[2rem] border-2 border-gray-100 bg-white font-bold text-gray-700 shadow-sm focus:border-[#E5484D] focus:ring-0 transition-all placeholder:text-gray-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Table Content */}
      <Card className="rounded-[2.5rem] border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50 border-b border-gray-100">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-16 px-8 text-[11px] font-black uppercase tracking-widest text-gray-400">Thú cưng & Ngày</TableHead>
              <TableHead className="text-[11px] font-black uppercase tracking-widest text-gray-400">Triệu chứng</TableHead>
              <TableHead className="text-[11px] font-black uppercase tracking-widest text-gray-400">Kết luận bệnh</TableHead>
              <TableHead className="text-[11px] font-black uppercase tracking-widest text-gray-400">Đơn thuốc dùng</TableHead>
              <TableHead className="text-[11px] font-black uppercase tracking-widest text-gray-400 text-right pr-8">Giá khám</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.id} className="group hover:bg-red-50/20 transition-all border-b border-gray-50 last:border-0">
                <TableCell className="py-6 px-8">
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-gray-900 group-hover:text-[#E5484D] transition-colors">{record.petName}</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase italic">{record.date} • {record.owner}</span>
                  </div>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-start gap-2 max-w-[200px]">
                    <ClipboardList className="size-4 text-gray-300 mt-1 shrink-0" />
                    <p className="text-sm font-bold text-gray-500 leading-tight">{record.symptoms}</p>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge className="bg-white border-2 border-red-100 text-[#E5484D] font-black rounded-xl px-3 py-1 hover:bg-[#E5484D] hover:text-white transition-all shadow-sm">
                    {record.result}
                  </Badge>
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Pill className="size-4 text-emerald-500" />
                    </div>
                    <span className="text-sm font-bold text-gray-600">{record.medicine}</span>
                  </div>
                </TableCell>

                <TableCell className="text-right pr-8 font-black text-gray-900">
                  <span className="text-[#E5484D] text-xs mr-0.5">đ</span>{record.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Footer info */}
        <div className="p-6 bg-gray-50/30 border-t border-gray-100 flex justify-between items-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">
           <span>Tổng số hồ sơ: {records.length}</span>
           <div className="flex gap-4">
              <span className="hover:text-[#E5484D] cursor-pointer">Xuất báo cáo PDF</span>
              <span className="hover:text-[#E5484D] cursor-pointer">In hồ sơ tháng</span>
           </div>
        </div>
      </Card>
    </div>
  );
}