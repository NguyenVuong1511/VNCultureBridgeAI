const { query } = require('../../config/db');

async function listReferences() {
  return query(`
    SELECT
      IDNguon AS id,
      LoaiNguon AS type,
      TieuDeNguon AS title,
      TacGia AS author,
      NhaXuatBan AS publisher,
      NamXuatBan AS publishYear,
      URLNguon AS url,
      ISBN AS isbn,
      DOI AS doi,
      MaNgonNguNguon AS language,
      GhiChu AS note,
      MucDoTinCay AS trustLevel,
      DaXacMinh AS isVerified,
      NgayTao AS createdAt
    FROM NGUON_THAM_KHAO
    ORDER BY IDNguon DESC
  `);
}

async function getReferenceById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDNguon AS id,
      LoaiNguon AS type,
      TieuDeNguon AS title,
      TacGia AS author,
      NhaXuatBan AS publisher,
      NamXuatBan AS publishYear,
      URLNguon AS url,
      ISBN AS isbn,
      DOI AS doi,
      MaNgonNguNguon AS language,
      GhiChu AS note,
      MucDoTinCay AS trustLevel,
      DaXacMinh AS isVerified,
      NgayTao AS createdAt
    FROM NGUON_THAM_KHAO
    WHERE IDNguon = @id
  `, { id });
  return rows[0] || null;
}

async function createReference(payload) {
  const rows = await query(`
    INSERT INTO NGUON_THAM_KHAO (
      LoaiNguon, TieuDeNguon, TacGia, NhaXuatBan, NamXuatBan,
      URLNguon, ISBN, DOI, MaNgonNguNguon, GhiChu, MucDoTinCay, DaXacMinh
    )
    OUTPUT INSERTED.IDNguon AS id
    VALUES (
      @type, @title, @author, @publisher, @publishYear,
      @url, @isbn, @doi, @language, @note, @trustLevel, @isVerified
    )
  `, {
    type: payload.type,
    title: payload.title,
    author: payload.author || null,
    publisher: payload.publisher || null,
    publishYear: payload.publishYear || null,
    url: payload.url || null,
    isbn: payload.isbn || null,
    doi: payload.doi || null,
    language: payload.language || null,
    note: payload.note || null,
    trustLevel: payload.trustLevel,
    isVerified: payload.isVerified ? 1 : 0
  });
  return rows[0] || null;
}

async function updateReference(id, payload) {
  await query(`
    UPDATE NGUON_THAM_KHAO
    SET LoaiNguon = @type,
        TieuDeNguon = @title,
        TacGia = @author,
        NhaXuatBan = @publisher,
        NamXuatBan = @publishYear,
        URLNguon = @url,
        ISBN = @isbn,
        DOI = @doi,
        MaNgonNguNguon = @language,
        GhiChu = @note,
        MucDoTinCay = @trustLevel,
        DaXacMinh = @isVerified
    WHERE IDNguon = @id
  `, {
    id,
    type: payload.type,
    title: payload.title,
    author: payload.author || null,
    publisher: payload.publisher || null,
    publishYear: payload.publishYear || null,
    url: payload.url || null,
    isbn: payload.isbn || null,
    doi: payload.doi || null,
    language: payload.language || null,
    note: payload.note || null,
    trustLevel: payload.trustLevel,
    isVerified: payload.isVerified ? 1 : 0
  });
}

async function deleteReference(id) {
  await query('DELETE FROM NGUON_THAM_KHAO WHERE IDNguon = @id', { id });
}

module.exports = { listReferences, getReferenceById, createReference, updateReference, deleteReference };
