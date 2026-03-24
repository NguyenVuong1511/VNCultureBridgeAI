const { query } = require('../../config/db');

async function createChatSession({ sessionId, language, countryCode, title }) {
  const rows = await query(`
    INSERT INTO PHIEN_CHAT_AI (
      IDPhienNguoiDung,
      MaNgonNguPhien,
      MaQuocGiaNguoiDung,
      TieuDeHoiThoai
    )
    OUTPUT INSERTED.IDPhienChat AS id,
           INSERTED.IDPhienNguoiDung AS sessionId,
           INSERTED.MaNgonNguPhien AS language,
           INSERTED.MaQuocGiaNguoiDung AS countryCode,
           INSERTED.TieuDeHoiThoai AS title,
           INSERTED.BatDauLuc AS startedAt,
           INSERTED.KetThucLuc AS endedAt
    VALUES (
      @sessionId,
      @language,
      @countryCode,
      @title
    )
  `, {
    sessionId: sessionId || null,
    language: language || null,
    countryCode: countryCode || null,
    title: title || null
  });

  return rows[0] || null;
}

async function getChatSessionById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDPhienChat AS id,
      IDPhienNguoiDung AS sessionId,
      MaNgonNguPhien AS language,
      MaQuocGiaNguoiDung AS countryCode,
      TieuDeHoiThoai AS title,
      BatDauLuc AS startedAt,
      KetThucLuc AS endedAt
    FROM PHIEN_CHAT_AI
    WHERE IDPhienChat = @id
  `, { id });

  return rows[0] || null;
}

async function listMessages(chatSessionId) {
  return query(`
    SELECT
      IDTinNhan AS id,
      IDPhienChat AS chatSessionId,
      LoaiNguoiGui AS senderType,
      ThuTuTinNhan AS orderIndex,
      MaNgonNgu AS language,
      NoiDungTinNhan AS content,
      MaYDinh AS intentCode,
      DiemTinCay AS confidenceScore,
      TraLoiTot AS answeredWell,
      NgoaiPhamVi AS isOutOfScope,
      LaNoiDungNhayCam AS isSensitive,
      DuCanCuDuLieu AS isGrounded,
      ThoiGianPhanHoiMs AS responseTimeMs,
      SoPromptToken AS promptTokens,
      SoCompletionToken AS completionTokens,
      NgayTao AS createdAt
    FROM TIN_NHAN_CHAT_AI
    WHERE IDPhienChat = @chatSessionId
    ORDER BY ThuTuTinNhan ASC, IDTinNhan ASC
  `, { chatSessionId });
}

async function getNextMessageOrder(chatSessionId) {
  const rows = await query(`
    SELECT ISNULL(MAX(ThuTuTinNhan), 0) + 1 AS nextOrder
    FROM TIN_NHAN_CHAT_AI
    WHERE IDPhienChat = @chatSessionId
  `, { chatSessionId });

  return rows[0]?.nextOrder || 1;
}

async function createMessage(payload) {
  const rows = await query(`
    INSERT INTO TIN_NHAN_CHAT_AI (
      IDPhienChat,
      LoaiNguoiGui,
      ThuTuTinNhan,
      MaNgonNgu,
      NoiDungTinNhan,
      MaYDinh,
      DiemTinCay,
      TraLoiTot,
      NgoaiPhamVi,
      LaNoiDungNhayCam,
      DuCanCuDuLieu,
      ThoiGianPhanHoiMs,
      SoPromptToken,
      SoCompletionToken
    )
    OUTPUT INSERTED.IDTinNhan AS id,
           INSERTED.IDPhienChat AS chatSessionId,
           INSERTED.LoaiNguoiGui AS senderType,
           INSERTED.ThuTuTinNhan AS orderIndex,
           INSERTED.MaNgonNgu AS language,
           INSERTED.NoiDungTinNhan AS content,
           INSERTED.MaYDinh AS intentCode,
           INSERTED.DiemTinCay AS confidenceScore,
           INSERTED.TraLoiTot AS answeredWell,
           INSERTED.NgoaiPhamVi AS isOutOfScope,
           INSERTED.LaNoiDungNhayCam AS isSensitive,
           INSERTED.DuCanCuDuLieu AS isGrounded,
           INSERTED.ThoiGianPhanHoiMs AS responseTimeMs,
           INSERTED.SoPromptToken AS promptTokens,
           INSERTED.SoCompletionToken AS completionTokens,
           INSERTED.NgayTao AS createdAt
    VALUES (
      @chatSessionId,
      @senderType,
      @orderIndex,
      @language,
      @content,
      @intentCode,
      @confidenceScore,
      @answeredWell,
      @isOutOfScope,
      @isSensitive,
      @isGrounded,
      @responseTimeMs,
      @promptTokens,
      @completionTokens
    )
  `, payload);

  return rows[0] || null;
}

async function addCitation(messageId, citation) {
  await query(`
    INSERT INTO TRICH_DAN_TIN_NHAN_AI (
      IDTinNhan,
      IDTaiLieuTriThuc,
      IDDoan,
      ThuTuTrichDan,
      DoanTrichYeu
    )
    VALUES (
      @messageId,
      @knowledgeDocumentId,
      @chunkId,
      @orderIndex,
      @excerpt
    )
  `, {
    messageId,
    knowledgeDocumentId: citation.knowledgeDocumentId,
    chunkId: citation.chunkId || null,
    orderIndex: citation.orderIndex || 1,
    excerpt: citation.excerpt || null
  });
}

async function listCitations(messageId) {
  return query(`
    SELECT
      IDTrichDan AS id,
      IDTinNhan AS messageId,
      IDTaiLieuTriThuc AS knowledgeDocumentId,
      IDDoan AS chunkId,
      ThuTuTrichDan AS orderIndex,
      DoanTrichYeu AS excerpt
    FROM TRICH_DAN_TIN_NHAN_AI
    WHERE IDTinNhan = @messageId
    ORDER BY ThuTuTrichDan ASC, IDTrichDan ASC
  `, { messageId });
}

async function createMissingQuestion({ messageId, reason, suggestedHandling }) {
  const rows = await query(`
    INSERT INTO CAU_HOI_CAN_BO_SUNG (
      IDTinNhan,
      LyDo,
      GoiYXuLy
    )
    OUTPUT INSERTED.IDCauHoiCanBoSung AS id,
           INSERTED.IDTinNhan AS messageId,
           INSERTED.LyDo AS reason,
           INSERTED.GoiYXuLy AS suggestedHandling,
           INSERTED.TrangThai AS status,
           INSERTED.NgayTao AS createdAt,
           INSERTED.NgayXuLy AS resolvedAt
    VALUES (
      @messageId,
      @reason,
      @suggestedHandling
    )
  `, {
    messageId,
    reason,
    suggestedHandling: suggestedHandling || null
  });

  return rows[0] || null;
}

module.exports = {
  createChatSession,
  getChatSessionById,
  listMessages,
  getNextMessageOrder,
  createMessage,
  addCitation,
  listCitations,
  createMissingQuestion
};
