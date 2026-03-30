/*Để đảm bảo tính toàn vẹn dữ liệu (không bị lỗi khóa ngoại),
cần thêm dữ liệu theo đúng thứ tự: Tài khoản -> Người dùng (Admin/Bác sĩ/Khách) -> Danh mục (Dịch vụ/Thuốc) -> Thú cưng -> Lịch hẹn -> Bệnh án.*/

USE SunnyPetDB;
GO

-- 1. XÓA SẠCH DỮ LIỆU CŨ ĐỂ RESET HỆ THỐNG
DELETE FROM Prescriptions; DELETE FROM MedicalRecords; DELETE FROM Schedule;
DELETE FROM Pets; DELETE FROM Customers; DELETE FROM Medicines;
DELETE FROM Services; DELETE FROM Doctor; DELETE FROM Admin; DELETE FROM Account;

DBCC CHECKIDENT ('Account', RESEED, 0); DBCC CHECKIDENT ('Admin', RESEED, 0);
DBCC CHECKIDENT ('Doctor', RESEED, 0); DBCC CHECKIDENT ('Customers', RESEED, 0);
DBCC CHECKIDENT ('Pets', RESEED, 0); DBCC CHECKIDENT ('Services', RESEED, 0);
DBCC CHECKIDENT ('Medicines', RESEED, 0); DBCC CHECKIDENT ('Schedule', RESEED, 0);
DBCC CHECKIDENT ('MedicalRecords', RESEED, 0); DBCC CHECKIDENT ('Prescriptions', RESEED, 0);
GO

-- 2. TÀI KHOẢN NỘI BỘ
INSERT INTO Account (email, password, role) VALUES 
('lananh12bpt@gmail.com', 'admin123', 'ADMIN'),
('lzltop1lzl@gmail.com', 'doctor123', 'DOCTOR');

INSERT INTO Admin (id_account, name) VALUES (1, N'Lan Anh');
INSERT INTO Doctor (id_account, name, specialization) VALUES (2, N'Nguyễn Vũ Tuấn Anh', N'Nội khoa thú y');

-- 3. ĐỦ 18 DÒNG DỊCH VỤ (CHÍNH XÁC GIÁ BÁC ĐƯA)
INSERT INTO Services (service_name, option_name, price) VALUES 
(N'Khám Tổng Quát', N'Cơ bản', 200000), (N'Khám Tổng Quát', N'Nâng cao', 450000), (N'Khám Tổng Quát', N'VIP', 800000),
(N'Tiêm Phòng', N'Nội', 150000), (N'Tiêm Phòng', N'Ngoại', 350000), (N'Tiêm Phòng', N'Trọn gói', 900000),
(N'Spa & Grooming', N'Tắm sấy', 120000), (N'Spa & Grooming', N'Cắt tỉa', 300000), (N'Spa & Grooming', N'Full Combo', 550000),
(N'Phẫu Thuật', N'Triệt sản', 600000), (N'Phẫu Thuật', N'Mổ đẻ', 1500000), (N'Phẫu Thuật', N'Chỉnh hình', 3000000),
(N'Dược & Thuốc', N'Tẩy giun', 50000), (N'Dược & Thuốc', N'Trị ve rận', 180000), (N'Dược & Thuốc', N'Bổ trợ', 300000),
(N'Xét Nghiệm', N'Máu', 250000), (N'Xét Nghiệm', N'Siêu âm', 200000), (N'Xét Nghiệm', N'X-Quang', 400000);

-- 4. DANH MỤC THUỐC ĐA DẠNG
INSERT INTO Medicines (name, category, stock_quantity, cost_price, selling_price, unit) VALUES 
(N'Amoxicillin', N'Kháng sinh', 500, 10000, 25000, N'Viên'),
(N'NexGard', N'Trị ve rận', 100, 120000, 185000, N'Viên'),
(N'Bravecto', N'Trị ve rận', 50, 450000, 620000, N'Hộp'),
(N'Catosal', N'Thuốc bổ', 20, 180000, 250000, N'Chai'),
(N'Bio-Scour', N'Trị tiêu chảy', 200, 5000, 15000, N'Gói'),
(N'Povidone', N'Sát trùng', 50, 15000, 35000, N'Lọ'),
(N'Prednisolone', N'Kháng viêm', 1000, 2000, 8000, N'Viên'),
(N'Drontal', N'Tẩy giun', 300, 30000, 55000, N'Viên');

-- 5. KHÁCH HÀNG & THÚ CƯNG MẪU
INSERT INTO Customers (cus_name, sdt, email) VALUES (N'Lê Anh Tuấn', '0901234567', 'tuan@gmail.com');
DECLARE @Cus1 INT = SCOPE_IDENTITY();
INSERT INTO Pets (id_owner, name, species) VALUES (@Cus1, N'Milo', N'Chó');
DECLARE @Pet1 INT = SCOPE_IDENTITY();

-- 6. TẠO CA KHÁM VÀ TÍNH TOÁN GIÁ CHUẨN
-- Giả sử: Khám Nâng cao (450k) + 2 NexGard (185k x 2) + 1 Catosal (250k)
DECLARE @PriceSer DECIMAL(18,0) = 450000;
DECLARE @PriceMed1 DECIMAL(18,0) = 185000; DECLARE @Qty1 INT = 2;
DECLARE @PriceMed2 DECIMAL(18,0) = 250000; DECLARE @Qty2 INT = 1;
DECLARE @TotalMed DECIMAL(18,0) = (@PriceMed1 * @Qty1) + (@PriceMed2 * @Qty2);

-- Bắt đầu chèn dữ liệu
INSERT INTO Schedule (id_doc, id_cus, id_pet, time, status) VALUES (2, @Cus1, @Pet1, GETDATE(), 'COMPLETED');
DECLARE @SchID INT = SCOPE_IDENTITY();

INSERT INTO MedicalRecords (id_schedule, id_service, symptoms, diagnosis, service_price, medicine_total_price, final_amount) 
VALUES (@SchID, 2, N'Ngứa tai, bỏ ăn', N'Viêm tai ngoài + Suy nhược', @PriceSer, @TotalMed, @PriceSer + @TotalMed);
DECLARE @RecID INT = SCOPE_IDENTITY();

-- Đơn thuốc (phải khớp với tính toán ở trên)
INSERT INTO Prescriptions (id_medical_record, id_medicine, quantity, price_at_sale) VALUES 
(@RecID, 2, @Qty1, @PriceMed1), -- NexGard
(@RecID, 4, @Qty2, @PriceMed2); -- Catosal
GO
