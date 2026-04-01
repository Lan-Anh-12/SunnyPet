"use client";

import { Plus, Search, Package, TrendingUp, Edit3 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminInventoryPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">Kho thuốc <span className="text-[#E5484D]">& Vật tư</span></h1>
          <p className="text-gray-400 font-bold text-sm italic">Quản lý nhập xuất và điều chỉnh giá bán lẻ.</p>
        </div>
        <Button className="h-14 px-8 rounded-2xl bg-[#E5484D] hover:bg-[#c43d42] font-black text-white shadow-lg shadow-red-100 flex gap-2">
          <Plus className="size-5" /> Thêm thuốc mới
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Thanh tìm kiếm */}
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
          <Input 
            placeholder="Tìm theo tên thuốc hoặc mã định danh..." 
            className="h-16 pl-14 rounded-[2rem] border-2 border-gray-100 font-bold focus:border-[#E5484D]"
          />
        </div>
        {/* Filter nhanh */}
        <Card className="h-16 rounded-[2rem] border-2 border-gray-100 flex items-center px-6 gap-4">
            <Package className="text-[#E5484D] size-5" />
            <span className="font-black text-sm text-gray-700">Tổng tồn kho: 1,240 đơn vị</span>
        </Card>
      </div>

      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="p-6 font-black text-[10px] uppercase tracking-widest">Tên thuốc</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest">Số lượng tồn</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Giá nhập</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-right">Giá bán</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-widest text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="group hover:bg-red-50/30 border-b border-gray-50">
              <TableCell className="p-6 font-black text-gray-900">Antibiotics Type-A</TableCell>
              <TableCell>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 font-black text-xs">
                  500 viên
                </span>
              </TableCell>
              <TableCell className="text-right font-bold text-gray-400 italic">150.000đ</TableCell>
              <TableCell className="text-right font-black text-[#E5484D]">220.000đ</TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" className="rounded-xl font-black text-gray-400 hover:text-[#E5484D]">
                  <Edit3 className="size-4 mr-2" /> Chỉnh sửa
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}