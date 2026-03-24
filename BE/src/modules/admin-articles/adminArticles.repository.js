const { query } = require('../../config/db');

async function findAll({ status, type, syncStatus, offset, pageSize }) {
  const sql = `
    SELECT
      b.IDBaiViet AS id,
      b.DuongDanSeo AS slug,
      b.MaNgonNguGoc AS originalLanguage,
      b.LoaiBaiViet AS type,
      b.TrangThai AS status,
      b.CapDoNhayCam AS sensitivityLevel,
      b.MucDoKiemDuyet AS reviewLevel,
      b.TrangThaiDongBoAI AS aiSyncStatus,
      b.NgayTao AS createdAt,
      b.NgayCapNhat AS updatedAt
    FROM BAI_VIET b
    WHERE (@status IS NULL OR b.TrangThai = @status)
      AND (@type IS NULL OR b.LoaiBaiViet = @type)
      AND (@syncStatus IS NULL OR b.TrangThaiDongBoAI = @syncStatus)
    ORDER BY b.NgayTao DESC, b.IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `;

  return query(sql, { status, type, syncStatus, offset, pageSize });
}

async function countAll({ status, type, syncStatus }) {
  const sql = `
    SELECT COUNT(1) AS total
    FROM BAI_VIET b
    WHERE (@status IS NULL OR b.TrangThai = @status)
      AND (@type IS NULL OR b.LoaiBaiViet = @type)
      AND (@syncStatus IS NULL OR b.TrangThaiDongBoAI = @syncStatus)
  `;

  const rows = await query(sql, { status, type, syncStatus });
  return rows[0]?.total || 0;
}

async function findById(id) {
  const sql = `
    SELECT TOP 1
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
      b.GhiChuBienTap AS editorNote,
      b.LyDoTuChoi AS rejectionReason,
      b.IDNguoiTao AS createdBy,
      b.IDNguoiCapNhat AS updatedBy,
      b.NgayTao AS createdAt,
      b.NgayCapNhat AS updatedAt
    FROM BAI_VIET b
    WHERE b.IDBaiViet = @id
  `;

  const rows = await query(sql, { id });
  return rows[0] || null;
}

async function createArticle({ slug, originalLanguage, type, sensitivityLevel, reviewLevel, featured, createdBy }) {
  const sql = `
    INSERT INTO BAI_VIET (
      DuongDanSeo,
      MaNgonNguGoc,
      LoaiBaiViet,
      CapDoNhayCam,
      MucDoKiemDuyet,
      NoiDungNoiBat,
      IDNguoiTao,
      IDNguoiCapNhat
    )
    OUTPUT INSERTED.IDBaiViet AS id
    VALUES (
      @slug,
      @originalLanguage,
      @type,
      @sensitivityLevel,
      @reviewLevel,
      @featured,
      @createdBy,
      @createdBy
    )
  `;

  const rows = await query(sql, {
    slug,
    originalLanguage,
    type,
    sensitivityLevel,
    reviewLevel,
    featured,
    createdBy
  });

  return rows[0] || null;
}

async function updateArticle(id, { slug, originalLanguage, type, sensitivityLevel, reviewLevel, featured, updatedBy }) {
  const sql = `
    UPDATE BAI_VIET
    SET DuongDanSeo = @slug,
        MaNgonNguGoc = @originalLanguage,
        LoaiBaiViet = @type,
        CapDoNhayCam = @sensitivityLevel,
        MucDoKiemDuyet = @reviewLevel,
        NoiDungNoiBat = @featured,
        IDNguoiCapNhat = @updatedBy,
        NgayCapNhat = SYSUTCDATETIME(),
        TrangThaiDongBoAI = CASE WHEN TrangThai = 'DA_XUAT_BAN' THEN 'CHO_DONG_BO' ELSE TrangThaiDongBoAI END,
        CanDongBoAI = CASE WHEN TrangThai = 'DA_XUAT_BAN' THEN 1 ELSE CanDongBoAI END
    WHERE IDBaiViet = @id
  `;

  await query(sql, {
    id,
    slug,
    originalLanguage,
    type,
    sensitivityLevel,
    reviewLevel,
    featured,
    updatedBy
  });
}

async function updateStatus(id, { status, userId, rejectionReason = null }) {
  const sql = `
    UPDATE BAI_VIET
    SET TrangThai = @status,
        LyDoTuChoi = CASE WHEN @status = 'TU_CHOI' THEN @rejectionReason ELSE NULL END,
        NgayDuyet = CASE WHEN @status = 'DA_DUYET' THEN SYSUTCDATETIME() ELSE NgayDuyet END,
        IDNguoiDuyet = CASE WHEN @status = 'DA_DUYET' THEN @userId ELSE IDNguoiDuyet END,
        NgayXuatBan = CASE WHEN @status = 'DA_XUAT_BAN' THEN SYSUTCDATETIME() ELSE NgayXuatBan END,
        IDNguoiXuatBan = CASE WHEN @status = 'DA_XUAT_BAN' THEN @userId ELSE IDNguoiXuatBan END,
        NgayAn = CASE WHEN @status = 'AN' THEN SYSUTCDATETIME() ELSE NgayAn END,
        IDNguoiAn = CASE WHEN @status = 'AN' THEN @userId ELSE IDNguoiAn END,
        NgayLuuTru = CASE WHEN @status = 'LUU_TRU' THEN SYSUTCDATETIME() ELSE NgayLuuTru END,
        IDNguoiLuuTru = CASE WHEN @status = 'LUU_TRU' THEN @userId ELSE IDNguoiLuuTru END,
        IDNguoiCapNhat = @userId,
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDBaiViet = @id
  `;

  await query(sql, { id, status, userId, rejectionReason });
}

async function insertStatusHistory({ articleId, oldStatus, newStatus, userId, note }) {
  const sql = `
    INSERT INTO LICH_SU_TRANG_THAI_BAI_VIET (
      IDBaiViet,
      TrangThaiCu,
      TrangThaiMoi,
      IDNguoiThayDoi,
      GhiChu
    )
    VALUES (
      @articleId,
      @oldStatus,
      @newStatus,
      @userId,
      @note
    )
  `;

  await query(sql, { articleId, oldStatus, newStatus, userId, note });
}

async function findCategories(articleId) {
  const sql = `SELECT IDDanhMuc AS id, LaDanhMucChinh AS isPrimary FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @articleId`;
  return query(sql, { articleId });
}

async function findRegions(articleId) {
  const sql = `SELECT IDVung AS id FROM BAI_VIET_VUNG_VAN_HOA WHERE IDBaiViet = @articleId`;
  return query(sql, { articleId });
}

async function findEthnicGroups(articleId) {
  const sql = `SELECT IDDanToc AS id FROM BAI_VIET_DAN_TOC WHERE IDBaiViet = @articleId`;
  return query(sql, { articleId });
}

async function findReferences(articleId) {
  const sql = `SELECT IDNguon AS id FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @articleId`;
  return query(sql, { articleId });
}

async function findTranslations(articleId) {
  const sql = `
    SELECT
      IDBanDich AS id,
      MaNgonNgu AS language,
      TieuDe AS title,
      TomTat AS summary,
      GioiThieu AS introduction,
      NguonGoc AS origin,
      YNghiaVanHoa AS culturalMeaning,
      BoiCanhSuDung AS usageContext,
      NoiDungChiTiet AS content,
      GhiChuCultureShock AS cultureShockNote,
      TieuDeSEO AS seoTitle,
      MoTaSEO AS seoDescription,
      SoPhutDoc AS readingMinutes,
      LaBanDichMay AS isMachineTranslated,
      TrangThaiBanDich AS status
    FROM BAI_VIET_BAN_DICH
    WHERE IDBaiViet = @articleId
    ORDER BY MaNgonNgu ASC
  `;

  return query(sql, { articleId });
}

async function findTranslationByLanguage(articleId, language) {
  const sql = `
    SELECT TOP 1
      IDBanDich AS id,
      IDBaiViet AS articleId,
      MaNgonNgu AS language,
      TieuDe AS title,
      TomTat AS summary,
      GioiThieu AS introduction,
      NguonGoc AS origin,
      YNghiaVanHoa AS culturalMeaning,
      BoiCanhSuDung AS usageContext,
      NoiDungChiTiet AS content,
      GhiChuCultureShock AS cultureShockNote,
      TieuDeSEO AS seoTitle,
      MoTaSEO AS seoDescription,
      SoPhutDoc AS readingMinutes,
      LaBanDichMay AS isMachineTranslated,
      TrangThaiBanDich AS status
    FROM BAI_VIET_BAN_DICH
    WHERE IDBaiViet = @articleId AND MaNgonNgu = @language
  `;

  const rows = await query(sql, { articleId, language });
  return rows[0] || null;
}

async function upsertTranslation(articleId, payload) {
  const sql = `
    IF EXISTS (
      SELECT 1
      FROM BAI_VIET_BAN_DICH
      WHERE IDBaiViet = @articleId AND MaNgonNgu = @language
    )
    BEGIN
      UPDATE BAI_VIET_BAN_DICH
      SET TieuDe = @title,
          TomTat = @summary,
          GioiThieu = @introduction,
          NguonGoc = @origin,
          YNghiaVanHoa = @culturalMeaning,
          BoiCanhSuDung = @usageContext,
          NoiDungChiTiet = @content,
          GhiChuCultureShock = @cultureShockNote,
          TieuDeSEO = @seoTitle,
          MoTaSEO = @seoDescription,
          SoPhutDoc = @readingMinutes,
          LaBanDichMay = @isMachineTranslated,
          TrangThaiBanDich = @status,
          NgayCapNhat = SYSUTCDATETIME()
      WHERE IDBaiViet = @articleId AND MaNgonNgu = @language;
    END
    ELSE
    BEGIN
      INSERT INTO BAI_VIET_BAN_DICH (
        IDBaiViet,
        MaNgonNgu,
        TieuDe,
        TomTat,
        GioiThieu,
        NguonGoc,
        YNghiaVanHoa,
        BoiCanhSuDung,
        NoiDungChiTiet,
        GhiChuCultureShock,
        TieuDeSEO,
        MoTaSEO,
        SoPhutDoc,
        LaBanDichMay,
        TrangThaiBanDich
      )
      VALUES (
        @articleId,
        @language,
        @title,
        @summary,
        @introduction,
        @origin,
        @culturalMeaning,
        @usageContext,
        @content,
        @cultureShockNote,
        @seoTitle,
        @seoDescription,
        @readingMinutes,
        @isMachineTranslated,
        @status
      );
    END
  `;

  await query(sql, {
    articleId,
    language: payload.language,
    title: payload.title,
    summary: payload.summary || null,
    introduction: payload.introduction || null,
    origin: payload.origin || null,
    culturalMeaning: payload.culturalMeaning || null,
    usageContext: payload.usageContext || null,
    content: payload.content || null,
    cultureShockNote: payload.cultureShockNote || null,
    seoTitle: payload.seoTitle || null,
    seoDescription: payload.seoDescription || null,
    readingMinutes: payload.readingMinutes || null,
    isMachineTranslated: payload.isMachineTranslated ? 1 : 0,
    status: payload.status
  });
}

async function clearArticleCategories(articleId) {
  await query('DELETE FROM BAI_VIET_DANH_MUC WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleCategory(articleId, categoryId, isPrimary) {
  await query(
    `INSERT INTO BAI_VIET_DANH_MUC (IDBaiViet, IDDanhMuc, LaDanhMucChinh) VALUES (@articleId, @categoryId, @isPrimary)`,
    { articleId, categoryId, isPrimary: isPrimary ? 1 : 0 }
  );
}

async function clearArticleRegions(articleId) {
  await query('DELETE FROM BAI_VIET_VUNG_VAN_HOA WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleRegion(articleId, regionId, relationType) {
  await query(
    `INSERT INTO BAI_VIET_VUNG_VAN_HOA (IDBaiViet, IDVung, LoaiLienHe) VALUES (@articleId, @regionId, @relationType)`,
    { articleId, regionId, relationType }
  );
}

async function clearArticleEthnicGroups(articleId) {
  await query('DELETE FROM BAI_VIET_DAN_TOC WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleEthnicGroup(articleId, ethnicGroupId, relationType) {
  await query(
    `INSERT INTO BAI_VIET_DAN_TOC (IDBaiViet, IDDanToc, LoaiLienHe) VALUES (@articleId, @ethnicGroupId, @relationType)`,
    { articleId, ethnicGroupId, relationType }
  );
}

async function createReference(payload) {
  const sql = `
    INSERT INTO NGUON_THAM_KHAO (
      LoaiNguon,
      TieuDeNguon,
      TacGia,
      NhaXuatBan,
      NamXuatBan,
      URLNguon,
      ISBN,
      DOI,
      MaNgonNguNguon,
      GhiChu,
      MucDoTinCay,
      DaXacMinh
    )
    OUTPUT INSERTED.IDNguon AS id
    VALUES (
      @type,
      @title,
      @author,
      @publisher,
      @publishYear,
      @url,
      @isbn,
      @doi,
      @language,
      @note,
      @trustLevel,
      @isVerified
    )
  `;

  const rows = await query(sql, {
    type: payload.type,
    title: payload.title,
    author: payload.author || null,
    publisher: payload.publisher || null,
    publishYear: payload.publishYear || null,
    url: payload.url || null,
    isbn: payload.isbn || null,
    doi: payload.doi || null,
    language: payload.language || null,
    note: payload.note || null,
    trustLevel: payload.trustLevel,
    isVerified: payload.isVerified ? 1 : 0
  });

  return rows[0] || null;
}

async function attachReferenceToArticle(articleId, referenceId, citationNote = null, pageFrom = null, pageTo = null, isPrimary = false) {
  if (isPrimary) {
    await clearPrimaryReferences(articleId);
  }

  const sql = `
    IF NOT EXISTS (
      SELECT 1 FROM BAI_VIET_NGUON_THAM_KHAO WHERE IDBaiViet = @articleId AND IDNguon = @referenceId
    )
    BEGIN
      INSERT INTO BAI_VIET_NGUON_THAM_KHAO (
        IDBaiViet,
        IDNguon,
        GhiChuTrichDan,
        TrangTu,
        TrangDen,
        LaNguonChinh
      )
      VALUES (
        @articleId,
        @referenceId,
        @citationNote,
        @pageFrom,
        @pageTo,
        @isPrimary
      )
    END
    ELSE
    BEGIN
      UPDATE BAI_VIET_NGUON_THAM_KHAO
      SET GhiChuTrichDan = @citationNote,
          TrangTu = @pageFrom,
          TrangDen = @pageTo,
          LaNguonChinh = @isPrimary
      WHERE IDBaiViet = @articleId AND IDNguon = @referenceId
    END
  `;

  await query(sql, {
    articleId,
    referenceId,
    citationNote,
    pageFrom,
    pageTo,
    isPrimary: isPrimary ? 1 : 0
  });
}

async function clearArticleTags(articleId) {
  await query('DELETE FROM BAI_VIET_THE WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleTag(articleId, tagId) {
  await query(
    'INSERT INTO BAI_VIET_THE (IDBaiViet, IDThe) VALUES (@articleId, @tagId)',
    { articleId, tagId }
  );
}

async function findTags(articleId) {
  const sql = 'SELECT IDThe AS id FROM BAI_VIET_THE WHERE IDBaiViet = @articleId';
  return query(sql, { articleId });
}

async function clearArticleKeywords(articleId) {
  await query('DELETE FROM BAI_VIET_TU_KHOA WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleKeyword(articleId, keywordId) {
  await query(
    'INSERT INTO BAI_VIET_TU_KHOA (IDBaiViet, IDTuKhoa) VALUES (@articleId, @keywordId)',
    { articleId, keywordId }
  );
}

async function findKeywords(articleId) {
  const sql = 'SELECT IDTuKhoa AS id FROM BAI_VIET_TU_KHOA WHERE IDBaiViet = @articleId';
  return query(sql, { articleId });
}

async function clearRelatedArticles(articleId) {
  await query('DELETE FROM BAI_VIET_LIEN_QUAN WHERE IDBaiViet = @articleId', { articleId });
}

async function addRelatedArticle(articleId, relatedArticleId, relationType, weight) {
  await query(
    'INSERT INTO BAI_VIET_LIEN_QUAN (IDBaiViet, IDBaiVietLienQuan, LoaiLienKet, TrongSo) VALUES (@articleId, @relatedArticleId, @relationType, @weight)',
    { articleId, relatedArticleId, relationType, weight }
  );
}

async function findRelatedArticles(articleId) {
  const sql = `
    SELECT
      IDBaiVietLienQuan AS id,
      LoaiLienKet AS relationType,
      TrongSo AS weight
    FROM BAI_VIET_LIEN_QUAN
    WHERE IDBaiViet = @articleId
  `;
  return query(sql, { articleId });
}

async function clearArticleMedia(articleId) {
  await query('DELETE FROM BAI_VIET_MEDIA WHERE IDBaiViet = @articleId', { articleId });
}

async function addArticleMedia(articleId, mediaId, displayOrder, isPrimary, usageContext) {
  if (isPrimary) {
    await clearPrimaryMedia(articleId);
  }

  await query(
    `INSERT INTO BAI_VIET_MEDIA (IDBaiViet, IDMedia, ThuTuHienThi, LaMediaChinh, NguCanhSuDung)
     VALUES (@articleId, @mediaId, @displayOrder, @isPrimary, @usageContext)`,
    {
      articleId,
      mediaId,
      displayOrder,
      isPrimary: isPrimary ? 1 : 0,
      usageContext
    }
  );
}

async function findMedia(articleId) {
  const sql = `
    SELECT
      IDMedia AS id,
      ThuTuHienThi AS displayOrder,
      LaMediaChinh AS isPrimary,
      NguCanhSuDung AS usageContext
    FROM BAI_VIET_MEDIA
    WHERE IDBaiViet = @articleId
    ORDER BY ThuTuHienThi ASC, IDMedia ASC
  `;
  return query(sql, { articleId });
}

async function findMediaById(mediaId) {
  const sql = `SELECT TOP 1 IDMedia AS id, TrangThai AS status FROM MEDIA WHERE IDMedia = @mediaId`;
  const rows = await query(sql, { mediaId });
  return rows[0] || null;
}

async function findReferenceById(referenceId) {
  const sql = `SELECT TOP 1 IDNguon AS id FROM NGUON_THAM_KHAO WHERE IDNguon = @referenceId`;
  const rows = await query(sql, { referenceId });
  return rows[0] || null;
}

async function findTagById(tagId) {
  const sql = `SELECT TOP 1 IDThe AS id FROM THE_NOI_DUNG WHERE IDThe = @tagId AND HoatDong = 1`;
  const rows = await query(sql, { tagId });
  return rows[0] || null;
}

async function findKeywordById(keywordId) {
  const sql = `SELECT TOP 1 IDTuKhoa AS id FROM TU_KHOA WHERE IDTuKhoa = @keywordId AND HoatDong = 1`;
  const rows = await query(sql, { keywordId });
  return rows[0] || null;
}

async function findCategoryById(categoryId) {
  const sql = `SELECT TOP 1 IDDanhMuc AS id FROM DANH_MUC_CHU_DE WHERE IDDanhMuc = @categoryId AND HoatDong = 1`;
  const rows = await query(sql, { categoryId });
  return rows[0] || null;
}

async function findRegionById(regionId) {
  const sql = `SELECT TOP 1 IDVung AS id FROM VUNG_VAN_HOA WHERE IDVung = @regionId AND HoatDong = 1`;
  const rows = await query(sql, { regionId });
  return rows[0] || null;
}

async function findEthnicGroupById(ethnicGroupId) {
  const sql = `SELECT TOP 1 IDDanToc AS id FROM DAN_TOC WHERE IDDanToc = @ethnicGroupId AND HoatDong = 1`;
  const rows = await query(sql, { ethnicGroupId });
  return rows[0] || null;
}

async function findArticleByIdForRelation(articleId) {
  const sql = `SELECT TOP 1 IDBaiViet AS id FROM BAI_VIET WHERE IDBaiViet = @articleId`;
  const rows = await query(sql, { articleId });
  return rows[0] || null;
}

async function updatePublishedSyncFlag(articleId) {
  const sql = `
    UPDATE BAI_VIET
    SET TrangThaiDongBoAI = CASE WHEN TrangThai = 'DA_XUAT_BAN' THEN 'CHO_DONG_BO' ELSE TrangThaiDongBoAI END,
        CanDongBoAI = CASE WHEN TrangThai = 'DA_XUAT_BAN' THEN 1 ELSE CanDongBoAI END,
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDBaiViet = @articleId
  `;
  await query(sql, { articleId });
}

async function clearPrimaryReferences(articleId) {
  await query('UPDATE BAI_VIET_NGUON_THAM_KHAO SET LaNguonChinh = 0 WHERE IDBaiViet = @articleId', { articleId });
}

async function clearPrimaryMedia(articleId) {
  await query('UPDATE BAI_VIET_MEDIA SET LaMediaChinh = 0 WHERE IDBaiViet = @articleId', { articleId });
}

async function setPrimaryReference(articleId, referenceId) {
  await query('UPDATE BAI_VIET_NGUON_THAM_KHAO SET LaNguonChinh = 1 WHERE IDBaiViet = @articleId AND IDNguon = @referenceId', { articleId, referenceId });
}

async function setPrimaryMedia(articleId, mediaId) {
  await query('UPDATE BAI_VIET_MEDIA SET LaMediaChinh = 1 WHERE IDBaiViet = @articleId AND IDMedia = @mediaId', { articleId, mediaId });
}

async function findStatusHistory(articleId) {
  return query(`
    SELECT
      IDLichSu AS id,
      IDBaiViet AS articleId,
      TrangThaiCu AS oldStatus,
      TrangThaiMoi AS newStatus,
      IDNguoiThayDoi AS changedBy,
      GhiChu AS note,
      NgayTao AS createdAt
    FROM LICH_SU_TRANG_THAI_BAI_VIET
    WHERE IDBaiViet = @articleId
    ORDER BY NgayTao DESC, IDLichSu DESC
  `, { articleId });
}

async function findVersions(articleId) {
  return query(`
    SELECT
      IDPhienBan AS id,
      IDBaiViet AS articleId,
      SoPhienBan AS versionNumber,
      LoaiThayDoi AS changeType,
      TomTatThayDoi AS changeSummary,
      TrangThaiPhienBan AS status,
      IDNguoiGuiDuyet AS submittedBy,
      NgayGuiDuyet AS submittedAt,
      IDNguoiDuyet AS approvedBy,
      NgayDuyet AS approvedAt,
      IDNguoiXuatBan AS publishedBy,
      NgayXuatBan AS publishedAt,
      NgayTao AS createdAt
    FROM PHIEN_BAN_BAI_VIET
    WHERE IDBaiViet = @articleId
    ORDER BY SoPhienBan DESC, IDPhienBan DESC
  `, { articleId });
}

async function findVersionById(articleId, versionId) {
  const rows = await query(`
    SELECT TOP 1
      IDPhienBan AS id,
      IDBaiViet AS articleId,
      SoPhienBan AS versionNumber,
      LoaiThayDoi AS changeType,
      TomTatThayDoi AS changeSummary,
      DuLieuSnapshotJson AS snapshotJson,
      TrangThaiPhienBan AS status,
      IDNguoiGuiDuyet AS submittedBy,
      NgayGuiDuyet AS submittedAt,
      IDNguoiDuyet AS approvedBy,
      NgayDuyet AS approvedAt,
      IDNguoiXuatBan AS publishedBy,
      NgayXuatBan AS publishedAt,
      NgayTao AS createdAt
    FROM PHIEN_BAN_BAI_VIET
    WHERE IDBaiViet = @articleId AND IDPhienBan = @versionId
  `, { articleId, versionId });

  return rows[0] || null;
}

module.exports = {
  findAll,
  countAll,
  findById,
  createArticle,
  updateArticle,
  updateStatus,
  insertStatusHistory,
  findCategories,
  findRegions,
  findEthnicGroups,
  findReferences,
  findTranslations,
  findTranslationByLanguage,
  upsertTranslation,
  clearArticleCategories,
  addArticleCategory,
  clearArticleRegions,
  addArticleRegion,
  clearArticleEthnicGroups,
  addArticleEthnicGroup,
  createReference,
  attachReferenceToArticle,
  clearArticleTags,
  addArticleTag,
  findTags,
  clearArticleKeywords,
  addArticleKeyword,
  findKeywords,
  clearRelatedArticles,
  addRelatedArticle,
  findRelatedArticles,
  clearArticleMedia,
  addArticleMedia,
  findMedia,
  findMediaById,
  findReferenceById,
  findTagById,
  findKeywordById,
  findCategoryById,
  findRegionById,
  findEthnicGroupById,
  findArticleByIdForRelation,
  updatePublishedSyncFlag,
  clearPrimaryReferences,
  clearPrimaryMedia,
  setPrimaryReference,
  setPrimaryMedia,
  findStatusHistory,
  findVersions,
  findVersionById
};
