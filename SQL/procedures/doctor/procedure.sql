USE SunnyPetDB
GO

CREATE OR ALTER PROCEDURE sp_SearchBooking -- Tìm kiếm lịch hẹn theo tên khách hàng hoặc số điện thoại
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

CREATE OR ALTER PROCEDURE sp_GetDoctorWorklist -- Lấy danh sách lịch hẹn của bác sĩ theo ngày
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