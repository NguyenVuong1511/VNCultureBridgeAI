const regionsService = require('./regions.service');
const { successResponse } = require('../../utils/apiResponse');
const { AppError } = require('../../utils/appError');
const { getPagination, getRequestLanguage } = require('../../utils/request');

function getNumericId(value, fieldName) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError(`${fieldName} không hợp lệ`, 400);
  }

  return id;
}

async function getRegions(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await regionsService.getRegions(language);
    res.json(successResponse({ message: 'Lấy danh sách vùng thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getRegionById(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const id = getNumericId(req.params.id, 'Vùng văn hoá');
    const data = await regionsService.getRegionById(id, language);
    res.json(successResponse({ message: 'Lấy chi tiết vùng thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getRegionArticles(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const { page, pageSize, offset } = getPagination(req);
    const id = getNumericId(req.params.id, 'Vùng văn hoá');
    const result = await regionsService.getRegionArticles({ id, language, page, pageSize, offset });

    res.json(successResponse({
      message: 'Lấy bài viết theo vùng thành công',
      data: {
        region: result.region,
        items: result.items
      },
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRegions,
  getRegionById,
  getRegionArticles
};
