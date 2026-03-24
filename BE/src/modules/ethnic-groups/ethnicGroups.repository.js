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

async function findArticles({ ethnicGroupId, language, offset, pageSize }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.LoaiBaiViet AS type,
      b.NoiDungNoiBat AS featured,
      b.NgayXuatBan AS publishedAt,
      t.TieuDe AS title,
      t.TomTat AS summary,
      be.LoaiLienHe AS relationType
    FROM BAI_VIET_DAN_TOC be
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = be.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE be.IDDanToc = @ethnicGroupId
    ORDER BY b.NgayXuatBan DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { ethnicGroupId, language, offset, pageSize });
}

async function countArticles(ethnicGroupId, language) {
  const sql = `
    SELECT COUNT(DISTINCT b.IDBaiViet) AS total
    FROM BAI_VIET_DAN_TOC be
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = be.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE be.IDDanToc = @ethnicGroupId
  `;

  const rows = await query(sql, { ethnicGroupId, language });
  return rows[0]?.total || 0;
}

module.exports = {
  findAll,
  findById,
  findArticles,
  countArticles
};
