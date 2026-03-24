const express = require('express');
const controller = require('./adminReference.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/', authorize(['reference.manage']), controller.listReferences);
router.get('/:id', authorize(['reference.manage']), controller.getReferenceById);
router.post('/', authorize(['reference.manage']), controller.createReference);
router.put('/:id', authorize(['reference.manage']), controller.updateReference);
router.delete('/:id', authorize(['reference.manage']), controller.deleteReference);

module.exports = router;
