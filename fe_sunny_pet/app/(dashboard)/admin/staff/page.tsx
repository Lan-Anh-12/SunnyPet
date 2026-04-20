"use client";

import React, { useState } from 'react';
import { 
  Search, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Trash2, 
  Edit3,
  UserPlus,
  Plus
} from 'lucide-react';
import AddStaffModal from '@/components/web/modules/admin/addStaffModal';

const initialStaff = [
  { id: 1, name: "Nguyễn Thị Lan", role: "DOCTOR", email: "lan.nt@sunnypet.vn", phone: "0901 234 567", status: "Active", specialization: "Bác sĩ trưởng" },
  { id: 2, name: "Trần Minh Khoa", role: "DOCTOR", email: "khoa.tm@sunnypet.vn", phone: "0902 345 678", status: "Active", specialization: "Phẫu thuật" },
  { id: 3, name: "Phạm Hồng Nhung", role: "STAFF", email: "nhung.ph@sunnypet.vn", phone: "0903 456 789", status: "On Leave", specialization: "Y tá" },
];

const StaffManagementPage = () => {
  const [staffList, setStaffList] = useState(initialStaff);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null); // Lưu nhân viên đang được sửa

  const handleOpenAdd = () => {
    setEditingStaff(null); // Reset để Modal hiểu là thêm mới
    setIsModalOpen(true);
  };

  const handleOpenEdit = (staff: any) => {
    setEditingStaff(staff); // Gán nhân viên hiện tại vào để sửa
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingStaff) {
      // Cập nhật nhân viên cũ
      setStaffList(prev => prev.map(s => s.id === editingStaff.id ? { ...s, ...data } : s));
    } else {
      // Thêm nhân viên mới (tạm thời tạo ID ngẫu nhiên)
      setStaffList(prev => [...prev, { ...data, id: Date.now(), status: "Active" }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-8 text-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Đội ngũ nhân sự</h1>
          <p className="text-gray-400 text-sm mt-1">Quản lý tài khoản và phân quyền bác sĩ</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
            <input type="text" placeholder="Tìm kiếm..." className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-full w-72 text-sm outline-none focus:border-rose-200" />
          </div>
          <button onClick={handleOpenAdd} className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-100 transition-all">
            <UserPlus size={18} /> Thêm nhân viên
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staffList.map((staff) => (
          <div key={staff.id} className="bg-white p-6 rounded-[2.5rem] border border-gray-50 shadow-xl shadow-gray-100/50 hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 text-2xl font-bold group-hover:bg-rose-500 group-hover:text-white transition-all">
                {staff.name.charAt(0)}
              </div>
              <div className="flex gap-1">
                <button onClick={() => handleOpenEdit(staff)} className="p-2 hover:bg-gray-50 rounded-xl text-gray-300 hover:text-rose-500 transition-all">
                  <Edit3 size={18} />
                </button>
                <button className="p-2 hover:bg-red-50 rounded-xl text-gray-300 hover:text-red-500 transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-800 mb-1">{staff.name}</h3>
              <div className="flex items-center gap-2 text-rose-500">
                <ShieldCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{staff.role}</span>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-50">
              <div className="flex items-center gap-3 text-gray-500">
                <Mail size={14} /> <span className="text-xs font-medium">{staff.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-500">
                <Phone size={14} /> <span className="text-xs font-medium">{staff.phone}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase ${staff.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                ● {staff.status}
              </span>
            </div>
          </div>
        ))}

        <div onClick={handleOpenAdd} className="border-2 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center p-8 hover:border-rose-200 hover:bg-rose-50/20 cursor-pointer group min-h-[300px] transition-all">
          <Plus size={28} className="text-gray-300 group-hover:text-rose-500 mb-2" />
          <span className="font-bold text-gray-300 group-hover:text-rose-500">Thêm nhân viên mới</span>
        </div>
      </div>

      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        initialData={editingStaff}
      />
    </div>
  );
};

export default StaffManagementPage;