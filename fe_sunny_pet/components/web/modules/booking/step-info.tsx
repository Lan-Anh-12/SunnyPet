"use client";

import { motion } from "framer-motion";
import { User, Phone, Mail, PawPrint, Dog, CalendarDays } from "lucide-react";

interface StepInfoProps {
  onNext: () => void;
  updateData: (data: any) => void; // Hàm để update formData ở parent
  data: any; // Data đã nhập từ parent (nếu người dùng quay lại từ step 2)
}

type PetType = "Cho" | "Meo" | "Khac";
// Icon cho "Chó" & "Mèo"
const petTypeIcons = {
  Cho: <Dog className="size-5 text-gray-400" />,
  Meo: <Dog className="size-5 text-gray-400" />, // Dùng Dog tạm, bạn thay mèo sau
  Khac: <Dog className="size-5 text-gray-400" />, // Dùng Dog tạm, bạn thay loài khác sau
};

export default function StepInfo({ onNext, updateData, data }: StepInfoProps) {
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    updateData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-10 rounded-[2rem] shadow-sm border border-gray-100 max-w-2xl mx-auto"
    >
      <div className="space-y-10">
        
        {/* SECTION 1: THÔNG TIN CHỦ NUÔI */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            
            <h3 className="text-xl font-bold text-gray-900">Thông tin chủ nuôi</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Họ tên chủ nuôi" name="ownerName" icon={<User className="size-5 text-gray-400" />} />
            <InputField label="Số điện thoại" name="phone" icon={<Phone className="size-5 text-gray-400" />} type="tel" />
          </div>
          
          <InputField label="Email (Dùng để nhận xác nhận)" name="email" icon={<Mail className="size-5 text-gray-400" />} type="email" full />
        </div>

        {/* SECTION 2: THÔNG TIN THÚ CƯNG */}
        <div className="space-y-6 pt-10 border-t border-gray-100">
          <div className="flex items-center gap-3">
            
            <h3 className="text-xl font-bold text-gray-900">Thông tin thú cưng</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Tên thú cưng" name="petName" icon={<PawPrint className="size-5 text-gray-400" />} />
            
            {/* Select cho "Loài" (Chó, Mèo) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
                {data.petType && petTypeIcons[data.petType as PetType]}
                <span>Loài *</span>
              </label>
              <select 
                name="petType"
                value={data.petType || ""}
                onChange={handleInputChange}
                className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-white text-sm focus:border-[#E5484D] focus:ring-1 focus:ring-[#E5484D]/30 transition appearance-none"
              >
                <option value="" disabled>-- Chọn loài --</option>
                <option value="Cho"> Chó</option>
                <option value="Meo"> Mèo</option>
                <option value="Khac"> Khác</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField label="Giống" name="petBreed" icon={<Dog className="size-5 text-gray-400" />} />
            <InputField label="Tuổi (Ví dụ: 2 tuổi hoặc 6 tháng)" name="petAge" icon={<CalendarDays className="size-5 text-gray-400" />} />
          </div>
        </div>

        {/* NÚT "TIẾP THEO" - MÀU ĐỎ THƯƠNG HIỆU */}
        <div className="pt-10 flex justify-end">
          <button 
            onClick={onNext}
            className="bg-[#E5484D] hover:bg-[#C83D44] text-white rounded-full px-12 py-4 font-bold flex items-center gap-2 transition-all hover:gap-3 shadow-lg active:scale-95"
          >
            Tiếp theo <span>→</span>
          </button>
        </div>

      </div>
    </motion.div>
  );
}

// --- COMPONENT INPUTFIELD (Tái sử dụng cho sạch code) ---
interface InputFieldProps {
  label: string;
  name: string;
  icon: React.ReactNode;
  type?: string;
  full?: boolean;
}

function InputField({ label, name, icon, type = "text", full }: InputFieldProps) {
  return (
    <div className={`space-y-2 ${full ? 'w-full' : ''}`}>
      <label className="text-sm font-medium text-gray-600 flex items-center gap-2">
        {icon}
        <span>{label} *</span>
      </label>
      <input 
        type={type}
        name={name}
        className="w-full px-5 py-4 rounded-xl border border-gray-100 bg-white text-sm focus:border-[#E5484D] focus:ring-1 focus:ring-[#E5484D]/30 transition shadow-inner"
        placeholder={`Nhập ${label.toLowerCase()}...`}
      />
    </div>
  );
}