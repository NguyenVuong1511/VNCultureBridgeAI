const { query } = require('../../config/db');

async function createSession(payload) {
  const rows = await query(`
    INSERT INTO PHIEN_NGUOI_DUNG (
      MaNgonNguUuTien,
      MaQuocGiaNguoiDung,
      LoaiThietBi,
      ThongTinTrinhDuyet,
      URLGioiThieu,
      DongYPhanTich
    )
    OUTPUT INSERTED.IDPhien AS id,
           INSERTED.MaNgonNguUuTien AS preferredLanguage,
           INSERTED.MaQuocGiaNguoiDung AS countryCode,
           INSERTED.LoaiThietBi AS deviceType,
           INSERTED.ThongTinTrinhDuyet AS browserInfo,
           INSERTED.URLGioiThieu AS landingUrl,
           INSERTED.DongYPhanTich AS analyticsConsent,
           INSERTED.BatDauLuc AS startedAt,
           INSERTED.KetThucLuc AS endedAt
    VALUES (
      @preferredLanguage,
      @countryCode,
      @deviceType,
      @browserInfo,
      @landingUrl,
      @analyticsConsent
    )
  `, {
    preferredLanguage: payload.preferredLanguage || null,
    countryCode: payload.countryCode || null,
    deviceType: payload.deviceType || null,
    browserInfo: payload.browserInfo || null,
    landingUrl: payload.landingUrl || null,
    analyticsConsent: payload.analyticsConsent === false ? 0 : 1
  });

  return rows[0] || null;
}

async function getSessionById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDPhien AS id,
      LoaiPhien AS sessionType,
      MaNgonNguUuTien AS preferredLanguage,
      MaQuocGiaNguoiDung AS countryCode,
      LoaiThietBi AS deviceType,
      ThongTinTrinhDuyet AS browserInfo,
      URLGioiThieu AS landingUrl,
      DongYPhanTich AS analyticsConsent,
      BatDauLuc AS startedAt,
      KetThucLuc AS endedAt
    FROM PHIEN_NGUOI_DUNG
    WHERE IDPhien = @id
  `, { id });

  return rows[0] || null;
}

async function endSession(id) {
  await query(`
    UPDATE PHIEN_NGUOI_DUNG
    SET KetThucLuc = SYSUTCDATETIME()
    WHERE IDPhien = @id AND KetThucLuc IS NULL
  `, { id });
}

async function listSessions({ countryCode, deviceType, preferredLanguage, offset, pageSize }) {
  return query(`
    SELECT
      IDPhien AS id,
      LoaiPhien AS sessionType,
      MaNgonNguUuTien AS preferredLanguage,
      MaQuocGiaNguoiDung AS countryCode,
      LoaiThietBi AS deviceType,
      ThongTinTrinhDuyet AS browserInfo,
      URLGioiThieu AS landingUrl,
      DongYPhanTich AS analyticsConsent,
      BatDauLuc AS startedAt,
      KetThucLuc AS endedAt
    FROM PHIEN_NGUOI_DUNG
    WHERE (@countryCode IS NULL OR MaQuocGiaNguoiDung = @countryCode)
      AND (@deviceType IS NULL OR LoaiThietBi = @deviceType)
      AND (@preferredLanguage IS NULL OR MaNgonNguUuTien = @preferredLanguage)
    ORDER BY BatDauLuc DESC, IDPhien DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { countryCode, deviceType, preferredLanguage, offset, pageSize });
}

async function countSessions({ countryCode, deviceType, preferredLanguage }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM PHIEN_NGUOI_DUNG
    WHERE (@countryCode IS NULL OR MaQuocGiaNguoiDung = @countryCode)
      AND (@deviceType IS NULL OR LoaiThietBi = @deviceType)
      AND (@preferredLanguage IS NULL OR MaNgonNguUuTien = @preferredLanguage)
  `, { countryCode, deviceType, preferredLanguage });

  return rows[0]?.total || 0;
}

async function getSessionStats() {
  const [byCountry, byDevice, byLanguage] = await Promise.all([
    query(`SELECT MaQuocGiaNguoiDung AS countryCode, COUNT(1) AS total FROM PHIEN_NGUOI_DUNG GROUP BY MaQuocGiaNguoiDung ORDER BY total DESC`),
    query(`SELECT LoaiThietBi AS deviceType, COUNT(1) AS total FROM PHIEN_NGUOI_DUNG GROUP BY LoaiThietBi ORDER BY total DESC`),
    query(`SELECT MaNgonNguUuTien AS preferredLanguage, COUNT(1) AS total FROM PHIEN_NGUOI_DUNG GROUP BY MaNgonNguUuTien ORDER BY total DESC`)
  ]);

  return { byCountry, byDevice, byLanguage };
}

module.exports = {
  createSession,
  getSessionById,
  endSession,
  listSessions,
  countSessions,
  getSessionStats
};
