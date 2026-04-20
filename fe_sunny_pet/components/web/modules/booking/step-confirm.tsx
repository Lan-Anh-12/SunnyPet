"use client";

import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertCircle, ChevronLeft } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// Xóa bỏ phần nhận params và use(params)
interface StepConfirmProps {
  onBack: () => void;
  onSubmit: () => void; 
  updateData: (data: any) => void;
  data: any; // Dữ liệu ngày tháng đã nằm trong này rồi
}

export default function StepConfirm({ onBack, onSubmit, updateData, data }: StepConfirmProps) {
  
  // Kiểm tra nếu chưa có ngày thì không render hoặc hiển thị mặc định
  const displayDate = data.date ? new Date(data.date) : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full bg-[#E5484D]" />
           <h3 className="text-lg font-black text-gray-900 uppercase tracking-tighter">
             Xác nhận lịch khám
           </h3>
        </div>

        {/* LÝ DO KHÁM */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-1">Lý do khám *</label>
          <input 
            type="text"
            placeholder="Tiêm phòng, khám định kỳ..."
            className="w-full h-12 px-5 rounded-xl border-2 border-gray-50 bg-gray-50/30 font-bold text-sm focus:border-[#E5484D] outline-none transition-all"
            value={data.reason || ""}
            onChange={(e) => updateData({ ...data, reason: e.target.value })}
          />
        </div>

        {/* TÓM TẮT GỌN GÀNG (Giống style trang chủ) */}
        <div className="bg-gray-50/50 rounded-[2rem] p-6 border border-gray-100">
          <div className="grid grid-cols-2 gap-y-5">
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Khách hàng</p>
              <p className="text-sm font-bold text-gray-900">{data.ownerName || "Chưa nhập"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Thú cưng</p>
              <p className="text-sm font-bold text-gray-900">{data.petName || "Chưa chọn"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Bác sĩ</p>
              <p className="text-sm font-bold text-[#E5484D]">{data.doctorId === 'auto' ? "Tùy phân công" : "Bác sĩ riêng"}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Lịch hẹn</p>
              <p className="text-sm font-black text-gray-900">
                {data.time} • {format(displayDate, "dd/MM", { locale: vi })}
              </p>
            </div>
          </div>
        </div>

        {/* NÚT BẤM */}
        <div className="pt-4 flex items-center gap-3">
          <button onClick={onBack} className="h-12 px-6 font-black text-[10px] uppercase tracking-widest text-gray-400">Quay lại</button>
          <button 
            onClick={onSubmit}
            disabled={!data.reason}
            className={`flex-1 h-14 rounded-2xl font-black text-white shadow-lg ${
            !data.reason ? "bg-gray-200" : "bg-[#E5484D] hover:bg-[#c4363a]"
          }`}
          >
            Xác nhận đặt lịch ngay
          </button>
        </div>
      </div>
    </motion.div>
  );
}