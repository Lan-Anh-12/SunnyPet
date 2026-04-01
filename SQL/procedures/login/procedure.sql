CREATE OR ALTER PROCEDURE sp_ValidateLogin -- Xác thực đăng nhập và trả về thông tin người dùng
    @Email NVARCHAR(100),
    @Password NVARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra tài khoản và trả về thông tin
    SELECT 
        id,
        email,
        display_name,
        [role],
        is_active,
        specialization
    FROM View_UserProfiles
    WHERE email = @Email AND [password] = @Password;
END;
GO 


CREATE PROCEDURE sp_ResetPasswordSimple -- Đơn giản chỉ cần email và mật khẩu mới đã được hash
    @Email NVARCHAR(255),
    @NewHashedPassword NVARCHAR(MAX),
    @IsUpdated BIT OUTPUT
AS
BEGIN
    SET NOCOUNT ON;

    -- Kiểm tra sự tồn tại của email trong bảng Accounts
    IF EXISTS (SELECT 1 FROM Accounts WHERE Email = @Email)
    BEGIN
        -- Thực hiện đổi mật khẩu ngay lập tức
        UPDATE Accounts
        SET PasswordHash = @NewHashedPassword
        WHERE Email = @Email;

        SET @IsUpdated = 1; -- Trả về 1 nếu thành công
    END
    ELSE
    BEGIN
        SET @IsUpdated = 0; -- Trả về 0 nếu email không có trong hệ thống
    END
END
Go
