const { query } = require('../../config/db');

async function findAll(language) {
  const sql = `
    SELECT
      r.IDVung AS id,
      r.MaVung AS code,
      r.IDVungCha AS parentId,
      r.LoaiVung AS type,
      r.DuLieuBanDoGeoJson AS geoJson,
      r.ThuTuSapXep AS sortOrder,
      r.HoatDong AS isActive,
      t.MaNgonNgu AS language,
      t.TenVung AS name,
      t.MoTa AS description
    FROM VUNG_VAN_HOA r
    LEFT JOIN VUNG_VAN_HOA_BAN_DICH t
      ON t.IDVung = r.IDVung AND t.MaNgonNgu = @language
    WHERE r.HoatDong = 1
    ORDER BY r.ThuTuSapXep, r.IDVung
  `;

  return query(sql, { language });
}

async function findById(id, language) {
  const sql = `
    SELECT
      r.IDVung AS id,
      r.MaVung AS code,
      r.IDVungCha AS parentId,
      r.LoaiVung AS type,
      r.DuLieuBanDoGeoJson AS geoJson,
      r.ThuTuSapXep AS sortOrder,
      r.HoatDong AS isActive,
      t.MaNgonNgu AS language,
      t.TenVung AS name,
      t.MoTa AS description
    FROM VUNG_VAN_HOA r
    LEFT JOIN VUNG_VAN_HOA_BAN_DICH t
      ON t.IDVung = r.IDVung AND t.MaNgonNgu = @language
    WHERE r.IDVung = @id AND r.HoatDong = 1
  `;

  const rows = await query(sql, { id, language });
  return rows[0] || null;
}

module.exports = {
  findAll,
  findById
};
