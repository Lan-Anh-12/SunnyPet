"use client";

import { useState, JSX } from "react";
import { HeartPulse, Syringe, Scissors, Stethoscope, Pill, TestTube, ChevronRight } from "lucide-react";
import { ServiceModal } from "./ServiceModal";

export interface ServicePrice {
  label: string;
  value: string;
}

export interface ServiceType {
  title: string;
  desc: string; 
  icon: JSX.Element; 
  color: string;
  image: string;
  prices: ServicePrice[];
}

const services: ServiceType[] = [
  { 
    title: "Khám Tổng Quát", 
    desc: "Quy trình kiểm tra sức khỏe toàn diện từ hệ hô hấp, tim mạch đến tầm soát các dấu hiệu bệnh lý tiềm ẩn, giúp thú cưng luôn khỏe mạnh.", 
    icon: <Stethoscope className="size-6" />, 
    color: "bg-pink-50 text-pink-500",
    image: "/service1.png",
    prices: [
      { label: "Cơ bản", value: "200k" },
      { label: "Nâng cao", value: "450k" },
      { label: "VIP", value: "800k" }
    ]
  },
  { 
    title: "Tiêm Phòng", 
    desc: "Cung cấp đầy đủ các loại vaccine phòng bệnh truyền nhiễm nguy hiểm cho chó mèo theo tiêu chuẩn quốc tế, kèm sổ theo dõi sức khỏe.", 
    icon: <Syringe className="size-6" />, 
    color: "bg-yellow-50 text-yellow-500",
    image: "/service2.png",
    prices: [
      { label: "Nội", value: "150k" },
      { label: "Ngoại", value: "350k" },
      { label: "Trọn gói", value: "900k" }
    ]
  },
  { 
    title: "Spa & Grooming", 
    desc: "Dịch vụ làm đẹp đẳng cấp với quy trình tắm sấy, cắt tỉa lông nghệ thuật và vệ sinh chuyên sâu, mang lại vẻ ngoài rạng rỡ.", 
    icon: <Scissors className="size-6" />, 
    color: "bg-teal-50 text-teal-500",
    image: "/service3.png",
    prices: [
      { label: "Tắm sấy", value: "120k" },
      { label: "Cắt tỉa", value: "300k" },
      { label: "Full Combo", value: "550k" }
    ]
  },
  { 
    title: "Phẫu Thuật", 
    desc: "Hệ thống phòng mổ vô trùng hiện đại cùng đội ngũ bác sĩ tay nghề cao, chuyên thực hiện các ca phẫu thuật từ đơn giản đến phức tạp.", 
    icon: <HeartPulse className="size-6" />, 
    color: "bg-purple-50 text-purple-500",
    image: "/service4.png",
    prices: [
      { label: "Triệt sản", value: "600k" },
      { label: "Mổ đẻ", value: "1.5tr" },
      { label: "Chỉnh hình", value: "3tr+" }
    ]
  },
  { 
    title: "Dược & Thuốc", 
    desc: "Cung cấp các loại dược phẩm, thực phẩm chức năng và dinh dưỡng bổ trợ chính hãng, hỗ trợ quá trình điều trị và phục hồi nhanh chóng.", 
    icon: <Pill className="size-6" />, 
    color: "bg-green-50 text-green-500",
    image: "/service5.png",
    prices: [
      { label: "Tẩy giun", value: "50k" },
      { label: "Trị ve rận", value: "180k" },
      { label: "Bổ trợ", value: "300k" }
    ]
  },
  { 
    title: "Xét Nghiệm", 
    desc: "Ứng dụng công nghệ xét nghiệm máu, siêu âm và chẩn đoán hình ảnh tiên tiến nhất để đưa ra kết quả chính xác cho thú cưng.", 
    icon: <TestTube className="size-6" />, 
    color: "bg-blue-50 text-blue-500",
    image: "/service6.png",
    prices: [
      { label: "Máu", value: "250k" },
      { label: "Siêu âm", value: "200k" },
      { label: "X-Quang", value: "400k" }
    ]
  },
];

export function Services() {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);

  return (
    <section className="py-24 bg-white" id="dich-vu">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#E5484D] text-sm font-black uppercase tracking-[0.2em]">Sunny Pet Services</span>
          <h2 className="text-4xl md:text-5xl font-black mt-4 text-gray-900 tracking-tight">Chăm Sóc Toàn Diện</h2>
          <p className="text-gray-500 mt-4 text-lg font-medium">Lựa chọn gói dịch vụ phù hợp nhất cho người bạn nhỏ của bạn.</p>
        </div>
        
        {/* Grid 2 cột để thẻ rộng rãi, không bị hẹp khi có 3 giá bên dưới */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedService(s)}
              className="group bg-white p-8 md:p-10 rounded-[3rem] border border-gray-100 hover:shadow-2xl hover:shadow-red-100/40 hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 rounded-2xl ${s.color} transition-all group-hover:scale-110 group-hover:rotate-6`}>
                    {s.icon}
                  </div>
                  <div className="size-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-[#E5484D] group-hover:text-white group-hover:border-[#E5484D] transition-all">
                    <ChevronRight className="size-5" />
                  </div>
                </div>

                <h3 className="text-2xl font-black mb-3 text-gray-900 leading-tight">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-10 text-sm md:text-base font-medium line-clamp-2">
                  {s.desc}
                </p>
              </div>

              {/* BẢNG GIÁ 3 CỘT TRONG CARD */}
              <div className="grid grid-cols-3 gap-3 pt-8 border-t border-dashed border-gray-100">
                {s.prices.map((price, idx) => (
                  <div 
                    key={idx} 
                    className="group/price relative bg-gray-50/50 rounded-2xl p-4 text-center transition-all duration-300 hover:bg-[#E5484D] hover:shadow-lg hover:shadow-red-200 hover:-translate-y-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn việc mở Modal khi chỉ muốn chọn gói giá
                      console.log(`Đã chọn gói: ${price.label} của ${s.title}`);
                    }}
                  >
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none group-hover/price:text-white/80 transition-colors">
                      {price.label}
                    </p>
                    <p className="text-xl font-black text-gray-900 leading-none group-hover/price:text-white transition-colors">
                      {price.value}
                    </p>
                    
                    {/* Hiệu ứng chấm nhỏ khi hover vào cho "ngầu" */}
                    <div className="absolute top-2 right-2 size-1 bg-white rounded-full opacity-0 group-hover/price:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <ServiceModal 
        isOpen={!!selectedService} 
        onClose={() => setSelectedService(null)} 
        service={selectedService} 
      />
    </section>
  );
}