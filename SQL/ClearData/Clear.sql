-- Nhóm 1: Xóa các bảng chi tiết (nhánh cuối của sơ đồ)
DELETE FROM ServiceDetails;  -- Tham chiếu MedicalRecords, Services
DELETE FROM Prescriptions;   -- Tham chiếu MedicalRecords, Medicines

-- Nhóm 2: Xóa các bảng nghiệp vụ chính
DELETE FROM MedicalRecords;  -- Tham chiếu Schedule
DELETE FROM Doctor_Leave;    -- Tham chiếu Doctor
DELETE FROM Schedule;        -- Tham chiếu Doctor, Customers, Pets

-- Nhóm 3: Xóa các bảng thông tin đối tượng
DELETE FROM Pets;            -- Tham chiếu Customers
DELETE FROM Customers;
DELETE FROM Medicines;
DELETE FROM Services;

-- Nhóm 4: Xóa các bảng định danh tài khoản
DELETE FROM Admin;           -- Tham chiếu Account
DELETE FROM Doctor;          -- Tham chiếu Account
DELETE FROM Account;