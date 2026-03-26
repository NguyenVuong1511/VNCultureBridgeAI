const express = require('express');
const controller = require('./auth.controller');
const { authenticate } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', authenticate, controller.getMe);
router.post('/change-password', authenticate, controller.changePassword);

module.exports = router;
