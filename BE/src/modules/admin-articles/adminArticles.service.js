const adminArticlesRepository = require('./adminArticles.repository');
const { AppError } = require('../../utils/appError');

const VALID_TYPES = ['LE_HOI','TIN_NGUONG','PHONG_TUC','AM_THUC','TRANG_PHUC','NGHE_THUAT_DAN_GIAN','KIEN_TRUC','BIEU_TUONG','VAN_HOA_DAN_TOC','CHUNG'];
const VALID_REVIEW_LEVELS = ['THUONG', 'CHAT'];
const REQUIRED_LANGUAGES = ['vi', 'en'];

function validateArticlePayload(payload) {
  if (!payload.slug) {
    throw new AppError('slug là bắt buộc', 400);
  }

  if (!VALID_TYPES.includes(payload.type)) {
    throw new AppError('Loại bài viết không hợp lệ', 400);
  }

  if (!VALID_REVIEW_LEVELS.includes(payload.reviewLevel)) {
    throw new AppError('Mức độ kiểm duyệt không hợp lệ', 400);
  }

  if (payload.sensitivityLevel < 1 || payload.sensitivityLevel > 5) {
    throw new AppError('Cấp độ nhạy cảm phải từ 1 đến 5', 400);
  }
}

async function getAdminArticles({ page, pageSize, offset, status, type, syncStatus }) {
  const items = await adminArticlesRepository.findAll({ status, type, syncStatus, offset, pageSize });
  const total = await adminArticlesRepository.countAll({ status, type, syncStatus });

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getAdminArticleById(id) {
  const article = await adminArticlesRepository.findById(id);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return article;
}

async function createAdminArticle(payload, userId) {
  validateArticlePayload(payload);
  const created = await adminArticlesRepository.createArticle({ ...payload, createdBy: userId });
  return getAdminArticleById(created.id);
}

async function updateAdminArticle(id, payload, userId) {
  validateArticlePayload(payload);
  const existing = await adminArticlesRepository.findById(id);

  if (!existing) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  await adminArticlesRepository.updateArticle(id, { ...payload, updatedBy: userId });
  return getAdminArticleById(id);
}

async function ensurePublishable(articleId) {
  const [categories, regions, ethnicGroups, references, translations] = await Promise.all([
    adminArticlesRepository.findCategories(articleId),
    adminArticlesRepository.findRegions(articleId),
    adminArticlesRepository.findEthnicGroups(articleId),
    adminArticlesRepository.findReferences(articleId),
    adminArticlesRepository.findTranslations(articleId)
  ]);

  if (!categories.length) {
    throw new AppError('Bài viết phải có ít nhất 1 danh mục trước khi xuất bản', 422);
  }

  if (!regions.length && !ethnicGroups.length) {
    throw new AppError('Bài viết phải có ít nhất 1 vùng hoặc 1 dân tộc trước khi xuất bản', 422);
  }

  if (!references.length) {
    throw new AppError('Bài viết phải có ít nhất 1 nguồn tham khảo trước khi xuất bản', 422);
  }

  const publishedLanguages = translations
    .filter((translation) => ['DA_DUYET', 'DA_XUAT_BAN'].includes(translation.status))
    .map((translation) => translation.language);

  const hasRequiredLanguages = REQUIRED_LANGUAGES.every((language) => publishedLanguages.includes(language));

  if (!hasRequiredLanguages) {
    throw new AppError('Bài viết phải có đủ bản dịch tiếng Việt và tiếng Anh trước khi xuất bản', 422);
  }
}

async function changeStatus(articleId, nextStatus, userId, note = null, rejectionReason = null) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  const transitions = {
    CHO_DUYET: ['NHAP', 'TU_CHOI'],
    DA_DUYET: ['CHO_DUYET'],
    TU_CHOI: ['CHO_DUYET'],
    DA_XUAT_BAN: ['DA_DUYET'],
    AN: ['DA_XUAT_BAN'],
    LUU_TRU: ['DA_XUAT_BAN', 'AN']
  };

  if (!transitions[nextStatus]?.includes(article.status)) {
    throw new AppError(`Không thể chuyển trạng thái từ ${article.status} sang ${nextStatus}`, 422);
  }

  if (nextStatus === 'DA_XUAT_BAN') {
    await ensurePublishable(articleId);
  }

  await adminArticlesRepository.updateStatus(articleId, { status: nextStatus, userId, rejectionReason });
  await adminArticlesRepository.insertStatusHistory({
    articleId,
    oldStatus: article.status,
    newStatus: nextStatus,
    userId,
    note
  });

  return getAdminArticleById(articleId);
}

async function getTranslations(articleId) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return adminArticlesRepository.findTranslations(articleId);
}

async function upsertTranslation(articleId, payload) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!payload.language) {
    throw new AppError('language là bắt buộc', 400);
  }

  if (!payload.title) {
    throw new AppError('title là bắt buộc', 400);
  }

  if (!['NHAP', 'DA_SOAT', 'DA_DUYET', 'DA_XUAT_BAN'].includes(payload.status)) {
    throw new AppError('Trạng thái bản dịch không hợp lệ', 400);
  }

  await adminArticlesRepository.upsertTranslation(articleId, payload);
  return adminArticlesRepository.findTranslationByLanguage(articleId, payload.language);
}

async function replaceCategories(articleId, categories) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!Array.isArray(categories) || !categories.length) {
    throw new AppError('categories phải là mảng và có ít nhất 1 phần tử', 400);
  }

  const primaryCount = categories.filter((item) => item.isPrimary).length;
  if (primaryCount > 1) {
    throw new AppError('Chỉ được có một danh mục chính', 422);
  }

  await adminArticlesRepository.clearArticleCategories(articleId);
  for (const category of categories) {
    const categoryId = Number(category.id);
    const existingCategory = await adminArticlesRepository.findCategoryById(categoryId);
    if (!existingCategory) {
      throw new AppError(`Danh mục không tồn tại: ${categoryId}`, 404);
    }
    await adminArticlesRepository.addArticleCategory(articleId, categoryId, Boolean(category.isPrimary));
  }

  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findCategories(articleId);
}

async function replaceRegions(articleId, regions) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!Array.isArray(regions)) {
    throw new AppError('regions phải là mảng', 400);
  }

  await adminArticlesRepository.clearArticleRegions(articleId);
  for (const region of regions) {
    const regionId = Number(region.id);
    const existingRegion = await adminArticlesRepository.findRegionById(regionId);
    if (!existingRegion) {
      throw new AppError(`Vùng văn hoá không tồn tại: ${regionId}`, 404);
    }
    const relationType = region.relationType || 'LIEN_QUAN';
    if (!['NGUON_GOC', 'THUC_HANH', 'PHO_BIEN', 'LIEN_QUAN'].includes(relationType)) {
      throw new AppError('Loại liên hệ vùng không hợp lệ', 400);
    }
    await adminArticlesRepository.addArticleRegion(articleId, regionId, relationType);
  }

  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findRegions(articleId);
}

async function replaceEthnicGroups(articleId, ethnicGroups) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!Array.isArray(ethnicGroups)) {
    throw new AppError('ethnicGroups phải là mảng', 400);
  }

  await adminArticlesRepository.clearArticleEthnicGroups(articleId);
  for (const ethnicGroup of ethnicGroups) {
    const ethnicGroupId = Number(ethnicGroup.id);
    const existingEthnicGroup = await adminArticlesRepository.findEthnicGroupById(ethnicGroupId);
    if (!existingEthnicGroup) {
      throw new AppError(`Dân tộc không tồn tại: ${ethnicGroupId}`, 404);
    }
    const relationType = ethnicGroup.relationType || 'LIEN_QUAN';
    if (!['NGUON_GOC', 'THUC_HANH', 'LIEN_QUAN'].includes(relationType)) {
      throw new AppError('Loại liên hệ dân tộc không hợp lệ', 400);
    }
    await adminArticlesRepository.addArticleEthnicGroup(articleId, ethnicGroupId, relationType);
  }

  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findEthnicGroups(articleId);
}

async function createReference(articleId, payload) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!payload.type || !payload.title) {
    throw new AppError('type và title là bắt buộc', 400);
  }

  if (!['SACH','BAI_BAO','TAP_CHI','WEBSITE','PHONG_VAN','LUU_TRU','VIDEO','TAI_LIEU_NHA_NUOC','KHAC'].includes(payload.type)) {
    throw new AppError('Loại nguồn không hợp lệ', 400);
  }

  const trustLevel = Number(payload.trustLevel || 3);
  if (trustLevel < 1 || trustLevel > 5) {
    throw new AppError('trustLevel phải từ 1 đến 5', 400);
  }

  const createdReference = await adminArticlesRepository.createReference({
    ...payload,
    trustLevel
  });

  await adminArticlesRepository.attachReferenceToArticle(
    articleId,
    createdReference.id,
    payload.citationNote || null,
    payload.pageFrom || null,
    payload.pageTo || null,
    Boolean(payload.isPrimary)
  );

  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findReferences(articleId);
}

async function attachReference(articleId, payload) {
  const article = await adminArticlesRepository.findById(articleId);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  if (!payload.referenceId) {
    throw new AppError('referenceId là bắt buộc', 400);
  }

  const referenceId = Number(payload.referenceId);
  const reference = await adminArticlesRepository.findReferenceById(referenceId);
  if (!reference) {
    throw new AppError(`Nguồn tham khảo không tồn tại: ${referenceId}`, 404);
  }

  await adminArticlesRepository.attachReferenceToArticle(
    articleId,
    referenceId,
    payload.citationNote || null,
    payload.pageFrom || null,
    payload.pageTo || null,
    Boolean(payload.isPrimary)
  );

  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findReferences(articleId);
}

async function replaceTags(articleId, tagIds) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) throw new AppError('Không tìm thấy bài viết', 404);
  if (!Array.isArray(tagIds)) throw new AppError('tagIds phải là mảng', 400);

  await adminArticlesRepository.clearArticleTags(articleId);
  for (const rawId of tagIds) {
    const tagId = Number(rawId);
    const tag = await adminArticlesRepository.findTagById(tagId);
    if (!tag) throw new AppError(`Tag không tồn tại: ${tagId}`, 404);
    await adminArticlesRepository.addArticleTag(articleId, tagId);
  }
  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findTags(articleId);
}

async function replaceKeywords(articleId, keywordIds) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) throw new AppError('Không tìm thấy bài viết', 404);
  if (!Array.isArray(keywordIds)) throw new AppError('keywordIds phải là mảng', 400);

  await adminArticlesRepository.clearArticleKeywords(articleId);
  for (const rawId of keywordIds) {
    const keywordId = Number(rawId);
    const keyword = await adminArticlesRepository.findKeywordById(keywordId);
    if (!keyword) throw new AppError(`Từ khoá không tồn tại: ${keywordId}`, 404);
    await adminArticlesRepository.addArticleKeyword(articleId, keywordId);
  }
  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findKeywords(articleId);
}

async function replaceRelatedArticles(articleId, relatedArticles) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) throw new AppError('Không tìm thấy bài viết', 404);
  if (!Array.isArray(relatedArticles)) throw new AppError('relatedArticles phải là mảng', 400);

  await adminArticlesRepository.clearRelatedArticles(articleId);
  for (const item of relatedArticles) {
    const relatedArticleId = Number(item.id);
    if (relatedArticleId === articleId) throw new AppError('Không được liên kết bài viết với chính nó', 422);
    const relatedArticle = await adminArticlesRepository.findArticleByIdForRelation(relatedArticleId);
    if (!relatedArticle) throw new AppError(`Bài viết liên quan không tồn tại: ${relatedArticleId}`, 404);

    const relationType = item.relationType || 'LIEN_QUAN';
    if (!['LIEN_QUAN', 'CUNG_CHU_DE', 'CUNG_VUNG', 'CUNG_DAN_TOC', 'GOI_Y'].includes(relationType)) {
      throw new AppError('Loại liên kết bài viết không hợp lệ', 400);
    }

    const weight = item.weight == null ? 1 : Number(item.weight);
    await adminArticlesRepository.addRelatedArticle(articleId, relatedArticleId, relationType, weight);
  }
  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findRelatedArticles(articleId);
}

async function replaceMedia(articleId, mediaItems) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) throw new AppError('Không tìm thấy bài viết', 404);
  if (!Array.isArray(mediaItems)) throw new AppError('mediaItems phải là mảng', 400);

  const primaryCount = mediaItems.filter((item) => item.isPrimary).length;
  if (primaryCount > 1) throw new AppError('Chỉ được có một media chính', 422);

  await adminArticlesRepository.clearArticleMedia(articleId);
  for (const item of mediaItems) {
    const mediaId = Number(item.id);
    const media = await adminArticlesRepository.findMediaById(mediaId);
    if (!media) throw new AppError(`Media không tồn tại: ${mediaId}`, 404);
    if (media.status === 'LUU_TRU' || media.status === 'TU_CHOI') {
      throw new AppError(`Media không hợp lệ để gắn vào bài viết: ${mediaId}`, 422);
    }

    const usageContext = item.usageContext || 'BO_SUU_TAP';
    if (!['ANH_BIA', 'BO_SUU_TAP', 'CHEN_NOI_DUNG', 'THAM_KHAO'].includes(usageContext)) {
      throw new AppError('Ngữ cảnh sử dụng media không hợp lệ', 400);
    }

    await adminArticlesRepository.addArticleMedia(
      articleId,
      mediaId,
      Number(item.displayOrder || 0),
      Boolean(item.isPrimary),
      usageContext
    );
  }
  await adminArticlesRepository.updatePublishedSyncFlag(articleId);
  return adminArticlesRepository.findMedia(articleId);
}

async function getStatusHistory(articleId) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return adminArticlesRepository.findStatusHistory(articleId);
}

async function getVersions(articleId) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return adminArticlesRepository.findVersions(articleId);
}

async function getVersionById(articleId, versionId) {
  const article = await adminArticlesRepository.findById(articleId);
  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  const version = await adminArticlesRepository.findVersionById(articleId, versionId);
  if (!version) {
    throw new AppError('Không tìm thấy phiên bản bài viết', 404);
  }

  return version;
}

module.exports = {
  getAdminArticles,
  getAdminArticleById,
  createAdminArticle,
  updateAdminArticle,
  changeStatus,
  getTranslations,
  upsertTranslation,
  replaceCategories,
  replaceRegions,
  replaceEthnicGroups,
  createReference,
  attachReference,
  replaceTags,
  replaceKeywords,
  replaceRelatedArticles,
  replaceMedia,
  getStatusHistory,
  getVersions,
  getVersionById
};
