USE SunnyPetDB;
GO

  CREATE OR ALTER PROCEDURE sp_HandleBooking -- Quy trình xử lý đặt lịch hẹn, bao gồm cả tạo khách hàng, thú cưng và lịch hẹn
    @CusName NVARCHAR(255),
    @Phone NVARCHAR(15),
    @Email NVARCHAR(255),
    @PetName NVARCHAR(255),
    @Species NVARCHAR(100),
    @Breed NVARCHAR(100),
    @BirthMonth TINYINT,
    @BirthYear SMALLINT
AS
BEGIN 
    SET NOCOUNT ON;
    DECLARE @CurrentCusID INT;
    DECLARE @CurrentPetID INT;
    -- 1. Check xem khách cũ hay mới (Dùng SĐT hoặc Email)
    SELECT @CurrentCusID = id FROM Customers 
    WHERE sdt = @Phone OR email = @Email;

    IF @CurrentCusID IS NULL
    BEGIN
    -- Tạo khách mới nếu không tìm thấy
        INSERT INTO Customers (cus_name, sdt, email) 
        VALUES (@CusName, @Phone, @Email);
        SET @CurrentCusID = SCOPE_IDENTITY();
    END 

    -- 2. Check xem Pet này khách đã từng dắt đi khám chưa
    -- (Check dựa trên tên Pet và ID chủ để tránh trùng lặp)
    SELECT @CurrentPetID = id FROM Pets 
    WHERE id_owner = @CurrentCusID AND name = @PetName;

    IF @CurrentPetID IS NULL
    BEGIN
        -- Tạo Pet mới gắn với ID chủ vừa tìm được/tạo được
        INSERT INTO Pets (id_owner, name, species, breed, birth_month, birth_year)
        VALUES (@CurrentCusID, @PetName, @Species, @Breed, @BirthMonth, @BirthYear);
        SET @CurrentPetID = SCOPE_IDENTITY();
    END

    -- 3. Trả về kết quả CUỐI CÙNG bằng cách SELECT từ VIEW của bạn
    -- Việc này giúp BE nhận về dữ liệu thống nhất với giao diện
    SELECT * FROM View_CustomerPetSummary 
    WHERE CustomerID = @CurrentCusID AND PetID = @CurrentPetID;
END 
GO 


CREATE OR ALTER PROCEDURE sp_CreateAppointment
    @CusID INT,
    @PetID INT,
    @DocID INT = NULL, -- NULL nếu chọn "Tùy phân công"
    @ApptTime DATETIME2,
    @Status NVARCHAR(50) = N'PENDING'
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. TRƯỜNG HỢP: KHÁCH CHỌN ĐÍCH DANH BÁC SĨ
    IF @DocID IS NOT NULL
    BEGIN
        -- Kiểm tra xem bác sĩ này đã có lịch CHỐT (CONFIRMED/COMPLETED) vào giờ này chưa
        IF EXISTS (
            SELECT 1 FROM [Schedule] 
            WHERE id_doc = @DocID 
              AND [time] = @ApptTime 
              AND [status] IN (N'CONFIRMED', N'COMPLETED')
        )
        BEGIN
            SELECT 'DOCTOR_BUSY' AS ErrorCode, 
                   N'Bác sĩ này đã có lịch chính thức vào giờ này. Bạn vẫn có thể đặt chờ hoặc chọn giờ khác.' AS Message;
            RETURN;
        END
    END

    -- 2. TRƯỜNG HỢP: KHÁCH CHỌN "TÙY PHÂN CÔNG" (DocID là NULL)
    ELSE
    BEGIN
        -- Tìm bác sĩ đầu tiên KHÔNG có lịch chốt vào giờ đó
        SELECT TOP 1 @DocID = id 
        FROM Doctor 
        WHERE id NOT IN (
            SELECT id_doc FROM [Schedule] 
            WHERE [time] = @ApptTime 
              AND [status] IN (N'CONFIRMED', N'COMPLETED')
        );

        -- Nếu tất cả bác sĩ đều đã kín lịch CHỐT
        IF @DocID IS NULL
        BEGIN
            SELECT 'NO_DOCTOR_AVAILABLE' AS ErrorCode, 
                   N'Tất cả bác sĩ đều đã kín lịch chính thức vào khung giờ này. Vui lòng chọn giờ khác!' AS Message;
            RETURN;
        END
    END

    -- 3. TIẾN HÀNH TẠO LỊCH HẸN (Trạng thái mặc định là PENDING)
    INSERT INTO [Schedule] (id_doc, id_cus, id_pet, [time], [status], created_at)
    VALUES (@DocID, @CusID, @PetID, @ApptTime, @Status, GETDATE());

    -- 4. TRẢ VỀ DỮ LIỆU CHO BACKEND/FRONTEND
    SELECT 
        'SUCCESS' AS ResultStatus,
        s.id AS ScheduleID,
        s.id_doc,
        d.name AS DoctorName,
        s.[time],
        s.[status],
        s.created_at
    FROM [Schedule] s
    JOIN Doctor d ON s.id_doc = d.id
    WHERE s.id = SCOPE_IDENTITY();
END
GO


CREATE OR ALTER PROCEDURE sp_CreateMedicalRecord -- Tạo hồ sơ khám bệnh sau khi lịch hẹn đã hoàn thành
    @id_schedule INT,
    @id_service INT,
    @symptoms NVARCHAR(MAX),
    @diagnosis NVARCHAR(MAX),
    @notes NVARCHAR(MAX),
    @service_price DECIMAL(18,0),
    @medicine_total_price DECIMAL(18,0),
    @final_amount DECIMAL(18,0),
    @new_record_id INT OUTPUT -- Trả ID về cho Backend
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS (SELECT 1 FROM MedicalRecords WHERE id_schedule = @id_schedule)
    BEGIN
        RAISERROR(N'Lịch hẹn %d đã có bệnh án! Lệnh bị hủy để bảo vệ ID.', 16, 1, @id_schedule);
        RETURN; 
    END

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
        @service_price, 
        @medicine_total_price, 
        @final_amount, 
        GETDATE()
    );

    -- Lấy ID vừa tự động sinh ra gán vào tham số OUTPUT
    SET @new_record_id = SCOPE_IDENTITY();
END
GO

CREATE OR ALTER PROCEDURE sp_AddPrescriptionItem -- Thêm thuốc vào đơn thuốc và trừ kho ngay lập tức
    @id_medical_record INT,
    @id_medicine INT,
    @quantity INT,
    @price_at_sale DECIMAL(18,0)
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. Thêm dòng vào đơn thuốc
    INSERT INTO Prescriptions (id_medical_record, id_medicine, quantity, price_at_sale)
    VALUES (@id_medical_record, @id_medicine, @quantity, @price_at_sale);

    -- 2. Trừ kho thuốc ngay lập tức
    UPDATE Medicines 
    SET stock_quantity = stock_quantity - @quantity 
    WHERE id = @id_medicine;
END
GO