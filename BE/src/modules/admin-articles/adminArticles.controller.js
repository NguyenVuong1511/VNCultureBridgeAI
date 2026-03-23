const adminArticlesService = require('./adminArticles.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination } = require('../../utils/request');

async function getAdminArticles(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await adminArticlesService.getAdminArticles({
      page,
      pageSize,
      offset,
      status: req.query.status || null,
      type: req.query.type || null,
      syncStatus: req.query.syncStatus || null
    });

    res.json(successResponse({
      message: 'Lấy danh sách bài viết quản trị thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

async function getAdminArticleById(req, res, next) {
  try {
    const data = await adminArticlesService.getAdminArticleById(Number(req.params.id));
    res.json(successResponse({ message: 'Lấy chi tiết bài viết quản trị thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function createAdminArticle(req, res, next) {
  try {
    const data = await adminArticlesService.createAdminArticle({
      slug: req.body.slug,
      originalLanguage: req.body.originalLanguage || 'vi',
      type: req.body.type,
      sensitivityLevel: Number(req.body.sensitivityLevel || 1),
      reviewLevel: req.body.reviewLevel || 'THUONG',
      featured: Boolean(req.body.featured)
    }, req.user.id);

    res.status(201).json(successResponse({ message: 'Tạo bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateAdminArticle(req, res, next) {
  try {
    const data = await adminArticlesService.updateAdminArticle(Number(req.params.id), {
      slug: req.body.slug,
      originalLanguage: req.body.originalLanguage || 'vi',
      type: req.body.type,
      sensitivityLevel: Number(req.body.sensitivityLevel || 1),
      reviewLevel: req.body.reviewLevel || 'THUONG',
      featured: Boolean(req.body.featured)
    }, req.user.id);

    res.json(successResponse({ message: 'Cập nhật bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function submitReview(req, res, next) {
  try {
    const data = await adminArticlesService.changeStatus(Number(req.params.id), 'CHO_DUYET', req.user.id, 'Gửi duyệt bài viết');
    res.json(successResponse({ message: 'Gửi duyệt thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function approve(req, res, next) {
  try {
    const data = await adminArticlesService.changeStatus(Number(req.params.id), 'DA_DUYET', req.user.id, 'Duyệt bài viết');
    res.json(successResponse({ message: 'Duyệt bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function reject(req, res, next) {
  try {
    const data = await adminArticlesService.changeStatus(Number(req.params.id), 'TU_CHOI', req.user.id, 'Từ chối bài viết', req.body.rejectionReason || null);
    res.json(successResponse({ message: 'Từ chối bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function publish(req, res, next) {
  try {
    const data = await adminArticlesService.changeStatus(Number(req.params.id), 'DA_XUAT_BAN', req.user.id, 'Xuất bản bài viết');
    res.json(successResponse({ message: 'Xuất bản bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getTranslations(req, res, next) {
  try {
    const data = await adminArticlesService.getTranslations(Number(req.params.id));
    res.json(successResponse({ message: 'Lấy danh sách bản dịch thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function upsertTranslation(req, res, next) {
  try {
    const data = await adminArticlesService.upsertTranslation(Number(req.params.id), {
      language: req.params.lang,
      title: req.body.title,
      summary: req.body.summary,
      introduction: req.body.introduction,
      origin: req.body.origin,
      culturalMeaning: req.body.culturalMeaning,
      usageContext: req.body.usageContext,
      content: req.body.content,
      cultureShockNote: req.body.cultureShockNote,
      seoTitle: req.body.seoTitle,
      seoDescription: req.body.seoDescription,
      readingMinutes: req.body.readingMinutes ? Number(req.body.readingMinutes) : null,
      isMachineTranslated: Boolean(req.body.isMachineTranslated),
      status: req.body.status || 'NHAP'
    });

    res.json(successResponse({ message: 'Lưu bản dịch thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceCategories(req, res, next) {
  try {
    const data = await adminArticlesService.replaceCategories(Number(req.params.id), req.body.categories);
    res.json(successResponse({ message: 'Cập nhật danh mục bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceRegions(req, res, next) {
  try {
    const data = await adminArticlesService.replaceRegions(Number(req.params.id), req.body.regions);
    res.json(successResponse({ message: 'Cập nhật vùng văn hoá bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceEthnicGroups(req, res, next) {
  try {
    const data = await adminArticlesService.replaceEthnicGroups(Number(req.params.id), req.body.ethnicGroups);
    res.json(successResponse({ message: 'Cập nhật dân tộc bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function createReference(req, res, next) {
  try {
    const data = await adminArticlesService.createReference(Number(req.params.id), req.body);
    res.status(201).json(successResponse({ message: 'Tạo và gắn nguồn tham khảo thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function attachReference(req, res, next) {
  try {
    const data = await adminArticlesService.attachReference(Number(req.params.id), req.body);
    res.json(successResponse({ message: 'Gắn nguồn tham khảo vào bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceTags(req, res, next) {
  try {
    const data = await adminArticlesService.replaceTags(Number(req.params.id), req.body.tagIds);
    res.json(successResponse({ message: 'Cập nhật tag bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceKeywords(req, res, next) {
  try {
    const data = await adminArticlesService.replaceKeywords(Number(req.params.id), req.body.keywordIds);
    res.json(successResponse({ message: 'Cập nhật từ khoá bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceRelatedArticles(req, res, next) {
  try {
    const data = await adminArticlesService.replaceRelatedArticles(Number(req.params.id), req.body.relatedArticles);
    res.json(successResponse({ message: 'Cập nhật bài viết liên quan thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function replaceMedia(req, res, next) {
  try {
    const data = await adminArticlesService.replaceMedia(Number(req.params.id), req.body.mediaItems);
    res.json(successResponse({ message: 'Cập nhật media bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAdminArticles,
  getAdminArticleById,
  createAdminArticle,
  updateAdminArticle,
  submitReview,
  approve,
  reject,
  publish,
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
  replaceMedia
};
