"use client";

import React, { useState, useEffect } from 'react';
import { X, User, Phone, Mail, Dog, MapPin, Save, PlusCircle, Trash2, ShieldCheck } from 'lucide-react';

interface Pet {
  id: string;
  name: string;
  breed: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  pets: Pet[];
}

interface EditCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Customer) => void;
  initialData: Customer | null; // Dữ liệu khách hàng hiện tại để đổ vào form
}

const EditCustomerModal = ({ isOpen, onClose, onSave, initialData }: EditCustomerModalProps) => {
  // 1. Khởi tạo state cho Form
  const [formData, setFormData] = useState<Customer>({
    id: '', name: '', phone: '', email: '', address: '', pets: []
  });

  // 2. Tự động đổ dữ liệu vào Form khi mở Modal
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData(initialData);
    } else {
      // Reset form khi đóng modal
      setFormData({ id: '', name: '', phone: '', email: '', address: '', pets: [] });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  // 3. Logic xử lý input thông tin cá nhân
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 4. Logic xử lý input danh sách Pet
  const handlePetChange = (id: string, field: 'name' | 'breed', value: string) => {
    setFormData({
      ...formData,
      pets: formData.pets.map(pet => pet.id === id ? { ...pet, [field]: value } : pet)
    });
  };

  const addPet = () => {
    const newPet = { id: Date.now().toString(), name: '', breed: '' };
    setFormData({ ...formData, pets: [...formData.pets, newPet] });
  };

  const removePet = (id: string) => {
    setFormData({ ...formData, pets: formData.pets.filter(pet => pet.id !== id) });
  };

  // 5. Logic gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    // Khung fixed inset-0 để Modal hiển thị trên cùng, không bị lỗi
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm italic font-sans">
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* HEADER: Đúng style Add Staff, bo góc lớn, màu rose-500 */}
        <div className="relative p-8 border-b border-gray-50 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100 shrink-0">
              <ShieldCheck size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Cập nhật hồ sơ</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                Khách hàng: <span className="text-rose-500 font-extrabold">{initialData?.name || 'Mới'}</span> — ID: {initialData?.id || 'N/A'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="absolute right-8 top-10 p-2 hover:bg-gray-50 rounded-full text-gray-300 transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* FORM BODY: Chia 2 cột sạch sẽ */}
        <form onSubmit={handleSubmit}>
          <div className="p-10 max-h-[65vh] overflow-y-auto custom-scrollbar space-y-10">
            
            {/* Row 1: Thông tin cá nhân cơ bản */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <User size={14} className="text-rose-500"/> Họ và tên *
                </label>
                <input 
                  type="text" required name="name"
                  value={formData.name} onChange={handleInputChange}
                  placeholder="Nguyễn Văn A"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Phone size={14} className="text-rose-500"/> Số điện thoại *
                </label>
                <input 
                  type="text" required name="phone"
                  value={formData.phone} onChange={handleInputChange}
                  placeholder="09xx xxx xxx"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Mail size={14} className="text-rose-500"/> Email
                </label>
                <input 
                  type="email" name="email"
                  value={formData.email} onChange={handleInputChange}
                  placeholder="khachhang@sunnypet.vn"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <MapPin size={14} className="text-rose-500"/> Địa chỉ liên hệ
                </label>
                <input 
                  type="text" name="address"
                  value={formData.address} onChange={handleInputChange}
                  placeholder="12 Lê Lợi, Q1, TP.HCM"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>
            </div>

            {/* Row 2: Quản lý danh sách Thú cưng */}
            <div className="space-y-6 pt-4 border-t border-dashed border-gray-100">
              <div className="flex justify-between items-center px-2">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 italic">
                  <Dog size={16} className="text-rose-500"/> Thú cưng ({formData.pets.length})
                </h4>
                <button type="button" onClick={addPet} className="text-[10px] font-black text-rose-600 hover:bg-rose-100 px-4 py-1.5 rounded-lg transition-all uppercase flex items-center gap-1.5">+ Thêm Pet</button>
              </div>

              <div className="space-y-4">
                {formData.pets.map((pet, index) => (
                  <div key={pet.id} className="flex gap-4 p-4 bg-gray-50/50 rounded-[1.8rem] border border-gray-50 animate-in slide-in-from-right-2 duration-200 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-gray-300 ml-1">Tên Pet *</label>
                        <input 
                            type="text" required
                            value={pet.name} onChange={(e) => handlePetChange(pet.id, 'name', e.target.value)}
                            placeholder="Milo"
                            className="w-full p-4 bg-white border border-transparent rounded-2xl outline-none focus:border-rose-100 text-xs font-bold italic shadow-sm"
                        />
                    </div>
                    <div className="flex-1 space-y-2">
                        <label className="text-[10px] font-bold text-gray-300 ml-1">Giống loài</label>
                        <input 
                            type="text"
                            value={pet.breed} onChange={(e) => handlePetChange(pet.id, 'breed', e.target.value)}
                            placeholder="Golden Retriever"
                            className="w-full p-4 bg-white border border-transparent rounded-2xl outline-none focus:border-rose-100 text-xs font-bold italic shadow-sm"
                        />
                    </div>
                    <button type="button" onClick={() => removePet(pet.id)} className="p-4 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FOOTER: Nút to rõ giống style Add Staff */}
          <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-5 bg-gray-50/30 rounded-b-[2.5rem]">
            <button type="button" onClick={onClose} className="px-10 py-4 rounded-2xl font-black text-xs text-gray-400 hover:bg-gray-100 transition-all uppercase tracking-widest italic">
              Hủy bỏ
            </button>
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-14 py-4 rounded-2xl font-black text-sm shadow-xl shadow-rose-200 transition-all flex items-center gap-3 uppercase italic active:scale-95">
              <Save size={20} /> Lưu thay đổi hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomerModal;