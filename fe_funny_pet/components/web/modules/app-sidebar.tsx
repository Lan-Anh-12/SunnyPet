// components/ui/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { AdminMenu } from "./admin/admin-menu"
import { DoctorMenu } from "./doctor/doctor-menu"

interface AppSidebarProps {
  role: "admin" | "doctor"
}

export function AppSidebar({ role }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 font-black text-xl text-[#E5484D]">Sunny Pet</div>
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