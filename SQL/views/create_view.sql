USE SunnyPetDB; -- Đảm bảo đang dùng đúng DB
GO

CREATE VIEW View_CustomerPetSummary AS -- Bảng tổng hợp thông tin khách hàng và thú cưng
SELECT 
    c.id AS CustomerID,
    c.cus_name,
    c.sdt,
    c.email,
    p.id AS PetID,
    p.name AS PetName,
    p.species,
    p.breed,
    p.birth_month,
    p.birth_year
FROM Customers c
LEFT JOIN Pets p ON c.id = p.id_owner;
GO

CREATE OR ALTER VIEW View_UserProfiles AS -- Bảng tổng hợp thông tin người dùng, bao gồm cả Admin và Doctor
SELECT 
	a.id,
	a.email,
	a.password,
	a.role,
	a.is_active,
	a.created_at,
	a.updated_at,
	COALESCE(ad.name, d.name) AS display_name,
	d.specialization
FROM Account AS a 
LEFT JOIN Admin AS ad ON a.id = ad.id_account
LEFT JOIN Doctor AS d ON a.id = d.id_account
GO 


CREATE OR ALTER VIEW vw_FullScheduleDetails AS -- Bảng tổng hợp chi tiết lịch hẹn, bao gồm thông tin khách hàng, thú cưng và bác sĩ
SELECT 
    s.id AS schedule_id,
    s.time AS appointment_time,
    s.status AS appointment_status,
    -- Thông tin khách hàng
    c.cus_name AS customer_name,
    c.sdt AS customer_phone,
    c.email AS customer_email,
    -- Thông tin thú cưng
    p.name AS pet_name,
    p.species AS pet_species,
    p.breed AS pet_breed,
    P.birth_month,
    P.birth_year,
    -- Thông tin bác sĩ
    d.name AS doctor_name,
    d.specialization AS doctor_specialty
FROM Schedule s
LEFT JOIN Customers c ON s.id_cus = c.id
LEFT JOIN Pets p ON s.id_pet = p.id
LEFT JOIN Doctor d ON s.id_doc = d.id;
GO 

CREATE OR ALTER VIEW vw_ListServices AS  -- Bảng tổng hợp danh sách dịch vụ và giá cả
SELECT 
        id,
        service_name,
        option_name,
        price
FROM Services
GO 


CREATE OR ALTER VIEW vw_ListMedicines AS -- Bảng tổng hợp danh sách thuốc và giá cả
SELECT 
    id,
    name,
    category,
    stock_quantity,
    selling_price,
    unit
FROM Medicines
GO

CREATE OR ALTER VIEW vw_MedicalHistoryDetail AS -- Bảng tổng hợp chi tiết lịch sử khám bệnh của khách hàng và thú cưng
SELECT 
    c.cus_name AS CustomerName,
    c.sdt AS CustomerPhone,
    p.name AS PetName,
    mr.id AS MedicalRecordID,
    mr.created_at AS ExamDate,
    mr.symptoms,
    mr.diagnosis,
    mr.final_amount,
    -- Gộp tên thuốc thành một chuỗi, ngăn cách bằng dấu phẩy
    (SELECT STRING_AGG(CONCAT(m.name, ' x', pr.quantity), ', ') 
     FROM Prescriptions pr
     JOIN Medicines m ON pr.id_medicine = m.id
     WHERE pr.id_medical_record = mr.id) AS MedicineList
FROM MedicalRecords mr
JOIN Schedule sch ON mr.id_schedule = sch.id
JOIN Customers c ON sch.id_cus = c.id
JOIN Pets p ON sch.id_pet = p.id;
GO

CREATE OR ALTER VIEW vw_RevenueStats AS -- Bảng tổng hợp doanh thu theo ngày, tháng, năm
SELECT 
    id AS RecordID,
    final_amount,
    created_at,
    CAST(created_at AS DATE) AS ExamDate,
    DATEPART(WEEK, created_at) AS WeekNumber, -- Số tuần trong năm
    MONTH(created_at) AS ExamMonth,          -- Tháng
    YEAR(created_at) AS ExamYear             -- Năm
FROM MedicalRecords;
GO

CREATE OR ALTER VIEW vw_ServiceRevenueStats AS -- Bảng tổng hợp doanh thu theo dịch vụ(theo từng option)
AS
SELECT 
    s.id AS service_id,
    s.service_name,
    s.option_name,
    -- Dùng ISNULL để chuyển các dịch vụ chưa có doanh thu từ NULL thành 0 cho biểu đồ đẹp
    ISNULL(COUNT(mr.id), 0) AS total_usage_count,
    ISNULL(SUM(mr.service_price), 0) AS total_revenue
FROM Services AS s
LEFT JOIN MedicalRecords AS mr ON s.id = mr.id_service
GROUP BY 
    s.id, 
    s.service_name, 
    s.option_name;
GO