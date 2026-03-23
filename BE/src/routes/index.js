const express = require('express');
const languagesRoutes = require('../modules/languages/languages.route');
const categoriesRoutes = require('../modules/categories/categories.route');
const regionsRoutes = require('../modules/regions/regions.route');
const ethnicGroupsRoutes = require('../modules/ethnic-groups/ethnicGroups.route');
const articlesRoutes = require('../modules/articles/articles.route');
const searchRoutes = require('../modules/search/search.route');
const feedbackRoutes = require('../modules/feedback/feedback.route');
const authRoutes = require('../modules/auth/auth.route');
const adminArticlesRoutes = require('../modules/admin-articles/adminArticles.route');

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend is healthy',
    data: {
      service: 'VNCultureBridgeAI Backend'
    }
  });
});

router.use('/languages', languagesRoutes);
router.use('/categories', categoriesRoutes);
router.use('/regions', regionsRoutes);
router.use('/ethnic-groups', ethnicGroupsRoutes);
router.use('/articles', articlesRoutes);
router.use('/search', searchRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/admin/auth', authRoutes);
router.use('/admin/articles', adminArticlesRoutes);

module.exports = router;
