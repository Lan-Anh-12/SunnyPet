import Link from "next/link";
import Image from "next/image"; 
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoMailOutline, 
  IoTimeOutline 
} from "react-icons/io5";
import { 
  FaFacebookF, 
  FaInstagram, 
  FaYoutube, 
  FaTiktok 
} from "react-icons/fa";

const quickLinks = [
  { name: "Trang chủ", link: "/" },
  { name: "Dịch vụ", link: "/#dich-vu" },
  { name: "Đội ngũ", link: "/#bac-si" },
  { name: "Đánh giá", link: "/#danh-gia" },
  { name: "Đặt lịch", link: "/booking" },
];
export default function Footer() {
  return (
    <footer className="bg-[#590B19] text-[#EADBDD] py-12" id="lien-he">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
          
          {/* CỘT 1: GIỚI THIỆU */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {/* Logo của bạn */}
              <div className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white bg-green-100">
                          <Image 
                            src="/logo.png" // Thay bằng đường dẫn ảnh logo.png của bạn
                            alt="Sunny Pet Logo" 
                            fill // Tự động lấp đầy thẻ div cha
                            className="object-cover" // object-cover giúp ảnh tràn viền tròn cực đẹp
                            priority
                          />
                        </div>
              <h1 className="text-2xl font-bold text-white">Sunny Pet</h1>
            </div>
            <p className="font-light leading-relaxed opacity-80">
              Phòng khám thú cưng Sunny Pet - nơi thú cưng của bạn được chăm sóc bằng cả tấm lòng. 
              Chúng tôi cam kết mang lại dịch vụ y tế tốt nhất.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaInstagram, FaYoutube, FaTiktok].map((Icon, i) => (
                <Link key={i} href="#" className="p-2 rounded-full border border-white/10 hover:bg-white/10 transition">
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* CỘT 2: LIÊN KẾT NHANH */}
        <div className="md:pl-10 space-y-6">
            <h2 className="text-base font-semibold text-white uppercase tracking-wider">Liên kết nhanh</h2>
                <ul className="space-y-3 font-light opacity-80">
                {quickLinks.map((item) => (
                    <li key={item.name}>
                        <Link href={item.link} className="hover:text-white transition">
                        {item.name}
                        </Link>
                    </li>
                    ))}
                </ul>
        </div>
          {/* CỘT 3: LIÊN HỆ */}
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-white uppercase tracking-wider">Liên hệ</h2>
            <ul className="space-y-4 font-light opacity-80">
              <li className="flex items-start gap-3">
                <IoLocationOutline className="size-5 shrink-0 mt-0.5" />
                <span>123 Nguyễn Văn Trỗi, Phú Nhuận, TP.HCM</span>
              </li>
              <li className="flex items-center gap-3">
                <IoCallOutline className="size-5" />
                <span>0901 234 567</span>
              </li>
              <li className="flex items-center gap-3">
                <IoMailOutline className="size-5" />
                <span>hello@sunnypet.vn</span>
              </li>
              <li className="flex items-center gap-3">
                <IoTimeOutline className="size-5" />
                <span>T2-T7: 8:00–18:00 | CN: 8:00–12:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-60">
          <p>&copy; 2026 Sunny Pet. Tất cả quyền được bảo lưu.</p>
          <div className="flex gap-6">
            <Link href="/admin" className="hover:text-white">Quản trị viên</Link>
            <Link href="/bac-si" className="hover:text-white">Bác sĩ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}