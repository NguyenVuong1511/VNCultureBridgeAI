const express = require('express');
const controller = require('./feedback.controller');

const router = express.Router();

router.post('/', controller.createFeedback);
router.get('/', controller.getPublicFeedbacks);

module.exports = router;
