const { query } = require('../../config/db');

async function findUserByUsername(username) {
  const sql = `
    SELECT TOP 1
      u.IDNguoiDung AS id,
      u.TenDangNhap AS username,
      u.Email AS email,
      u.MatKhauHash AS passwordHash,
      u.HoTen AS fullName,
      u.TrangThai AS status,
      u.LanDangNhapCuoi AS lastLoginAt
    FROM QUAN_TRI_NGUOI_DUNG u
    WHERE u.TenDangNhap = @username
  `;

  const rows = await query(sql, { username });
  return rows[0] || null;
}

async function findUserByEmail(email) {
  const sql = `
    SELECT TOP 1
      u.IDNguoiDung AS id,
      u.TenDangNhap AS username,
      u.Email AS email,
      u.MatKhauHash AS passwordHash,
      u.HoTen AS fullName,
      u.TrangThai AS status,
      u.LanDangNhapCuoi AS lastLoginAt
    FROM QUAN_TRI_NGUOI_DUNG u
    WHERE u.Email = @email
  `;

  const rows = await query(sql, { email });
  return rows[0] || null;
}

async function createUser({ username, email, passwordHash, fullName }) {
  const rows = await query(`
    INSERT INTO QUAN_TRI_NGUOI_DUNG (
      IDNguoiDung,
      TenDangNhap,
      Email,
      MatKhauHash,
      HoTen,
      TrangThai,
      NgayTao,
      NgayCapNhat
    )
    OUTPUT
      INSERTED.IDNguoiDung AS id,
      INSERTED.TenDangNhap AS username,
      INSERTED.Email AS email,
      INSERTED.MatKhauHash AS passwordHash,
      INSERTED.HoTen AS fullName,
      INSERTED.TrangThai AS status,
      INSERTED.LanDangNhapCuoi AS lastLoginAt
    VALUES (
      NEWID(),
      @username,
      @email,
      @passwordHash,
      @fullName,
      'HOAT_DONG',
      SYSUTCDATETIME(),
      SYSUTCDATETIME()
    )
  `, { username, email, passwordHash, fullName });

  return rows[0] || null;
}

async function findRolesByUserId(userId) {
  const sql = `
    SELECT
      r.IDVaiTro AS id,
      r.MaVaiTro AS code,
      r.TenVaiTro AS name
    FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO ur
    INNER JOIN QUAN_TRI_VAI_TRO r ON r.IDVaiTro = ur.IDVaiTro
    WHERE ur.IDNguoiDung = @userId
  `;

  return query(sql, { userId });
}

async function findPermissionsByUserId(userId) {
  const sql = `
    SELECT DISTINCT
      p.IDQuyen AS id,
      p.MaQuyen AS code,
      p.TenQuyen AS name
    FROM QUAN_TRI_NGUOI_DUNG_VAI_TRO ur
    INNER JOIN QUAN_TRI_VAI_TRO_QUYEN rp ON rp.IDVaiTro = ur.IDVaiTro
    INNER JOIN QUAN_TRI_QUYEN p ON p.IDQuyen = rp.IDQuyen
    WHERE ur.IDNguoiDung = @userId
  `;

  return query(sql, { userId });
}

async function updateLastLogin(userId) {
  const sql = `
    UPDATE QUAN_TRI_NGUOI_DUNG
    SET LanDangNhapCuoi = SYSUTCDATETIME(),
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDNguoiDung = @userId
  `;

  await query(sql, { userId });
}

async function updatePassword(userId, passwordHash) {
  await query(`
    UPDATE QUAN_TRI_NGUOI_DUNG
    SET MatKhauHash = @passwordHash,
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDNguoiDung = @userId
  `, { userId, passwordHash });
}

async function findUserById(userId) {
  const rows = await query(`
    SELECT TOP 1
      u.IDNguoiDung AS id,
      u.TenDangNhap AS username,
      u.Email AS email,
      u.MatKhauHash AS passwordHash,
      u.HoTen AS fullName,
      u.TrangThai AS status,
      u.LanDangNhapCuoi AS lastLoginAt
    FROM QUAN_TRI_NGUOI_DUNG u
    WHERE u.IDNguoiDung = @userId
  `, { userId });

  return rows[0] || null;
}

module.exports = {
  findUserByUsername,
  findUserByEmail,
  createUser,
  findUserById,
  findRolesByUserId,
  findPermissionsByUserId,
  updateLastLogin,
  updatePassword
};
