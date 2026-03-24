const service = require('./articleViews.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination, getRequestLanguage, getRequestSessionId, getRequiredPositiveInt } = require('../../utils/request');

async function createArticleView(req, res, next) {
  try {
    const data = await service.createArticleView({
      sessionId: getRequestSessionId(req),
      articleId: getRequiredPositiveInt(req.body.articleId, 'articleId'),
      language: req.body.language || getRequestLanguage(req),
      durationSeconds: req.body.durationSeconds ? Number(req.body.durationSeconds) : null,
      accessSource: req.body.accessSource || 'TRUC_TIEP'
    });

    res.status(201).json(successResponse({ message: 'Ghi nhận lượt xem bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getArticleViewSummary(req, res, next) {
  try {
    const data = await service.getArticleViewSummary(getRequiredPositiveInt(req.params.articleId, 'articleId'));
    res.json(successResponse({ message: 'Lấy tổng hợp lượt xem bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listArticleViews(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listArticleViews({
      articleId: req.query.articleId ? getRequiredPositiveInt(req.query.articleId, 'articleId') : null,
      sessionId: req.query.sessionId || null,
      accessSource: req.query.accessSource || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({ message: 'Lấy danh sách lượt xem bài viết thành công', data: result.items, meta: result.meta }));
  } catch (error) {
    next(error);
  }
}

async function getArticleViewById(req, res, next) {
  try {
    const data = await service.getArticleViewById(getRequiredPositiveInt(req.params.id, 'id'));
    res.json(successResponse({ message: 'Lấy chi tiết lượt xem bài viết thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getTopViewedArticles(req, res, next) {
  try {
    const data = await service.getTopViewedArticles();
    res.json(successResponse({ message: 'Lấy danh sách bài viết xem nhiều thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listAccessSources(req, res, next) {
  try {
    const data = await service.listAccessSources();
    res.json(successResponse({ message: 'Lấy danh sách nguồn truy cập thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createArticleView,
  getArticleViewSummary,
  listArticleViews,
  getArticleViewById,
  getTopViewedArticles,
  listAccessSources
};
