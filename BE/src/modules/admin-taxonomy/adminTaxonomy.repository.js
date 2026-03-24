const { query } = require('../../config/db');

async function listCategories() {
  return query(`SELECT IDDanhMuc AS id, MaDanhMuc AS code, IDDanhMucCha AS parentId, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM DANH_MUC_CHU_DE ORDER BY ThuTuSapXep, IDDanhMuc`);
}

async function getCategoryById(id) {
  const rows = await query(`SELECT TOP 1 IDDanhMuc AS id, MaDanhMuc AS code, IDDanhMucCha AS parentId, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM DANH_MUC_CHU_DE WHERE IDDanhMuc = @id`, { id });
  return rows[0] || null;
}

async function createCategory(payload) {
  const rows = await query(
    `INSERT INTO DANH_MUC_CHU_DE (MaDanhMuc, IDDanhMucCha, ThuTuSapXep, HoatDong)
     OUTPUT INSERTED.IDDanhMuc AS id
     VALUES (@code, @parentId, @sortOrder, @isActive)`,
    { code: payload.code, parentId: payload.parentId || null, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
  return rows[0] || null;
}

async function updateCategory(id, payload) {
  await query(
    `UPDATE DANH_MUC_CHU_DE
     SET MaDanhMuc = @code, IDDanhMucCha = @parentId, ThuTuSapXep = @sortOrder, HoatDong = @isActive
     WHERE IDDanhMuc = @id`,
    { id, code: payload.code, parentId: payload.parentId || null, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
}

async function deleteCategory(id) {
  await query('DELETE FROM DANH_MUC_CHU_DE WHERE IDDanhMuc = @id', { id });
}

async function listRegions() {
  return query(`SELECT IDVung AS id, MaVung AS code, IDVungCha AS parentId, LoaiVung AS type, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM VUNG_VAN_HOA ORDER BY ThuTuSapXep, IDVung`);
}

async function getRegionById(id) {
  const rows = await query(`SELECT TOP 1 IDVung AS id, MaVung AS code, IDVungCha AS parentId, LoaiVung AS type, DuLieuBanDoGeoJson AS geoJson, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM VUNG_VAN_HOA WHERE IDVung = @id`, { id });
  return rows[0] || null;
}

async function createRegion(payload) {
  const rows = await query(
    `INSERT INTO VUNG_VAN_HOA (MaVung, IDVungCha, LoaiVung, DuLieuBanDoGeoJson, ThuTuSapXep, HoatDong)
     OUTPUT INSERTED.IDVung AS id
     VALUES (@code, @parentId, @type, @geoJson, @sortOrder, @isActive)`,
    { code: payload.code, parentId: payload.parentId || null, type: payload.type, geoJson: payload.geoJson || null, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
  return rows[0] || null;
}

async function updateRegion(id, payload) {
  await query(
    `UPDATE VUNG_VAN_HOA
     SET MaVung = @code, IDVungCha = @parentId, LoaiVung = @type, DuLieuBanDoGeoJson = @geoJson, ThuTuSapXep = @sortOrder, HoatDong = @isActive
     WHERE IDVung = @id`,
    { id, code: payload.code, parentId: payload.parentId || null, type: payload.type, geoJson: payload.geoJson || null, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
}

async function deleteRegion(id) {
  await query('DELETE FROM VUNG_VAN_HOA WHERE IDVung = @id', { id });
}

async function listEthnicGroups() {
  return query(`SELECT IDDanToc AS id, MaDanToc AS code, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM DAN_TOC ORDER BY ThuTuSapXep, IDDanToc`);
}

async function getEthnicGroupById(id) {
  const rows = await query(`SELECT TOP 1 IDDanToc AS id, MaDanToc AS code, ThuTuSapXep AS sortOrder, HoatDong AS isActive, NgayTao AS createdAt FROM DAN_TOC WHERE IDDanToc = @id`, { id });
  return rows[0] || null;
}

async function createEthnicGroup(payload) {
  const rows = await query(
    `INSERT INTO DAN_TOC (MaDanToc, ThuTuSapXep, HoatDong)
     OUTPUT INSERTED.IDDanToc AS id
     VALUES (@code, @sortOrder, @isActive)`,
    { code: payload.code, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
  return rows[0] || null;
}

async function updateEthnicGroup(id, payload) {
  await query(
    `UPDATE DAN_TOC
     SET MaDanToc = @code, ThuTuSapXep = @sortOrder, HoatDong = @isActive
     WHERE IDDanToc = @id`,
    { id, code: payload.code, sortOrder: payload.sortOrder || 0, isActive: payload.isActive ? 1 : 0 }
  );
}

async function deleteEthnicGroup(id) {
  await query('DELETE FROM DAN_TOC WHERE IDDanToc = @id', { id });
}

async function listTags() {
  return query(`SELECT IDThe AS id, MaThe AS code, HoatDong AS isActive, NgayTao AS createdAt FROM THE_NOI_DUNG ORDER BY IDThe`);
}

async function getTagById(id) {
  const rows = await query(`SELECT TOP 1 IDThe AS id, MaThe AS code, HoatDong AS isActive, NgayTao AS createdAt FROM THE_NOI_DUNG WHERE IDThe = @id`, { id });
  return rows[0] || null;
}

async function createTag(payload) {
  const rows = await query(
    `INSERT INTO THE_NOI_DUNG (MaThe, HoatDong)
     OUTPUT INSERTED.IDThe AS id
     VALUES (@code, @isActive)`,
    { code: payload.code, isActive: payload.isActive ? 1 : 0 }
  );
  return rows[0] || null;
}

async function updateTag(id, payload) {
  await query(`UPDATE THE_NOI_DUNG SET MaThe = @code, HoatDong = @isActive WHERE IDThe = @id`, { id, code: payload.code, isActive: payload.isActive ? 1 : 0 });
}

async function deleteTag(id) {
  await query('DELETE FROM THE_NOI_DUNG WHERE IDThe = @id', { id });
}

async function listKeywords() {
  return query(`SELECT IDTuKhoa AS id, MaTuKhoa AS code, HoatDong AS isActive, NgayTao AS createdAt FROM TU_KHOA ORDER BY IDTuKhoa`);
}

async function getKeywordById(id) {
  const rows = await query(`SELECT TOP 1 IDTuKhoa AS id, MaTuKhoa AS code, HoatDong AS isActive, NgayTao AS createdAt FROM TU_KHOA WHERE IDTuKhoa = @id`, { id });
  return rows[0] || null;
}

async function createKeyword(payload) {
  const rows = await query(
    `INSERT INTO TU_KHOA (MaTuKhoa, HoatDong)
     OUTPUT INSERTED.IDTuKhoa AS id
     VALUES (@code, @isActive)`,
    { code: payload.code, isActive: payload.isActive ? 1 : 0 }
  );
  return rows[0] || null;
}

async function updateKeyword(id, payload) {
  await query(`UPDATE TU_KHOA SET MaTuKhoa = @code, HoatDong = @isActive WHERE IDTuKhoa = @id`, { id, code: payload.code, isActive: payload.isActive ? 1 : 0 });
}

async function deleteKeyword(id) {
  await query('DELETE FROM TU_KHOA WHERE IDTuKhoa = @id', { id });
}

async function listTranslations({ tableName, idColumn, nameColumn, descriptionColumn = null, id }) {
  const descriptionSelect = descriptionColumn ? `${descriptionColumn} AS description` : `CAST(NULL AS NVARCHAR(1000)) AS description`;
  return query(`
    SELECT
      ${idColumn} AS entityId,
      MaNgonNgu AS language,
      ${nameColumn} AS name,
      ${descriptionSelect}
    FROM ${tableName}
    WHERE ${idColumn} = @id
    ORDER BY MaNgonNgu ASC
  `, { id });
}

async function upsertTranslation({ tableName, idColumn, nameColumn, descriptionColumn = null, id, language, payload }) {
  const updateDescription = descriptionColumn ? `, ${descriptionColumn} = @description` : '';
  const insertDescriptionColumns = descriptionColumn ? `, ${descriptionColumn}` : '';
  const insertDescriptionValues = descriptionColumn ? `, @description` : '';

  await query(`
    IF EXISTS (SELECT 1 FROM ${tableName} WHERE ${idColumn} = @id AND MaNgonNgu = @language)
    BEGIN
      UPDATE ${tableName}
      SET ${nameColumn} = @name${updateDescription}
      WHERE ${idColumn} = @id AND MaNgonNgu = @language
    END
    ELSE
    BEGIN
      INSERT INTO ${tableName} (${idColumn}, MaNgonNgu, ${nameColumn}${insertDescriptionColumns})
      VALUES (@id, @language, @name${insertDescriptionValues})
    END
  `, {
    id,
    language,
    name: payload.name,
    description: payload.description || null
  });
}

module.exports = {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  listRegions,
  getRegionById,
  createRegion,
  updateRegion,
  deleteRegion,
  listEthnicGroups,
  getEthnicGroupById,
  createEthnicGroup,
  updateEthnicGroup,
  deleteEthnicGroup,
  listTags,
  getTagById,
  createTag,
  updateTag,
  deleteTag,
  listKeywords,
  getKeywordById,
  createKeyword,
  updateKeyword,
  deleteKeyword,
  listTranslations,
  upsertTranslation
};
