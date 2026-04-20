"use client";
import React, { useState } from 'react';
import { Search, UserPlus, Users, TrendingUp } from 'lucide-react';
import { CustomerItem } from "@/components/web/modules/admin/CustomerItem";
import EditCustomerModal from "@/components/web/modules/admin/EditCustomerModal";

export default function CustomerManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. Dữ liệu mẫu (Gồm nhiều pet để test logic sửa)
  const [customers, setCustomers] = useState([
    { 
      id: "C001", 
      name: "Nguyễn Văn An", 
      phone: "0901 111 222", 
      email: "an.nguyen@gmail.com", 
      address: "12 Lê Lợi, Q1",
      pets: [
        { id: "p1", name: "Milo", breed: "Poodle" },
        { id: "p2", name: "Lu", breed: "Corgi" } // Khách này có 2 pet
      ],
      history: [{ date: "2026-03-28", petName: "Milo", reason: "Khám định kỳ", status: "Hoàn thành" }]
    }
  ]);

  // 2. State quản lý Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // Mở modal
  const handleEditClick = (customer: any) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };

  // Lưu dữ liệu (Cập nhật cả thông tin khách và danh sách Pet)
  const handleSaveCustomer = (updatedData: any) => {
    setCustomers(prev => prev.map(c => c.id === updatedData.id ? updatedData : c));
    setIsModalOpen(false);
  };

  const filtered = customers.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-10 bg-[#FAFAFA] min-h-screen italic font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- KHU VỰC THỐNG KÊ (STATS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Tổng khách hàng */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="size-16 bg-blue-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-blue-100 shrink-0">
              <Users size={30} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-gray-300 tracking-[0.2em]">Tổng khách hàng</p>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">{customers.length}</p>
            </div>
          </div>

          {/* Khách mới trong tháng */}
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="size-16 bg-rose-500 rounded-3xl flex items-center justify-center text-white shadow-lg shadow-rose-100 shrink-0">
              <TrendingUp size={30} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase text-gray-300 tracking-[0.2em]">Khách mới tháng 4</p>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">+12</p>
            </div>
          </div>

          {/* Nút thêm nhanh */}
          <div className="flex items-center justify-end">
             <button className="bg-slate-900 hover:bg-slate-800 text-white w-full h-full rounded-[2.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
                <UserPlus size={20} /> Thêm khách hàng
             </button>
          </div>
        </div>

        {/* --- THANH TÌM KIẾM --- */}
        <div className="relative group">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-rose-500 transition-colors" size={24} />
          <input 
            type="text"
            placeholder="Tìm kiếm hồ sơ khách hàng..."
            className="w-full pl-20 pr-8 py-6 bg-white rounded-[2.5rem] shadow-sm border-2 border-transparent focus:border-rose-100 outline-none font-bold text-lg transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* --- DANH SÁCH KHÁCH HÀNG --- */}
        <div className="space-y-4">
          {filtered.map(c => (
            <CustomerItem 
              key={c.id} 
              customer={c} 
              onEdit={() => handleEditClick(c)} 
            />
          ))}
        </div>
      </div>

      {/* MODAL HIỆN RA ĐỂ SỬA (CHỨA CẢ DANH SÁCH PET) */}
      <EditCustomerModal 
        isOpen={isModalOpen}
        initialData={selectedCustomer}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCustomer}
      />
    </div>
  );
}