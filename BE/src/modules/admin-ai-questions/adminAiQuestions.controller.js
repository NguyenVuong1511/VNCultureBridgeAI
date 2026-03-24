const service = require('./adminAiQuestions.service');
const { successResponse } = require('../../utils/apiResponse');
const { getRequiredPositiveInt, getPagination } = require('../../utils/request');

async function listQuestions(req, res, next) {
  try {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listQuestions({
      status: req.query.status || null,
      reason: req.query.reason || null,
      page,
      pageSize,
      offset
    });
    res.json(successResponse({
      message: 'Lấy danh sách câu hỏi cần bổ sung thành công',
      data: result.items,
      meta: result.meta
    }));
  } catch (error) {
    next(error);
  }
}

async function getQuestionSummary(req, res, next) {
  try {
    const data = await service.getQuestionSummary();
    res.json(successResponse({ message: 'Lấy tổng quan câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listQuestionReasons(req, res, next) {
  try {
    const data = await service.listQuestionReasons();
    res.json(successResponse({ message: 'Lấy danh sách lý do câu hỏi thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function listQuestionStatuses(req, res, next) {
  try {
    const data = await service.listQuestionStatuses();
    res.json(successResponse({ message: 'Lấy danh sách trạng thái câu hỏi thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function getQuestionById(req, res, next) {
  try {
    const data = await service.getQuestionById(getRequiredPositiveInt(req.params.id, 'id'));
    res.json(successResponse({ message: 'Lấy chi tiết câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function createQuestion(req, res, next) {
  try {
    const data = await service.createQuestion(req.body || {});
    res.status(201).json(successResponse({ message: 'Tạo câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateQuestion(req, res, next) {
  try {
    const data = await service.updateQuestion(getRequiredPositiveInt(req.params.id, 'id'), req.body || {});
    res.json(successResponse({ message: 'Cập nhật câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateQuestionSuggestion(req, res, next) {
  try {
    const data = await service.updateQuestionSuggestion(getRequiredPositiveInt(req.params.id, 'id'), req.body.suggestedHandling);
    res.json(successResponse({ message: 'Cập nhật gợi ý xử lý câu hỏi thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function updateQuestionStatus(req, res, next) {
  try {
    const data = await service.updateQuestionStatus(getRequiredPositiveInt(req.params.id, 'id'), req.body.status);
    res.json(successResponse({ message: 'Cập nhật trạng thái câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

async function deleteQuestion(req, res, next) {
  try {
    const data = await service.deleteQuestion(getRequiredPositiveInt(req.params.id, 'id'));
    res.json(successResponse({ message: 'Xoá câu hỏi cần bổ sung thành công', data }));
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listQuestions,
  getQuestionSummary,
  listQuestionReasons,
  listQuestionStatuses,
  getQuestionById,
  createQuestion,
  updateQuestion,
  updateQuestionSuggestion,
  updateQuestionStatus,
  deleteQuestion
};
