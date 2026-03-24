const repository = require('./adminReference.repository');
const { AppError } = require('../../utils/appError');

const VALID_TYPES = ['SACH','BAI_BAO','TAP_CHI','WEBSITE','PHONG_VAN','LUU_TRU','VIDEO','TAI_LIEU_NHA_NUOC','KHAC'];

function validate(payload) {
  if (!payload.type || !VALID_TYPES.includes(payload.type)) throw new AppError('type không hợp lệ', 400);
  if (!payload.title) throw new AppError('title là bắt buộc', 400);
  const trustLevel = Number(payload.trustLevel || 3);
  if (trustLevel < 1 || trustLevel > 5) throw new AppError('trustLevel phải từ 1 đến 5', 400);
  return { ...payload, trustLevel };
}

async function getById(id) {
  const item = await repository.getReferenceById(id);
  if (!item) throw new AppError('Không tìm thấy nguồn tham khảo', 404);
  return item;
}

module.exports = {
  listReferences: () => repository.listReferences(),
  getReferenceById: getById,
  createReference: async (payload) => { const created = await repository.createReference(validate(payload)); return getById(created.id); },
  updateReference: async (id, payload) => { await getById(id); await repository.updateReference(id, validate(payload)); return getById(id); },
  deleteReference: async (id) => { await getById(id); await repository.deleteReference(id); return { id }; }
};
