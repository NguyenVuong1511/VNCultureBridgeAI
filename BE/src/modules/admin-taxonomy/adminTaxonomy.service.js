const repository = require('./adminTaxonomy.repository');
const { AppError } = require('../../utils/appError');

function ensureCode(payload) {
  if (!payload.code) {
    throw new AppError('code là bắt buộc', 400);
  }
}

async function getEntityOrThrow(loader, id, message) {
  const entity = await loader(id);
  if (!entity) throw new AppError(message, 404);
  return entity;
}

async function listCategories() { return repository.listCategories(); }
async function getCategoryById(id) { return getEntityOrThrow(repository.getCategoryById, id, 'Không tìm thấy danh mục'); }
async function createCategory(payload) { ensureCode(payload); const created = await repository.createCategory(payload); return getCategoryById(created.id); }
async function updateCategory(id, payload) { await getCategoryById(id); ensureCode(payload); await repository.updateCategory(id, payload); return getCategoryById(id); }
async function deleteCategory(id) { await getCategoryById(id); await repository.deleteCategory(id); return { id }; }

async function listRegions() { return repository.listRegions(); }
async function getRegionById(id) { return getEntityOrThrow(repository.getRegionById, id, 'Không tìm thấy vùng văn hoá'); }
async function createRegion(payload) { ensureCode(payload); if (!['DIA_LY','VAN_HOA'].includes(payload.type)) throw new AppError('type không hợp lệ', 400); const created = await repository.createRegion(payload); return getRegionById(created.id); }
async function updateRegion(id, payload) { await getRegionById(id); ensureCode(payload); if (!['DIA_LY','VAN_HOA'].includes(payload.type)) throw new AppError('type không hợp lệ', 400); await repository.updateRegion(id, payload); return getRegionById(id); }
async function deleteRegion(id) { await getRegionById(id); await repository.deleteRegion(id); return { id }; }

async function listEthnicGroups() { return repository.listEthnicGroups(); }
async function getEthnicGroupById(id) { return getEntityOrThrow(repository.getEthnicGroupById, id, 'Không tìm thấy dân tộc'); }
async function createEthnicGroup(payload) { ensureCode(payload); const created = await repository.createEthnicGroup(payload); return getEthnicGroupById(created.id); }
async function updateEthnicGroup(id, payload) { await getEthnicGroupById(id); ensureCode(payload); await repository.updateEthnicGroup(id, payload); return getEthnicGroupById(id); }
async function deleteEthnicGroup(id) { await getEthnicGroupById(id); await repository.deleteEthnicGroup(id); return { id }; }

async function listTags() { return repository.listTags(); }
async function getTagById(id) { return getEntityOrThrow(repository.getTagById, id, 'Không tìm thấy tag'); }
async function createTag(payload) { ensureCode(payload); const created = await repository.createTag(payload); return getTagById(created.id); }
async function updateTag(id, payload) { await getTagById(id); ensureCode(payload); await repository.updateTag(id, payload); return getTagById(id); }
async function deleteTag(id) { await getTagById(id); await repository.deleteTag(id); return { id }; }

async function listKeywords() { return repository.listKeywords(); }
async function getKeywordById(id) { return getEntityOrThrow(repository.getKeywordById, id, 'Không tìm thấy từ khoá'); }
async function createKeyword(payload) { ensureCode(payload); const created = await repository.createKeyword(payload); return getKeywordById(created.id); }
async function updateKeyword(id, payload) { await getKeywordById(id); ensureCode(payload); await repository.updateKeyword(id, payload); return getKeywordById(id); }
async function deleteKeyword(id) { await getKeywordById(id); await repository.deleteKeyword(id); return { id }; }

const TRANSLATION_CONFIG = {
  categories: {
    loader: getCategoryById,
    tableName: 'DANH_MUC_CHU_DE_BAN_DICH',
    idColumn: 'IDDanhMuc',
    nameColumn: 'TenDanhMuc',
    descriptionColumn: 'MoTa',
    notFoundMessage: 'Không tìm thấy danh mục'
  },
  regions: {
    loader: getRegionById,
    tableName: 'VUNG_VAN_HOA_BAN_DICH',
    idColumn: 'IDVung',
    nameColumn: 'TenVung',
    descriptionColumn: 'MoTa',
    notFoundMessage: 'Không tìm thấy vùng văn hoá'
  },
  ethnicGroups: {
    loader: getEthnicGroupById,
    tableName: 'DAN_TOC_BAN_DICH',
    idColumn: 'IDDanToc',
    nameColumn: 'TenDanToc',
    descriptionColumn: 'MoTa',
    notFoundMessage: 'Không tìm thấy dân tộc'
  },
  tags: {
    loader: getTagById,
    tableName: 'THE_NOI_DUNG_BAN_DICH',
    idColumn: 'IDThe',
    nameColumn: 'TenThe',
    descriptionColumn: 'MoTa',
    notFoundMessage: 'Không tìm thấy tag'
  },
  keywords: {
    loader: getKeywordById,
    tableName: 'TU_KHOA_BAN_DICH',
    idColumn: 'IDTuKhoa',
    nameColumn: 'TuKhoaHienThi',
    descriptionColumn: null,
    notFoundMessage: 'Không tìm thấy từ khoá'
  }
};

function getTranslationConfig(entityType) {
  const config = TRANSLATION_CONFIG[entityType];
  if (!config) throw new AppError('Loại thực thể translation không hợp lệ', 400);
  return config;
}

function normalizeTranslationPayload(payload, config) {
  if (!payload.name) throw new AppError('name là bắt buộc', 400);
  return {
    name: payload.name,
    ...(config.descriptionColumn ? { description: payload.description || null } : {})
  };
}

async function listEntityTranslations(entityType, id) {
  const config = getTranslationConfig(entityType);
  await getEntityOrThrow(config.loader, id, config.notFoundMessage);
  return repository.listTranslations({ ...config, id });
}

async function upsertEntityTranslation(entityType, id, language, payload) {
  const config = getTranslationConfig(entityType);
  if (!language) throw new AppError('language là bắt buộc', 400);
  await getEntityOrThrow(config.loader, id, config.notFoundMessage);
  await repository.upsertTranslation({
    ...config,
    id,
    language,
    payload: normalizeTranslationPayload(payload, config)
  });
  return repository.listTranslations({ ...config, id });
}

module.exports = {
  listCategories, getCategoryById, createCategory, updateCategory, deleteCategory,
  listRegions, getRegionById, createRegion, updateRegion, deleteRegion,
  listEthnicGroups, getEthnicGroupById, createEthnicGroup, updateEthnicGroup, deleteEthnicGroup,
  listTags, getTagById, createTag, updateTag, deleteTag,
  listKeywords, getKeywordById, createKeyword, updateKeyword, deleteKeyword,
  listEntityTranslations, upsertEntityTranslation
};
