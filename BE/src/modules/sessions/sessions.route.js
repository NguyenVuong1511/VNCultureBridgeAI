const express = require('express');
const controller = require('./sessions.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();

router.post('/', controller.createSession);
router.get('/stats/summary', authenticate, authorize(['dashboard.view']), controller.getSessionStats);
router.get('/', authenticate, authorize(['dashboard.view']), controller.listSessions);
router.get('/:id', controller.getSessionById);
router.patch('/:id/end', controller.endSession);

module.exports = router;
