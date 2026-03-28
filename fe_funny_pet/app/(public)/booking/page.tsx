"use client";

import { useState } from "react";
import StepInfo from "../../../components/web/modules/booking/step-info";
import StepService from "../../../components/web/modules/booking/step-service";
import StepConfirm from "../../../components/web/modules/booking/step-confirm";

export default function BookingPage() {
  const [step, setStep] = useState(1);
  
  // 1. Khởi tạo state với đầy đủ các trường dữ liệu cần thiết
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    petName: "",
    petType: "",
    petBreed: "",
    petAge: "",
    doctorId: "auto", // Mặc định chọn "Tùy phân công"
    date: "",
    time: "",
    reason: "",
    note: ""
  });

  // 2. Hàm cập nhật dữ liệu (để truyền vào các step con)
  const updateFormData = (newData: any) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // 3. Hàm xử lý khi nhấn "Xác nhận đặt lịch" ở bước cuối
  const handleFinalSubmit = () => {
    console.log("Dữ liệu gửi về Spring Boot:", formData);
    // Sau này bạn sẽ dùng fetch hoặc axios để đẩy data vào SQL Server tại đây
    alert("Cảm ơn bạn! Lịch hẹn đã được gửi thành công.");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* TIÊU ĐỀ TRANG */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Đặt lịch khám</h1>
          <p className="text-gray-500">Chọn thời gian phù hợp, chúng tôi sẽ xác nhận trong 15 phút</p>
        </div>

        {/* THANH TIẾN TRÌNH (PROGRESS BAR) */}
        <div className="flex justify-center items-center gap-4 mb-16">
          <StepCircle number={1} active={step >= 1} />
          <div className={`w-16 h-[2px] ${step >= 2 ? "bg-[#E5484D]" : "bg-gray-200"}`} />
          <StepCircle number={2} active={step >= 2} />
          <div className={`w-16 h-[2px] ${step >= 3 ? "bg-[#E5484D]" : "bg-gray-200"}`} />
          <StepCircle number={3} active={step >= 3} />
        </div>

        {/* NỘI DUNG CÁC BƯỚC (Đã truyền đủ props để hết lỗi TypeScript) */}
        <div className="mt-8">
          {step === 1 && (
            <StepInfo 
              onNext={() => setStep(2)} 
              updateData={updateFormData} 
              data={formData} 
            />
          )}

          {step === 2 && (
            <StepService 
              onNext={() => setStep(3)} 
              onBack={() => setStep(1)} 
              updateData={updateFormData} 
              data={formData} 
            />
          )}

          {step === 3 && (
            <StepConfirm 
              onBack={() => setStep(2)} 
              onSubmit={handleFinalSubmit} 
              updateData={updateFormData} 
              data={formData} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

// --- Component phụ cho hình tròn tiến trình ---
function StepCircle({ number, active }: { number: number; active: boolean }) {
  return (
    <div 
      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
        active 
        ? "bg-[#E5484D] text-white shadow-lg shadow-[#E5484D]/30 scale-110" 
        : "bg-gray-200 text-gray-400"
      }`}
    >
      {number}
    </div>
  );
}