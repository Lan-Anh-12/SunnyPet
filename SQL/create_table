-- 1. TẠO DATABASE
CREATE DATABASE SunnyPetDB;
GO
USE SunnyPetDB;
GO

-- --- NHÓM QUẢN LÝ TÀI KHOẢN & NGƯỜI DÙNG ---

CREATE TABLE Account (
    id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- ADMIN, DOCTOR, CUSTOMER
    img VARCHAR(MAX),
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE Admin (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_account INT UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    CONSTRAINT FK_Admin_Account FOREIGN KEY (id_account) REFERENCES Account(id)
);

CREATE TABLE Doctor (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_account INT UNIQUE NOT NULL,
    name NVARCHAR(255) NOT NULL,
    specialization NVARCHAR(255),
    CONSTRAINT FK_Doctor_Account FOREIGN KEY (id_account) REFERENCES Account(id)
);

CREATE TABLE Customers (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_account INT UNIQUE, -- Có thể NULL nếu khách chưa đăng ký tài khoản web
    cus_name NVARCHAR(255) NOT NULL,
    sdt VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    CONSTRAINT FK_Customers_Account FOREIGN KEY (id_account) REFERENCES Account(id)
);

-- --- NHÓM QUẢN LÝ THÚ CƯNG ---

CREATE TABLE Pets (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_owner INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    species NVARCHAR(100), -- Chó, Mèo...
    breed NVARCHAR(100),   -- Giống
    birth_month TINYINT,
    birth_year SMALLINT,
    CONSTRAINT FK_Pets_Owner FOREIGN KEY (id_owner) REFERENCES Customers(id)
);

-- --- NHÓM QUẢN LÝ DỊCH VỤ & THUỐC ---

CREATE TABLE Services (
    id INT PRIMARY KEY IDENTITY(1,1),
    service_name NVARCHAR(255) NOT NULL,
    option_name NVARCHAR(255), 
    price DECIMAL(18,0) NOT NULL
);

CREATE TABLE Medicines (
    id INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(255) NOT NULL,
    category NVARCHAR(100),
    stock_quantity INT DEFAULT 0, -- Admin dùng để tăng số lượng kho
    cost_price DECIMAL(18,0),     -- Giá nhập
    selling_price DECIMAL(18,0),  -- Giá bán
    unit NVARCHAR(50)             -- Viên, Lọ, Gói...
);

-- --- NHÓM QUẢN LÝ LỊCH HẸN & BỆNH ÁN ---

CREATE TABLE Schedule (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_doc INT NOT NULL,
    id_cus INT NOT NULL,
    id_pet INT NOT NULL,
    time DATETIME2 NOT NULL,
    status NVARCHAR(50) DEFAULT 'PENDING', -- PENDING, CONFIRMED, COMPLETED, CANCELLED
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_Schedule_Doctor FOREIGN KEY (id_doc) REFERENCES Doctor(id),
    CONSTRAINT FK_Schedule_Customer FOREIGN KEY (id_cus) REFERENCES Customers(id),
    CONSTRAINT FK_Schedule_Pet FOREIGN KEY (id_pet) REFERENCES Pets(id)
);

CREATE TABLE MedicalRecords (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_schedule INT UNIQUE NOT NULL, -- 1 lịch hẹn - 1 bệnh án
    id_service INT NOT NULL,        -- 1 ca - 1 dịch vụ chính
    symptoms NVARCHAR(MAX),
    diagnosis NVARCHAR(MAX),        -- Kết luận bệnh
    notes NVARCHAR(MAX),            -- Ghi chú tính cách/bệnh đặc biệt
    service_price DECIMAL(18,0),    -- Giá dịch vụ tại thời điểm khám
    medicine_total_price DECIMAL(18,0) DEFAULT 0,
    final_amount DECIMAL(18,0),     -- Tổng doanh thu ca khám
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_MedicalRecords_Schedule FOREIGN KEY (id_schedule) REFERENCES Schedule(id),
    CONSTRAINT FK_MedicalRecords_Service FOREIGN KEY (id_service) REFERENCES Services(id)
);

-- --- CHI TIẾT ĐƠN THUỐC ---

CREATE TABLE Prescriptions (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_medical_record INT NOT NULL,
    id_medicine INT NOT NULL,
    quantity INT NOT NULL,
    price_at_sale DECIMAL(18,0), -- Giá bán thực tế lúc đó
    CONSTRAINT FK_Prescriptions_Record FOREIGN KEY (id_medical_record) REFERENCES MedicalRecords(id),
    CONSTRAINT FK_Prescriptions_Medicine FOREIGN KEY (id_medicine) REFERENCES Medicines(id)
);
GO
