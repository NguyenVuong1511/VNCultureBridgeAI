const feedbackService = require('./feedback.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequestSessionId } = require('../../utils/request');

async function createFeedback(req, res, next) {
  try {
    const data = await feedbackService.createFeedback({
      sessionId: getRequestSessionId(req),
      type: req.body.type,
      articleId: req.body.articleId ? Number(req.body.articleId) : null,
      messageId: req.body.messageId ? Number(req.body.messageId) : null,
      rating: req.body.rating ? Number(req.body.rating) : null,
      isHelpful: req.body.isHelpful,
      content: req.body.content
    });

    res.status(201).json(successResponse({
      message: 'Gửi phản hồi thành công',
      data
    }));
  } catch (error) {
    next(error);
  }
}

async function getPublicFeedbacks(req, res, next) {
  try {
    const data = await feedbackService.getPublicFeedbacks({
      type: req.query.type
    });

    res.json(successResponse({
      message: 'Lấy danh sách phản hồi thành công',
      data
    }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createFeedback,
  getPublicFeedbacks
};
