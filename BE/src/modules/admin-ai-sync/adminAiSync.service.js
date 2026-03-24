const repository = require('./adminAiSync.repository');
const { AppError } = require('../../utils/appError');

const VALID_SYNC_TYPES = ['TOAN_BO', 'TANG_DAN', 'XAY_LAI_VECTOR'];
const VALID_RUN_STATUSES = ['CHO_XU_LY', 'DANG_XU_LY', 'HOAN_TAT', 'LOI', 'HUY'];
const VALID_DETAIL_STATUSES = ['CHO_XU_LY', 'DANG_XU_LY', 'HOAN_TAT', 'LOI', 'BO_QUA'];
const VALID_PENDING_STATUSES = ['KHONG_CAN', 'CHO_DONG_BO', 'DANG_DONG_BO', 'SAN_SANG', 'LOI'];

function validateSyncType(syncType) {
  if (syncType && !VALID_SYNC_TYPES.includes(syncType)) {
    throw new AppError('Loại đồng bộ AI không hợp lệ', 400);
  }
}

function validateRunStatus(status) {
  if (status && !VALID_RUN_STATUSES.includes(status)) {
    throw new AppError('Trạng thái đợt đồng bộ AI không hợp lệ', 400);
  }
}

function validateDetailStatus(status) {
  if (status && !VALID_DETAIL_STATUSES.includes(status)) {
    throw new AppError('Trạng thái chi tiết đồng bộ AI không hợp lệ', 400);
  }
}

function validatePendingStatus(status) {
  if (status && !VALID_PENDING_STATUSES.includes(status)) {
    throw new AppError('Trạng thái chờ đồng bộ AI không hợp lệ', 400);
  }
}

async function getRunOrThrow(id) {
  const run = await repository.getRunById(id);
  if (!run) {
    throw new AppError('Không tìm thấy đợt đồng bộ AI', 404);
  }
  return run;
}

async function getRunDetailOrThrow(runId, detailId) {
  await getRunOrThrow(runId);
  const detail = await repository.getRunDetailById(runId, detailId);
  if (!detail) {
    throw new AppError('Không tìm thấy chi tiết đợt đồng bộ AI', 404);
  }
  return detail;
}

async function getSummary() {
  return repository.getSummary();
}

async function getRunSummary() {
  return repository.getRunSummary();
}

async function getPendingSummary() {
  return repository.getPendingSummary();
}

async function listRunStatuses() {
  return repository.listRunStatuses();
}

async function listRunTypes() {
  return repository.listRunTypes();
}

async function listPendingStatuses() {
  return repository.listPendingStatuses();
}

async function listRuns({ status, syncType, page, pageSize, offset }) {
  validateRunStatus(status);
  validateSyncType(syncType);

  const [items, total] = await Promise.all([
    repository.listRuns({ status, syncType, offset, pageSize }),
    repository.countRuns({ status, syncType })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getRunById(id) {
  const run = await getRunOrThrow(id);
  return {
    ...run,
    details: await repository.listRunDetails(run.id)
  };
}

async function listRunDetails(runId, { status, page, pageSize, offset }) {
  await getRunOrThrow(runId);
  validateDetailStatus(status);

  const [items, total, summary, statuses] = await Promise.all([
    repository.listRunDetailsFiltered(runId, { status, offset, pageSize }),
    repository.countRunDetails(runId, { status }),
    repository.getRunDetailSummary(runId),
    repository.listRunDetailStatuses(runId)
  ]);

  return {
    items,
    meta: { page, pageSize, total },
    summary,
    statuses
  };
}

async function updateRunStatus(runId, payload = {}) {
  await getRunOrThrow(runId);
  validateRunStatus(payload.status);
  await repository.updateRunStatus(runId, {
    status: payload.status,
    errorMessage: payload.errorMessage == null ? null : String(payload.errorMessage).trim() || null
  });
  return getRunById(runId);
}

async function cancelRun(runId, errorMessage = null) {
  await getRunOrThrow(runId);
  await repository.cancelRun(runId, errorMessage == null ? null : String(errorMessage).trim() || null);
  return getRunById(runId);
}

async function retryRun(runId) {
  const run = await getRunOrThrow(runId);
  const runArticles = await repository.getRunArticles(runId);
  await repository.retryRun(runId);
  await repository.clearRunError(runId);
  await repository.setRunArticlesQueued(runId);
  if (runArticles.length) {
    await repository.bulkRequeueArticles(runArticles.map((item) => item.articleId));
  }
  return {
    previousStatus: run.status,
    run: await getRunById(runId)
  };
}

async function getRunDetailById(runId, detailId) {
  return getRunDetailOrThrow(runId, detailId);
}

async function updateRunDetailStatus(runId, detailId, payload = {}) {
  await getRunDetailOrThrow(runId, detailId);
  validateDetailStatus(payload.status);

  await repository.updateRunDetailStatus(runId, detailId, {
    status: payload.status,
    chunkCount: payload.chunkCount == null ? null : Number(payload.chunkCount),
    errorMessage: payload.errorMessage == null ? null : String(payload.errorMessage).trim() || null
  });

  return getRunDetailOrThrow(runId, detailId);
}

async function createRun(payload, userId) {
  validateSyncType(payload.syncType);

  const run = await repository.createRun({ syncType: payload.syncType, triggeredBy: userId });
  const articleIds = Array.isArray(payload.articleIds) && payload.articleIds.length
    ? payload.articleIds.map(Number).filter((articleId) => Number.isInteger(articleId) && articleId > 0)
    : (await repository.listArticlesPendingSync({ status: null, offset: 0, pageSize: 1000 })).map((item) => item.id);

  for (const articleId of articleIds) {
    await repository.createRunDetail(run.id, articleId);
  }

  if (articleIds.length) {
    await repository.markArticlesSyncing(articleIds);
  }

  return getRunById(run.id);
}

async function requeueArticle(articleId) {
  const article = await repository.getArticleById(articleId);
  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  await repository.requeueArticle(articleId);
  return repository.getArticleById(articleId);
}

async function bulkRequeueArticles(articleIds) {
  if (!Array.isArray(articleIds) || !articleIds.length) {
    throw new AppError('articleIds phải là mảng và có ít nhất 1 phần tử', 400);
  }

  const normalizedIds = articleIds
    .map(Number)
    .filter((articleId) => Number.isInteger(articleId) && articleId > 0);

  await repository.bulkRequeueArticles(normalizedIds);
  return repository.getArticlesByIds(normalizedIds);
}

async function listArticlesPendingSync({ status, page, pageSize, offset }) {
  validatePendingStatus(status);

  const [items, total] = await Promise.all([
    repository.listArticlesPendingSync({ status, offset, pageSize }),
    repository.countPendingArticles({ status })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

module.exports = {
  getSummary,
  getRunSummary,
  getPendingSummary,
  listRunStatuses,
  listRunTypes,
  listPendingStatuses,
  listRuns,
  getRunById,
  listRunDetails,
  getRunDetailById,
  updateRunStatus,
  cancelRun,
  retryRun,
  updateRunDetailStatus,
  createRun,
  requeueArticle,
  bulkRequeueArticles,
  listArticlesPendingSync
};