"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, Stethoscope, Mail, Lock, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [role, setRole] = useState("doctor");
  // State để chuyển đổi giữa màn hình 'login' và 'forgot'
  const [view, setView] = useState<"login" | "forgot">("login");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md shadow-2xl border-t-4 border-t-[#E5484D] rounded-[2.5rem] overflow-hidden bg-white transition-all duration-300">
        
        {view === "login" ? (
          /* --- GIAO DIỆN ĐĂNG NHẬP --- */
          <>
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="mx-auto bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                {role === "admin" ? (
                  <ShieldCheck className="text-[#E5484D] size-8" />
                ) : (
                  <Stethoscope className="text-[#E5484D] size-8" />
                )}
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Đăng nhập</CardTitle>
              <CardDescription className="text-base">Hệ thống quản lý nội bộ Sunny Pet</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs defaultValue="doctor" onValueChange={(value) => setRole(value)} className="w-full">
                <TabsList className="grid w-full grid-cols-2 rounded-xl bg-gray-100 p-1">
                  <TabsTrigger value="doctor" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#E5484D]">Bác sĩ</TabsTrigger>
                  <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#E5484D]">Quản trị viên</TabsTrigger>
                </TabsList>
              </Tabs>

              <form className="grid gap-5">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="email" className="font-semibold ml-1 text-gray-700">Tài khoản (Email)</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-5 text-gray-400" />
                    <Input id="email" type="email" placeholder="name@gmail.com" className="pl-10 rounded-xl h-11 border-gray-200" />
                  </div>
                </div>

                <div className="grid gap-2 text-left">
                  <div className="flex items-center justify-between px-1">
                    <Label htmlFor="password" className="font-semibold text-gray-700">Mật khẩu</Label>
                    {/* Nút chuyển sang khung Quên mật khẩu */}
                    <button 
                      type="button"
                      onClick={() => setView("forgot")}
                      className="text-xs text-[#E5484D] hover:underline font-medium"
                    >
                      Quên mật khẩu?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 size-5 text-gray-400" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-10 rounded-xl h-11 border-gray-200" />
                  </div>
                </div>

                <Button className="w-full bg-[#E5484D] hover:bg-[#C83D44] text-white rounded-full h-12 text-lg font-bold shadow-lg mt-2">
                  Vào hệ thống
                </Button>
              </form>
            </CardContent>
          </>
        ) : (
          /* --- GIAO DIỆN QUÊN MẬT KHẨU (KHUNG KHÁC) --- */
          <>
            <CardHeader className="space-y-2 text-center pb-6">
              <div className="mx-auto bg-red-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-2">
                <KeyRound className="text-[#E5484D] size-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Quên mật khẩu</CardTitle>
              <CardDescription className="text-base px-4">
                Nhập email của bạn để nhận hướng dẫn khôi phục mật khẩu.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <form className="grid gap-5">
                <div className="grid gap-2 text-left">
                  <Label htmlFor="reset-email" className="font-semibold ml-1 text-gray-700">Email khôi phục</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 size-5 text-gray-400" />
                    <Input 
                      id="reset-email" 
                      type="email" 
                      placeholder="name@gmail.com" 
                      className="pl-10 rounded-xl h-11 border-gray-200 focus:border-[#E5484D]" 
                    />
                  </div>
                </div>

                <Button className="w-full bg-[#E5484D] hover:bg-[#C83D44] text-white rounded-full h-12 text-lg font-bold shadow-lg">
                  Gửi mã xác nhận
                </Button>
                
                {/* Nút quay lại đăng nhập */}
                <button 
                  type="button"
                  onClick={() => setView("login")}
                  className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#E5484D] transition-colors font-medium"
                >
                  <ArrowLeft className="size-4" />
                  Quay lại đăng nhập
                </button>
              </form>
            </CardContent>
          </>
        )}

        <CardFooter className="bg-gray-50/50 py-6 border-t flex justify-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
            ← Quay lại trang chủ
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}