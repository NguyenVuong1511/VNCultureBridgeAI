const express = require('express');
const controller = require('./aiChat.controller');

const router = express.Router();

router.post('/sessions', controller.createChatSession);
router.get('/sessions/:id', controller.getChatSessionById);
router.get('/sessions/:id/messages', controller.listMessages);
router.post('/sessions/:id/messages', controller.createMessage);

module.exports = router;
