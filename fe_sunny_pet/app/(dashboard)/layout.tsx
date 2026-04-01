import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/web/shared/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip"; // 1. Import thêm cái này

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 2. Bọc toàn bộ trong TooltipProvider
    <TooltipProvider delayDuration={0}>
      <SidebarProvider>
        {/* Truyền role vào AppSidebar để hiển thị đúng Menu */}
        <AppSidebar role="doctor" />
        
        <SidebarInset className="bg-gray-50/50 flex flex-col h-screen overflow-hidden">
          {/* Header của vùng nội dung */}
          <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6">
            {/* Nút đóng/mở sidebar */}
            <SidebarTrigger className="-ml-1" />
            
            <div className="flex items-center gap-2 px-4">
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest">
                Hệ thống quản lý Sunny Pet
              </span>
            </div>
          </header>

          {/* Vùng nội dung chính - Cho phép cuộn dọc độc lập với Sidebar */}
          <main className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}