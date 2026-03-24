const articlesService = require('./articles.service');
const { successResponse } = require('../../utils/apiResponse');
const { AppError } = require('../../utils/appError');
const { getPagination, getRequestLanguage } = require('../../utils/request');

function getOptionalNumber(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${fieldName} không hợp lệ`, 400);
  }

  return parsed;
}

function getRequiredId(value) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError('ID bài viết không hợp lệ', 400);
  }

  return parsed;
}

function getOptionalBoolean(value, fieldName) {
  if (value === undefined || value === null || value === '') {
    return null;
  }

  if (value === true || value === 'true' || value === '1' || value === 1) {
    return true;
  }

  if (value === false || value === 'false' || value === '0' || value === 0) {
    return false;
  }

  throw new AppError(`${fieldName} không hợp lệ`, 400);
}

async function getArticles(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const { page, pageSize, offset } = getPagination(req);
    const keyword = String(req.query.q || '').trim();

    const result = await articlesService.getArticles({
      language,
      page,
      pageSize,
      offset,
      keyword,
      categoryId: getOptionalNumber(req.query.categoryId, 'categoryId'),
      regionId: getOptionalNumber(req.query.regionId, 'regionId'),
      ethnicId: getOptionalNumber(req.query.ethnicId, 'ethnicId'),
      featured: getOptionalBoolean(req.query.featured, 'featured'),
      type: req.query.type ? String(req.query.type).trim() : ''
    });

    res.json(successResponse({
      message: 'Lấy danh sách bài viết thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

async function getArticleById(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await articlesService.getArticleById(getRequiredId(req.params.id), language);
    res.json(successResponse({ message: 'Lấy chi tiết bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getArticleBySlug(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await articlesService.getArticleBySlug(req.params.slug, language);
    res.json(successResponse({ message: 'Lấy bài viết theo slug thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getRelatedArticles(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await articlesService.getRelatedArticles(getRequiredId(req.params.id), language);
    res.json(successResponse({ message: 'Lấy bài viết liên quan thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getRelatedArticles
};
