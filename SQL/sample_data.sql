USE SunnyPetDB;
GO

-- 1. DỌN DẸP SẠCH SẼ
DELETE FROM Prescriptions; DELETE FROM MedicalRecords; DELETE FROM Schedule;
DELETE FROM Pets; DELETE FROM Customers; DELETE FROM Medicines;
DELETE FROM Services; DELETE FROM Doctor; DELETE FROM Admin; DELETE FROM Account;

DBCC CHECKIDENT ('Account', RESEED, 0); DBCC CHECKIDENT ('Admin', RESEED, 0);
DBCC CHECKIDENT ('Doctor', RESEED, 0); DBCC CHECKIDENT ('Customers', RESEED, 0);
DBCC CHECKIDENT ('Pets', RESEED, 0); DBCC CHECKIDENT ('Services', RESEED, 0);
DBCC CHECKIDENT ('Medicines', RESEED, 0); DBCC CHECKIDENT ('Schedule', RESEED, 0);
DBCC CHECKIDENT ('MedicalRecords', RESEED, 0); DBCC CHECKIDENT ('Prescriptions', RESEED, 0);
GO

-- 2. TÀI KHOẢN (Admin & Bác sĩ)
INSERT INTO Account (email, password, role) VALUES 
('lananh12bpt@gmail.com', 'admin123', 'ADMIN'),
('lzltop1lzl@gmail.com', 'doctor123', 'DOCTOR');

-- Lấy ID động từ bảng Account để nạp vào Admin/Doctor
INSERT INTO Admin (id_account, name) SELECT id, N'Lan Anh' FROM Account WHERE email = 'lananh12bpt@gmail.com';
INSERT INTO Doctor (id_account, name, specialization) SELECT id, N'Nguyễn Vũ Tuấn Anh', N'Nội khoa thú y' FROM Account WHERE email = 'lzltop1lzl@gmail.com';

-- 3. DANH MỤC DỊCH VỤ (18 DÒNG CHUẨN GIÁ)
INSERT INTO Services (service_name, option_name, price) VALUES 
(N'Khám Tổng Quát', N'Cơ bản', 200000), (N'Khám Tổng Quát', N'Nâng cao', 450000), (N'Khám Tổng Quát', N'VIP', 800000),
(N'Tiêm Phòng', N'Nội', 150000), (N'Tiêm Phòng', N'Ngoại', 350000), (N'Tiêm Phòng', N'Trọn gói', 900000),
(N'Spa & Grooming', N'Tắm sấy', 120000), (N'Spa & Grooming', N'Cắt tỉa', 300000), (N'Spa & Grooming', N'Full Combo', 550000),
(N'Phẫu Thuật', N'Triệt sản', 600000), (N'Phẫu Thuật', N'Mổ đẻ', 1500000), (N'Phẫu Thuật', N'Chỉnh hình', 3000000),
(N'Dược & Thuốc', N'Tẩy giun', 50000), (N'Dược & Thuốc', N'Trị ve rận', 180000), (N'Dược & Thuốc', N'Bổ trợ', 300000),
(N'Xét Nghiệm', N'Máu', 250000), (N'Xét Nghiệm', N'Siêu âm', 200000), (N'Xét Nghiệm', N'X-Quang', 400000);

-- 4. KHO THUỐC
INSERT INTO Medicines (name, category, stock_quantity, cost_price, selling_price, unit) VALUES 
(N'Amoxicillin', N'Kháng sinh', 500, 10000, 25000, N'Viên'),
(N'NexGard', N'Trị ve rận', 100, 120000, 185000, N'Viên'),
(N'Catosal', N'Thuốc bổ', 20, 180000, 250000, N'Chai'),
(N'Drontal', N'Tẩy giun', 300, 30000, 55000, N'Viên');

-- 5. KHÁCH HÀNG & THÚ CƯNG
INSERT INTO Customers (cus_name, sdt, email) VALUES (N'Lê Anh Tuấn', '0901234567', 'tuan@gmail.com');
DECLARE @CusID INT = SCOPE_IDENTITY();

INSERT INTO Pets (id_owner, name, species) VALUES (@CusID, N'Milo', N'Chó');
DECLARE @PetID INT = SCOPE_IDENTITY();

-- 6. TẠO CA KHÁM (Dùng biến để tự bắt ID, không bao giờ lỗi)
DECLARE @DocID INT = (SELECT TOP 1 id FROM Doctor WHERE name LIKE N'%Tuấn Anh%');
DECLARE @SerID INT = (SELECT TOP 1 id FROM Services WHERE service_name = N'Khám Tổng Quát' AND option_name = N'Nâng cao');

-- Tạo lịch hẹn
INSERT INTO Schedule (id_doc, id_cus, id_pet, time, status) 
VALUES (@DocID, @CusID, @PetID, GETDATE(), 'COMPLETED');
DECLARE @SchID INT = SCOPE_IDENTITY();

-- Tạo bệnh án (Giá khám 450k + 2 viên NexGard 370k = 820k)
INSERT INTO MedicalRecords (id_schedule, id_service, symptoms, diagnosis, service_price, medicine_total_price, final_amount) 
VALUES (@SchID, @SerID, N'Ngứa tai', N'Viêm tai ngoài', 450000, 370000, 820000);
DECLARE @RecID INT = SCOPE_IDENTITY();

-- Kê đơn thuốc
INSERT INTO Prescriptions (id_medical_record, id_medicine, quantity, price_at_sale) 
SELECT @RecID, id, 2, 185000 FROM Medicines WHERE name = N'NexGard';
GO
