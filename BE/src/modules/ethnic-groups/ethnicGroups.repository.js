const { query } = require('../../config/db');

async function findAll(language) {
  const sql = `
    SELECT
      e.IDDanToc AS id,
      e.MaDanToc AS code,
      e.ThuTuSapXep AS sortOrder,
      e.HoatDong AS isActive,
      t.MaNgonNgu AS language,
      t.TenDanToc AS name,
      t.MoTa AS description
    FROM DAN_TOC e
    LEFT JOIN DAN_TOC_BAN_DICH t
      ON t.IDDanToc = e.IDDanToc AND t.MaNgonNgu = @language
    WHERE e.HoatDong = 1
    ORDER BY e.ThuTuSapXep, e.IDDanToc
  `;

  return query(sql, { language });
}

async function findById(id, language) {
  const sql = `
    SELECT
      e.IDDanToc AS id,
      e.MaDanToc AS code,
      e.ThuTuSapXep AS sortOrder,
      e.HoatDong AS isActive,
      t.MaNgonNgu AS language,
      t.TenDanToc AS name,
      t.MoTa AS description
    FROM DAN_TOC e
    LEFT JOIN DAN_TOC_BAN_DICH t
      ON t.IDDanToc = e.IDDanToc AND t.MaNgonNgu = @language
    WHERE e.IDDanToc = @id AND e.HoatDong = 1
  `;

  const rows = await query(sql, { id, language });
  return rows[0] || null;
}

module.exports = {
  findAll,
  findById
};
