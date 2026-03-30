USE SunnyPetDB; -- Đảm bảo đang dùng đúng DB
GO

CREATE VIEW View_CustomerPetSummary AS
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
