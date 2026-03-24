const ethnicGroupsRepository = require('./ethnicGroups.repository');
const { AppError } = require('../../utils/appError');

async function getEthnicGroups(language) {
  return ethnicGroupsRepository.findAll(language);
}

async function getEthnicGroupById(id, language) {
  const ethnicGroup = await ethnicGroupsRepository.findById(id, language);

  if (!ethnicGroup) {
    throw new AppError('Không tìm thấy dân tộc', 404);
  }

  return ethnicGroup;
}

async function getEthnicGroupArticles({ id, language, page, pageSize, offset }) {
  const ethnicGroup = await ethnicGroupsRepository.findById(id, language);

  if (!ethnicGroup) {
    throw new AppError('Không tìm thấy dân tộc', 404);
  }

  const items = await ethnicGroupsRepository.findArticles({
    ethnicGroupId: id,
    language,
    offset,
    pageSize
  });
  const total = await ethnicGroupsRepository.countArticles(id, language);

  return {
    ethnicGroup,
    items,
    meta: {
      page,
      pageSize,
      total
    }
  };
}

module.exports = {
  getEthnicGroups,
  getEthnicGroupById,
  getEthnicGroupArticles
};
