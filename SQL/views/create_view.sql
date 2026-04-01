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


CREATE OR ALTER VIEW vw_ListMedicines AS 
SELECT 
    id,
    name,
    category,
    stock_quantity,
    selling_price,
    unit
FROM Medicines
GO