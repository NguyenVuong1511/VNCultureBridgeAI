const express = require('express');
const controller = require('./adminFeedback.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/', authorize(['feedback.handle']), controller.listFeedback);
router.get('/summary', authorize(['feedback.handle']), controller.getFeedbackSummary);
router.get('/stats', authorize(['feedback.handle']), controller.getFeedbackStats);
router.get('/statuses', authorize(['feedback.handle']), controller.listFeedbackStatuses);
router.get('/types', authorize(['feedback.handle']), controller.listFeedbackTypes);
router.patch('/bulk-status', authorize(['feedback.handle']), controller.bulkUpdateFeedbackStatus);
router.get('/:id', authorize(['feedback.handle']), controller.getFeedbackById);
router.patch('/:id/status', authorize(['feedback.handle']), controller.updateFeedbackStatus);
router.delete('/:id', authorize(['feedback.handle']), controller.deleteFeedback);

module.exports = router;