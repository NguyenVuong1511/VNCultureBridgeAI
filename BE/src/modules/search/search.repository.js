const { query } = require('../../config/db');

async function searchArticles({ keyword, language, offset, pageSize, categoryId, regionId, ethnicId }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.LoaiBaiViet AS type,
      b.NgayXuatBan AS publishedAt,
      t.TieuDe AS title,
      t.TomTat AS summary
    FROM BAI_VIET b
    INNER JOIN BAI_VIET_BAN_DICH t
      ON t.IDBaiViet = b.IDBaiViet
      AND t.MaNgonNgu = @language
      AND t.TrangThaiBanDich IN ('DA_DUYET', 'DA_XUAT_BAN')
    LEFT JOIN BAI_VIET_DANH_MUC bc ON bc.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_VUNG_VAN_HOA br ON br.IDBaiViet = b.IDBaiViet
    LEFT JOIN BAI_VIET_DAN_TOC be ON be.IDBaiViet = b.IDBaiViet
    WHERE b.TrangThai = 'DA_XUAT_BAN'
      AND (t.TieuDe LIKE '%' + @keyword + '%' OR t.TomTat LIKE '%' + @keyword + '%' OR t.NoiDungChiTiet LIKE '%' + @keyword + '%')
      AND (@categoryId IS NULL OR bc.IDDanhMuc = @categoryId)
      AND (@regionId IS NULL OR br.IDVung = @regionId)
      AND (@ethnicId IS NULL OR be.IDDanToc = @ethnicId)
    GROUP BY b.IDBaiViet, b.DuongDanSeo, b.LoaiBaiViet, b.NgayXuatBan, t.TieuDe, t.TomTat
    ORDER BY b.NgayXuatBan DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { keyword, language, offset, pageSize, categoryId, regionId, ethnicId });
}

async function countSearchArticles({ keyword, language, categoryId, regionId, ethnicId }) {
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
      AND (t.TieuDe LIKE '%' + @keyword + '%' OR t.TomTat LIKE '%' + @keyword + '%' OR t.NoiDungChiTiet LIKE '%' + @keyword + '%')
      AND (@categoryId IS NULL OR bc.IDDanhMuc = @categoryId)
      AND (@regionId IS NULL OR br.IDVung = @regionId)
      AND (@ethnicId IS NULL OR be.IDDanToc = @ethnicId)
  `;

  const rows = await query(sql, { keyword, language, categoryId, regionId, ethnicId });
  return rows[0]?.total || 0;
}

async function logSearch({ sessionId, keyword, language, searchType, resultCount, hasRelevantResult }) {
  const sql = `
    INSERT INTO NHAT_KY_TIM_KIEM (
      IDPhien,
      TuKhoaTimKiem,
      MaNgonNgu,
      KieuTimKiem,
      SoKetQua,
      CoKetQuaPhuHop
    )
    OUTPUT INSERTED.IDTimKiem AS id
    VALUES (
      @sessionId,
      @keyword,
      @language,
      @searchType,
      @resultCount,
      @hasRelevantResult
    )
  `;

  const rows = await query(sql, {
    sessionId: sessionId || null,
    keyword,
    language,
    searchType,
    resultCount,
    hasRelevantResult
  });

  return rows[0] || null;
}

module.exports = {
  searchArticles,
  countSearchArticles,
  logSearch
};
