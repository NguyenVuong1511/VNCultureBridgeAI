const express = require('express');
const controller = require('./feedback.controller');

const router = express.Router();

router.post('/', controller.createFeedback);

module.exports = router;
