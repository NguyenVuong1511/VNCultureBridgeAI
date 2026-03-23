const categoriesService = require('./categories.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequestLanguage } = require('../../utils/request');

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

module.exports = {
  getCategories,
  getCategoryTree
};
