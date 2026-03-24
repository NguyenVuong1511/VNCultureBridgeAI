const express = require('express');
const controller = require('./categories.controller');

const router = express.Router();

router.get('/', controller.getCategories);
router.get('/tree', controller.getCategoryTree);
router.get('/:id/articles', controller.getCategoryArticles);
router.get('/:id', controller.getCategoryById);

module.exports = router;
