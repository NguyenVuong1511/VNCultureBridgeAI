const service = require('./adminTaxonomy.service');
const { successResponse } = require('../../utils/apiResponse');

function wrap(handler) {
  return async (req, res, next) => {
    try { await handler(req, res); } catch (error) { next(error); }
  };
}

module.exports = {
  listCategories: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách danh mục thành công', data: await service.listCategories() }))),
  getCategoryById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết danh mục thành công', data: await service.getCategoryById(Number(req.params.id)) }))),
  createCategory: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo danh mục thành công', data: await service.createCategory(req.body) }))),
  updateCategory: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật danh mục thành công', data: await service.updateCategory(Number(req.params.id), req.body) }))),
  deleteCategory: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá danh mục thành công', data: await service.deleteCategory(Number(req.params.id)) }))),

  listRegions: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách vùng văn hoá thành công', data: await service.listRegions() }))),
  getRegionById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết vùng văn hoá thành công', data: await service.getRegionById(Number(req.params.id)) }))),
  createRegion: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo vùng văn hoá thành công', data: await service.createRegion(req.body) }))),
  updateRegion: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật vùng văn hoá thành công', data: await service.updateRegion(Number(req.params.id), req.body) }))),
  deleteRegion: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá vùng văn hoá thành công', data: await service.deleteRegion(Number(req.params.id)) }))),

  listEthnicGroups: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách dân tộc thành công', data: await service.listEthnicGroups() }))),
  getEthnicGroupById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết dân tộc thành công', data: await service.getEthnicGroupById(Number(req.params.id)) }))),
  createEthnicGroup: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo dân tộc thành công', data: await service.createEthnicGroup(req.body) }))),
  updateEthnicGroup: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật dân tộc thành công', data: await service.updateEthnicGroup(Number(req.params.id), req.body) }))),
  deleteEthnicGroup: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá dân tộc thành công', data: await service.deleteEthnicGroup(Number(req.params.id)) }))),

  listTags: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách tag thành công', data: await service.listTags() }))),
  getTagById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết tag thành công', data: await service.getTagById(Number(req.params.id)) }))),
  createTag: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo tag thành công', data: await service.createTag(req.body) }))),
  updateTag: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật tag thành công', data: await service.updateTag(Number(req.params.id), req.body) }))),
  deleteTag: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá tag thành công', data: await service.deleteTag(Number(req.params.id)) }))),

  listKeywords: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy danh sách từ khoá thành công', data: await service.listKeywords() }))),
  getKeywordById: wrap(async (req, res) => res.json(successResponse({ message: 'Lấy chi tiết từ khoá thành công', data: await service.getKeywordById(Number(req.params.id)) }))),
  createKeyword: wrap(async (req, res) => res.status(201).json(successResponse({ message: 'Tạo từ khoá thành công', data: await service.createKeyword(req.body) }))),
  updateKeyword: wrap(async (req, res) => res.json(successResponse({ message: 'Cập nhật từ khoá thành công', data: await service.updateKeyword(Number(req.params.id), req.body) }))),
  deleteKeyword: wrap(async (req, res) => res.json(successResponse({ message: 'Xoá từ khoá thành công', data: await service.deleteKeyword(Number(req.params.id)) })))
};
