const regionsService = require('./regions.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequestLanguage } = require('../../utils/request');

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
    const data = await regionsService.getRegionById(Number(req.params.id), language);
    res.json(successResponse({ message: 'Lấy chi tiết vùng thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRegions,
  getRegionById
};
