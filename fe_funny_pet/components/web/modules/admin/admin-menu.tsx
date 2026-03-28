"use client";

import { 
  LayoutDashboard, 
  Syringe, 
  Users, 
  PawPrint, 
  BarChart3, 
  Settings 
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AdminMenu() {
  const adminRoutes = [
    { title: "Tổng quan", icon: LayoutDashboard, href: "/admin" },
    { title: "Dịch vụ thú y", icon: Syringe, href: "/admin/services" },
    { title: "Quản lý nhân sự", icon: Users, href: "/admin/staff" },
    { title: "Khách hàng & Thú cưng", icon: PawPrint, href: "/admin/pets" },
    { title: "Thống kê doanh thu", icon: BarChart3, href: "/admin/reports" },
    { title: "Cấu hình hệ thống", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-[10px] font-black uppercase tracking-widest text-gray-400">
        Quản trị hệ thống
      </SidebarGroupLabel>
      <SidebarMenu className="gap-1">
        {adminRoutes.map((item) => (
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