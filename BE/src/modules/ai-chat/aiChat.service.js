const repository = require('./aiChat.repository');
const { AppError } = require('../../utils/appError');
const sessionsRepository = require('../sessions/sessions.repository');

const VALID_SENDERS = ['NGUOI_DUNG', 'AI', 'HE_THONG'];
const VALID_REASONS = ['THIEU_DU_LIEU', 'DO_TIN_CAY_THAP', 'MAU_THUAN_DU_LIEU', 'NGOAI_PHAM_VI', 'NHAY_CAM'];

async function getChatSessionOrThrow(id) {
  const chatSession = await repository.getChatSessionById(id);
  if (!chatSession) {
    throw new AppError('Không tìm thấy phiên chat AI', 404);
  }
  return chatSession;
}

async function createChatSession(payload) {
  if (payload.sessionId) {
    const session = await sessionsRepository.getSessionById(payload.sessionId);
    if (!session) {
      throw new AppError('Session không tồn tại', 404);
    }
  }

  return repository.createChatSession(payload);
}

async function getChatSessionById(id) {
  return getChatSessionOrThrow(id);
}

async function listMessages(chatSessionId) {
  await getChatSessionOrThrow(chatSessionId);
  const messages = await repository.listMessages(chatSessionId);

  return Promise.all(messages.map(async (message) => ({
    ...message,
    citations: await repository.listCitations(message.id)
  })));
}

async function createMessage(chatSessionId, payload) {
  await getChatSessionOrThrow(chatSessionId);

  if (!VALID_SENDERS.includes(payload.senderType)) {
    throw new AppError('Loại người gửi không hợp lệ', 400);
  }

  if (!payload.content) {
    throw new AppError('content là bắt buộc', 400);
  }

  const orderIndex = await repository.getNextMessageOrder(chatSessionId);
  const message = await repository.createMessage({
    chatSessionId,
    senderType: payload.senderType,
    orderIndex,
    language: payload.language || null,
    content: payload.content,
    intentCode: payload.intentCode || null,
    confidenceScore: payload.confidenceScore || null,
    answeredWell: payload.answeredWell ?? null,
    isOutOfScope: payload.isOutOfScope ? 1 : 0,
    isSensitive: payload.isSensitive ? 1 : 0,
    isGrounded: payload.isGrounded === false ? 0 : 1,
    responseTimeMs: payload.responseTimeMs || null,
    promptTokens: payload.promptTokens || null,
    completionTokens: payload.completionTokens || null
  });

  if (Array.isArray(payload.citations)) {
    for (const citation of payload.citations) {
      if (!citation.knowledgeDocumentId) continue;
      await repository.addCitation(message.id, citation);
    }
  }

  if (payload.missingQuestion && VALID_REASONS.includes(payload.missingQuestion.reason)) {
    await repository.createMissingQuestion({
      messageId: message.id,
      reason: payload.missingQuestion.reason,
      suggestedHandling: payload.missingQuestion.suggestedHandling || null
    });
  }

  return {
    ...message,
    citations: await repository.listCitations(message.id)
  };
}

module.exports = {
  createChatSession,
  getChatSessionById,
  listMessages,
  createMessage
};
