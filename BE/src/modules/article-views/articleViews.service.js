const repository = require('./articleViews.repository');
const { AppError } = require('../../utils/appError');
const sessionsRepository = require('../sessions/sessions.repository');
const articlesRepository = require('../articles/articles.repository');

const VALID_SOURCES = ['TRUC_TIEP', 'TIM_KIEM', 'BAN_DO', 'GOI_Y', 'AI'];

async function createArticleView(payload) {
  if (!VALID_SOURCES.includes(payload.accessSource)) {
    throw new AppError('Nguồn truy cập không hợp lệ', 400);
  }

  if (payload.sessionId) {
    const session = await sessionsRepository.getSessionById(payload.sessionId);
    if (!session) {
      throw new AppError('Session không tồn tại', 404);
    }
  }

  const article = await articlesRepository.findById(payload.articleId, payload.language || 'vi');
  if (!article) {
    throw new AppError('Không tìm thấy bài viết công khai', 404);
  }

  return repository.createArticleView(payload);
}

async function getArticleViewSummary(articleId) {
  return repository.getArticleViewSummary(articleId);
}

async function listArticleViews({ articleId, sessionId, accessSource, page, pageSize, offset }) {
  const [items, total] = await Promise.all([
    repository.listArticleViews({ articleId, sessionId, accessSource, offset, pageSize }),
    repository.countArticleViews({ articleId, sessionId, accessSource })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getArticleViewById(id) {
  const view = await repository.getArticleViewById(id);
  if (!view) {
    throw new AppError('Không tìm thấy lượt xem bài viết', 404);
  }
  return view;
}

async function getTopViewedArticles() {
  return repository.getTopViewedArticles();
}

async function listAccessSources() {
  return repository.listAccessSources();
}

module.exports = {
  createArticleView,
  getArticleViewSummary,
  listArticleViews,
  getArticleViewById,
  getTopViewedArticles,
  listAccessSources
};
