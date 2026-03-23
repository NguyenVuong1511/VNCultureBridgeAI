const express = require('express');
const controller = require('./articles.controller');

const router = express.Router();

router.get('/', controller.getArticles);
router.get('/slug/:slug', controller.getArticleBySlug);
router.get('/:id/related', controller.getRelatedArticles);
router.get('/:id', controller.getArticleById);

module.exports = router;
