const express = require('express');
const controller = require('./adminAiSync.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/summary', authorize(['ai_sync.manage']), controller.getSummary);
router.get('/runs/summary', authorize(['ai_sync.manage']), controller.getRunSummary);
router.get('/runs/statuses', authorize(['ai_sync.manage']), controller.listRunStatuses);
router.get('/runs/types', authorize(['ai_sync.manage']), controller.listRunTypes);
router.get('/runs', authorize(['ai_sync.manage']), controller.listRuns);
router.get('/runs/:id', authorize(['ai_sync.manage']), controller.getRunById);
router.get('/runs/:id/details', authorize(['ai_sync.manage']), controller.listRunDetails);
router.get('/runs/:id/details/:detailId', authorize(['ai_sync.manage']), controller.getRunDetailById);
router.post('/runs', authorize(['ai_sync.manage']), controller.createRun);
router.patch('/runs/:id/status', authorize(['ai_sync.manage']), controller.updateRunStatus);
router.post('/runs/:id/cancel', authorize(['ai_sync.manage']), controller.cancelRun);
router.post('/runs/:id/retry', authorize(['ai_sync.manage']), controller.retryRun);
router.patch('/runs/:id/details/:detailId/status', authorize(['ai_sync.manage']), controller.updateRunDetailStatus);
router.get('/articles/pending/summary', authorize(['ai_sync.manage']), controller.getPendingSummary);
router.get('/articles/pending/statuses', authorize(['ai_sync.manage']), controller.listPendingStatuses);
router.get('/articles/pending', authorize(['ai_sync.manage']), controller.listArticlesPendingSync);
router.post('/articles/pending/requeue', authorize(['ai_sync.manage']), controller.bulkRequeueArticles);
router.post('/articles/:articleId/requeue', authorize(['ai_sync.manage']), controller.requeueArticle);

module.exports = router;