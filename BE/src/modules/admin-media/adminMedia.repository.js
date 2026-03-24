const { query } = require('../../config/db');

async function listMedia({ status, type, offset, pageSize }) {
  return query(`
    SELECT
      m.IDMedia AS id,
      m.LoaiMedia AS type,
      m.TenTep AS fileName,
      m.DuongDanTep AS fileUrl,
      m.NhaCungCapLuuTru AS storageProvider,
      m.MimeType AS mimeType,
      m.KichThuocBytes AS sizeBytes,
      m.RongPx AS widthPx,
      m.CaoPx AS heightPx,
      m.ThoiLuongGiay AS durationSeconds,
      m.ChuSoHuuBanQuyen AS copyrightOwner,
      m.ThongTinGiayPhep AS licenseInfo,
      m.TrangThai AS status,
      m.IDNguoiTaiLen AS uploadedBy,
      m.NgayTao AS createdAt,
      m.NgayCapNhat AS updatedAt
    FROM MEDIA m
    WHERE (@status IS NULL OR m.TrangThai = @status)
      AND (@type IS NULL OR m.LoaiMedia = @type)
    ORDER BY m.NgayTao DESC, m.IDMedia DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { status, type, offset, pageSize });
}

async function countMedia({ status, type }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM MEDIA m
    WHERE (@status IS NULL OR m.TrangThai = @status)
      AND (@type IS NULL OR m.LoaiMedia = @type)
  `, { status, type });

  return rows[0]?.total || 0;
}

async function listMediaStatuses() {
  return query(`SELECT DISTINCT TrangThai AS status FROM MEDIA ORDER BY TrangThai ASC`);
}

async function listMediaTypes() {
  return query(`SELECT DISTINCT LoaiMedia AS type FROM MEDIA ORDER BY LoaiMedia ASC`);
}

async function getMediaUsage(id) {
  const [articles, regions, ethnicGroups] = await Promise.all([
    query(`
      SELECT IDBaiViet AS articleId, ThuTuHienThi AS displayOrder, LaMediaChinh AS isPrimary, NguCanhSuDung AS usageContext
      FROM BAI_VIET_MEDIA
      WHERE IDMedia = @id
      ORDER BY IDBaiViet ASC
    `, { id }),
    query(`
      SELECT IDVung AS regionId
      FROM MEDIA_VUNG_VAN_HOA
      WHERE IDMedia = @id
      ORDER BY IDVung ASC
    `, { id }),
    query(`
      SELECT IDDanToc AS ethnicGroupId
      FROM MEDIA_DAN_TOC
      WHERE IDMedia = @id
      ORDER BY IDDanToc ASC
    `, { id })
  ]);

  return { articles, regions, ethnicGroups };
}

async function deleteMedia(id) {
  await query(`DELETE FROM MEDIA WHERE IDMedia = @id`, { id });
}

async function getMediaStats() {
  const [byStatus, byType] = await Promise.all([
    query(`SELECT TrangThai AS status, COUNT(1) AS total FROM MEDIA GROUP BY TrangThai ORDER BY TrangThai ASC`),
    query(`SELECT LoaiMedia AS type, COUNT(1) AS total FROM MEDIA GROUP BY LoaiMedia ORDER BY LoaiMedia ASC`)
  ]);

  return { byStatus, byType };
}

async function deleteMediaTranslation(id, language) {
  await query(`DELETE FROM MEDIA_BAN_DICH WHERE IDMedia = @id AND MaNgonNgu = @language`, { id, language });
}

async function getMediaByUploader(uploadedBy) {
  return query(`
    SELECT
      m.IDMedia AS id,
      m.LoaiMedia AS type,
      m.TenTep AS fileName,
      m.DuongDanTep AS fileUrl,
      m.TrangThai AS status,
      m.IDNguoiTaiLen AS uploadedBy,
      m.NgayTao AS createdAt,
      m.NgayCapNhat AS updatedAt
    FROM MEDIA m
    WHERE m.IDNguoiTaiLen = @uploadedBy
    ORDER BY m.NgayTao DESC, m.IDMedia DESC
  `, { uploadedBy });
}
async function getMediaById(id) {
  const rows = await query(`
    SELECT TOP 1
      m.IDMedia AS id,
      m.LoaiMedia AS type,
      m.TenTep AS fileName,
      m.DuongDanTep AS fileUrl,
      m.NhaCungCapLuuTru AS storageProvider,
      m.MimeType AS mimeType,
      m.KichThuocBytes AS sizeBytes,
      m.RongPx AS widthPx,
      m.CaoPx AS heightPx,
      m.ThoiLuongGiay AS durationSeconds,
      m.ChuSoHuuBanQuyen AS copyrightOwner,
      m.ThongTinGiayPhep AS licenseInfo,
      m.TrangThai AS status,
      m.IDNguoiTaiLen AS uploadedBy,
      m.NgayTao AS createdAt,
      m.NgayCapNhat AS updatedAt
    FROM MEDIA m
    WHERE m.IDMedia = @id
  `, { id });

  return rows[0] || null;
}

async function createMedia(payload) {
  const rows = await query(`
    INSERT INTO MEDIA (
      LoaiMedia,
      TenTep,
      DuongDanTep,
      NhaCungCapLuuTru,
      MimeType,
      KichThuocBytes,
      RongPx,
      CaoPx,
      ThoiLuongGiay,
      ChuSoHuuBanQuyen,
      ThongTinGiayPhep,
      TrangThai,
      IDNguoiTaiLen
    )
    OUTPUT INSERTED.IDMedia AS id
    VALUES (
      @type,
      @fileName,
      @fileUrl,
      @storageProvider,
      @mimeType,
      @sizeBytes,
      @widthPx,
      @heightPx,
      @durationSeconds,
      @copyrightOwner,
      @licenseInfo,
      @status,
      @uploadedBy
    )
  `, payload);

  return rows[0] || null;
}

async function updateMedia(id, payload) {
  await query(`
    UPDATE MEDIA
    SET LoaiMedia = @type,
        TenTep = @fileName,
        DuongDanTep = @fileUrl,
        NhaCungCapLuuTru = @storageProvider,
        MimeType = @mimeType,
        KichThuocBytes = @sizeBytes,
        RongPx = @widthPx,
        CaoPx = @heightPx,
        ThoiLuongGiay = @durationSeconds,
        ChuSoHuuBanQuyen = @copyrightOwner,
        ThongTinGiayPhep = @licenseInfo,
        TrangThai = @status,
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDMedia = @id
  `, { id, ...payload });
}

async function updateMediaStatus(id, status) {
  await query(`
    UPDATE MEDIA
    SET TrangThai = @status,
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDMedia = @id
  `, { id, status });
}

async function listTranslations(mediaId) {
  return query(`
    SELECT
      IDMedia AS mediaId,
      MaNgonNgu AS language,
      VanBanThayThe AS altText,
      ChuThich AS caption
    FROM MEDIA_BAN_DICH
    WHERE IDMedia = @mediaId
    ORDER BY MaNgonNgu ASC
  `, { mediaId });
}

async function upsertTranslation(mediaId, language, payload) {
  await query(`
    IF EXISTS (SELECT 1 FROM MEDIA_BAN_DICH WHERE IDMedia = @mediaId AND MaNgonNgu = @language)
    BEGIN
      UPDATE MEDIA_BAN_DICH
      SET VanBanThayThe = @altText,
          ChuThich = @caption
      WHERE IDMedia = @mediaId AND MaNgonNgu = @language
    END
    ELSE
    BEGIN
      INSERT INTO MEDIA_BAN_DICH (IDMedia, MaNgonNgu, VanBanThayThe, ChuThich)
      VALUES (@mediaId, @language, @altText, @caption)
    END
  `, {
    mediaId,
    language,
    altText: payload.altText || null,
    caption: payload.caption || null
  });
}

async function getTranslation(mediaId, language) {
  const rows = await query(`
    SELECT TOP 1
      IDMedia AS mediaId,
      MaNgonNgu AS language,
      VanBanThayThe AS altText,
      ChuThich AS caption
    FROM MEDIA_BAN_DICH
    WHERE IDMedia = @mediaId AND MaNgonNgu = @language
  `, { mediaId, language });

  return rows[0] || null;
}

module.exports = {
  listMedia,
  countMedia,
  listMediaStatuses,
  listMediaTypes,
  getMediaById,
  getMediaUsage,
  getMediaStats,
  getMediaByUploader,
  createMedia,
  updateMedia,
  updateMediaStatus,
  deleteMedia,
  listTranslations,
  upsertTranslation,
  getTranslation,
  deleteMediaTranslation
};