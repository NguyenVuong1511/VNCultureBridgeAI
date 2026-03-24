const { AppError } = require('./appError');

function getRequestLanguage(req) {
  const lang = req.query.lang || req.headers['accept-language'];

  if (!lang) {
    return 'vi';
  }

  if (String(lang).toLowerCase().startsWith('en')) {
    return 'en';
  }

  return 'vi';
}

function getPagination(req) {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const pageSize = Math.min(Math.max(Number(req.query.pageSize) || 10, 1), 100);
  const offset = (page - 1) * pageSize;

  return { page, pageSize, offset };
}

function getRequestSessionId(req) {
  return req.headers['x-session-id'] || req.body?.sessionId || req.query?.sessionId || null;
}

function getRequiredPositiveInt(value, fieldName) {
  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new AppError(`${fieldName} không hợp lệ`, 400);
  }

  return parsed;
}

module.exports = {
  getRequestLanguage,
  getPagination,
  getRequestSessionId,
  getRequiredPositiveInt
};
