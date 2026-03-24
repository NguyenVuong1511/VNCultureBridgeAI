const express = require('express');
const controller = require('./adminDashboard.controller');
const { authenticate, authorize } = require('../../middlewares/authMiddleware');

const router = express.Router();
router.use(authenticate);

router.get('/summary', authorize(['dashboard.view']), controller.getSummary);
router.get('/activity', authorize(['dashboard.view']), controller.getActivity);
router.get('/content', authorize(['dashboard.view']), controller.getContentStats);
router.get('/ai', authorize(['dashboard.view']), controller.getAiStats);

module.exports = router;
