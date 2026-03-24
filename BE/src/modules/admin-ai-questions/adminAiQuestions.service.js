const repository = require('./adminAiQuestions.repository');
const { AppError } = require('../../utils/appError');

const VALID_STATUSES = ['MOI', 'DANG_XEM_XET', 'DA_XU_LY', 'BO_QUA'];
const VALID_REASONS = ['THIEU_TRI_THUC', 'KHONG_DU_CAN_CU', 'NGOAI_PHAM_VI', 'NOI_DUNG_NHAY_CAM', 'KHAC'];

function validateStatus(status) {
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError('Trạng thái câu hỏi không hợp lệ', 400);
  }
}

function validateReason(reason) {
  if (reason && !VALID_REASONS.includes(reason)) {
    throw new AppError('Lý do câu hỏi không hợp lệ', 400);
  }
}

function ensurePositiveInteger(value, fieldName) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${fieldName} không hợp lệ`, 400);
  }
  return parsed;
}

async function getQuestionOrThrow(id) {
  const question = await repository.getQuestionById(id);
  if (!question) {
    throw new AppError('Không tìm thấy câu hỏi cần bổ sung', 404);
  }
  return question;
}

function normalizeQuestionPayload(payload = {}) {
  const reason = String(payload.reason || '').trim();
  const suggestedHandling = payload.suggestedHandling == null ? null : String(payload.suggestedHandling).trim() || null;
  const status = payload.status ? String(payload.status).trim() : 'MOI';

  if (!VALID_REASONS.includes(reason)) {
    throw new AppError('Lý do câu hỏi không hợp lệ', 400);
  }

  validateStatus(status);

  return { reason, suggestedHandling, status };
}

async function listQuestions({ status, reason, page, pageSize, offset }) {
  validateReason(reason);
  if (status) {
    validateStatus(status);
  }

  const [items, total] = await Promise.all([
    repository.listQuestions({ status, reason, offset, pageSize }),
    repository.countQuestions({ status, reason })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getQuestionSummary() {
  return repository.getQuestionSummary();
}

async function listQuestionReasons() {
  return repository.listQuestionReasons();
}

async function listQuestionStatuses() {
  return repository.listQuestionStatuses();
}

async function getQuestionById(id) {
  return getQuestionOrThrow(id);
}

async function getQuestionByMessageId(messageId) {
  const normalizedMessageId = ensurePositiveInteger(messageId, 'messageId');
  const question = await repository.getQuestionByMessageId(normalizedMessageId);
  if (!question) {
    throw new AppError('Không tìm thấy câu hỏi cần bổ sung theo tin nhắn', 404);
  }
  return question;
}

async function createQuestion(payload) {
  const messageId = ensurePositiveInteger(payload.messageId, 'messageId');
  const message = await repository.getMessageById(messageId);
  if (!message) {
    throw new AppError('Không tìm thấy tin nhắn AI', 404);
  }

  const existingQuestion = await repository.getQuestionByMessageId(messageId);
  if (existingQuestion) {
    throw new AppError('Tin nhắn này đã có câu hỏi cần bổ sung', 409);
  }

  const normalizedPayload = normalizeQuestionPayload(payload);
  const created = await repository.createQuestion({
    messageId,
    ...normalizedPayload
  });

  return getQuestionOrThrow(created.id);
}

async function updateQuestion(id, payload) {
  await getQuestionOrThrow(id);
  const normalizedPayload = normalizeQuestionPayload(payload);
  await repository.updateQuestionMetadata(id, normalizedPayload);
  return getQuestionOrThrow(id);
}

async function updateQuestionSuggestion(id, suggestedHandling) {
  await getQuestionOrThrow(id);
  await repository.updateQuestionSuggestion(id, suggestedHandling == null ? null : String(suggestedHandling).trim() || null);
  return getQuestionOrThrow(id);
}

async function updateQuestionStatus(id, status) {
  validateStatus(status);
  await getQuestionOrThrow(id);
  await repository.updateQuestionStatus(id, status);
  return getQuestionOrThrow(id);
}

async function deleteQuestion(id) {
  await getQuestionOrThrow(id);
  await repository.deleteQuestion(id);
  return { id };
}

module.exports = {
  listQuestions,
  getQuestionSummary,
  listQuestionReasons,
  listQuestionStatuses,
  getQuestionById,
  getQuestionByMessageId,
  createQuestion,
  updateQuestion,
  updateQuestionSuggestion,
  updateQuestionStatus,
  deleteQuestion
};