const searchService = require('./search.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination, getRequestLanguage } = require('../../utils/request');

async function search(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const { page, pageSize, offset } = getPagination(req);
    const keyword = String(req.query.q || '').trim();

    const result = await searchService.search({
      keyword,
      language,
      page,
      pageSize,
      offset,
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : null,
      regionId: req.query.regionId ? Number(req.query.regionId) : null,
      ethnicId: req.query.ethnicId ? Number(req.query.ethnicId) : null,
      sessionId: req.headers['x-session-id'] || null
    });

    res.json(successResponse({
      message: 'Tìm kiếm thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  search
};
