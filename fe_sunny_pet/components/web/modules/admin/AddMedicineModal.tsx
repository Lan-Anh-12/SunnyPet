"use client";

import React, { useState } from 'react';
import { X, Pill, PackageCheck, DollarSign, Scale, Save, AlertTriangle } from 'lucide-react';

interface AddMedicineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddMedicineModal = ({ isOpen, onClose, onSave }: AddMedicineModalProps) => {
  // 1. Khởi tạo state dựa trên các trường trong bảng Medicines
  const [formData, setFormData] = useState({
    name: '',            // nvarchar NN (Tên thuốc)
    category: '',        // nvarchar (Loại thuốc)
    unit: '',            // nvarchar (Đơn vị tính)
    cost_price: '',      // decimal(18,2) (Giá nhập)
    selling_price: '',   // decimal(18,2) (Giá bán)
    stock_quantity: '',  // integer (Số lượng tồn)
  });

  if (!isOpen) return null;

  // 2. Xử lý thay đổi input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Xử lý gửi form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Chuyển đổi dữ liệu số trước khi gửi về backend
    const dataToSubmit = {
      ...formData,
      cost_price: parseFloat(formData.cost_price) || 0,
      selling_price: parseFloat(formData.selling_price) || 0,
      stock_quantity: parseInt(formData.stock_quantity) || 0,
    };
    onSave(dataToSubmit);
    // Reset form sau khi lưu
    setFormData({ name: '', category: '', unit: '', cost_price: '', selling_price: '', stock_quantity: '' });
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm italic font-sans">
      <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* HEADER: Bo góc lớn, màu rose-500 */}
        <div className="relative p-8 border-b border-gray-50 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-rose-500 rounded-2xl flex items-center justify-center shadow-lg shadow-rose-100 shrink-0">
              <Pill size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Nhập thuốc mới</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">
                Vui lòng điền đầy đủ thông tin thuốc/vật tư vào kho Sunny Pet.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="absolute right-8 top-10 p-2 hover:bg-gray-50 rounded-full text-gray-300 transition-all active:scale-90">
            <X size={24} />
          </button>
        </div>

        {/* FORM BODY: Chia cột sạch sẽ */}
        <form onSubmit={handleSubmit}>
          <div className="p-10 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">
            
            {/* Hàng 1: Tên thuốc (nvarchar NN) */}
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                <Pill size={14} className="text-rose-500"/> Tên thuốc/Vật tư *
              </label>
              <input 
                type="text" required name="name"
                value={formData.name} onChange={handleInputChange}
                placeholder="Ví dụ: Antibiotics Type-A..."
                className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
              />
            </div>

            {/* Hàng 2: Loại và Đơn vị tính */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <PackageCheck size={14} className="text-rose-500"/> Loại (Category)
                </label>
                <select 
                  name="category" value={formData.category} onChange={handleInputChange}
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner appearance-none cursor-pointer"
                >
                  <option value="">— Chọn loại —</option>
                  <option value="Kháng sinh">Kháng sinh</option>
                  <option value="Vaccine">Vaccine</option>
                  <option value="Dụng cụ y tế">Dụng cụ y tế</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <Scale size={14} className="text-rose-500"/> Đơn vị tính (Unit)
                </label>
                <select 
                  name="unit" value={formData.unit} onChange={handleInputChange}
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner appearance-none cursor-pointer"
                >
                  <option value="">— Chọn đơn vị —</option>
                  <option value="Viên">Viên</option>
                  <option value="Liều">Liều</option>
                  <option value="Cái">Cái</option>
                  <option value="Hộp">Hộp</option>
                </select>
              </div>
            </div>

            {/* Hàng 3: Giá và Số lượng */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4 border-t border-dashed border-gray-100">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <DollarSign size={14} className="text-gray-400"/> Giá nhập (Cost)
                </label>
                <input 
                  type="number" step="1000" name="cost_price"
                  value={formData.cost_price} onChange={handleInputChange}
                  placeholder="150000"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-gray-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <DollarSign size={14} className="text-rose-500"/> Giá bán (Selling)
                </label>
                <input 
                  type="number" step="1000" name="selling_price"
                  value={formData.selling_price} onChange={handleInputChange}
                  placeholder="220000"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-rose-200 transition-all text-sm font-bold italic shadow-inner"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2 flex items-center gap-2">
                  <PackageCheck size={14} className="text-blue-500"/> Tồn ban đầu
                </label>
                <input 
                  type="number" name="stock_quantity"
                  value={formData.stock_quantity} onChange={handleInputChange}
                  placeholder="500"
                  className="w-full p-5 bg-gray-50 border border-transparent rounded-[1.8rem] outline-none focus:bg-white focus:border-blue-200 transition-all text-sm font-black italic shadow-inner"
                />
              </div>
            </div>

            {/* Cảnh báo nhỏ về dữ liệu decimal/integer */}
            <div className="bg-amber-50 p-4 rounded-2xl flex items-center gap-3 border border-amber-100 mt-4">
                <AlertTriangle className="text-amber-500 size-6 shrink-0" />
                <p className="text-[10px] text-amber-700 font-bold italic uppercase tracking-wider">
                    Lưu ý: Giá nhập và giá bán sẽ được hệ thống tự động chuyển đổi sang định dạng decimal(18,2) khi lưu vào cơ sở dữ liệu.
                </p>
            </div>
          </div>

          {/* FOOTER: Nút Save to rõ */}
          <div className="p-8 border-t border-gray-50 flex items-center justify-end gap-5 bg-gray-50/30 rounded-b-[2.5rem]">
            <button type="button" onClick={onClose} className="px-10 py-4 rounded-2xl font-black text-xs text-gray-400 hover:bg-gray-100 transition-all uppercase tracking-widest italic">
              Hủy bỏ
            </button>
            <button type="submit" className="bg-rose-500 hover:bg-rose-600 text-white px-14 py-4 rounded-2xl font-black text-sm shadow-xl shadow-rose-200 transition-all flex items-center gap-3 uppercase italic active:scale-95">
              <Save size={20} /> Lưu thông tin thuốc
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMedicineModal;