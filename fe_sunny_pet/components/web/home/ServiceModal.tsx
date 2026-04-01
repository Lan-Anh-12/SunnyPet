"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, X } from "lucide-react";
import { ServiceType } from "./Services";
import * as DialogPrimitive from "@radix-ui/react-dialog";

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceType | null;
}

export function ServiceModal({ isOpen, onClose, service }: ServiceModalProps) {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        // max-h-[85vh] để khung ngắn lại một chút, không bị sát mép màn hình
        className="max-w-2xl rounded-[2.5rem] p-0 overflow-hidden border-none bg-white shadow-2xl max-h-[85vh] flex flex-col outline-none"
      >
        {/* NÚT X DUY NHẤT: Ép z-index cực cao để nhấn được 100% */}
        <DialogPrimitive.Close className="absolute right-6 top-6 z-[100] rounded-full bg-black/30 p-2 text-white backdrop-blur-md hover:bg-black/50 transition-all outline-none border-none">
          <X className="size-5" />
        </DialogPrimitive.Close>

        {/* PHẦN ẢNH: Chiều cao h-60 cố định */}
        <div className="relative h-60 w-full shrink-0">
          <Image 
            src={service.image} 
            alt={service.title} 
            fill 
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <DialogTitle className="absolute bottom-6 left-8 text-3xl font-extrabold text-white tracking-tight">
            {service.title}
          </DialogTitle>
        </div>

        {/* PHẦN NỘI DUNG: Tự hiện thanh cuộn nếu quá dài */}
        <div className="p-8 space-y-6 overflow-y-auto flex-1 custom-scrollbar">
          <DialogDescription className="text-gray-600 text-lg leading-relaxed font-medium">
            {service.desc}
          </DialogDescription>

          <div className="space-y-4 bg-gray-50 p-6 rounded-[1.5rem]">
            <h4 className="font-bold text-gray-900 flex items-center gap-2 text-base">
              <div className="w-1.5 h-6 bg-[#E5484D] rounded-full" />
              Tại sao nên chọn Sunny Pet?
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Đội ngũ bác sĩ chuyên môn cao",
                "Trang thiết bị y tế hiện đại",
                "Quy trình vô trùng tuyệt đối",
                "Tư vấn chăm sóc 24/7"
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="size-5 text-[#E5484D] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 gap-6">
            <div className="text-center sm:text-left">
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mb-1">Giá tham khảo</p>
              <p className="text-2xl font-black text-[#E5484D]">Liên hệ báo giá </p>
            </div>
            <Link href="/booking" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-[#E5484D] hover:bg-[#C83D44] text-white rounded-full px-10 h-14 text-lg font-bold shadow-xl">
                Đặt lịch ngay
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}