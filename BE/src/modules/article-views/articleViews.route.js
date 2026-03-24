const express = require('express');
const controller = require('./articleViews.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', controller.createArticleView);
router.get('/sources', authenticate, authorize(['dashboard.view']), controller.listAccessSources);
router.get('/top-articles', authenticate, authorize(['dashboard.view']), controller.getTopViewedArticles);
router.get('/articles/:articleId/summary', authenticate, authorize(['dashboard.view']), controller.getArticleViewSummary);
router.get('/:id', authenticate, authorize(['dashboard.view']), controller.getArticleViewById);
router.get('/', authenticate, authorize(['dashboard.view']), controller.listArticleViews);

module.exports = router;
