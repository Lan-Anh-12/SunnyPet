import { CalendarDays } from "lucide-react";
import Link from "next/dist/client/link";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/image.png" // Thay bằng ảnh bác sĩ và mấy chú chó của bạn
          className="w-full h-full object-cover"
          alt="Sunny Pet Hero"
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Lớp phủ tối để nổi bật chữ */}
      </div>

      {/* Hero Content */}
      <div className="container relative z-10 px-6 text-white text-center md:text-left">
        <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm mb-6 border border-white/30">
          • Phòng khám thú cưng uy tín tại TP.HCM
        </div>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
          Chăm sóc thú cưng <br /> 
          <span className="text-[#E5484D]">yêu quý</span> của bạn
        </h1>
        <p className="text-lg md:text-xl font-light max-w-2xl mb-10 opacity-90">
          Đội ngũ bác sĩ thú y tận tâm, trang thiết bị hiện đại. Sunny Pet cam kết mang lại sức khỏe tốt nhất cho người bạn đồng hành của bạn.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4">
          <Link href="/booking" className="w-max">
              <button className="bg-[#E5484D] hover:bg-[#C83D44] text-white px-8 py-4 rounded-full font-black transition flex items-center justify-center gap-2">
                <CalendarDays className="size-5" /> {/* Tăng size lên 5 cho cân đối với chữ */}
                <span className="whitespace-nowrap">Đặt lịch khám ngay</span>
            </button>
          </Link>
          <Link href="#dich-vu">
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md px-8 py-4 rounded-full font-semibold border border-white/30 transition">
              ⓘ Xem dịch vụ
            </button>
          </Link>
        </div>

        {/* Thống kê ở dưới cùng của Hero */}
        <div className="grid grid-cols-3 gap-8 mt-20 max-w-xl">
          <div><p className="text-3xl font-bold">2,500+</p><p className="text-xs opacity-70">Thú cưng chăm sóc</p></div>
          <div><p className="text-3xl font-bold">3</p><p className="text-xs opacity-70">Bác sĩ chuyên khoa</p></div>
          <div><p className="text-3xl font-bold">4.9★</p><p className="text-xs opacity-70">Đánh giá trung bình</p></div>
        </div>
      </div>
    </section>
  );
}