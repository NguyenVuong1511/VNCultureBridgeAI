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
const adminTaxonomyRoutes = require('../modules/admin-taxonomy/adminTaxonomy.route');
const adminReferenceRoutes = require('../modules/admin-reference/adminReference.route');
const adminFeedbackRoutes = require('../modules/admin-feedback/adminFeedback.route');
const adminMediaRoutes = require('../modules/admin-media/adminMedia.route');
const sessionsRoutes = require('../modules/sessions/sessions.route');
const articleViewsRoutes = require('../modules/article-views/articleViews.route');
const aiChatRoutes = require('../modules/ai-chat/aiChat.route');
const adminAiQuestionsRoutes = require('../modules/admin-ai-questions/adminAiQuestions.route');
const adminAiSyncRoutes = require('../modules/admin-ai-sync/adminAiSync.route');
const adminDashboardRoutes = require('../modules/admin-dashboard/adminDashboard.route');

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
router.use('/sessions', sessionsRoutes);
router.use('/article-views', articleViewsRoutes);
router.use('/ai-chat', aiChatRoutes);
router.use('/admin/auth', authRoutes);
router.use('/admin/articles', adminArticlesRoutes);
router.use('/admin/taxonomy', adminTaxonomyRoutes);
router.use('/admin/references', adminReferenceRoutes);
router.use('/admin/feedback', adminFeedbackRoutes);
router.use('/admin/media', adminMediaRoutes);
router.use('/admin/ai-questions', adminAiQuestionsRoutes);
router.use('/admin/ai-sync', adminAiSyncRoutes);
router.use('/admin/dashboard', adminDashboardRoutes);

module.exports = router;
