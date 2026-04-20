"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 
import { Button } from "@/components/ui/button"; 
import { CalendarDays } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname(); 

  const isBookingPage = pathname === "/booking";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const shouldBeDark = isScrolled || isBookingPage;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-3 ${
        shouldBeDark 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" 
          : "bg-transparent" 
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full flex items-center justify-center shadow-sm overflow-hidden border-2 border-white bg-white">
            <Image 
              src="/logo.png" 
              alt="Sunny Pet Logo" 
              fill 
              className="object-cover" 
              priority
            />
          </div>
          <span className={`text-xl font-black tracking-tighter transition-colors duration-300 ${
            shouldBeDark ? "text-gray-900" : "text-white"
          }`}>
            Sunny <span className="text-[#E5484D]">Pet</span>
          </span>
        </Link>

        {/* MENU CHÍNH - Tinh chỉnh khoảng cách chữ cho "bén" */}
        <div className={`hidden md:flex items-center gap-8 text-[11px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${
          shouldBeDark ? "text-gray-600" : "text-white"
        }`}>
          <Link href="/" className="hover:text-[#E5484D] transition-colors">Trang chủ</Link>
          <Link href="/#dich-vu" className="hover:text-[#E5484D] transition-colors">Dịch vụ</Link>
          <Link href="/#bac-si" className="hover:text-[#E5484D] transition-colors">Đội ngũ</Link>
          <Link href="/#danh-gia" className="hover:text-[#E5484D] transition-colors">Đánh giá</Link>
          <Link href="/#lien-he" className="hover:text-[#E5484D] transition-colors">Liên hệ</Link>
        </div>

        {/* NHÓM NÚT BÊN PHẢI */}
        <div className="flex items-center gap-6">
          <div className={`hidden lg:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
            shouldBeDark ? "text-gray-400" : "text-white/70"
          }`}>
            <Link href="/admin" className="hover:text-[#E5484D]">Quản trị</Link>
            <span className="opacity-20">|</span>
            <Link href="/doctor" className="hover:text-[#E5484D]">Bác sĩ</Link>
          </div>
          
          <Link href="/booking">
            <Button 
              className="bg-[#E5484D] hover:bg-[#c4363a] text-white rounded-full px-6 h-11 font-black uppercase text-[10px] tracking-widest shadow-sm transition-all active:scale-95 flex items-center gap-2"
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