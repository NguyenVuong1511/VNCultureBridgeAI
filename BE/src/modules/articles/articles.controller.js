const articlesService = require('./articles.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination, getRequestLanguage } = require('../../utils/request');

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
      keyword
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
    const data = await articlesService.getArticleById(Number(req.params.id), language);
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
    const data = await articlesService.getRelatedArticles(Number(req.params.id), language);
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
