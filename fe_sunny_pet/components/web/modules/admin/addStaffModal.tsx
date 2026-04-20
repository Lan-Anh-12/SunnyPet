"use client";

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, Shield, Briefcase, Lock } from 'lucide-react';

interface AddStaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData?: any;
}

const AddStaffModal = ({ isOpen, onClose, onSave, initialData }: AddStaffModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'DOCTOR',
    specialization: ''
  });

  // Tự động đổ dữ liệu vào Form khi mở Modal ở chế độ Chỉnh sửa
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        password: '', // Thường không hiện mật khẩu cũ vì lý do bảo mật
        role: initialData.role || 'DOCTOR',
        specialization: initialData.specialization || ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', password: '', role: 'DOCTOR', specialization: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="relative p-8 border-b border-gray-50">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-100">
              <User size={20} className="text-white" />
            </div>
            {initialData ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
          </h2>
          <button onClick={onClose} className="absolute right-8 top-8 p-2 hover:bg-gray-50 rounded-full text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Họ và tên *</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    type="text" placeholder="Nguyễn Văn A" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    type="email" placeholder="bacsi@sunnypet.vn" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Số điện thoại *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    type="text" placeholder="09xx xxx xxx" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">{initialData ? 'Mật khẩu mới (bỏ trống nếu không đổi)' : 'Mật khẩu tạm thời *'}</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    required={!initialData}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    type="password" placeholder="••••••••" className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-medium" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Vai trò *</label>
                <div className="relative">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold text-slate-700 appearance-none">
                    <option value="DOCTOR">Bác sĩ (Doctor)</option>
                    <option value="ADMIN">Quản trị viên (Admin)</option>
                    <option value="STAFF">Nhân viên lễ tân</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">Chuyên khoa</label>
                <div className="relative">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                  <input 
                    value={formData.specialization}
                    onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                    type="text" placeholder="Nội khoa, Phẫu thuật..." className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-medium" />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-3 bg-gray-50/30">
            <button type="button" onClick={onClose} className="px-8 py-3 rounded-xl font-bold text-sm text-gray-400 hover:bg-gray-100 transition-all">
              Hủy bỏ
            </button>
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-3 rounded-xl font-bold text-sm shadow-lg shadow-rose-100 transition-all">
              {initialData ? 'Lưu thay đổi' : 'Tạo tài khoản'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStaffModal;