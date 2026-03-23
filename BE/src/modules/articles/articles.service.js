const articlesRepository = require('./articles.repository');
const { AppError } = require('../../utils/appError');

async function getArticles({ language, page, pageSize, offset, keyword }) {
  const items = await articlesRepository.findAll({ language, offset, pageSize, keyword });
  const total = await articlesRepository.countAll({ language, keyword });

  return {
    items,
    meta: {
      page,
      pageSize,
      total
    }
  };
}

async function buildArticleDetail(article, language) {
  const [categories, regions, ethnicGroups, relatedArticles, references] = await Promise.all([
    articlesRepository.findCategories(article.id, language),
    articlesRepository.findRegions(article.id, language),
    articlesRepository.findEthnicGroups(article.id, language),
    articlesRepository.findRelated(article.id, language),
    articlesRepository.findReferences(article.id)
  ]);

  return {
    ...article,
    categories,
    regions,
    ethnicGroups,
    relatedArticles,
    references
  };
}

async function getArticleById(id, language) {
  const article = await articlesRepository.findById(id, language);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return buildArticleDetail(article, language);
}

async function getArticleBySlug(slug, language) {
  const article = await articlesRepository.findBySlug(slug, language);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return buildArticleDetail(article, language);
}

async function getRelatedArticles(id, language) {
  const article = await articlesRepository.findById(id, language);

  if (!article) {
    throw new AppError('Không tìm thấy bài viết', 404);
  }

  return articlesRepository.findRelated(id, language);
}

module.exports = {
  getArticles,
  getArticleById,
  getArticleBySlug,
  getRelatedArticles
};
