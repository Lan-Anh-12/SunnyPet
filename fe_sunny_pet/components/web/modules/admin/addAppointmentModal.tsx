"use client";

import React from 'react';
import { X, User, CalendarDays } from 'lucide-react';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime?: string;
  selectedDoctor?: string;
}

const AddAppointmentModal = ({ isOpen, onClose, selectedTime, selectedDoctor }: AddAppointmentModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        
        {/* Nút Đóng */}
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Thêm lịch khám mới</h2>

        <form className="space-y-6">
          {/* PHẦN 1: THÔNG TIN CHỦ NUÔI (Customer Info) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wider">Thông tin khách hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Tên khách hàng *</label>
                <input type="text" placeholder="Ví dụ: Lê Anh Tuấn" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Số điện thoại *</label>
                <input type="text" placeholder="0901234567" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Email</label>
              <input type="email" placeholder="tuan@gmail.com" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* PHẦN 2: THÔNG TIN THÚ CƯNG (Pet Info từ View) */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wider">Thông tin thú cưng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Tên thú cưng (Pet Name)</label>
                <input type="text" placeholder="Milo, Lu Lu..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Loài (Species)</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none bg-white">
                  <option>Chó</option>
                  <option>Mèo</option>
                  <option>Khác</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Giống (Breed)</label>
                <input type="text" placeholder="Poodle, Golden..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Tháng sinh</label>
                <input type="number" min="1" max="12" placeholder="1-12" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Năm sinh</label>
                <input type="number" placeholder="2023" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all" />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* PHẦN 3: CHI TIẾT LỊCH KHÁM */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-rose-500 uppercase tracking-wider">Chi tiết lịch hẹn</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Bác sĩ phụ trách</label>
                <select defaultValue={selectedDoctor} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none bg-white transition-all">
                  <option>{selectedDoctor || "Chọn bác sĩ"}</option>
                  <option>BS. Nguyễn Thị Lan</option>
                  <option>BS. Trần Minh Khoa</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Giờ khám</label>
                <input 
                  type="text" 
                  value={selectedTime} 
                  readOnly 
                  className="w-full border border-gray-100 bg-gray-50 rounded-xl px-4 py-2.5 text-gray-500 outline-none cursor-not-allowed" 
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Lý do khám</label>
              <textarea rows={2} placeholder="Mô tả triệu chứng..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-rose-400 outline-none transition-all resize-none" />
            </div>
          </div>

          {/* Nút Thao Tác */}
          <div className="flex gap-4 pt-4 pb-2">
            <button 
              type="button" 
              onClick={onClose}
              className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-50 transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              type="submit"
              className="flex-1 px-6 py-3.5 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-lg shadow-rose-200 transition-all active:scale-[0.98]"
            >
              Lưu lịch khám
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointmentModal;