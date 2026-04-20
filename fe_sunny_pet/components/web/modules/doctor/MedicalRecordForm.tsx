"use client";

import React, { useState, useEffect } from 'react';
import { X, ClipboardList, Activity, Stethoscope, Syringe, Pill, Save, Trash2 } from 'lucide-react';

// Cập nhật Interface để khớp với page.tsx
interface MedicalRecordFormProps {
  appointment: {
    id: string;
    time: string;
    pet: string;
    species: string;
    owner: string;
    note: string;
    status: string;
  };
  // Thêm dấu ? để không bắt buộc nếu bạn dùng trong Sheet của shadcn
  isOpen?: boolean; 
  onClose?: () => void;
  onSave?: (data: any) => void; 
}

const MedicalRecordForm = ({ appointment, isOpen = true, onClose, onSave }: MedicalRecordFormProps) => {
  // 1. Khởi tạo state
  const [formData, setFormData] = useState({
    symptoms: '',
    diagnosis: '',
    services: [{ id: Date.now(), serviceName: '' }],
    medicines: [{ id: Date.now(), medicineName: '', quantity: '1' }]
  });

  // 2. Reset form
  useEffect(() => {
    if (isOpen) {
      setFormData({
        symptoms: '',
        diagnosis: '',
        services: [{ id: Date.now(), serviceName: '' }],
        medicines: [{ id: Date.now(), medicineName: '', quantity: '1' }]
      });
    }
  }, [isOpen]);

  // 3. Xử lý lưu
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof onSave === 'function') {
      onSave(formData);
    } else {
      // Nếu chưa có API, tạm thời log ra để kiểm tra data
      console.log("Dữ liệu bệnh án mới của Lan Anh:", formData);
      alert("Đã lưu bệnh án tạm thời (Xem console log)");
    }
  };

  // Logic thêm/xóa dòng (giữ nguyên của bạn)
  const addService = () => setFormData({
    ...formData, 
    services: [...formData.services, { id: Date.now(), serviceName: '' }]
  });

  const addMedicine = () => setFormData({
    ...formData, 
    medicines: [...formData.medicines, { id: Date.now(), medicineName: '', quantity: '1' }]
  });

  const removeService = (id: number) => setFormData({
    ...formData, 
    services: formData.services.filter(s => s.id !== id)
  });

  const removeMedicine = (id: number) => setFormData({
    ...formData, 
    medicines: formData.medicines.filter(m => m.id !== id)
  });

  return (
    <div className="w-full bg-white italic font-sans">
      {/* Header: Hiển thị thông tin Pet từ Props */}
      <div className="relative p-8 border-b border-gray-50 bg-white">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100 shrink-0">
            <ClipboardList size={28} className="text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Lập bệnh án mới</h2>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
              BN: <span className="text-rose-500">{appointment?.pet}</span> ({appointment?.species}) — CHỦ: {appointment?.owner}
            </p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="absolute right-8 top-10 p-2 hover:bg-gray-50 rounded-full text-gray-300 transition-all active:scale-90">
            <X size={24} />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="p-10 space-y-10">
          {/* Hàng 1: Triệu chứng & Chẩn đoán */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <Activity size={14} className="text-rose-500"/> Triệu chứng lâm sàng *
              </label>
              <textarea 
                required
                value={formData.symptoms}
                onChange={(e) => setFormData({...formData, symptoms: e.target.value})}
                placeholder="Mô tả dấu hiệu bệnh..."
                className="w-full p-6 bg-gray-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic min-h-[140px] shadow-inner"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <Stethoscope size={14} className="text-rose-500"/> Chẩn đoán bác sĩ *
              </label>
              <textarea 
                required
                value={formData.diagnosis}
                onChange={(e) => setFormData({...formData, diagnosis: e.target.value})}
                placeholder="Kết luận sau khi thăm khám..."
                className="w-full p-6 bg-gray-50 border border-transparent rounded-[2rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic min-h-[140px] shadow-inner"
              />
            </div>
          </div>

          {/* Hàng 2: Dịch vụ & Đơn thuốc */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {/* Cột Dịch vụ */}
            <div className="space-y-5 bg-blue-50/30 p-6 rounded-[2.5rem] border border-blue-50">
              <div className="flex justify-between items-center px-2">
                <h4 className="text-[11px] font-black uppercase text-blue-500 tracking-widest flex items-center gap-2 italic">
                  <Syringe size={16}/> Dịch vụ chỉ định
                </h4>
                <button type="button" onClick={addService} className="text-[10px] font-black text-blue-600 hover:bg-blue-100 px-3 py-1 rounded-lg transition-all uppercase">+ Thêm</button>
              </div>
              <div className="space-y-3">
                {formData.services.map((s) => (
                  <div key={s.id} className="flex gap-2 group">
                    <select className="flex-1 px-5 py-3.5 bg-white border border-transparent rounded-2xl outline-none focus:border-blue-200 text-xs font-bold italic shadow-sm">
                      <option value="">— Chọn dịch vụ —</option>
                      <option value="x-ray">Siêu âm tổng quát</option>
                      <option value="blood">Xét nghiệm máu</option>
                    </select>
                    <button type="button" onClick={() => removeService(s.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột Đơn thuốc */}
            <div className="space-y-5 bg-rose-50/30 p-6 rounded-[2.5rem] border border-rose-50">
              <div className="flex justify-between items-center px-2">
                <h4 className="text-[11px] font-black uppercase text-rose-500 tracking-widest flex items-center gap-2 italic">
                  <Pill size={16}/> Đơn thuốc kê khai
                </h4>
                <button type="button" onClick={addMedicine} className="text-[10px] font-black text-rose-600 hover:bg-rose-100 px-3 py-1 rounded-lg transition-all uppercase">+ Thêm</button>
              </div>
              <div className="space-y-3">
                {formData.medicines.map((m) => (
                  <div key={m.id} className="flex gap-2 group">
                    <select className="flex-1 px-5 py-3.5 bg-white border border-transparent rounded-2xl outline-none focus:border-rose-200 text-xs font-bold italic shadow-sm">
                      <option value="">— Tên thuốc —</option>
                      <option value="khang-sinh">Kháng sinh</option>
                    </select>
                    <input type="number" placeholder="SL" className="w-16 px-2 py-3.5 bg-white border border-transparent rounded-2xl text-center font-black text-xs outline-none focus:border-rose-200 shadow-sm" />
                    <button type="button" onClick={() => removeMedicine(m.id)} className="p-3 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-5 bg-gray-50/30">
          <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-14 py-4 rounded-2xl font-black text-sm shadow-xl shadow-rose-200 transition-all flex items-center gap-3 uppercase italic active:scale-95">
            <Save size={20} strokeWidth={2.5} /> Hoàn tất & Lưu bệnh án
          </button>
        </div>
      </form>
    </div>
  );
};

export default MedicalRecordForm;