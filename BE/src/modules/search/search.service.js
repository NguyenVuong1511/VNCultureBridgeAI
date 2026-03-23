const searchRepository = require('./search.repository');
const { AppError } = require('../../utils/appError');

async function search({ keyword, language, page, pageSize, offset, categoryId, regionId, ethnicId, sessionId }) {
  if (!keyword) {
    throw new AppError('Từ khoá tìm kiếm là bắt buộc', 400);
  }

  const items = await searchRepository.searchArticles({
    keyword,
    language,
    offset,
    pageSize,
    categoryId,
    regionId,
    ethnicId
  });

  const total = await searchRepository.countSearchArticles({
    keyword,
    language,
    categoryId,
    regionId,
    ethnicId
  });

  await searchRepository.logSearch({
    sessionId,
    keyword,
    language,
    searchType: 'TU_KHOA',
    resultCount: total,
    hasRelevantResult: total > 0
  });

  return {
    items,
    meta: {
      page,
      pageSize,
      total
    }
  };
}

module.exports = {
  search
};
