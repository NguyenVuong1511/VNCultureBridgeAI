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

async function findArticles({ regionId, language, offset, pageSize }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.LoaiBaiViet AS type,
      b.NoiDungNoiBat AS featured,
      b.NgayXuatBan AS publishedAt,
      t.TieuDe AS title,
      t.TomTat AS summary,
      br.LoaiLienHe AS relationType
    FROM BAI_VIET_VUNG_VAN_HOA br
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = br.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE br.IDVung = @regionId
    ORDER BY b.NgayXuatBan DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { regionId, language, offset, pageSize });
}

async function countArticles(regionId, language) {
  const sql = `
    SELECT COUNT(DISTINCT b.IDBaiViet) AS total
    FROM BAI_VIET_VUNG_VAN_HOA br
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = br.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE br.IDVung = @regionId
  `;

  const rows = await query(sql, { regionId, language });
  return rows[0]?.total || 0;
}

module.exports = {
  findAll,
  findById,
  findArticles,
  countArticles
};
