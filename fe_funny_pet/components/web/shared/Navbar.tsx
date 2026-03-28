"use client"; // Bắt buộc vì có dùng State và useEffect

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"; // Cần dùng Component Image để tối ưu
import { Button } from "@/components/ui/button"; 
import { CalendarDays } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Logic xử lý đổi màu khi cuộn trang
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b" // Khi cuộn xuống: trắng mờ, có bóng
          : "bg-transparent" // Ban đầu: trong suốt
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* LOGO - CHỈ THAY BIỂU TƯỢNG BẰNG ẢNH TRÒN */}
        <Link href="/" className="flex items-center gap-2">
          {/* Vòng tròn nền: Đã tăng lên w-12 h-12 để ảnh to hơn */}
          <div className="relative w-12 h-12 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white bg-green-100">
            <Image 
              src="/logo.png" // Thay bằng đường dẫn ảnh logo.png của bạn
              alt="Sunny Pet Logo" 
              fill // Tự động lấp đầy thẻ div cha
              className="object-cover" // object-cover giúp ảnh tràn viền tròn cực đẹp
              priority
            />
          </div>
          <span className={`text-xl font-bold transition-colors ${isScrolled ? "text-gray-900" : "text-white"}`}>
            Sunny Pet
          </span>
        </Link>

        {/* MENU CHÍNH - Đã sửa logic active */}
        <div className={`hidden md:flex items-center gap-8 font-medium transition-colors ${
          isScrolled ? "text-gray-600" : "text-white/90"
        }`}>
          <Link href="/" className="hover:text-[#E5484D] transition">Trang chủ</Link>
          <Link href="/#dich-vu" className="hover:text-[#E5484D] transition">Dịch vụ</Link>
          <Link href="/#bac-si" className="hover:text-[#E5484D] transition">Đội ngũ</Link>
          <Link href="/#danh-gia" className="hover:text-[#E5484D] transition">Đánh giá</Link>
          
          {/* Bỏ class text-red-500 font-bold cố định ở đây */}
          <Link href="/#lien-he" className="hover:text-[#E5484D] transition">
            Liên hệ
          </Link>
        </div>

        {/* NHÓM NÚT BÊN PHẢI */}
        <div className="flex items-center gap-4">
          <div className={`hidden lg:flex items-center gap-4 text-xs font-medium mr-4 ${
            isScrolled ? "text-gray-500" : "text-white/80"
          }`}>
            <Link href="/sign-up" className="hover:underline">Quản trị</Link>
            <span>|</span>
            <Link href="/sign-up" className="hover:underline">Bác sĩ</Link>
          </div>
          
          <Link href="/booking">
            <Button 
              className="bg-[#E5484D] hover:bg-[#C83D44] text-white rounded-full px-6 flex items-center gap-2"
            >
              <CalendarDays className="size-4" />
              Đặt lịch ngay
            </Button>
          </Link>
          
        </div>
      </div>
    </nav>
  );
}