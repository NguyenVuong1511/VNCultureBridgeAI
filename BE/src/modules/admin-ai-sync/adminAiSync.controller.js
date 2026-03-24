const service = require('./adminAiSync.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequiredPositiveInt, getPagination } = require('../../utils/request');

async function getSummary(req, res, next) {
  try {
    const data = await service.getSummary();
    res.json(successResponse({ message: 'Lấy tổng quan đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getRunSummary(req, res, next) {
  try {
    const data = await service.getRunSummary();
    res.json(successResponse({ message: 'Lấy tổng quan đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getPendingSummary(req, res, next) {
  try {
    const data = await service.getPendingSummary();
    res.json(successResponse({ message: 'Lấy tổng quan bài viết chờ đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listRunStatuses(req, res, next) {
  try {
    const data = await service.listRunStatuses();
    res.json(successResponse({ message: 'Lấy danh sách trạng thái đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listRunTypes(req, res, next) {
  try {
    const data = await service.listRunTypes();
    res.json(successResponse({ message: 'Lấy danh sách loại đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listPendingStatuses(req, res, next) {
  try {
    const data = await service.listPendingStatuses();
    res.json(successResponse({ message: 'Lấy danh sách trạng thái chờ đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listRuns(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listRuns({
      status: req.query.status || null,
      syncType: req.query.syncType || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({
      message: 'Lấy danh sách đợt đồng bộ AI thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

async function getRunById(req, res, next) {
  try {
    const data = await service.getRunById(getRequiredPositiveInt(req.params.id, 'id'));
    res.json(successResponse({ message: 'Lấy chi tiết đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listRunDetails(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listRunDetails(getRequiredPositiveInt(req.params.id, 'id'), {
      status: req.query.status || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({
      message: 'Lấy danh sách chi tiết đợt đồng bộ AI thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

async function getRunDetailById(req, res, next) {
  try {
    const data = await service.getRunDetailById(
      getRequiredPositiveInt(req.params.id, 'id'),
      getRequiredPositiveInt(req.params.detailId, 'detailId')
    );
    res.json(successResponse({ message: 'Lấy chi tiết bản ghi đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateRunStatus(req, res, next) {
  try {
    const data = await service.updateRunStatus(getRequiredPositiveInt(req.params.id, 'id'), req.body || {});
    res.json(successResponse({ message: 'Cập nhật trạng thái đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function cancelRun(req, res, next) {
  try {
    const data = await service.cancelRun(getRequiredPositiveInt(req.params.id, 'id'), req.body.errorMessage);
    res.json(successResponse({ message: 'Huỷ đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function retryRun(req, res, next) {
  try {
    const data = await service.retryRun(getRequiredPositiveInt(req.params.id, 'id'));
    res.json(successResponse({ message: 'Chạy lại đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateRunDetailStatus(req, res, next) {
  try {
    const data = await service.updateRunDetailStatus(
      getRequiredPositiveInt(req.params.id, 'id'),
      getRequiredPositiveInt(req.params.detailId, 'detailId'),
      req.body || {}
    );
    res.json(successResponse({ message: 'Cập nhật trạng thái chi tiết đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function createRun(req, res, next) {
  try {
    const data = await service.createRun({
      syncType: req.body.syncType,
      articleIds: req.body.articleIds
    }, req.user.id);

    res.status(201).json(successResponse({ message: 'Tạo đợt đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function requeueArticle(req, res, next) {
  try {
    const data = await service.requeueArticle(getRequiredPositiveInt(req.params.articleId, 'articleId'));
    res.json(successResponse({ message: 'Đưa bài viết vào hàng đợi đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function bulkRequeueArticles(req, res, next) {
  try {
    const data = await service.bulkRequeueArticles(req.body.articleIds);
    res.json(successResponse({ message: 'Đưa nhiều bài viết vào hàng đợi đồng bộ AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listArticlesPendingSync(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listArticlesPendingSync({
      status: req.query.status || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({
      message: 'Lấy danh sách bài viết chờ đồng bộ AI thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getSummary,
  getRunSummary,
  getPendingSummary,
  listRunStatuses,
  listRunTypes,
  listPendingStatuses,
  listRuns,
  getRunById,
  listRunDetails,
  getRunDetailById,
  updateRunStatus,
  cancelRun,
  retryRun,
  updateRunDetailStatus,
  createRun,
  requeueArticle,
  bulkRequeueArticles,
  listArticlesPendingSync
};