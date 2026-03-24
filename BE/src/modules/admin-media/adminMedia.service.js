const repository = require('./adminMedia.repository');
const { AppError } = require('../../utils/appError');

const VALID_TYPES = ['HINH_ANH', 'VIDEO', 'AM_THANH', 'TAI_LIEU'];
const VALID_STATUSES = ['NHAP', 'HOAT_DONG', 'TU_CHOI', 'LUU_TRU'];

function validateMediaPayload(payload) {
  if (!VALID_TYPES.includes(payload.type)) {
    throw new AppError('Loại media không hợp lệ', 400);
  }
  if (!payload.fileName) {
    throw new AppError('fileName là bắt buộc', 400);
  }
  if (!payload.fileUrl) {
    throw new AppError('fileUrl là bắt buộc', 400);
  }
  const status = payload.status || 'NHAP';
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError('Trạng thái media không hợp lệ', 400);
  }

  return {
    type: payload.type,
    fileName: payload.fileName,
    fileUrl: payload.fileUrl,
    storageProvider: payload.storageProvider || null,
    mimeType: payload.mimeType || null,
    sizeBytes: payload.sizeBytes || null,
    widthPx: payload.widthPx || null,
    heightPx: payload.heightPx || null,
    durationSeconds: payload.durationSeconds || null,
    copyrightOwner: payload.copyrightOwner || null,
    licenseInfo: payload.licenseInfo || null,
    status
  };
}

async function getMediaOrThrow(id) {
  const media = await repository.getMediaById(id);
  if (!media) {
    throw new AppError('Không tìm thấy media', 404);
  }
  return media;
}

async function listMedia({ status, type, page, pageSize, offset }) {
  if (status && !VALID_STATUSES.includes(status)) {
    throw new AppError('Trạng thái media không hợp lệ', 400);
  }
  if (type && !VALID_TYPES.includes(type)) {
    throw new AppError('Loại media không hợp lệ', 400);
  }

  const [items, total] = await Promise.all([
    repository.listMedia({ status, type, offset, pageSize }),
    repository.countMedia({ status, type })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getMediaById(id) {
  return getMediaOrThrow(id);
}

async function getMediaUsage(id) {
  await getMediaOrThrow(id);
  return repository.getMediaUsage(id);
}

async function getMediaStats() {
  return repository.getMediaStats();
}

async function listMediaStatuses() {
  return repository.listMediaStatuses();
}

async function listMediaTypes() {
  return repository.listMediaTypes();
}

async function createMedia(payload, userId) {
  const created = await repository.createMedia({
    ...validateMediaPayload(payload),
    uploadedBy: userId
  });

  return getMediaOrThrow(created.id);
}

async function updateMedia(id, payload) {
  await getMediaOrThrow(id);
  await repository.updateMedia(id, validateMediaPayload(payload));
  return getMediaOrThrow(id);
}

async function updateMediaStatus(id, status) {
  await getMediaOrThrow(id);
  if (!VALID_STATUSES.includes(status)) {
    throw new AppError('Trạng thái media không hợp lệ', 400);
  }
  await repository.updateMediaStatus(id, status);
  return getMediaOrThrow(id);
}

async function deleteMedia(id) {
  await getMediaOrThrow(id);
  const usage = await repository.getMediaUsage(id);
  if (usage.articles.length || usage.regions.length || usage.ethnicGroups.length) {
    throw new AppError('Không thể xoá media đang được sử dụng', 422);
  }
  await repository.deleteMedia(id);
  return { id };
}

async function listTranslations(id) {
  await getMediaOrThrow(id);
  return repository.listTranslations(id);
}

async function upsertTranslation(id, language, payload) {
  await getMediaOrThrow(id);
  if (!language) {
    throw new AppError('language là bắt buộc', 400);
  }
  await repository.upsertTranslation(id, language, payload || {});
  return repository.getTranslation(id, language);
}

async function deleteMediaTranslation(id, language) {
  await getMediaOrThrow(id);
  if (!language) {
    throw new AppError('language là bắt buộc', 400);
  }
  await repository.deleteMediaTranslation(id, language);
  return { id, language };
}

module.exports = {
  listMedia,
  getMediaById,
  getMediaUsage,
  getMediaStats,
  listMediaStatuses,
  listMediaTypes,
  createMedia,
  updateMedia,
  updateMediaStatus,
  deleteMedia,
  listTranslations,
  upsertTranslation,
  deleteMediaTranslation
};