const categoriesService = require('./categories.service');
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

async function getCategories(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await categoriesService.getCategories(language);
    res.json(successResponse({ message: 'Lấy danh mục thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getCategoryTree(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await categoriesService.getCategoryTree(language);
    res.json(successResponse({ message: 'Lấy cây danh mục thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getCategoryById(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const id = getNumericId(req.params.id, 'Danh mục');
    const data = await categoriesService.getCategoryById(id, language);
    res.json(successResponse({ message: 'Lấy chi tiết danh mục thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getCategoryArticles(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const { page, pageSize, offset } = getPagination(req);
    const id = getNumericId(req.params.id, 'Danh mục');
    const result = await categoriesService.getCategoryArticles({ id, language, page, pageSize, offset });

    res.json(successResponse({
      message: 'Lấy bài viết theo danh mục thành công',
      data: {
        category: result.category,
        items: result.items
      },
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  getCategoryTree,
  getCategoryById,
  getCategoryArticles
};
