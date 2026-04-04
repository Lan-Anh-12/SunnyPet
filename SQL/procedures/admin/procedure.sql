---------------------------------------------------
-- Tạo tài khoản bác sĩ cùng lúc với hồ sơ bác sĩ
---------------------------------------------------

CREATE OR ALTER PROCEDURE sp_CreateDoctorWithAccount 
    @DoctorEmail NVARCHAR(100),
    @Pass VARCHAR(255),
    @DoctorName NVARCHAR(100),
    @Specialization NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @NewAccountID INT;

    -- 1. Check trùng Email,Name
    IF EXISTS (SELECT 1 FROM Account WHERE email = @DoctorEmail)
    BEGIN
        RAISERROR(N'Email "%s" đã được sử dụng bởi một tài khoản khác.', 16, 1, @DoctorEmail);
        RETURN;
    END
    IF EXISTS (SELECT 1 FROM Doctor WHERE name = @DoctorName)
    BEGIN
        RAISERROR(N'Name "%s" đã được sử dụng bởi một tài khoản khác.', 16, 1, @DoctorName);
        RETURN;
    END

    -- 2. Insert vào bảng Account
    INSERT INTO Account (email, password, role, is_active, created_at,updated_at)
    VALUES (@DoctorEmail, @Pass, 'DOCTOR', 1, SYSDATETIME(),SYSDATETIME());

    SET @NewAccountID = SCOPE_IDENTITY();

    INSERT INTO Doctor (id_account, name, specialization)
    VALUES (@NewAccountID, @DoctorName, @Specialization);

    PRINT N'Đã tạo tài khoản và hồ sơ cho bác sĩ: ' + @DoctorName;
END
GO

-------------------------------------------------------------
-- Lấy danh sách công việc cần xử lý trong ngày cho Admin
-------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetDailyPendingWorklist 
    @TargetDate DATE
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        schedule_id,
        appointment_time,
        appointment_status,
        doctor_name,      -- Thêm cột này để Admin biết ca này thuộc bác sĩ nào
        customer_name,
        customer_phone,
        pet_name,
        pet_species,
        pet_breed,
        birth_month,
        birth_year
    FROM vw_FullScheduleDetails
    WHERE 
        -- So sánh ngày (bỏ qua phần giờ của appointment_time)
        CAST(appointment_time AS DATE) = @TargetDate
        
        -- Chỉ lấy các lịch đang chờ xử lý (PENDING)
        AND appointment_status = 'PENDING'
        
    ORDER BY appointment_time ASC;
END
GO


-------------------------------------------------------------
-- Cập nhật trạng thái lịch hẹn (Admin xác nhận hoặc hủy lịch)
-------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_UpdateAppointmentStatus
    @ScheduleID INT,
    @NewStatus NVARCHAR(50) -- 'COMPLETED' hoặc 'CANCELLED'
AS
BEGIN
    SET NOCOUNT ON;
    -- 1. Kiểm tra trạng thái đầu vào hợp lệ
    IF @NewStatus NOT IN ('COMPLETED', 'CANCELLED', 'PENDING')
    BEGIN
        RAISERROR(N'Lỗi: Trạng thái không hợp lệ. Chỉ chấp nhận: PENDING, COMPLETED, CANCELLED.', 16, 1);
        RETURN;
    END
    -- 2. Kiểm tra ID lịch hẹn có tồn tại không
    IF NOT EXISTS (SELECT 1 FROM Schedule WHERE id = @ScheduleID)
    BEGIN
        RAISERROR(N'Lỗi: Không tìm thấy lịch hẹn với ID: %d.', 16, 1, @ScheduleID);
        RETURN;
    END
    -- 3. Tiến hành cập nhật
    BEGIN TRY
        BEGIN TRANSACTION;

        UPDATE Schedule
        SET status = @NewStatus
        WHERE id = @ScheduleID;
        COMMIT TRANSACTION;
        PRINT N'Cập nhật trạng thái thành công sang: ' + @NewStatus;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0 ROLLBACK TRANSACTION;    
        DECLARE @ErrMsg NVARCHAR(4000) = ERROR_MESSAGE();
        RAISERROR(@ErrMsg, 16, 1);
    END CATCH
END
GO

--------------------------------------------------------------
-- Lấy doanh thu hàng tháng trong năm cho Admin
--------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_GetMonthlyRevenueFullYear
    @Year INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Tạo một bảng ảo chứa 12 tháng
    WITH Months AS (
        SELECT 1 AS Month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
        UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 
        UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
    )
    SELECT 
        m.Month AS ExamMonth,
        @Year AS ExamYear,
        ISNULL(COUNT(r.RecordID), 0) AS TotalRecords,
        ISNULL(SUM(r.final_amount), 0) AS MonthlyRevenue
    FROM Months m
    LEFT JOIN vw_RevenueStats r ON m.Month = r.ExamMonth AND r.ExamYear = @Year
    GROUP BY m.Month
    ORDER BY m.Month ASC;
END
GO

---------------------------------------------------------------
-- Thêm thuốc mới vào hệ thống (Admin)
----------------------------------------------------------------
CREATE OR ALTER PROCEDURE sp_InsertMedicine
    @Name NVARCHAR(255),
    @Category NVARCHAR(100),
    @StockQuantity INT,
    @CostPrice DECIMAL(18, 0),
    @SellingPrice DECIMAL(18, 0),
    @Unit NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    -- 1. Kiểm tra tên thuốc đã tồn tại chưa
    IF EXISTS (SELECT 1 FROM [dbo].[Medicines] WHERE [name] = @Name)
    BEGIN
        RAISERROR(N'Lỗi: Tên thuốc [%s] đã tồn tại trong hệ thống.', 16, 1, @Name);
        RETURN;
    END
    -- 2. Kiểm tra logic giá cả (Giá bán không được thấp hơn giá vốn)
    IF (@SellingPrice < @CostPrice)
    BEGIN
        RAISERROR(N'Lỗi: Giá bán  không thể thấp hơn giá vốn.', 16, 1);
        RETURN;
    END
    -- 3. Kiểm tra số lượng tồn kho không được âm
    IF (@StockQuantity < 0)
    BEGIN
        RAISERROR(N'Lỗi: Số lượng tồn kho không thể âm.', 16, 1);
        RETURN;
    END
    -- Nếu vượt qua hết các kiểm tra thì mới INSERT
    INSERT INTO [dbo].[Medicines] 
        ([name], [category], [stock_quantity], [cost_price], [selling_price], [unit])
    VALUES 
        (@Name, @Category, @StockQuantity, @CostPrice, @SellingPrice, @Unit);
    PRINT N'Thêm thuốc thành công!';
END
GO

----------------------------------------------------------------
-- Lấy danh sách thuốc theo tên (Admin)
----------------------------------------------------------------

CREATE OR ALTER PROCEDURE sp_GetMedicinesByName
    @SearchName NVARCHAR(255) = '' -- Mặc định là chuỗi rỗng để lấy hết nếu không nhập
AS
BEGIN
    SET NOCOUNT ON;

    -- Tìm kiếm với LIKE để hỗ trợ tìm kiếm gần đúng
    SELECT 
        [id],
        [name],
        [category],
        [stock_quantity],
        [cost_price],
        [selling_price],
        [unit]
    FROM [dbo].[Medicines]
    WHERE [name] LIKE N'%' + @SearchName + N'%'
    ORDER BY [name] ASC; -- Sắp xếp theo thứ tự bảng chữ cái
END
GO

----------------------------------------------------------------------
-- Cập nhật thông tin thuốc (Admin nhập thêm số lượng, cập nhật giá cả)
----------------------------------------------------------------------

CREATE OR ALTER PROCEDURE sp_UpdateMedicine
    @Id INT,
    @AddedQuantity INT = 0,
    @NewCostPrice DECIMAL(18, 0) = NULL,
    @NewSellingPrice DECIMAL(18, 0) = NULL
AS
BEGIN
    SET NOCOUNT ON;

    -- 1. KIỂM TRA ĐẦU VÀO CƠ BẢN (INPUT VALIDATION)
    IF (@AddedQuantity < 0)
    BEGIN
        RAISERROR(N'Lỗi: Số lượng nhập hàng không được là số âm. Hãy nhập số dương!', 16, 1);
        RETURN;
    END

    -- Chặn giá nhập/giá bán <= 0 (nếu có nhập mới)
    IF (@NewCostPrice <= 0 OR @NewSellingPrice <= 0)
    BEGIN
        RAISERROR(N'Lỗi: Giá nhập và giá bán phải lớn hơn 0!', 16, 1);
        RETURN;
    END
    -- 2. LẤY DỮ LIỆU HIỆN TẠI
    DECLARE @CurrStock INT, @CurrCost DECIMAL(18,2), @CurrSelling DECIMAL(18,0);
    SELECT 
        @CurrStock = [stock_quantity], 
        @CurrCost = [cost_price], 
        @CurrSelling = [selling_price]
    FROM [dbo].[Medicines] WHERE [id] = @Id;
    IF @CurrStock IS NULL
    BEGIN
        RAISERROR(N'Lỗi: Không tìm thấy thuốc có ID = %d', 16, 1, @Id);
        RETURN;
    END
    -- 3. XÁC ĐỊNH GIÁ TRỊ CUỐI CÙNG
    DECLARE @FinalStock INT = @CurrStock + @AddedQuantity;
    DECLARE @FinalCost DECIMAL(18,2) = ISNULL(@NewCostPrice, @CurrCost);
    DECLARE @FinalSelling DECIMAL(18,2) = ISNULL(@NewSellingPrice, @CurrSelling);

    -- 4. KIỂM TRA LOGIC KINH DOANH (BUSINESS RULES)
    IF (@FinalSelling < @FinalCost)
    BEGIN
        RAISERROR(N'Lỗi: Giá bán không được thấp hơn giá vốn!', 16, 1 );
        RETURN;
    END
    -- 5. CẬP NHẬT
    UPDATE [dbo].[Medicines]
    SET [stock_quantity] = @FinalStock,
        [cost_price] = @FinalCost,
        [selling_price] = @FinalSelling
    WHERE [id] = @Id;

    PRINT N'Nhập hàng thành công cho ID ' + CAST(@Id AS NVARCHAR(10));
END
GO
