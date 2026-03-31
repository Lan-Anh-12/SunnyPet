"use client";

import { 
  LayoutDashboard, 
  UserCog, 
  Contact2, 
  Pill, 
  LineChart 
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Để làm logic Active màu

export function AdminMenu() {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  // 1. Giữ nguyên bộ MenuItems đã chốt
  const menuItems = [
    { title: "Tổng quan", icon: LayoutDashboard, href: "/admin" },
    { title: "Nhân sự", icon: UserCog, href: "/admin/staff" }, 
    { title: "Khách hàng", icon: Contact2, href: "/admin/customers" },
    { title: "Kho thuốc", icon: Pill, href: "/admin/inventory" },
    { title: "Thống kê doanh thu", icon: LineChart, href: "/admin/statistics" },
  ];

  // Màu chủ đạo lấy từ nút "Đặt lịch ngay" trên hình: #E5484D (Đỏ cam)

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Quản trị hệ thống
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {/* LỖI SAI: Bạn định nghĩa là `menuItems` nhưng lại map `adminRoutes` */}
        {menuItems.map((item) => {
          // Logic kiểm tra xem menu này có đang được chọn không
          const isActive = pathname === item.href;

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title} 
                className={`
                  rounded-xl h-11 transition-all font-bold
                  /* 2. Sửa màu Hover: Nền đỏ nhạt, chữ đỏ đậm */
                  hover:bg-red-50 hover:text-[#E5484D]
                  
                  /* 3. Logic màu khi Active (đang ở trang đó) */
                  ${isActive 
                    ? "bg-red-100 text-[#E5484D]" // Màu đỏ khi đang chọn
                    : "text-gray-700"              // Màu xám mặc định
                  }
                `}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  {/* 4. Đổi màu Icon mặc định */}
                  <item.icon className={`size-5 ${isActive ? "text-[#E5484D]" : "text-gray-500"}`} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}