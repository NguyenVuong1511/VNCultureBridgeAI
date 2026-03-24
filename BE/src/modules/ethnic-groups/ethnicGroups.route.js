const express = require('express');
const controller = require('./ethnicGroups.controller');

const router = express.Router();

router.get('/', controller.getEthnicGroups);
router.get('/:id/articles', controller.getEthnicGroupArticles);
router.get('/:id', controller.getEthnicGroupById);

module.exports = router;
