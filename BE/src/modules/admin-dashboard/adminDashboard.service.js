const repository = require('./adminDashboard.repository');

async function getSummary(filters) {
  return repository.getSummary(filters || {});
}

async function getActivity(filters) {
  return repository.getActivity(filters || {});
}

async function getContentStats(filters) {
  return repository.getContentStats(filters || {});
}

async function getAiStats(filters) {
  return repository.getAiStats(filters || {});
}

module.exports = {
  getSummary,
  getActivity,
  getContentStats,
  getAiStats
};