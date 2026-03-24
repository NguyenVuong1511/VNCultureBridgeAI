const service = require('./adminReference.service');
const { successResponse } = require('../../utils/apiResponse');

function wrap(handler) {
  return async (req, res, next) => {
    try { await handler(req, res); } catch (error) { next(error); }
  };
}

module.exports = {
  listReferences: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách nguồn tham khảo thành công', data: await service.listReferences() }))),
  getReferenceById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết nguồn tham khảo thành công', data: await service.getReferenceById(Number(req.params.id)) }))),
  createReference: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo nguồn tham khảo thành công', data: await service.createReference(req.body) }))),
  updateReference: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật nguồn tham khảo thành công', data: await service.updateReference(Number(req.params.id), req.body) }))),
  deleteReference: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá nguồn tham khảo thành công', data: await service.deleteReference(Number(req.params.id)) })))
};
