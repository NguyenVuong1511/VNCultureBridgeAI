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

module.exports = {
  findUserByUsername,
  findRolesByUserId,
  findPermissionsByUserId,
  updateLastLogin
};
