const feedbackService = require('./feedback.service');
const { successResponse } = require('../../utils/apiResponse');

async function createFeedback(req, res, next) {
  try {
    const data = await feedbackService.createFeedback({
      sessionId: req.headers['x-session-id'] || null,
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

module.exports = {
  createFeedback
};
