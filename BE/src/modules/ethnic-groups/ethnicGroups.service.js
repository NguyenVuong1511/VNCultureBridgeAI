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

module.exports = {
  getEthnicGroups,
  getEthnicGroupById
};
