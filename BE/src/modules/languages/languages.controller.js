const languagesService = require('./languages.service');
const { successResponse } = require('../../utils/apiResponse');

async function getLanguages(req, res, next) {
  try {
    const data = await languagesService.getLanguages();
    res.json(successResponse({ message: 'Lấy danh sách ngôn ngữ thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getLanguages
};
