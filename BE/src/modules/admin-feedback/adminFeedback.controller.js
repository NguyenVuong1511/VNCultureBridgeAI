const service = require('./adminFeedback.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination, getRequiredPositiveInt } = require('../../utils/request');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  listFeedback: wrap(async (req, res) => {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listFeedback({
      status: req.query.status || null,
      type: req.query.type || null,
      articleId: req.query.articleId ? Number(req.query.articleId) : null,
      messageId: req.query.messageId ? Number(req.query.messageId) : null,
      sessionId: req.query.sessionId || null,
      page,
      pageSize,
      offset
    });

    res.json(successResponse({
      message: 'Lấy danh sách phản hồi thành công',
      data: result.items,
      meta: result.meta
    }));
  }),
  getFeedbackById: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy chi tiết phản hồi thành công',
    data: await service.getFeedbackById(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  updateFeedbackStatus: wrap(async (req, res) => res.json(successResponse({
    message: 'Cập nhật trạng thái phản hồi thành công',
    data: await service.updateFeedbackStatus(getRequiredPositiveInt(req.params.id, 'id'), req.body.status, req.user.id)
  }))),
  bulkUpdateFeedbackStatus: wrap(async (req, res) => res.json(successResponse({
    message: 'Cập nhật hàng loạt trạng thái phản hồi thành công',
    data: await service.bulkUpdateFeedbackStatus(req.body.ids, req.body.status, req.user.id)
  }))),
  deleteFeedback: wrap(async (req, res) => res.json(successResponse({
    message: 'Xoá phản hồi thành công',
    data: await service.deleteFeedback(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  getFeedbackSummary: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy tổng hợp phản hồi thành công',
    data: await service.getFeedbackSummary()
  }))),
  getFeedbackStats: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy thống kê phản hồi thành công',
    data: await service.getFeedbackStats()
  }))),
  listFeedbackStatuses: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy danh sách trạng thái phản hồi thành công',
    data: await service.listFeedbackStatuses()
  }))),
  listFeedbackTypes: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy danh sách loại phản hồi thành công',
    data: await service.listFeedbackTypes()
  })))
};