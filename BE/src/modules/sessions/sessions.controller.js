const service = require('./sessions.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination } = require('../../utils/request');

async function createSession(req, res, next) {
  try {
    const data = await service.createSession({
      preferredLanguage: req.body.preferredLanguage || null,
      countryCode: req.body.countryCode || null,
      deviceType: req.body.deviceType || null,
      browserInfo: req.body.browserInfo || null,
      landingUrl: req.body.landingUrl || null,
      analyticsConsent: req.body.analyticsConsent
    });

    res.status(201).json(successResponse({ message: 'Tạo session thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getSessionById(req, res, next) {
  try {
    const data = await service.getSessionById(req.params.id);
    res.json(successResponse({ message: 'Lấy session thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function endSession(req, res, next) {
  try {
    const data = await service.endSession(req.params.id);
    res.json(successResponse({ message: 'Kết thúc session thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listSessions(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listSessions({
      countryCode: req.query.countryCode || null,
      deviceType: req.query.deviceType || null,
      preferredLanguage: req.query.preferredLanguage || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({ message: 'Lấy danh sách session thành công', data: result.items, meta: result.meta }));
  } catch (error) {
    next(error);
  }
}

async function getSessionStats(req, res, next) {
  try {
    const data = await service.getSessionStats();
    res.json(successResponse({ message: 'Lấy thống kê session thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createSession,
  getSessionById,
  endSession,
  listSessions,
  getSessionStats
};
