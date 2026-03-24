const express = require('express');
const controller = require('./adminMedia.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/', authorize(['media.manage']), controller.listMedia);
router.get('/stats', authorize(['media.manage']), controller.getMediaStats);
router.get('/statuses', authorize(['media.manage']), controller.listMediaStatuses);
router.get('/types', authorize(['media.manage']), controller.listMediaTypes);
router.get('/:id', authorize(['media.manage']), controller.getMediaById);
router.get('/:id/usage', authorize(['media.manage']), controller.getMediaUsage);
router.post('/', authorize(['media.manage']), controller.createMedia);
router.put('/:id', authorize(['media.manage']), controller.updateMedia);
router.patch('/:id/status', authorize(['media.manage']), controller.updateMediaStatus);
router.delete('/:id', authorize(['media.manage']), controller.deleteMedia);
router.get('/:id/translations', authorize(['media.manage']), controller.listTranslations);
router.put('/:id/translations/:lang', authorize(['media.manage']), controller.upsertTranslation);
router.delete('/:id/translations/:lang', authorize(['media.manage']), controller.deleteMediaTranslation);

module.exports = router;