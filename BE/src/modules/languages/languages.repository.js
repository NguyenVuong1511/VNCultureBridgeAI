const { query } = require('../../config/db');

async function findAll() {
  const sql = `
    SELECT
      MaNgonNgu AS code,
      TenNgonNgu AS name,
      TenBanDia AS nativeName,
      LaMacDinh AS isDefault,
      HoatDong AS isActive
    FROM NGON_NGU
    WHERE HoatDong = 1
    ORDER BY LaMacDinh DESC, MaNgonNgu ASC
  `;

  return query(sql);
}

module.exports = {
  findAll
};
