const express = require('express');
const controller = require('./adminAiQuestions.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/', authorize(['ai_sync.manage']), controller.listQuestions);
router.get('/summary', authorize(['ai_sync.manage']), controller.getQuestionSummary);
router.get('/reasons', authorize(['ai_sync.manage']), controller.listQuestionReasons);
router.get('/statuses', authorize(['ai_sync.manage']), controller.listQuestionStatuses);
router.get('/:id', authorize(['ai_sync.manage']), controller.getQuestionById);
router.post('/', authorize(['ai_sync.manage']), controller.createQuestion);
router.put('/:id', authorize(['ai_sync.manage']), controller.updateQuestion);
router.patch('/:id/suggestion', authorize(['ai_sync.manage']), controller.updateQuestionSuggestion);
router.patch('/:id/status', authorize(['ai_sync.manage']), controller.updateQuestionStatus);
router.delete('/:id', authorize(['ai_sync.manage']), controller.deleteQuestion);

module.exports = router;
