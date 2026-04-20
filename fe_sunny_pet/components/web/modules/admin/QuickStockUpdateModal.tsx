"use client";
import React, { useState } from 'react';
import { PackagePlus, Save, X, AlertCircle } from 'lucide-react';

export const QuickStockUpdateModal = ({ isOpen, product, onClose, onSave }: any) => {
  const [adjustValue, setAdjustValue] = useState(0); // Số lượng nhập thêm hoặc bớt
  const [reason, setReason] = useState("Nhập hàng định kỳ");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm italic font-sans p-4">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden">
        
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <PackagePlus size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Nhập/Xuất Kho</h2>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product?.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-rose-500 transition-colors"><X size={24}/></button>
        </div>

        <div className="p-8 space-y-6">
          {/* Hiện số tồn hiện tại */}
          <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
            <span className="text-xs font-bold text-slate-500 uppercase italic">Tồn kho hiện tại:</span>
            <span className="text-xl font-black text-slate-800">{product?.stock || 0}</span>
          </div>

          {/* Ô nhập số lượng thay đổi */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2 italic">Số lượng thay đổi (+/-)</label>
            <div className="relative">
              <input 
                type="number"
                value={adjustValue}
                onChange={(e) => setAdjustValue(parseInt(e.target.value))}
                className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-blue-200 focus:bg-white rounded-2xl outline-none font-black text-2xl text-center transition-all"
              />
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-gray-300 uppercase">Input</div>
            </div>
            <p className="text-[9px] text-amber-500 font-bold flex items-center gap-1 ml-2 italic">
              <AlertCircle size={10}/> Dùng số âm (-) để xuất kho, số dương (+) để nhập kho
            </p>
          </div>

          {/* Ô nhập lý do */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase text-gray-400 ml-2 italic">Lý do thay đổi</label>
            <input 
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ví dụ: Nhập hàng mới, Hàng lỗi..."
              className="w-full p-4 bg-gray-50 border border-transparent rounded-2xl outline-none focus:bg-white focus:border-rose-100 text-sm font-bold italic"
            />
          </div>
        </div>

        <div className="p-8 bg-gray-50/50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 font-black text-xs text-gray-400 uppercase tracking-widest italic">Hủy</button>
          <button 
            onClick={() => onSave(product.id, adjustValue, reason)}
            className="flex-[2] bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2 italic active:scale-95"
          >
            <Save size={16}/> Xác nhận cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};