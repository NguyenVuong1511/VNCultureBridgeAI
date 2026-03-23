const express = require('express');
const controller = require('./regions.controller');

const router = express.Router();

router.get('/', controller.getRegions);
router.get('/:id', controller.getRegionById);

module.exports = router;
