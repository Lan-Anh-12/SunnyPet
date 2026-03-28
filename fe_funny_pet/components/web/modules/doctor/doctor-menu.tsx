"use client";

import { 
  CalendarDays, 
  History, 
  ClipboardPlus, 
  Stethoscope,
  UserCircle 
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function DoctorMenu() {
  const doctorRoutes = [
    { title: "Lịch làm việc", icon: CalendarDays, href: "/doctor/schedule" },
    { title: "Ca khám hôm nay", icon: Stethoscope, href: "/doctor/appointments" },
    { title: "Nhập hồ sơ bệnh án", icon: ClipboardPlus, href: "/doctor/medical-record" },
    { title: "Lịch sử điều trị", icon: History, href: "/doctor/history" },
    { title: "Hồ sơ cá nhân", icon: UserCircle, href: "/doctor/profile" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Nghiệp vụ bác sĩ
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {doctorRoutes.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild tooltip={item.title} className="rounded-xl h-11 hover:bg-red-50 hover:text-[#E5484D] transition-all font-bold">
              <Link href={item.href}>
                <item.icon className="size-5" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}