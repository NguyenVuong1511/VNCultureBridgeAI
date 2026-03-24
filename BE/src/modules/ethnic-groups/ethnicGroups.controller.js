const ethnicGroupsService = require('./ethnicGroups.service');
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
    const id = getNumericId(req.params.id, 'Dân tộc');
    const data = await ethnicGroupsService.getEthnicGroupById(id, language);
    res.json(successResponse({ message: 'Lấy chi tiết dân tộc thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getEthnicGroupArticles(req, res, next) {
  try {
    const language = getRequestLanguage(req);
    const { page, pageSize, offset } = getPagination(req);
    const id = getNumericId(req.params.id, 'Dân tộc');
    const result = await ethnicGroupsService.getEthnicGroupArticles({ id, language, page, pageSize, offset });

    res.json(successResponse({
      message: 'Lấy bài viết theo dân tộc thành công',
      data: {
        ethnicGroup: result.ethnicGroup,
        items: result.items
      },
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getEthnicGroups,
  getEthnicGroupById,
  getEthnicGroupArticles
};
