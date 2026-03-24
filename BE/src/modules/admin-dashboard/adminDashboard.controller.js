const service = require('./adminDashboard.service');
const { successResponse } = require('../../utils/apiResponse');

function getDashboardFilters(req) {
  return {
    startDate: req.query.startDate || null,
    endDate: req.query.endDate || null,
    limit: req.query.limit ? Number(req.query.limit) : undefined
  };
}

async function getSummary(req, res, next) {
  try {
    const data = await service.getSummary(getDashboardFilters(req));
    res.json(successResponse({ message: 'Lấy tổng quan dashboard thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getActivity(req, res, next) {
  try {
    const data = await service.getActivity(getDashboardFilters(req));
    res.json(successResponse({ message: 'Lấy hoạt động dashboard thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getContentStats(req, res, next) {
  try {
    const data = await service.getContentStats(getDashboardFilters(req));
    res.json(successResponse({ message: 'Lấy thống kê nội dung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getAiStats(req, res, next) {
  try {
    const data = await service.getAiStats(getDashboardFilters(req));
    res.json(successResponse({ message: 'Lấy thống kê AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary,
  getActivity,
  getContentStats,
  getAiStats
};