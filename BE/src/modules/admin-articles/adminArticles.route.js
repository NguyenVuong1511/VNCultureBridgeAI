const express = require('express');
const controller = require('./adminArticles.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);

router.get('/', authorize(['article.read']), controller.getAdminArticles);
router.get('/:id', authorize(['article.read']), controller.getAdminArticleById);
router.get('/:id/status-history', authorize(['article.read']), controller.getStatusHistory);
router.get('/:id/versions', authorize(['article.read']), controller.getVersions);
router.get('/:id/versions/:versionId', authorize(['article.read']), controller.getVersionById);
router.post('/', authorize(['article.create']), controller.createAdminArticle);
router.put('/:id', authorize(['article.update']), controller.updateAdminArticle);
router.get('/:id/translations', authorize(['article.read']), controller.getTranslations);
router.put('/:id/translations/:lang', authorize(['article.update']), controller.upsertTranslation);
router.put('/:id/categories', authorize(['article.update']), controller.replaceCategories);
router.put('/:id/regions', authorize(['article.update']), controller.replaceRegions);
router.put('/:id/ethnic-groups', authorize(['article.update']), controller.replaceEthnicGroups);
router.put('/:id/tags', authorize(['article.update']), controller.replaceTags);
router.put('/:id/keywords', authorize(['article.update']), controller.replaceKeywords);
router.put('/:id/related-articles', authorize(['article.update']), controller.replaceRelatedArticles);
router.put('/:id/media', authorize(['article.update']), controller.replaceMedia);
router.post('/:id/references', authorize(['article.update']), controller.createReference);
router.post('/:id/references/attach', authorize(['article.update']), controller.attachReference);
router.post('/:id/submit-review', authorize(['article.submit_review']), controller.submitReview);
router.post('/:id/approve', authorize(['article.approve']), controller.approve);
router.post('/:id/reject', authorize(['article.approve']), controller.reject);
router.post('/:id/publish', authorize(['article.publish']), controller.publish);
router.post('/:id/hide', authorize(['article.publish']), controller.hide);
router.post('/:id/archive', authorize(['article.publish']), controller.archive);

module.exports = router;
