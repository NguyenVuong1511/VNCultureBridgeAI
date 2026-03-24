const service = require('./aiChat.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequestLanguage, getRequestSessionId } = require('../../utils/request');

async function createChatSession(req, res, next) {
  try {
    const data = await service.createChatSession({
      sessionId: getRequestSessionId(req),
      language: req.body.language || getRequestLanguage(req),
      countryCode: req.body.countryCode || null,
      title: req.body.title || null
    });

    res.status(201).json(successResponse({ message: 'Tạo phiên chat AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getChatSessionById(req, res, next) {
  try {
    const data = await service.getChatSessionById(req.params.id);
    res.json(successResponse({ message: 'Lấy phiên chat AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listMessages(req, res, next) {
  try {
    const data = await service.listMessages(req.params.id);
    res.json(successResponse({ message: 'Lấy danh sách tin nhắn AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function createMessage(req, res, next) {
  try {
    const data = await service.createMessage(req.params.id, {
      senderType: req.body.senderType,
      language: req.body.language || getRequestLanguage(req),
      content: req.body.content,
      intentCode: req.body.intentCode || null,
      confidenceScore: req.body.confidenceScore || null,
      answeredWell: req.body.answeredWell,
      isOutOfScope: Boolean(req.body.isOutOfScope),
      isSensitive: Boolean(req.body.isSensitive),
      isGrounded: req.body.isGrounded,
      responseTimeMs: req.body.responseTimeMs ? Number(req.body.responseTimeMs) : null,
      promptTokens: req.body.promptTokens ? Number(req.body.promptTokens) : null,
      completionTokens: req.body.completionTokens ? Number(req.body.completionTokens) : null,
      citations: req.body.citations,
      missingQuestion: req.body.missingQuestion
    });

    res.status(201).json(successResponse({ message: 'Lưu tin nhắn AI thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createChatSession,
  getChatSessionById,
  listMessages,
  createMessage
};
