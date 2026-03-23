const { query } = require('../../config/db');

async function findAll(language) {
  const sql = `
    SELECT
      c.IDDanhMuc AS id,
      c.MaDanhMuc AS code,
      c.IDDanhMucCha AS parentId,
      c.ThuTuSapXep AS sortOrder,
      c.HoatDong AS isActive,
      t.MaNgonNgu AS language,
      t.TenDanhMuc AS name,
      t.MoTa AS description
    FROM DANH_MUC_CHU_DE c
    LEFT JOIN DANH_MUC_CHU_DE_BAN_DICH t
      ON t.IDDanhMuc = c.IDDanhMuc AND t.MaNgonNgu = @language
    WHERE c.HoatDong = 1
    ORDER BY c.ThuTuSapXep, c.IDDanhMuc
  `;

  return query(sql, { language });
}

module.exports = {
  findAll
};
