const express = require('express');
const controller = require('./adminTaxonomy.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/categories', authorize(['taxonomy.manage']), controller.listCategories);
router.get('/categories/:id', authorize(['taxonomy.manage']), controller.getCategoryById);
router.post('/categories', authorize(['taxonomy.manage']), controller.createCategory);
router.put('/categories/:id', authorize(['taxonomy.manage']), controller.updateCategory);
router.delete('/categories/:id', authorize(['taxonomy.manage']), controller.deleteCategory);

router.get('/regions', authorize(['taxonomy.manage']), controller.listRegions);
router.get('/regions/:id', authorize(['taxonomy.manage']), controller.getRegionById);
router.post('/regions', authorize(['taxonomy.manage']), controller.createRegion);
router.put('/regions/:id', authorize(['taxonomy.manage']), controller.updateRegion);
router.delete('/regions/:id', authorize(['taxonomy.manage']), controller.deleteRegion);

router.get('/ethnic-groups', authorize(['taxonomy.manage']), controller.listEthnicGroups);
router.get('/ethnic-groups/:id', authorize(['taxonomy.manage']), controller.getEthnicGroupById);
router.post('/ethnic-groups', authorize(['taxonomy.manage']), controller.createEthnicGroup);
router.put('/ethnic-groups/:id', authorize(['taxonomy.manage']), controller.updateEthnicGroup);
router.delete('/ethnic-groups/:id', authorize(['taxonomy.manage']), controller.deleteEthnicGroup);

router.get('/tags', authorize(['taxonomy.manage']), controller.listTags);
router.get('/tags/:id', authorize(['taxonomy.manage']), controller.getTagById);
router.post('/tags', authorize(['taxonomy.manage']), controller.createTag);
router.put('/tags/:id', authorize(['taxonomy.manage']), controller.updateTag);
router.delete('/tags/:id', authorize(['taxonomy.manage']), controller.deleteTag);

router.get('/keywords', authorize(['taxonomy.manage']), controller.listKeywords);
router.get('/keywords/:id', authorize(['taxonomy.manage']), controller.getKeywordById);
router.post('/keywords', authorize(['taxonomy.manage']), controller.createKeyword);
router.put('/keywords/:id', authorize(['taxonomy.manage']), controller.updateKeyword);
router.delete('/keywords/:id', authorize(['taxonomy.manage']), controller.deleteKeyword);

module.exports = router;
