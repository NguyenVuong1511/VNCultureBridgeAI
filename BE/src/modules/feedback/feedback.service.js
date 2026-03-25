const feedbackRepository = require('./feedback.repository');
const { AppError } = require('../../utils/appError');

async function createFeedback(payload) {
  const { type, articleId, messageId, rating } = payload;

  if (!['BAI_VIET', 'TRA_LOI_AI', 'CHUNG'].includes(type)) {
    throw new AppError('Loại phản hồi không hợp lệ', 400);
  }

  if (type === 'BAI_VIET' && !articleId) {
    throw new AppError('Phản hồi bài viết phải có articleId', 422);
  }

  if (type === 'TRA_LOI_AI' && !messageId) {
    throw new AppError('Phản hồi trả lời AI phải có messageId', 422);
  }

  if (rating && (rating < 1 || rating > 5)) {
    throw new AppError('Điểm đánh giá phải từ 1 đến 5', 422);
  }

  return feedbackRepository.createFeedback(payload);
}

async function getPublicFeedbacks(query) {
  return feedbackRepository.getPublicFeedbacks({
    type: query?.type || 'CHUNG',
    status: 'DA_DUYET'
  });
}

module.exports = {
  createFeedback,
  getPublicFeedbacks
};
