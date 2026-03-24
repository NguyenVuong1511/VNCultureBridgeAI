const repository = require('./sessions.repository');
const { AppError } = require('../../utils/appError');

async function createSession(payload) {
  return repository.createSession(payload || {});
}

async function getSessionById(id) {
  const session = await repository.getSessionById(id);
  if (!session) {
    throw new AppError('Không tìm thấy session', 404);
  }
  return session;
}

async function endSession(id) {
  await getSessionById(id);
  await repository.endSession(id);
  return getSessionById(id);
}

async function listSessions({ countryCode, deviceType, preferredLanguage, page, pageSize, offset }) {
  const [items, total] = await Promise.all([
    repository.listSessions({ countryCode, deviceType, preferredLanguage, offset, pageSize }),
    repository.countSessions({ countryCode, deviceType, preferredLanguage })
  ]);

  return {
    items,
    meta: { page, pageSize, total }
  };
}

async function getSessionStats() {
  return repository.getSessionStats();
}

module.exports = {
  createSession,
  getSessionById,
  endSession,
  listSessions,
  getSessionStats
};
