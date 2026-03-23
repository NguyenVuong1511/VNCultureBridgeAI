const ethnicGroupsService = require('./ethnicGroups.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequestLanguage } = require('../../utils/request');

async function getEthnicGroups(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await ethnicGroupsService.getEthnicGroups(language);
    res.json(successResponse({ message: 'Lấy danh sách dân tộc thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getEthnicGroupById(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const data = await ethnicGroupsService.getEthnicGroupById(Number(req.params.id), language);
    res.json(successResponse({ message: 'Lấy chi tiết dân tộc thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEthnicGroups,
  getEthnicGroupById
};
