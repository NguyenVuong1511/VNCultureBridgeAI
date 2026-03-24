const service = require('./adminMedia.service');
const { successResponse } = require('../../utils/apiResponse');
const { getPagination, getRequiredPositiveInt } = require('../../utils/request');

function wrap(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  listMedia: wrap(async (req, res) => {
    const { page, pageSize, offset } = getPagination(req);
    const result = await service.listMedia({
      status: req.query.status || null,
      type: req.query.type || null,
      page,
      pageSize,
      offset
    });

    res.json(successResponse({
      message: 'Lấy danh sách media thành công',
      data: result.items,
      meta: result.meta
    }));
  }),
  getMediaById: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy chi tiết media thành công',
    data: await service.getMediaById(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  getMediaUsage: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy thông tin sử dụng media thành công',
    data: await service.getMediaUsage(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  getMediaStats: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy thống kê media thành công',
    data: await service.getMediaStats()
  }))),
  listMediaStatuses: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy danh sách trạng thái media thành công',
    data: await service.listMediaStatuses()
  }))),
  listMediaTypes: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy danh sách loại media thành công',
    data: await service.listMediaTypes()
  }))),
  createMedia: wrap(async (req, res) => res.status(201).json(successResponse({
    message: 'Tạo media thành công',
    data: await service.createMedia(req.body, req.user.id)
  }))),
  updateMedia: wrap(async (req, res) => res.json(successResponse({
    message: 'Cập nhật media thành công',
    data: await service.updateMedia(getRequiredPositiveInt(req.params.id, 'id'), req.body)
  }))),
  updateMediaStatus: wrap(async (req, res) => res.json(successResponse({
    message: 'Cập nhật trạng thái media thành công',
    data: await service.updateMediaStatus(getRequiredPositiveInt(req.params.id, 'id'), req.body.status)
  }))),
  deleteMedia: wrap(async (req, res) => res.json(successResponse({
    message: 'Xoá media thành công',
    data: await service.deleteMedia(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  listTranslations: wrap(async (req, res) => res.json(successResponse({
    message: 'Lấy bản dịch media thành công',
    data: await service.listTranslations(getRequiredPositiveInt(req.params.id, 'id'))
  }))),
  upsertTranslation: wrap(async (req, res) => res.json(successResponse({
    message: 'Lưu bản dịch media thành công',
    data: await service.upsertTranslation(getRequiredPositiveInt(req.params.id, 'id'), req.params.lang, req.body)
  }))),
  deleteMediaTranslation: wrap(async (req, res) => res.json(successResponse({
    message: 'Xoá bản dịch media thành công',
    data: await service.deleteMediaTranslation(getRequiredPositiveInt(req.params.id, 'id'), req.params.lang)
  })))
};