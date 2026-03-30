USE master;
GO

IF EXISTS (SELECT name FROM sys.databases WHERE name = 'SunnyPetDB')
BEGIN
    ALTER DATABASE SunnyPetDB SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE SunnyPetDB;
END
GO

CREATE DATABASE SunnyPetDB;
GO
USE SunnyPetDB;
GO

-- --- NHÓM QUẢN LÝ TÀI KHOẢN ---
CREATE TABLE Account (
    id INT PRIMARY KEY IDENTITY(1,1),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- ADMIN, DOCTOR
    is_active BIT DEFAULT 1,   
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
    cus_name NVARCHAR(255) NOT NULL,
    sdt VARCHAR(20) NOT NULL,
    email VARCHAR(255)
);

-- --- NHÓM QUẢN LÝ THÚ CƯNG ---
CREATE TABLE Pets (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_owner INT NOT NULL,
    name NVARCHAR(255) NOT NULL,
    species NVARCHAR(100), 
    breed NVARCHAR(100),   
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
    stock_quantity INT DEFAULT 0,
    cost_price DECIMAL(18,0),     
    selling_price DECIMAL(18,0),  
    unit NVARCHAR(50)             
);

-- --- NHÓM QUẢN LÝ LỊCH HẸN & BỆNH ÁN ---
CREATE TABLE Schedule (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_doc INT NOT NULL,
    id_cus INT NOT NULL,
    id_pet INT NOT NULL,
    time DATETIME2 NOT NULL,
    status NVARCHAR(50) DEFAULT 'PENDING', 
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_Schedule_Doctor FOREIGN KEY (id_doc) REFERENCES Doctor(id),
    CONSTRAINT FK_Schedule_Customer FOREIGN KEY (id_cus) REFERENCES Customers(id),
    CONSTRAINT FK_Schedule_Pet FOREIGN KEY (id_pet) REFERENCES Pets(id)
);

CREATE TABLE MedicalRecords (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_schedule INT UNIQUE NOT NULL, 
    id_service INT NOT NULL,        
    symptoms NVARCHAR(MAX),
    diagnosis NVARCHAR(MAX),        
    notes NVARCHAR(MAX),            
    service_price DECIMAL(18,0),    
    medicine_total_price DECIMAL(18,0) DEFAULT 0,
    final_amount DECIMAL(18,0),     
    created_at DATETIME2 DEFAULT GETDATE(),
    CONSTRAINT FK_MedicalRecords_Schedule FOREIGN KEY (id_schedule) REFERENCES Schedule(id),
    CONSTRAINT FK_MedicalRecords_Service FOREIGN KEY (id_service) REFERENCES Services(id)
);

CREATE TABLE Prescriptions (
    id INT PRIMARY KEY IDENTITY(1,1),
    id_medical_record INT NOT NULL,
    id_medicine INT NOT NULL,
    quantity INT NOT NULL,
    price_at_sale DECIMAL(18,0), 
    CONSTRAINT FK_Prescriptions_Record FOREIGN KEY (id_medical_record) REFERENCES MedicalRecords(id),
    CONSTRAINT FK_Prescriptions_Medicine FOREIGN KEY (id_medicine) REFERENCES Medicines(id)
);
GO
