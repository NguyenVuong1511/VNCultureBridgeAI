const regionsRepository = require('./regions.repository');
const { AppError } = require('../../utils/appError');

async function getRegions(language) {
  return regionsRepository.findAll(language);
}

async function getRegionById(id, language) {
  const region = await regionsRepository.findById(id, language);

  if (!region) {
    throw new AppError('Không tìm thấy vùng văn hoá', 404);
  }

  return region;
}

module.exports = {
  getRegions,
  getRegionById
};
