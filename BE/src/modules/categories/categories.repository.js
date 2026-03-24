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

async function findById(id, language) {
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
    WHERE c.IDDanhMuc = @id AND c.HoatDong = 1
  `;

  const rows = await query(sql, { id, language });
  return rows[0] || null;
}

async function findArticles({ categoryId, language, offset, pageSize }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.LoaiBaiViet AS type,
      b.NoiDungNoiBat AS featured,
      b.NgayXuatBan AS publishedAt,
      t.TieuDe AS title,
      t.TomTat AS summary
    FROM BAI_VIET_DANH_MUC bc
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = bc.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE bc.IDDanhMuc = @categoryId
    ORDER BY b.NgayXuatBan DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { categoryId, language, offset, pageSize });
}

async function countArticles(categoryId, language) {
  const sql = `
    SELECT COUNT(DISTINCT b.IDBaiViet) AS total
    FROM BAI_VIET_DANH_MUC bc
    INNER JOIN BAI_VIET b
      ON b.IDBaiViet = bc.IDBaiViet
      AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE bc.IDDanhMuc = @categoryId
  `;

  const rows = await query(sql, { categoryId, language });
  return rows[0]?.total || 0;
}

module.exports = {
  findAll,
  findById,
  findArticles,
  countArticles
};
