const { query } = require('../../config/db');

async function findAll({ language, offset, pageSize, keyword, categoryId, regionId, ethnicId, featured, type }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.MaNgonNguGoc AS originalLanguage,
      b.LoaiBaiViet AS type,
      b.TrangThai AS status,
      b.CapDoNhayCam AS sensitivityLevel,
      b.MucDoKiemDuyet AS reviewLevel,
      b.NoiDungNoiBat AS featured,
      b.NgayXuatBan AS publishedAt,
      t.MaNgonNgu AS language,
      t.TieuDe AS title,
      t.TomTat AS summary,
      t.GioiThieu AS introduction,
      t.NguonGoc AS origin,
      t.YNghiaVanHoa AS culturalMeaning,
      t.BoiCanhSuDung AS usageContext,
      t.NoiDungChiTiet AS content,
      (
        SELECT TOP 1 m.DuongDanTep
        FROM BAI_VIET_MEDIA bm
        INNER JOIN MEDIA m ON m.IDMedia = bm.IDMedia
        WHERE bm.IDBaiViet = b.IDBaiViet AND bm.LaMediaChinh = 1 AND m.TrangThai = 'HOAT_DONG'
      ) AS primaryMediaUrl
    FROM BAI_VIET b
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    LEFT JOIN BAI_VIET_DANH_MUC bc ON bc.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_VUNG_VAN_HOA br ON br.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_DAN_TOC be ON be.IDBaiViet = b.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN'
      AND (@keyword = '' OR t.TieuDe LIKE '%' + @keyword + '%' OR t.TomTat LIKE '%' + @keyword + '%')
      AND (@categoryId IS NULL OR bc.IDDanhMuc = @categoryId)
      AND (@regionId IS NULL OR br.IDVung = @regionId)
      AND (@ethnicId IS NULL OR be.IDDanToc = @ethnicId)
      AND (@featured IS NULL OR b.NoiDungNoiBat = @featured)
      AND (@type = '' OR b.LoaiBaiViet = @type)
    GROUP BY
      b.IDBaiViet,
      b.DuongDanSeo,
      b.MaNgonNguGoc,
      b.LoaiBaiViet,
      b.TrangThai,
      b.CapDoNhayCam,
      b.MucDoKiemDuyet,
      b.NoiDungNoiBat,
      b.NgayXuatBan,
      t.MaNgonNgu,
      t.TieuDe,
      t.TomTat,
      t.GioiThieu,
      t.NguonGoc,
      t.YNghiaVanHoa,
      t.BoiCanhSuDung,
      t.NoiDungChiTiet
    ORDER BY b.NgayXuatBan DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { language, offset, pageSize, keyword, categoryId, regionId, ethnicId, featured, type });
}

async function countAll({ language, keyword, categoryId, regionId, ethnicId, featured, type }) {
  const sql = `
    SELECT COUNT(DISTINCT b.IDBaiViet) AS total
    FROM BAI_VIET b
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    LEFT JOIN BAI_VIET_DANH_MUC bc ON bc.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_VUNG_VAN_HOA br ON br.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_DAN_TOC be ON be.IDBaiViet = b.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN'
      AND (@keyword = '' OR t.TieuDe LIKE '%' + @keyword + '%' OR t.TomTat LIKE '%' + @keyword + '%')
      AND (@categoryId IS NULL OR bc.IDDanhMuc = @categoryId)
      AND (@regionId IS NULL OR br.IDVung = @regionId)
      AND (@ethnicId IS NULL OR be.IDDanToc = @ethnicId)
      AND (@featured IS NULL OR b.NoiDungNoiBat = @featured)
      AND (@type = '' OR b.LoaiBaiViet = @type)
  `;

  const rows = await query(sql, { language, keyword, categoryId, regionId, ethnicId, featured, type });
  return rows[0]?.total || 0;
}

async function findById(id, language) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.MaNgonNguGoc AS originalLanguage,
      b.LoaiBaiViet AS type,
      b.TrangThai AS status,
      b.CapDoNhayCam AS sensitivityLevel,
      b.MucDoKiemDuyet AS reviewLevel,
      b.NoiDungNoiBat AS featured,
      b.CanDongBoAI AS canSyncAI,
      b.TrangThaiDongBoAI AS aiSyncStatus,
      b.NgayXuatBan AS publishedAt,
      t.MaNgonNgu AS language,
      t.TieuDe AS title,
      t.TomTat AS summary,
      t.GioiThieu AS introduction,
      t.NguonGoc AS origin,
      t.YNghiaVanHoa AS culturalMeaning,
      t.BoiCanhSuDung AS usageContext,
      t.NoiDungChiTiet AS content,
      t.GhiChuCultureShock AS cultureShockNote,
      t.TieuDeSEO AS seoTitle,
      t.MoTaSEO AS seoDescription
    FROM BAI_VIET b
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE b.IDBaiViet = @id AND b.TrangThai = 'DA_XUAT_BAN'
  `;

  const rows = await query(sql, { id, language });
  return rows[0] || null;
}

async function findBySlug(slug, language) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.MaNgonNguGoc AS originalLanguage,
      b.LoaiBaiViet AS type,
      b.TrangThai AS status,
      b.CapDoNhayCam AS sensitivityLevel,
      b.MucDoKiemDuyet AS reviewLevel,
      b.NoiDungNoiBat AS featured,
      b.CanDongBoAI AS canSyncAI,
      b.TrangThaiDongBoAI AS aiSyncStatus,
      b.NgayXuatBan AS publishedAt,
      t.MaNgonNgu AS language,
      t.TieuDe AS title,
      t.TomTat AS summary,
      t.GioiThieu AS introduction,
      t.NguonGoc AS origin,
      t.YNghiaVanHoa AS culturalMeaning,
      t.BoiCanhSuDung AS usageContext,
      t.NoiDungChiTiet AS content,
      t.GhiChuCultureShock AS cultureShockNote,
      t.TieuDeSEO AS seoTitle,
      t.MoTaSEO AS seoDescription
    FROM BAI_VIET b
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE b.DuongDanSeo = @slug AND b.TrangThai = 'DA_XUAT_BAN'
  `;

  const rows = await query(sql, { slug, language });
  return rows[0] || null;
}

async function findCategories(articleId, language) {
  const sql = `
    SELECT
      c.IDDanhMuc AS id,
      c.MaDanhMuc AS code,
      bc.LaDanhMucChinh AS isPrimary,
      t.TenDanhMuc AS name
    FROM BAI_VIET_DANH_MUC bc
    INNER JOIN DANH_MUC_CHU_DE c ON c.IDDanhMuc = bc.IDDanhMuc
    LEFT JOIN DANH_MUC_CHU_DE_BAN_DICH t ON t.IDDanhMuc = c.IDDanhMuc AND t.MaNgonNgu = @language
    WHERE bc.IDBaiViet = @articleId
  `;

  return query(sql, { articleId, language });
}

async function findRegions(articleId, language) {
  const sql = `
    SELECT
      r.IDVung AS id,
      r.MaVung AS code,
      br.LoaiLienHe AS relationType,
      t.TenVung AS name
    FROM BAI_VIET_VUNG_VAN_HOA br
    INNER JOIN VUNG_VAN_HOA r ON r.IDVung = br.IDVung
    LEFT JOIN VUNG_VAN_HOA_BAN_DICH t ON t.IDVung = r.IDVung AND t.MaNgonNgu = @language
    WHERE br.IDBaiViet = @articleId
  `;

  return query(sql, { articleId, language });
}

async function findEthnicGroups(articleId, language) {
  const sql = `
    SELECT
      e.IDDanToc AS id,
      e.MaDanToc AS code,
      be.LoaiLienHe AS relationType,
      t.TenDanToc AS name
    FROM BAI_VIET_DAN_TOC be
    INNER JOIN DAN_TOC e ON e.IDDanToc = be.IDDanToc
    LEFT JOIN DAN_TOC_BAN_DICH t ON t.IDDanToc = e.IDDanToc AND t.MaNgonNgu = @language
    WHERE be.IDBaiViet = @articleId
  `;

  return query(sql, { articleId, language });
}

async function findRelated(articleId, language) {
  const sql = `
    SELECT
      rl.IDBaiVietLienQuan AS id,
      rl.LoaiLienKet AS relationType,
      rl.TrongSo AS weight,
      b.DuongDanSeo AS slug,
      b.LoaiBaiViet AS type,
      t.TieuDe AS title,
      t.TomTat AS summary
    FROM BAI_VIET_LIEN_QUAN rl
    INNER JOIN BAI_VIET b ON b.IDBaiViet = rl.IDBaiVietLienQuan AND b.TrangThai = 'DA_XUAT_BAN'
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet AND t.MaNgonNgu = @language AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    WHERE rl.IDBaiViet = @articleId
    ORDER BY rl.TrongSo DESC, rl.IDBaiVietLienQuan DESC
  `;

  return query(sql, { articleId, language });
}

async function findReferences(articleId) {
  const sql = `
    SELECT
      r.IDNguon AS id,
      r.LoaiNguon AS type,
      r.TieuDeNguon AS title,
      r.TacGia AS author,
      r.NhaXuatBan AS publisher,
      r.NamXuatBan AS publishYear,
      r.URLNguon AS url,
      r.MucDoTinCay AS trustLevel,
      br.LaNguonChinh AS isPrimary,
      br.GhiChuTrichDan AS citationNote,
      br.TrangTu AS pageFrom,
      br.TrangDen AS pageTo
    FROM BAI_VIET_NGUON_THAM_KHAO br
    INNER JOIN NGUON_THAM_KHAO r ON r.IDNguon = br.IDNguon
    WHERE br.IDBaiViet = @articleId
    ORDER BY br.LaNguonChinh DESC, r.IDNguon DESC
  `;

  return query(sql, { articleId });
}

async function findMedia(articleId, language) {
  const sql = `
    SELECT
      m.IDMedia AS id,
      m.LoaiMedia AS type,
      m.DuongDanTep AS url,
      m.VanBanThayThe AS altText,
      m.BanQuyen AS copyright,
      bm.LaMediaChinh AS isPrimary,
      bm.ThuTuHienThi AS displayOrder,
      t.TieuDeMedia AS title,
      t.MoTaMedia AS description
    FROM BAI_VIET_MEDIA bm
    INNER JOIN MEDIA m
      ON m.IDMedia = bm.IDMedia
      AND m.TrangThai = 'HOAT_DONG'
    LEFT JOIN MEDIA_BAN_DICH t
      ON t.IDMedia = m.IDMedia
      AND t.MaNgonNgu = @language
    WHERE bm.IDBaiViet = @articleId
    ORDER BY bm.LaMediaChinh DESC, bm.ThuTuHienThi ASC, m.IDMedia DESC
  `;

  return query(sql, { articleId, language });
}

module.exports = {
  findAll,
  countAll,
  findById,
  findBySlug,
  findCategories,
  findRegions,
  findEthnicGroups,
  findRelated,
  findReferences,
  findMedia
};
