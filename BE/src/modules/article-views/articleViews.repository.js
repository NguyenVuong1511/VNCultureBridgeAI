const { query } = require('../../config/db');

async function createArticleView({ sessionId, articleId, language, durationSeconds, accessSource }) {
  const rows = await query(`
    INSERT INTO NHAT_KY_XEM_BAI_VIET (
      IDPhien,
      IDBaiViet,
      MaNgonNgu,
      SoGiayXem,
      NguonTruyCap
    )
    OUTPUT INSERTED.IDXemBai AS id,
           INSERTED.IDPhien AS sessionId,
           INSERTED.IDBaiViet AS articleId,
           INSERTED.MaNgonNgu AS language,
           INSERTED.SoGiayXem AS durationSeconds,
           INSERTED.NguonTruyCap AS accessSource,
           INSERTED.ThoiDiemXem AS viewedAt
    VALUES (
      @sessionId,
      @articleId,
      @language,
      @durationSeconds,
      @accessSource
    )
  `, {
    sessionId: sessionId || null,
    articleId,
    language: language || null,
    durationSeconds: durationSeconds || null,
    accessSource
  });

  return rows[0] || null;
}

async function getArticleViewSummary(articleId) {
  const rows = await query(`
    SELECT
      IDBaiViet AS articleId,
      COUNT(1) AS totalViews,
      AVG(CAST(SoGiayXem AS FLOAT)) AS avgDurationSeconds
    FROM NHAT_KY_XEM_BAI_VIET
    WHERE IDBaiViet = @articleId
    GROUP BY IDBaiViet
  `, { articleId });

  return rows[0] || { articleId, totalViews: 0, avgDurationSeconds: null };
}

async function listArticleViews({ articleId, sessionId, accessSource, offset, pageSize }) {
  return query(`
    SELECT
      IDXemBai AS id,
      IDPhien AS sessionId,
      IDBaiViet AS articleId,
      MaNgonNgu AS language,
      SoGiayXem AS durationSeconds,
      NguonTruyCap AS accessSource,
      ThoiDiemXem AS viewedAt
    FROM NHAT_KY_XEM_BAI_VIET
    WHERE (@articleId IS NULL OR IDBaiViet = @articleId)
      AND (@sessionId IS NULL OR IDPhien = @sessionId)
      AND (@accessSource IS NULL OR NguonTruyCap = @accessSource)
    ORDER BY ThoiDiemXem DESC, IDXemBai DESC
    OFFSET @offset ROWS FETCH NEXT @pageSize ROWS ONLY
  `, { articleId, sessionId, accessSource, offset, pageSize });
}

async function countArticleViews({ articleId, sessionId, accessSource }) {
  const rows = await query(`
    SELECT COUNT(1) AS total
    FROM NHAT_KY_XEM_BAI_VIET
    WHERE (@articleId IS NULL OR IDBaiViet = @articleId)
      AND (@sessionId IS NULL OR IDPhien = @sessionId)
      AND (@accessSource IS NULL OR NguonTruyCap = @accessSource)
  `, { articleId, sessionId, accessSource });

  return rows[0]?.total || 0;
}

async function getArticleViewById(id) {
  const rows = await query(`
    SELECT TOP 1
      IDXemBai AS id,
      IDPhien AS sessionId,
      IDBaiViet AS articleId,
      MaNgonNgu AS language,
      SoGiayXem AS durationSeconds,
      NguonTruyCap AS accessSource,
      ThoiDiemXem AS viewedAt
    FROM NHAT_KY_XEM_BAI_VIET
    WHERE IDXemBai = @id
  `, { id });

  return rows[0] || null;
}

async function getTopViewedArticles() {
  return query(`
    SELECT TOP 10
      IDBaiViet AS articleId,
      COUNT(1) AS totalViews,
      AVG(CAST(SoGiayXem AS FLOAT)) AS avgDurationSeconds
    FROM NHAT_KY_XEM_BAI_VIET
    GROUP BY IDBaiViet
    ORDER BY totalViews DESC, articleId DESC
  `);
}

async function listAccessSources() {
  return query(`SELECT DISTINCT NguonTruyCap AS accessSource FROM NHAT_KY_XEM_BAI_VIET ORDER BY NguonTruyCap ASC`);
}

module.exports = {
  createArticleView,
  getArticleViewSummary,
  listArticleViews,
  countArticleViews,
  getArticleViewById,
  getTopViewedArticles,
  listAccessSources
};
