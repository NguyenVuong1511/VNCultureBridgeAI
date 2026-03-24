const { query } = require('../../config/db');

async function getSummary() {
  const rows = await query(`
    SELECT
      SUM(CASE WHEN TrangThaiDongBoAI = 'CHO_DONG_BO' THEN 1 ELSE 0 END) AS pendingCount,
      SUM(CASE WHEN TrangThaiDongBoAI = 'DANG_DONG_BO' THEN 1 ELSE 0 END) AS syncingCount,
      SUM(CASE WHEN TrangThaiDongBoAI = 'SAN_SANG' THEN 1 ELSE 0 END) AS readyCount,
      SUM(CASE WHEN TrangThaiDongBoAI = 'LOI' THEN 1 ELSE 0 END) AS failedCount
    FROM BAI_VIET
  `);

  return rows[0] || { pendingCount: 0, syncingCount: 0, readyCount: 0, failedCount: 0 };
}

async function getRunSummary() {
  const [byStatus, byType] = await Promise.all([
    query(`SELECT TrangThai AS status, COUNT(1) AS total FROM DOT_DONG_BO_TRI_THUC_AI GROUP BY TrangThai ORDER BY TrangThai ASC`),
    query(`SELECT LoaiDongBo AS syncType, COUNT(1) AS total FROM DOT_DONG_BO_TRI_THUC_AI GROUP BY LoaiDongBo ORDER BY LoaiDongBo ASC`)
  ]);

  return { byStatus, byType };
}

async function getPendingSummary() {
  return query(`
    SELECT TrangThaiDongBoAI AS status, COUNT(1) AS total
    FROM BAI_VIET
    WHERE CanDongBoAI = 1 OR TrangThaiDongBoAI IN ('CHO_DONG_BO', 'LOI')
    GROUP BY TrangThaiDongBoAI
    ORDER BY TrangThaiDongBoAI ASC
  `);
}

async function listRuns({ status, syncType, offset, pageSize }) {
  return query(`
    SELECT
      IDDotDongBo AS id,
      LoaiDongBo AS syncType,
      TrangThai AS status,
      BatDauLuc AS startedAt,
      KetThucLuc AS finishedAt,
      IDNguoiKichHoat AS triggeredBy,
      ThongBaoLoi AS errorMessage,
      NgayTao AS createdAt
    FROM DOT_DONG_BO_TRI_THUC_AI
    WHERE (@status IS NULL OR TrangThai = @status)
      AND (@syncType IS NULL OR LoaiDongBo = @syncType)
    ORDER BY NgayTao DESC, IDDotDongBo DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { status, syncType, offset, pageSize });
}

async function countRuns({ status, syncType }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM DOT_DONG_BO_TRI_THUC_AI
    WHERE (@status IS NULL OR TrangThai = @status)
      AND (@syncType IS NULL OR LoaiDongBo = @syncType)
  `, { status, syncType });

  return rows[0]?.total || 0;
}

async function listRunStatuses() {
  return query(`
    SELECT DISTINCT TrangThai AS status
    FROM DOT_DONG_BO_TRI_THUC_AI
    ORDER BY TrangThai ASC
  `);
}

async function listRunTypes() {
  return query(`
    SELECT DISTINCT LoaiDongBo AS syncType
    FROM DOT_DONG_BO_TRI_THUC_AI
    ORDER BY LoaiDongBo ASC
  `);
}

async function getRunById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDDotDongBo AS id,
      LoaiDongBo AS syncType,
      TrangThai AS status,
      BatDauLuc AS startedAt,
      KetThucLuc AS finishedAt,
      IDNguoiKichHoat AS triggeredBy,
      ThongBaoLoi AS errorMessage,
      NgayTao AS createdAt
    FROM DOT_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @id
  `, { id });

  return rows[0] || null;
}

async function listRunDetails(runId) {
  return query(`
    SELECT
      IDChiTietDongBo AS id,
      IDDotDongBo AS runId,
      IDBaiViet AS articleId,
      TrangThai AS status,
      SoDoanChunk AS chunkCount,
      ThongBaoLoi AS errorMessage,
      NgayTao AS createdAt
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
    ORDER BY NgayTao DESC, IDChiTietDongBo DESC
  `, { runId });
}

async function listRunDetailsFiltered(runId, { status, offset, pageSize }) {
  return query(`
    SELECT
      IDChiTietDongBo AS id,
      IDDotDongBo AS runId,
      IDBaiViet AS articleId,
      TrangThai AS status,
      SoDoanChunk AS chunkCount,
      ThongBaoLoi AS errorMessage,
      NgayTao AS createdAt
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
      AND (@status IS NULL OR TrangThai = @status)
    ORDER BY NgayTao DESC, IDChiTietDongBo DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { runId, status, offset, pageSize });
}

async function countRunDetails(runId, { status }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
      AND (@status IS NULL OR TrangThai = @status)
  `, { runId, status });

  return rows[0]?.total || 0;
}

async function listRunDetailStatuses(runId) {
  return query(`
    SELECT DISTINCT TrangThai AS status
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
    ORDER BY TrangThai ASC
  `, { runId });
}

async function getRunDetailSummary(runId) {
  return query(`
    SELECT TrangThai AS status, COUNT(1) AS total
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
    GROUP BY TrangThai
    ORDER BY TrangThai ASC
  `, { runId });
}

async function getRunDetailById(runId, detailId) {
  const rows = await query(`
    SELECT TOP 1
      IDChiTietDongBo AS id,
      IDDotDongBo AS runId,
      IDBaiViet AS articleId,
      TrangThai AS status,
      SoDoanChunk AS chunkCount,
      ThongBaoLoi AS errorMessage,
      NgayTao AS createdAt
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId AND IDChiTietDongBo = @detailId
  `, { runId, detailId });

  return rows[0] || null;
}

async function createRun({ syncType, triggeredBy }) {
  const rows = await query(`
    INSERT INTO DOT_DONG_BO_TRI_THUC_AI (
      LoaiDongBo,
      TrangThai,
      BatDauLuc,
      IDNguoiKichHoat
    )
    OUTPUT INSERTED.IDDotDongBo AS id
    VALUES (
      @syncType,
      'CHO_XU_LY',
      SYSUTCDATETIME(),
      @triggeredBy
    )
  `, { syncType, triggeredBy });

  return rows[0] || null;
}

async function createRunDetail(runId, articleId) {
  await query(`
    INSERT INTO CHI_TIET_DONG_BO_TRI_THUC_AI (
      IDDotDongBo,
      IDBaiViet,
      TrangThai
    )
    VALUES (
      @runId,
      @articleId,
      'CHO_XU_LY'
    )
  `, { runId, articleId });
}

async function updateRunStatus(id, { status, errorMessage = null }) {
  await query(`
    UPDATE DOT_DONG_BO_TRI_THUC_AI
    SET TrangThai = @status,
        ThongBaoLoi = @errorMessage,
        BatDauLuc = CASE WHEN @status = 'DANG_XU_LY' AND BatDauLuc IS NULL THEN SYSUTCDATETIME() ELSE BatDauLuc END,
        KetThucLuc = CASE WHEN @status IN ('HOAN_TAT', 'LOI', 'HUY') THEN SYSUTCDATETIME() ELSE NULL END
    WHERE IDDotDongBo = @id
  `, { id, status, errorMessage });
}

async function updateRunDetailStatus(runId, detailId, { status, chunkCount = null, errorMessage = null }) {
  await query(`
    UPDATE CHI_TIET_DONG_BO_TRI_THUC_AI
    SET TrangThai = @status,
        SoDoanChunk = @chunkCount,
        ThongBaoLoi = @errorMessage
    WHERE IDDotDongBo = @runId AND IDChiTietDongBo = @detailId
  `, { runId, detailId, status, chunkCount, errorMessage });
}

async function cancelRun(id, errorMessage = null) {
  await updateRunStatus(id, { status: 'HUY', errorMessage });
}

async function retryRun(id) {
  await updateRunStatus(id, { status: 'CHO_XU_LY', errorMessage: null });
}

async function countPendingArticles({ status }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM BAI_VIET
    WHERE (CanDongBoAI = 1 OR TrangThaiDongBoAI IN ('CHO_DONG_BO', 'LOI'))
      AND (@status IS NULL OR TrangThaiDongBoAI = @status)
  `, { status });

  return rows[0]?.total || 0;
}

async function listPendingStatuses() {
  return query(`
    SELECT DISTINCT TrangThaiDongBoAI AS status
    FROM BAI_VIET
    WHERE TrangThaiDongBoAI IS NOT NULL
    ORDER BY TrangThaiDongBoAI ASC
  `);
}

async function listArticlesPendingSync({ status, offset, pageSize }) {
  return query(`
    SELECT
      IDBaiViet AS id,
      DuongDanSeo AS slug,
      TrangThai AS status,
      TrangThaiDongBoAI AS aiSyncStatus,
      CanDongBoAI AS canSyncAI
    FROM BAI_VIET
    WHERE (CanDongBoAI = 1 OR TrangThaiDongBoAI IN ('CHO_DONG_BO', 'LOI'))
      AND (@status IS NULL OR TrangThaiDongBoAI = @status)
    ORDER BY NgayCapNhat DESC, IDBaiViet DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { status, offset, pageSize });
}

async function getArticleById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDBaiViet AS id,
      DuongDanSeo AS slug,
      TrangThai AS status,
      TrangThaiDongBoAI AS aiSyncStatus,
      CanDongBoAI AS canSyncAI
    FROM BAI_VIET
    WHERE IDBaiViet = @id
  `, { id });

  return rows[0] || null;
}

async function getArticlesByIds(articleIds) {
  const items = [];
  for (const articleId of articleIds) {
    const article = await getArticleById(articleId);
    if (article) items.push(article);
  }
  return items;
}

async function requeueArticle(id) {
  await query(`
    UPDATE BAI_VIET
    SET CanDongBoAI = 1,
        TrangThaiDongBoAI = 'CHO_DONG_BO',
        NgayCapNhat = SYSUTCDATETIME()
    WHERE IDBaiViet = @id
  `, { id });
}

async function bulkRequeueArticles(articleIds) {
  for (const articleId of articleIds) {
    await requeueArticle(articleId);
  }
}

async function markArticlesSyncing(articleIds) {
  for (const articleId of articleIds) {
    await query(`
      UPDATE BAI_VIET
      SET TrangThaiDongBoAI = 'DANG_DONG_BO',
          NgayCapNhat = SYSUTCDATETIME()
      WHERE IDBaiViet = @articleId
    `, { articleId });
  }
}

async function markArticlesSynced(articleIds) {
  for (const articleId of articleIds) {
    await query(`
      UPDATE BAI_VIET
      SET TrangThaiDongBoAI = 'SAN_SANG',
          CanDongBoAI = 0,
          NgayCapNhat = SYSUTCDATETIME()
      WHERE IDBaiViet = @articleId
    `, { articleId });
  }
}

async function markArticlesFailed(articleIds) {
  for (const articleId of articleIds) {
    await query(`
      UPDATE BAI_VIET
      SET TrangThaiDongBoAI = 'LOI',
          NgayCapNhat = SYSUTCDATETIME()
      WHERE IDBaiViet = @articleId
    `, { articleId });
  }
}

async function setRunArticlesQueued(runId) {
  await query(`
    UPDATE CHI_TIET_DONG_BO_TRI_THUC_AI
    SET TrangThai = 'CHO_XU_LY'
    WHERE IDDotDongBo = @runId
  `, { runId });
}

async function clearRunError(id) {
  await query(`
    UPDATE DOT_DONG_BO_TRI_THUC_AI
    SET ThongBaoLoi = NULL
    WHERE IDDotDongBo = @id
  `, { id });
}

async function getRunArticles(runId) {
  return query(`
    SELECT IDBaiViet AS articleId
    FROM CHI_TIET_DONG_BO_TRI_THUC_AI
    WHERE IDDotDongBo = @runId
    ORDER BY IDChiTietDongBo ASC
  `, { runId });
}

module.exports = {
  getSummary,
  getRunSummary,
  getPendingSummary,
  listRuns,
  countRuns,
  listRunStatuses,
  listRunTypes,
  getRunById,
  listRunDetails,
  listRunDetailsFiltered,
  countRunDetails,
  listRunDetailStatuses,
  getRunDetailSummary,
  getRunDetailById,
  createRun,
  createRunDetail,
  updateRunStatus,
  updateRunDetailStatus,
  cancelRun,
  retryRun,
  listArticlesPendingSync,
  countPendingArticles,
  listPendingStatuses,
  getArticleById,
  getArticlesByIds,
  requeueArticle,
  bulkRequeueArticles,
  markArticlesSyncing,
  markArticlesSynced,
  markArticlesFailed,
  setRunArticlesQueued,
  clearRunError,
  getRunArticles
};