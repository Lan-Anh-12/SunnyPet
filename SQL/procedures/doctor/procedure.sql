USE SunnyPetDB
GO

------------------------------------------------------------
-- Tìm kiếm lịch hẹn theo tên khách hàng hoặc số điện thoại
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_SearchBooking 
    @Keyword NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT * FROM vw_FullScheduleDetails
    WHERE customer_name LIKE N'%' + @Keyword + '%'
       OR customer_phone LIKE '%' + @Keyword + '%'
    ORDER BY appointment_time DESC;
END
GO

------------------------------------------------------------
-- Lấy danh sách lịch hẹn của bác sĩ theo ngày
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetDoctorWorklist 
    @DoctorName NVARCHAR(255),
    @TargetDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        schedule_id,
        appointment_time,
        appointment_status,
        customer_name,
        customer_phone,
        pet_name,
        pet_species,
        pet_breed,
        birth_month,
        birth_year
    FROM vw_FullScheduleDetails
    WHERE 
        doctor_name = @DoctorName 
        AND CAST(appointment_time AS DATE) = @TargetDate
        -- Chỉ lấy các lịch đã được Admin xác nhận thành công
        AND appointment_status = 'COMPLETED'
    ORDER BY appointment_time ASC;
END
GO
------------------------------------------------------------
-- Lấy tổng số lịch hẹn trong ngày hôm nay
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetTotalSchedulesToday 
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS TotalToday
    FROM Schedule
    -- Ép kiểu về DATE để so sánh chỉ phần Ngày-Tháng-Năm
    WHERE CAST([time] AS DATE) = CAST(GETDATE() AS DATE) AND [status] = 'COMPLETED';
END
GO

------------------------------------------------------------
-- Đếm số ca khám theo ngày
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_CountScheduleByDate 
    @TargetDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        CAST(@TargetDate AS DATE) AS Ngay_Bao_Cao,
        COUNT(*) AS So_Ca_Da_Xong
    FROM Schedule
    WHERE CAST([time] AS DATE) = @TargetDate
      AND [status] = 'COMPLETED';
END
GO

------------------------------------------------------------
-- Đếm số ca đã khám thực tế trong ngày hôm nay (dựa trên MedicalRecords)
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_CountActualExaminedToday 
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(mr.id) AS RealCompletedCount
    FROM MedicalRecords mr
    JOIN Schedule sch ON mr.id_schedule = sch.id
    -- Chỉ lọc những lịch hẹn diễn ra trong ngày hôm nay
    WHERE CAST(sch.[time] AS DATE) = CAST(GETDATE() AS DATE);
END
GO

------------------------------------------------------------
-- Tạo hồ sơ khám bệnh sau khi lịch hẹn đã hoàn thành
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_CreateMedicalRecord 
    @id_schedule INT,
    @id_service INT,
    @symptoms NVARCHAR(MAX),
    @diagnosis NVARCHAR(MAX),
    @notes NVARCHAR(MAX),
    @medicine_total_price DECIMAL(18,2), -- Tiền thuốc vẫn cần truyền từ tổng đơn thuốc
    @new_record_id INT OUTPUT 
AS
BEGIN
    SET NOCOUNT ON;
    -- 1. Khai báo biến để hứng giá dịch vụ từ bảng Services
    DECLARE @auto_service_price DECIMAL(18,2);
    DECLARE @final_amount DECIMAL(18,2);
    -- 2. Lấy giá tiền từ bảng Services
    SELECT @auto_service_price = [price] 
    FROM [dbo].[Services] 
    WHERE [id] = @id_service;
    -- Kiểm tra nếu không tìm thấy dịch vụ
    IF @auto_service_price IS NULL
    BEGIN
        RAISERROR(N'Lỗi: Không tìm thấy dịch vụ có ID %d!', 16, 1, @id_service);
        RETURN;
    END
    -- 3. Tự động tính toán Tổng tiền (Final Amount)
    SET @final_amount = @auto_service_price + ISNULL(@medicine_total_price, 0);
    -- 4. Check trùng bệnh án cho lịch hẹn
    IF EXISTS (SELECT 1 FROM MedicalRecords WHERE id_schedule = @id_schedule)
    BEGIN
        RAISERROR(N'Lịch hẹn %d đã có bệnh án!', 16, 1, @id_schedule);
        RETURN; 
    END
    -- 5. Thực hiện INSERT
    INSERT INTO MedicalRecords (
        id_schedule, 
        id_service, 
        symptoms, 
        diagnosis, 
        notes, 
        service_price, 
        medicine_total_price, 
        final_amount, 
        created_at
    )
    VALUES (
        @id_schedule, 
        @id_service, 
        @symptoms, 
        @diagnosis, 
        @notes, 
        @auto_service_price, -- Giá tự động lấy từ DB
        @medicine_total_price, 
        @final_amount,       -- Tổng tiền tự động tính
        GETDATE()
    );
    -- 6. Trả ID về cho Backend
    SET @new_record_id = SCOPE_IDENTITY();
    
    PRINT N'Bệnh án tạo thành công. Giá dịch vụ áp dụng: ' + CAST(@auto_service_price AS NVARCHAR(20));
END
GO


------------------------------------------------------------
-- Thêm thuốc vào đơn thuốc và trừ kho ngay lập tức
------------------------------------------------------------

CREATE OR ALTER PROCEDURE sp_AddPrescriptionItem 
    @id_medical_record INT,
    @id_medicine INT,
    @quantity INT,
    @price_at_sale DECIMAL(18,0)
AS
BEGIN
    SET NOCOUNT ON;
    -- 1. Kiểm tra ID Bệnh án có tồn tại hay không
    IF NOT EXISTS (SELECT 1 FROM MedicalRecords WHERE id = @id_medical_record)
    BEGIN
        RAISERROR(N'Lỗi: ID Bệnh án %d không tồn tại trong hệ thống.', 16, 1, @id_medical_record);
        RETURN;
    END
    -- 2. Kiểm tra số lượng tồn kho của thuốc
    DECLARE @current_stock INT;
    SELECT @current_stock = stock_quantity FROM Medicines WHERE id = @id_medicine;
    IF @current_stock IS NULL
    BEGIN
        RAISERROR(N'Lỗi: ID Thuốc %d không tồn tại.', 16, 1, @id_medicine);
        RETURN;
    END
    IF @current_stock < @quantity
    BEGIN
        RAISERROR(N'Lỗi: Số lượng tồn kho không đủ (Hiện có: %d, Yêu cầu: %d).', 16, 1, @current_stock, @quantity);
        RETURN;
    END
    -- 3. Nếu mọi điều kiện đều thỏa mãn, tiến hành nghiệp vụ
    BEGIN TRY
        BEGIN TRANSACTION;
        -- Thêm dòng vào đơn thuốc
        INSERT INTO Prescriptions (id_medical_record, id_medicine, quantity, price_at_sale)
        VALUES (@id_medical_record, @id_medicine, @quantity, @price_at_sale);
        -- Trừ kho thuốc
        UPDATE Medicines 
        SET stock_quantity = stock_quantity - @quantity 
        WHERE id = @id_medicine;
        COMMIT TRANSACTION;
        PRINT N'Thêm đơn thuốc thành công!';
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrorMessage, 16, 1);
    END CATCH
END
GO

------------------------------------------------------------
-- Lấy lịch sử khám bệnh của khách hàng theo tên khách hàng
------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetMedicalHistoryByCustomer 
	@CustomerName NVARCHAR(100)
AS
BEGIN
SET NOCOUNT ON;
	SELECT * FROM vw_MedicalHistoryDetail
    WHERE CustomerName LIKE N'%' + @CustomerName + N'%'
    ORDER BY ExamDate DESC; -- Luôn ưu tiên hiện ca mới nhất lên đầu
END
GO 