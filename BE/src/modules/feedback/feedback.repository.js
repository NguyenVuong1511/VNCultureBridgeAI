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

module.exports = {
  createFeedback
};
