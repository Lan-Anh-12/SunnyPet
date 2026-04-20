"use client";
import React, { useState } from 'react';
import { User, Phone, Mail, History, ChevronDown, ChevronUp, Edit3 } from 'lucide-react';

// Sửa lại type onEdit không cần truyền ID vì Page đã nắm giữ dữ liệu
export const CustomerItem = ({ customer, onEdit }: { customer: any, onEdit: () => void }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-[2.5rem] p-7 shadow-sm border border-gray-50 hover:shadow-md transition-all italic font-sans relative group">
      <div className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <div className="size-14 bg-slate-800 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg">
            {customer.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
               <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter leading-none">{customer.name}</h3>
               {/* Nút Edit gọi hàm từ Page truyền xuống */}
               <button 
                  onClick={(e) => {
                    e.stopPropagation(); // Ngăn việc bấm vào nút làm nhảy toggle accordion
                    onEdit();
                  }}
                  className="p-2 text-gray-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all"
               >
                  <Edit3 size={16} />
               </button>
            </div>
            <div className="flex gap-4 mt-1">
              <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><Phone size={12}/> {customer.phone}</p>
              <p className="text-[11px] font-bold text-gray-400 flex items-center gap-1.5"><Mail size={12}/> {customer.email}</p>
            </div>
          </div>
        </div>

        {/* Nút xem lịch sử */}
        <div className="flex items-center gap-3">
          {customer.history && customer.history.length > 0 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                isExpanded ? 'bg-rose-500 text-white shadow-lg shadow-rose-100' : 'bg-gray-50 text-gray-400'
              }`}
            >
              <History size={14} />
              {isExpanded ? 'Đóng' : `Lịch sử (${customer.history.length})`}
              {isExpanded ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
            </button>
          )}
        </div>
      </div>

      {/* Accordion Lịch sử */}
      <div className={`grid transition-all duration-300 ${isExpanded ? 'grid-rows-[1fr] opacity-100 mt-6 pt-6 border-t border-dashed' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}>
        <div className="space-y-2">
          {customer.history?.map((record: any, idx: number) => (
            <div key={idx} className="flex items-center justify-between bg-gray-50/50 p-4 rounded-2xl border border-transparent hover:border-rose-100 transition-all group/item">
               <span className="text-xs font-bold text-slate-700">{record.date} — {record.petName}: {record.reason}</span>
               <span className="text-[9px] font-black px-2 py-1 bg-green-50 text-green-600 rounded-lg uppercase italic">{record.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};