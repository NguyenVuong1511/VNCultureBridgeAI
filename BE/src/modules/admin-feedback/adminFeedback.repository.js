const { query } = require('../../config/db');

async function listFeedback({ status, type, articleId, messageId, sessionId, offset, pageSize }) {
  return query(`
    SELECT
      f.IDPhanHoi AS id,
      f.IDPhien AS sessionId,
      f.LoaiPhanHoi AS type,
      f.IDBaiViet AS articleId,
      f.IDTinNhan AS messageId,
      f.DiemDanhGia AS rating,
      f.HuuIch AS isHelpful,
      f.NoiDungPhanHoi AS content,
      f.TrangThaiXuLy AS status,
      f.IDNguoiXuLy AS handledBy,
      f.NgayXuLy AS handledAt,
      f.NgayTao AS createdAt
    FROM PHAN_HOI_NOI_DUNG f
    WHERE (@status IS NULL OR f.TrangThaiXuLy = @status)
      AND (@type IS NULL OR f.LoaiPhanHoi = @type)
      AND (@articleId IS NULL OR f.IDBaiViet = @articleId)
      AND (@messageId IS NULL OR f.IDTinNhan = @messageId)
      AND (@sessionId IS NULL OR f.IDPhien = @sessionId)
    ORDER BY f.NgayTao DESC, f.IDPhanHoi DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { status, type, articleId, messageId, sessionId, offset, pageSize });
}

async function countFeedback({ status, type, articleId, messageId, sessionId }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM PHAN_HOI_NOI_DUNG f
    WHERE (@status IS NULL OR f.TrangThaiXuLy = @status)
      AND (@type IS NULL OR f.LoaiPhanHoi = @type)
      AND (@articleId IS NULL OR f.IDBaiViet = @articleId)
      AND (@messageId IS NULL OR f.IDTinNhan = @messageId)
      AND (@sessionId IS NULL OR f.IDPhien = @sessionId)
  `, { status, type, articleId, messageId, sessionId });

  return rows[0]?.total || 0;
}

async function listFeedbackStatuses() {
  return query(`SELECT DISTINCT TrangThaiXuLy AS status FROM PHAN_HOI_NOI_DUNG ORDER BY TrangThaiXuLy ASC`);
}

async function listFeedbackTypes() {
  return query(`SELECT DISTINCT LoaiPhanHoi AS type FROM PHAN_HOI_NOI_DUNG ORDER BY LoaiPhanHoi ASC`);
}

async function bulkUpdateFeedbackStatus(ids, { status, userId }) {
  for (const id of ids) {
    await updateFeedbackStatus(id, { status, userId });
  }
}

async function deleteFeedback(id) {
  await query(`DELETE FROM PHAN_HOI_NOI_DUNG WHERE IDPhanHoi = @id`, { id });
}

async function getFeedbackTypeSummary() {
  return query(`
    SELECT LoaiPhanHoi AS type, COUNT(1) AS total
    FROM PHAN_HOI_NOI_DUNG
    GROUP BY LoaiPhanHoi
    ORDER BY LoaiPhanHoi ASC
  `);
}

async function getFeedbackRatingSummary() {
  return query(`
    SELECT DiemDanhGia AS rating, COUNT(1) AS total
    FROM PHAN_HOI_NOI_DUNG
    GROUP BY DiemDanhGia
    ORDER BY DiemDanhGia ASC
  `);
}

async function getFeedbackStats() {
  const [byStatus, byType, byRating] = await Promise.all([
    getFeedbackSummary(),
    getFeedbackTypeSummary(),
    getFeedbackRatingSummary()
  ]);

  return { byStatus, byType, byRating };
}

async function getFeedbackBySessionId(sessionId) {
  return query(`
    SELECT
      f.IDPhanHoi AS id,
      f.IDPhien AS sessionId,
      f.LoaiPhanHoi AS type,
      f.IDBaiViet AS articleId,
      f.IDTinNhan AS messageId,
      f.DiemDanhGia AS rating,
      f.HuuIch AS isHelpful,
      f.NoiDungPhanHoi AS content,
      f.TrangThaiXuLy AS status,
      f.IDNguoiXuLy AS handledBy,
      f.NgayXuLy AS handledAt,
      f.NgayTao AS createdAt
    FROM PHAN_HOI_NOI_DUNG f
    WHERE f.IDPhien = @sessionId
    ORDER BY f.NgayTao DESC, f.IDPhanHoi DESC
  `, { sessionId });
}

async function getFeedbackByArticleId(articleId) {
  return query(`
    SELECT
      f.IDPhanHoi AS id,
      f.IDPhien AS sessionId,
      f.LoaiPhanHoi AS type,
      f.IDBaiViet AS articleId,
      f.IDTinNhan AS messageId,
      f.DiemDanhGia AS rating,
      f.HuuIch AS isHelpful,
      f.NoiDungPhanHoi AS content,
      f.TrangThaiXuLy AS status,
      f.IDNguoiXuLy AS handledBy,
      f.NgayXuLy AS handledAt,
      f.NgayTao AS createdAt
    FROM PHAN_HOI_NOI_DUNG f
    WHERE f.IDBaiViet = @articleId
    ORDER BY f.NgayTao DESC, f.IDPhanHoi DESC
  `, { articleId });
}
async function getFeedbackById(id) {
  const rows = await query(`
    SELECT TOP 1
      f.IDPhanHoi AS id,
      f.IDPhien AS sessionId,
      f.LoaiPhanHoi AS type,
      f.IDBaiViet AS articleId,
      f.IDTinNhan AS messageId,
      f.DiemDanhGia AS rating,
      f.HuuIch AS isHelpful,
      f.NoiDungPhanHoi AS content,
      f.TrangThaiXuLy AS status,
      f.IDNguoiXuLy AS handledBy,
      f.NgayXuLy AS handledAt,
      f.NgayTao AS createdAt
    FROM PHAN_HOI_NOI_DUNG f
    WHERE f.IDPhanHoi = @id
  `, { id });

  return rows[0] || null;
}

async function updateFeedbackStatus(id, { status, userId }) {
  await query(`
    UPDATE PHAN_HOI_NOI_DUNG
    SET TrangThaiXuLy = @status,
        IDNguoiXuLy = @userId,
        NgayXuLy = SYSUTCDATETIME()
    WHERE IDPhanHoi = @id
  `, { id, status, userId });
}

async function getFeedbackSummary() {
  return query(`
    SELECT
      TrangThaiXuLy AS status,
      COUNT(1) AS total
    FROM PHAN_HOI_NOI_DUNG
    GROUP BY TrangThaiXuLy
    ORDER BY TrangThaiXuLy ASC
  `);
}

module.exports = {
  listFeedback,
  countFeedback,
  listFeedbackStatuses,
  listFeedbackTypes,
  getFeedbackById,
  getFeedbackBySessionId,
  getFeedbackByArticleId,
  updateFeedbackStatus,
  bulkUpdateFeedbackStatus,
  deleteFeedback,
  getFeedbackSummary,
  getFeedbackTypeSummary,
  getFeedbackRatingSummary,
  getFeedbackStats
};