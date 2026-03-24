const { query } = require('../../config/db');

async function listQuestions({ status, reason, offset, pageSize }) {
  return query(`
    SELECT
      q.IDCauHoiCanBoSung AS id,
      q.IDTinNhan AS messageId,
      q.LyDo AS reason,
      q.GoiYXuLy AS suggestedHandling,
      q.TrangThai AS status,
      q.NgayTao AS createdAt,
      q.NgayXuLy AS resolvedAt,
      m.IDPhienChat AS chatSessionId,
      m.NoiDungTinNhan AS messageContent,
      m.MaNgonNgu AS language,
      m.NgoaiPhamVi AS isOutOfScope,
      m.LaNoiDungNhayCam AS isSensitive,
      m.DuCanCuDuLieu AS isGrounded,
      c.IDPhienNguoiDung AS sessionId
    FROM CAU_HOI_CAN_BO_SUNG q
    INNER JOIN TIN_NHAN_CHAT_AI m ON m.IDTinNhan = q.IDTinNhan
    INNER JOIN PHIEN_CHAT_AI c ON c.IDPhienChat = m.IDPhienChat
    WHERE (@status IS NULL OR q.TrangThai = @status)
      AND (@reason IS NULL OR q.LyDo = @reason)
    ORDER BY q.NgayTao DESC, q.IDCauHoiCanBoSung DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { status, reason, offset, pageSize });
}

async function countQuestions({ status, reason }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM CAU_HOI_CAN_BO_SUNG q
    WHERE (@status IS NULL OR q.TrangThai = @status)
      AND (@reason IS NULL OR q.LyDo = @reason)
  `, { status, reason });

  return rows[0]?.total || 0;
}

async function getQuestionSummary() {
  const [byStatus, byReason] = await Promise.all([
    query(`SELECT TrangThai AS status, COUNT(1) AS total FROM CAU_HOI_CAN_BO_SUNG GROUP BY TrangThai ORDER BY TrangThai ASC`),
    query(`SELECT LyDo AS reason, COUNT(1) AS total FROM CAU_HOI_CAN_BO_SUNG GROUP BY LyDo ORDER BY LyDo ASC`)
  ]);

  return { byStatus, byReason };
}

async function listQuestionReasons() {
  return query(`
    SELECT DISTINCT LyDo AS reason
    FROM CAU_HOI_CAN_BO_SUNG
    ORDER BY LyDo ASC
  `);
}

async function listQuestionStatuses() {
  return query(`
    SELECT DISTINCT TrangThai AS status
    FROM CAU_HOI_CAN_BO_SUNG
    ORDER BY TrangThai ASC
  `);
}

async function getQuestionByMessageId(messageId) {
  const rows = await query(`
    SELECT TOP 1
      q.IDCauHoiCanBoSung AS id,
      q.IDTinNhan AS messageId,
      q.LyDo AS reason,
      q.GoiYXuLy AS suggestedHandling,
      q.TrangThai AS status,
      q.NgayTao AS createdAt,
      q.NgayXuLy AS resolvedAt,
      m.IDPhienChat AS chatSessionId,
      m.NoiDungTinNhan AS messageContent,
      m.MaNgonNgu AS language,
      m.NgoaiPhamVi AS isOutOfScope,
      m.LaNoiDungNhayCam AS isSensitive,
      m.DuCanCuDuLieu AS isGrounded,
      c.IDPhienNguoiDung AS sessionId
    FROM CAU_HOI_CAN_BO_SUNG q
    INNER JOIN TIN_NHAN_CHAT_AI m ON m.IDTinNhan = q.IDTinNhan
    INNER JOIN PHIEN_CHAT_AI c ON c.IDPhienChat = m.IDPhienChat
    WHERE q.IDTinNhan = @messageId
  `, { messageId });

  return rows[0] || null;
}

async function createQuestion(payload) {
  const rows = await query(`
    INSERT INTO CAU_HOI_CAN_BO_SUNG (
      IDTinNhan,
      LyDo,
      GoiYXuLy,
      TrangThai
    )
    OUTPUT INSERTED.IDCauHoiCanBoSung AS id
    VALUES (
      @messageId,
      @reason,
      @suggestedHandling,
      @status
    )
  `, payload);

  return rows[0] || null;
}

async function getMessageById(messageId) {
  const rows = await query(`
    SELECT TOP 1 IDTinNhan AS id
    FROM TIN_NHAN_CHAT_AI
    WHERE IDTinNhan = @messageId
  `, { messageId });

  return rows[0] || null;
}

async function updateQuestionSuggestion(id, suggestedHandling) {
  await query(`
    UPDATE CAU_HOI_CAN_BO_SUNG
    SET GoiYXuLy = @suggestedHandling
    WHERE IDCauHoiCanBoSung = @id
  `, { id, suggestedHandling });
}

async function updateQuestionMetadata(id, { reason, suggestedHandling, status }) {
  await query(`
    UPDATE CAU_HOI_CAN_BO_SUNG
    SET LyDo = @reason,
        GoiYXuLy = @suggestedHandling,
        TrangThai = @status,
        NgayXuLy = CASE WHEN @status IN ('DA_XU_LY', 'BO_QUA') THEN SYSUTCDATETIME() ELSE NULL END
    WHERE IDCauHoiCanBoSung = @id
  `, { id, reason, suggestedHandling, status });
}

async function deleteQuestion(id) {
  await query(`DELETE FROM CAU_HOI_CAN_BO_SUNG WHERE IDCauHoiCanBoSung = @id`, { id });
}

async function getQuestionById(id) {
  const rows = await query(`
    SELECT TOP 1
      q.IDCauHoiCanBoSung AS id,
      q.IDTinNhan AS messageId,
      q.LyDo AS reason,
      q.GoiYXuLy AS suggestedHandling,
      q.TrangThai AS status,
      q.NgayTao AS createdAt,
      q.NgayXuLy AS resolvedAt,
      m.IDPhienChat AS chatSessionId,
      m.NoiDungTinNhan AS messageContent,
      m.MaNgonNgu AS language,
      m.NgoaiPhamVi AS isOutOfScope,
      m.LaNoiDungNhayCam AS isSensitive,
      m.DuCanCuDuLieu AS isGrounded,
      c.IDPhienNguoiDung AS sessionId
    FROM CAU_HOI_CAN_BO_SUNG q
    INNER JOIN TIN_NHAN_CHAT_AI m ON m.IDTinNhan = q.IDTinNhan
    INNER JOIN PHIEN_CHAT_AI c ON c.IDPhienChat = m.IDPhienChat
    WHERE q.IDCauHoiCanBoSung = @id
  `, { id });

  return rows[0] || null;
}

async function updateQuestionStatus(id, status) {
  await query(`
    UPDATE CAU_HOI_CAN_BO_SUNG
    SET TrangThai = @status,
        NgayXuLy = CASE WHEN @status IN ('DA_XU_LY', 'BO_QUA') THEN SYSUTCDATETIME() ELSE NgayXuLy END
    WHERE IDCauHoiCanBoSung = @id
  `, { id, status });
}

module.exports = {
  listQuestions,
  countQuestions,
  getQuestionSummary,
  listQuestionReasons,
  listQuestionStatuses,
  getQuestionById,
  getQuestionByMessageId,
  getMessageById,
  createQuestion,
  updateQuestionSuggestion,
  updateQuestionMetadata,
  updateQuestionStatus,
  deleteQuestion
};
