"use client";

import { 
  CalendarDays, 
  ClipboardPlus, 
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function DoctorMenu() {
  const pathname = usePathname();

  const doctorRoutes = [
    { 
      title: "Lịch làm việc", 
      icon: CalendarDays, 
      // Trỏ về route gốc để file app/doctor/page.tsx xử lý redirect ngày hôm nay
      href: "/doctor" 
    },
    { 
      title: "Tìm hồ sơ bệnh án", 
      icon: ClipboardPlus, 
      // Phải khớp với tên folder m đặt (ví dụ: records hoặc medical-record)
      href: "/doctor/records" 
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-4 mb-2">
        Nghiệp vụ bác sĩ
      </SidebarGroupLabel>
      <SidebarMenu className="gap-2 px-2">
        {doctorRoutes.map((item) => {
          // Logic kiểm tra Active link để highlight màu đỏ cho đẹp
          const isActive = pathname.startsWith(item.href);

          return (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title} 
                className={cn(
                  "rounded-2xl h-12 px-4 transition-all duration-200 font-bold border border-transparent",
                  isActive 
                    ? "bg-red-50 text-[#E5484D] border-red-100 shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <Link href={item.href} className="flex items-center gap-3">
                  <item.icon className={cn("size-5", isActive ? "text-[#E5484D]" : "text-gray-400")} />
                  <span className="text-sm tracking-tight">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}