const express = require('express');
const controller = require('./auth.controller');
const { authenticate } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/login', controller.login);
router.get('/me', authenticate, controller.getMe);

module.exports = router;
