"use client";

import React, { useState } from "react";
import { Plus, Search, Package, TrendingUp, Edit3, PackagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Import 2 Modal mà tớ với Lan Anh vừa làm
import AddMedicineModal from "@/components/web/modules/admin/AddMedicineModal";
import { QuickStockUpdateModal } from "@/components/web/modules/admin/QuickStockUpdateModal";

export default function AdminInventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 1. State quản lý Modal Thêm mới
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // 2. State quản lý Modal Nhập kho nhanh
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // 3. Dữ liệu mẫu (Gồm các trường y hệt DB)
  const [inventory, setInventory] = useState([
    { 
      id: "M001", 
      name: "Antibiotics Type-A", 
      category: "Kháng sinh",
      unit: "viên",
      stock_quantity: 500, 
      cost_price: "150.000", 
      selling_price: "220.000" 
    },
  ]);

  // HÀM XỬ LÝ: Thêm thuốc mới vào danh sách
  const handleAddMedicine = (newMedicine: any) => {
    // Logic thực tế: Gọi API POST /api/medicines
    const idFake = `M${Math.floor(Math.random() * 1000)}`;
    setInventory(prev => [...prev, { ...newMedicine, id: idFake }]);
    setIsAddModalOpen(false);
    alert("Đã thêm thuốc mới vào kho thành công!");
  };

  // HÀM XỬ LÝ: Mở modal nhập kho nhanh
  const handleOpenStockModal = (product: any) => {
    setSelectedProduct(product);
    setIsStockModalOpen(true);
  };

  // HÀM XỬ LÝ: Lưu số lượng tồn kho mới
  const handleSaveQuickStock = (id: string, adjustValue: number, reason: string) => {
    setInventory(prev => prev.map(item => 
      item.id === id ? { ...item, stock_quantity: item.stock_quantity + adjustValue } : item
    ));
    setIsStockModalOpen(false);
    console.log(`Lý do điều chỉnh kho: ${reason}`);
  };

  return (
    <div className="p-8 space-y-8 italic font-sans bg-[#FAFAFA] min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">
            Kho thuốc <span className="text-[#E5484D]">& Vật tư</span>
          </h1>
          <p className="text-gray-400 font-bold text-sm mt-1 italic">Quản lý nhập xuất và điều chỉnh tồn kho Sunny Pet.</p>
        </div>
        
        {/* NÚT MỞ MODAL THÊM MỚI */}
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="h-14 px-8 rounded-2xl bg-[#E5484D] hover:bg-[#c43d42] font-black text-white shadow-xl shadow-red-100 flex gap-2 active:scale-95 transition-all"
        >
          <Plus className="size-5" strokeWidth={3} /> Thêm thuốc mới
        </Button>
      </div>

      {/* THỐNG KÊ NHANH */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 size-5" />
          <Input 
            placeholder="Tìm theo tên thuốc hoặc mã định danh..." 
            className="h-16 pl-14 rounded-[2rem] border-2 border-gray-100 font-bold focus:border-[#E5484D] shadow-sm"
          />
        </div>
        <Card className="h-16 rounded-[2rem] border-2 border-gray-100 flex items-center px-6 gap-4 shadow-sm bg-white">
            <Package className="text-[#E5484D] size-5" />
            <span className="font-black text-[11px] uppercase tracking-widest text-gray-500">Tổng tồn: {inventory.reduce((a, b) => a + b.stock_quantity, 0)}</span>
        </Card>
        <Card className="h-16 rounded-[2rem] border-2 border-gray-100 flex items-center px-6 gap-4 shadow-sm bg-white">
            <TrendingUp className="text-emerald-500 size-5" />
            <span className="font-black text-[11px] uppercase tracking-widest text-gray-500">Mặt hàng: {inventory.length}</span>
        </Card>
      </div>

      {/* BẢNG DỮ LIỆU */}
      <Card className="rounded-[2.5rem] border-none shadow-sm overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="border-none">
              <TableHead className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-gray-400">Tên thuốc</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 text-center">Tồn kho</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 text-right">Giá bán</TableHead>
              <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-400 text-center">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item) => (
              <TableRow key={item.id} className="group hover:bg-red-50/20 border-b border-gray-50 transition-colors">
                <TableCell className="p-6">
                   <p className="font-black text-gray-800 text-base tracking-tight">{item.name}</p>
                   <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">{item.category} — {item.id}</p>
                </TableCell>
                <TableCell className="text-center">
                  <span className="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 font-black text-xs uppercase shadow-sm shadow-emerald-50">
                    {item.stock_quantity} {item.unit}
                  </span>
                </TableCell>
                <TableCell className="text-right font-black text-[#E5484D] text-lg tracking-tighter italic">{item.selling_price}đ</TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    {/* Nút nhập kho nhanh */}
                    <Button 
                      onClick={() => handleOpenStockModal(item)}
                      variant="ghost" 
                      className="size-11 p-0 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                    >
                      <PackagePlus className="size-5" />
                    </Button>
                    <Button variant="ghost" className="size-11 p-0 rounded-xl bg-slate-50 text-slate-400 hover:text-[#E5484D] hover:bg-red-50 transition-all">
                      <Edit3 className="size-5" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* --- CÁC MODAL --- */}
      
      {/* Modal Thêm thuốc mới */}
      <AddMedicineModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleAddMedicine} 
      />

      {/* Modal Nhập/Xuất kho nhanh */}
      <QuickStockUpdateModal 
        isOpen={isStockModalOpen}
        product={selectedProduct}
        onClose={() => setIsStockModalOpen(false)}
        onSave={handleSaveQuickStock}
      />
    </div>
  );
}