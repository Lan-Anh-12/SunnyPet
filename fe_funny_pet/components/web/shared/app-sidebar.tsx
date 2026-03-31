// components/ui/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { AdminMenu } from "../modules/admin/admin-menu"
import { DoctorMenu } from "../modules/doctor/doctor-menu"
import Link from "next/dist/client/link"

interface AppSidebarProps {
  role: "admin" | "doctor"
}

export function AppSidebar({ role }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/">
          <div className="p-4 font-black text-xl text-[#E5484D]">Sunny Pet</div>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        {/* Nhét component tương ứng với Role vào đây */}
        {role === "admin" ? <AdminMenu /> : <DoctorMenu />}
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4 text-xs font-bold text-gray-400 uppercase">
          {role === "admin" ? "Quản trị viên" : "Bác sĩ chuyên môn"}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}