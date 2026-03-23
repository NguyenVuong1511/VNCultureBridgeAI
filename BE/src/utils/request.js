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

module.exports = {
  getRequestLanguage,
  getPagination
};
