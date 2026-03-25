const { query } = require('../../config/db');

async function createFeedback({ sessionId, type, articleId, messageId, rating, isHelpful, content }) {
  const sql = `
    INSERT INTO PHAN_HOI_NOI_DUNG (
      IDPhien,
      LoaiPhanHoi,
      IDBaiViet,
      IDTinNhan,
      DiemDanhGia,
      HuuIch,
      NoiDungPhanHoi
    )
    OUTPUT INSERTED.IDPhanHoi AS id, INSERTED.TrangThaiXuLy AS status
    VALUES (
      @sessionId,
      @type,
      @articleId,
      @messageId,
      @rating,
      @isHelpful,
      @content
    )
  `;

  const rows = await query(sql, {
    sessionId: sessionId || null,
    type,
    articleId: articleId || null,
    messageId: messageId || null,
    rating: rating || null,
    isHelpful: typeof isHelpful === 'boolean' ? isHelpful : null,
    content: content || null
  });

  return rows[0] || null;
}

async function getPublicFeedbacks({ type = 'CHUNG', status = 'DA_DUYET' }) {
  const sql = `
    SELECT TOP 10
      p.IDPhanHoi AS id,
      p.LoaiPhanHoi AS type,
      p.DiemDanhGia AS score,
      p.NoiDungPhanHoi AS comment,
      p.NgayTao AS createdAt,
      N'Người dùng' AS name,
      'user@example.com' AS userEmail
    FROM PHAN_HOI_NOI_DUNG p
    WHERE p.LoaiPhanHoi = @type AND p.TrangThaiXuLy = @status
    ORDER BY p.NgayTao DESC
  `;

  return query(sql, { type, status });
}

module.exports = {
  createFeedback,
  getPublicFeedbacks
};
