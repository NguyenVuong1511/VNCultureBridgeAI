const languagesRepository = require('./languages.repository');

async function getLanguages() {
  return languagesRepository.findAll();
}

module.exports = {
  getLanguages
};
