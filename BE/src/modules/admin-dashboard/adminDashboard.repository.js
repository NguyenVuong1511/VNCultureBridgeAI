const { query } = require('../../config/db');

function buildDateRangeClause(columnName) {
  return `(@startDate IS NULL OR ${columnName} >= @startDate) AND (@endDate IS NULL OR ${columnName} < DATEADD(DAY, 1, @endDate))`;
}

function getTopLimit(limit) {
  const normalized = Number(limit);
  if (!Number.isInteger(normalized) || normalized <= 0) {
    return 10;
  }
  return Math.min(normalized, 100);
}

async function getSummary({ startDate = null, endDate = null }) {
  const [sessions, searches, views, feedback, chatSessions, messages, missingQuestions, sync] = await Promise.all([
    query(`SELECT COUNT(1) AS total FROM PHIEN_NGUOI_DUNG WHERE ${buildDateRangeClause('BatDauLuc')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM NHAT_KY_TIM_KIEM WHERE ${buildDateRangeClause('NgayTao')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM NHAT_KY_XEM_BAI_VIET WHERE ${buildDateRangeClause('ThoiDiemXem')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM PHAN_HOI_NOI_DUNG WHERE ${buildDateRangeClause('NgayTao')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM PHIEN_CHAT_AI WHERE ${buildDateRangeClause('BatDauLuc')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM TIN_NHAN_CHAT_AI WHERE ${buildDateRangeClause('NgayTao')}`, { startDate, endDate }),
    query(`SELECT COUNT(1) AS total FROM CAU_HOI_CAN_BO_SUNG WHERE ${buildDateRangeClause('NgayTao')}`, { startDate, endDate }),
    query(`SELECT SUM(CASE WHEN TrangThaiDongBoAI = 'CHO_DONG_BO' THEN 1 ELSE 0 END) AS pendingSync FROM BAI_VIET WHERE ${buildDateRangeClause('NgayCapNhat')}`, { startDate, endDate })
  ]);

  return {
    sessions: sessions[0]?.total || 0,
    searches: searches[0]?.total || 0,
    articleViews: views[0]?.total || 0,
    feedback: feedback[0]?.total || 0,
    aiChatSessions: chatSessions[0]?.total || 0,
    aiMessages: messages[0]?.total || 0,
    missingQuestions: missingQuestions[0]?.total || 0,
    pendingSync: sync[0]?.pendingSync || 0
  };
}

async function getActivity({ startDate = null, endDate = null, limit = 30 }) {
  const topLimit = getTopLimit(limit);
  return query(`
    SELECT TOP (${topLimit})
      CAST(Ngay AS DATE) AS activityDate,
      SUM(Sessions) AS sessions,
      SUM(Searches) AS searches,
      SUM(Views) AS views,
      SUM(Feedback) AS feedback,
      SUM(ChatSessions) AS chatSessions,
      SUM(Messages) AS messages
    FROM (
      SELECT BatDauLuc AS Ngay, 1 AS Sessions, 0 AS Searches, 0 AS Views, 0 AS Feedback, 0 AS ChatSessions, 0 AS Messages
      FROM PHIEN_NGUOI_DUNG WHERE ${buildDateRangeClause('BatDauLuc')}
      UNION ALL
      SELECT NgayTao, 0, 1, 0, 0, 0, 0
      FROM NHAT_KY_TIM_KIEM WHERE ${buildDateRangeClause('NgayTao')}
      UNION ALL
      SELECT ThoiDiemXem, 0, 0, 1, 0, 0, 0
      FROM NHAT_KY_XEM_BAI_VIET WHERE ${buildDateRangeClause('ThoiDiemXem')}
      UNION ALL
      SELECT NgayTao, 0, 0, 0, 1, 0, 0
      FROM PHAN_HOI_NOI_DUNG WHERE ${buildDateRangeClause('NgayTao')}
      UNION ALL
      SELECT BatDauLuc, 0, 0, 0, 0, 1, 0
      FROM PHIEN_CHAT_AI WHERE ${buildDateRangeClause('BatDauLuc')}
      UNION ALL
      SELECT NgayTao, 0, 0, 0, 0, 0, 1
      FROM TIN_NHAN_CHAT_AI WHERE ${buildDateRangeClause('NgayTao')}
    ) x
    GROUP BY CAST(Ngay AS DATE)
    ORDER BY activityDate DESC
  `, { startDate, endDate });
}

async function getContentStats({ startDate = null, endDate = null, limit = 10 }) {
  const topLimit = getTopLimit(limit);
  return query(`
    SELECT TOP (${topLimit})
      a.IDBaiViet AS articleId,
      a.DuongDanSeo AS slug,
      COUNT(v.IDXemBai) AS totalViews,
      AVG(CAST(v.SoGiayXem AS FLOAT)) AS avgDurationSeconds
    FROM NHAT_KY_XEM_BAI_VIET v
    INNER JOIN BAI_VIET a ON a.IDBaiViet = v.IDBaiViet
    WHERE ${buildDateRangeClause('v.ThoiDiemXem')}
    GROUP BY a.IDBaiViet, a.DuongDanSeo
    ORDER BY totalViews DESC, a.IDBaiViet DESC
  `, { startDate, endDate });
}

async function getAiStats({ startDate = null, endDate = null }) {
  const [messagesBySender, missingByReason, syncRuns] = await Promise.all([
    query(`SELECT LoaiNguoiGui AS senderType, COUNT(1) AS total FROM TIN_NHAN_CHAT_AI WHERE ${buildDateRangeClause('NgayTao')} GROUP BY LoaiNguoiGui ORDER BY senderType ASC`, { startDate, endDate }),
    query(`SELECT LyDo AS reason, COUNT(1) AS total FROM CAU_HOI_CAN_BO_SUNG WHERE ${buildDateRangeClause('NgayTao')} GROUP BY LyDo ORDER BY reason ASC`, { startDate, endDate }),
    query(`SELECT TrangThai AS status, COUNT(1) AS total FROM DOT_DONG_BO_TRI_THUC_AI WHERE ${buildDateRangeClause('NgayTao')} GROUP BY TrangThai ORDER BY status ASC`, { startDate, endDate })
  ]);

  return {
    messagesBySender,
    missingByReason,
    syncRuns
  };
}

module.exports = {
  getSummary,
  getActivity,
  getContentStats,
  getAiStats
};