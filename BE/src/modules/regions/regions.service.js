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

async function getRegionArticles({ id, language, page, pageSize, offset }) {
  const region = await regionsRepository.findById(id, language);

  if (!region) {
    throw new AppError('Không tìm thấy vùng văn hoá', 404);
  }

  const items = await regionsRepository.findArticles({
    regionId: id,
    language,
    offset,
    pageSize
  });
  const total = await regionsRepository.countArticles(id, language);

  return {
    region,
    items,
    meta: {
      page,
      pageSize,
      total
    }
  };
}

module.exports = {
  getRegions,
  getRegionById,
  getRegionArticles
};
