const repository = require('./adminFeedback.repository');
const { AppError } = require('../../utils/appError');

const VALID_STATUSES = ['MOI', 'DA_XEM', 'DA_XU_LY', 'TU_CHOI'];
const VALID_TYPES = ['BAI_VIET', 'AI_TRA_LOI'];

function validateStatus(status) {
  if (status && !VALID_STATUSES.includes(status)) {
    throw new AppError('Trạng thái phản hồi không hợp lệ', 400);
  }
}

function validateType(type) {
  if (type && !VALID_TYPES.includes(type)) {
    throw new AppError('Loại phản hồi không hợp lệ', 400);
  }
}

async function getFeedbackOrThrow(id) {
  const feedback = await repository.getFeedbackById(id);
  if (!feedback) {
    throw new AppError('Không tìm thấy phản hồi', 404);
  }
  return feedback;
}

async function listFeedback({ status, type, articleId, messageId, sessionId, page, pageSize, offset }) {
  validateStatus(status);
  validateType(type);

  const [items, total] = await Promise.all([
    repository.listFeedback({ status, type, articleId, messageId, sessionId, offset, pageSize }),
    repository.countFeedback({ status, type, articleId, messageId, sessionId })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getFeedbackById(id) {
  return getFeedbackOrThrow(id);
}

async function updateFeedbackStatus(id, status, userId) {
  validateStatus(status);
  await getFeedbackOrThrow(id);
  await repository.updateFeedbackStatus(id, { status, userId });
  return getFeedbackOrThrow(id);
}

async function bulkUpdateFeedbackStatus(ids, status, userId) {
  validateStatus(status);
  if (!Array.isArray(ids) || !ids.length) {
    throw new AppError('ids phải là mảng và có ít nhất 1 phần tử', 400);
  }

  const normalizedIds = ids.map(Number).filter((id) => Number.isInteger(id) && id > 0);
  for (const id of normalizedIds) {
    await getFeedbackOrThrow(id);
  }

  await repository.bulkUpdateFeedbackStatus(normalizedIds, { status, userId });
  return Promise.all(normalizedIds.map((id) => repository.getFeedbackById(id)));
}

async function deleteFeedback(id) {
  await getFeedbackOrThrow(id);
  await repository.deleteFeedback(id);
  return { id };
}

async function getFeedbackSummary() {
  return repository.getFeedbackSummary();
}

async function getFeedbackStats() {
  return repository.getFeedbackStats();
}

async function listFeedbackStatuses() {
  return repository.listFeedbackStatuses();
}

async function listFeedbackTypes() {
  return repository.listFeedbackTypes();
}

module.exports = {
  listFeedback,
  getFeedbackById,
  updateFeedbackStatus,
  bulkUpdateFeedbackStatus,
  deleteFeedback,
  getFeedbackSummary,
  getFeedbackStats,
  listFeedbackStatuses,
  listFeedbackTypes
};