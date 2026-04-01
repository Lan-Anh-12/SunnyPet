"use client";
import { motion } from "framer-motion";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";

interface StepConfirmProps {
  onBack: () => void;
  onSubmit: () => void; // Hàm cuối cùng để gọi API gửi dữ liệu
  updateData: (data: any) => void;
  data: any;
}

export default function StepConfirm({ onBack, onSubmit, updateData, data }: StepConfirmProps) {
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="space-y-8">
        <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="size-6 text-[#E5484D]" />
          Lý do & xác nhận
        </h3>

        {/* LÝ DO KHÁM */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Lý do khám *</label>
            <input 
              type="text"
              placeholder="Tiêm phòng, khám sức khỏe, bệnh cụ thể..."
              className="w-full px-5 py-4 rounded-xl border border-gray-100 focus:border-[#E5484D] outline-none transition"
              value={data.reason || ""}
              onChange={(e) => updateData({ ...data, reason: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600">Ghi chú thêm</label>
            <textarea 
              rows={3}
              placeholder="Thông tin thêm về tình trạng sức khỏe..."
              className="w-full px-5 py-4 rounded-xl border border-gray-100 focus:border-[#E5484D] outline-none transition resize-none"
              value={data.note || ""}
              onChange={(e) => updateData({ ...data, note: e.target.value })}
            />
          </div>
        </div>

        {/* BẢNG TÓM TẮT THÔNG TIN (Review Box) */}
        <div className="bg-[#FFF5F5] rounded-2xl p-6 space-y-4 border border-[#E5484D]/10">
          <h4 className="text-[#E5484D] font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            <AlertCircle className="size-4" /> Xác nhận thông tin
          </h4>
          
          <div className="space-y-3 text-sm">
            <InfoRow label="Chủ nuôi" value={data.ownerName} />
            <InfoRow label="Điện thoại" value={data.phone} />
            <InfoRow label="Thú cưng" value={`${data.petName} (${data.petType || 'Chưa chọn'}, ${data.petBreed || 'N/A'})`} />
            <InfoRow label="Bác sĩ" value={data.doctorId === 'auto' ? "Tùy phân công" : data.doctorId} />
            <InfoRow label="Ngày & giờ" value={`${data.date} - ${data.time}`} className="font-bold text-gray-900" />
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="pt-6 flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex-1 py-4 font-bold text-gray-500 border border-gray-100 rounded-2xl hover:bg-gray-50 transition"
          >
            ← Quay lại
          </button>
          <button 
            onClick={onSubmit}
            disabled={!data.reason}
            className={` py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
              !data.reason 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-[#E5484D] hover:bg-[#C83D44] shadow-[#E5484D]/20"
            }`}
          >
            <CheckCircle2 className="size-5" />
            Xác nhận đặt lịch
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value, className = "" }: { label: string; value: string; className?: string }) {
  return (
    <div className="flex justify-between items-center border-b border-white pb-2">
      <span className="text-gray-500">{label}:</span>
      <span className={`font-medium text-right ${className}`}>{value || "---"}</span>
    </div>
  );
}