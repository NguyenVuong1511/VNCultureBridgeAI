import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useOutletContext, useParams } from 'react-router-dom'
import { StatusBlock } from '../components/common/StatusBlock'
import { ArticleCard } from '../components/content/ArticleCard'
import { SectionHeader } from '../components/content/SectionHeader'
import { createFeedback, getArticleBySlug } from '../services/api'
import type { ArticleDetail, Language } from '../types/content'

type OutletContext = { language: Language }

export function ArticleDetailPage() {
  const { language } = useOutletContext<OutletContext>()
  const { slug = '' } = useParams()
  const [article, setArticle] = useState<ArticleDetail | null>(null)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState('')
  const [feedbackMessage, setFeedbackMessage] = useState('')

  useEffect(() => {
    getArticleBySlug(language, slug)
      .then(setArticle)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Failed to load article'))
  }, [language, slug])

  const submitFeedback = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!article || !feedback.trim()) return

    try {
      await createFeedback({
        type: 'BAI_VIET',
        articleId: article.id,
        content: feedback,
      })
      setFeedback('')
      setFeedbackMessage(language === 'en' ? 'Thank you for your feedback.' : 'Cảm ơn bạn đã gửi phản hồi.')
    } catch (requestError) {
      setFeedbackMessage(
        requestError instanceof Error
          ? requestError.message
          : language === 'en'
            ? 'Unable to submit feedback.'
            : 'Không thể gửi phản hồi.',
      )
    }
  }

  if (error) {
    return (
      <main className="shell-section shell-container">
        <StatusBlock
          title={language === 'en' ? 'Article unavailable' : 'Không thể tải bài viết'}
          description={error}
          tone="error"
        />
      </main>
    )
  }

  if (!article) {
    return (
      <main className="shell-section shell-container">
        <StatusBlock
          title={language === 'en' ? 'Loading article' : 'Đang tải bài viết'}
          description={
            language === 'en'
              ? 'Fetching verified cultural content...'
              : 'Đang tải nội dung văn hoá đã kiểm duyệt...'
          }
        />
      </main>
    )
  }

  const trustSummary = [
    article.reviewLevel ? `${language === 'en' ? 'Review level' : 'Mức kiểm duyệt'}: ${article.reviewLevel}` : null,
    article.aiSyncStatus ? `${language === 'en' ? 'AI sync' : 'Đồng bộ AI'}: ${article.aiSyncStatus}` : null,
    article.references.length > 0 ? `${article.references.length} ${language === 'en' ? 'references' : 'nguồn tham khảo'}` : null,
  ].filter(Boolean)

  return (
    <main className="shell-section shell-container article-detail-page">
      <div className="article-breadcrumbs">
        <Link to={`/?lang=${language}`}>{language === 'en' ? 'Home' : 'Trang chủ'}</Link>
        <span>/</span>
        <Link to={`/categories?lang=${language}`}>{language === 'en' ? 'Categories' : 'Danh mục'}</Link>
        <span>/</span>
        <span>{article.title}</span>
      </div>

      <section className="article-hero-card">
        <div className="article-hero-copy">
          <div className="article-card-meta">
            <span>{article.type}</span>
            {article.publishedAt ? <span>{new Date(article.publishedAt).toLocaleDateString()}</span> : null}
            <span>{language === 'en' ? 'Verified article' : 'Bài viết đã kiểm duyệt'}</span>
          </div>
          <h1>{article.title}</h1>
          <p>{article.summary}</p>
          <div className="chip-row">
            {article.categories.map((category) => (
              <span key={`cat-${category.id}`} className="content-chip">
                {category.name}
              </span>
            ))}
            {article.regions.map((region) => (
              <span key={`region-${region.id}`} className="content-chip">
                {region.name}
              </span>
            ))}
            {article.ethnicGroups.map((ethnic) => (
              <span key={`ethnic-${ethnic.id}`} className="content-chip">
                {ethnic.name}
              </span>
            ))}
          </div>
          <div className="article-hero-actions">
            <Link to={`/ai-guide?lang=${language}&article=${article.slug}`} className="admin-button">
              {language === 'en' ? 'Ask AI about this topic' : 'Hỏi AI về chủ đề này'}
            </Link>
            <Link to={`/search?lang=${language}&q=${encodeURIComponent(article.title)}`} className="outline-button">
              {language === 'en' ? 'Find related topics' : 'Tìm chủ đề liên quan'}
            </Link>
          </div>
        </div>
        {article.media[0]?.url ? (
          <img
            className="article-hero-media"
            src={article.media[0].url}
            alt={article.media[0].title || article.title}
          />
        ) : (
          <div className="article-hero-media article-card-media-placeholder" />
        )}
      </section>

      <div className="article-detail-layout">
        <section className="article-content-column">
          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Introduction' : 'Giới thiệu'} />
            <p>{article.introduction || article.summary}</p>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Origin' : 'Nguồn gốc'} />
            <p>
              {article.origin ||
                (language === 'en'
                  ? 'Origin information is not yet available in this translation.'
                  : 'Thông tin nguồn gốc chưa có đầy đủ ở bản dịch này.')}
            </p>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Cultural meaning' : 'Ý nghĩa văn hoá'} />
            <p>
              {article.culturalMeaning ||
                (language === 'en'
                  ? 'Meaning details are being completed.'
                  : 'Phần ý nghĩa đang được bổ sung.')}
            </p>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Context of practice' : 'Bối cảnh thực hành'} />
            <p>
              {article.usageContext ||
                (language === 'en'
                  ? 'Context information is not yet available.'
                  : 'Thông tin bối cảnh hiện chưa đầy đủ.')}
            </p>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Detailed cultural explanation' : 'Giải thích chi tiết'} />
            <p>{article.content || article.summary}</p>
          </div>

          {article.cultureShockNote ? (
            <div className="panel-card context-panel">
              <SectionHeader
                eyebrow={language === 'en' ? 'Gentle explanation mode' : 'Chế độ giải thích nhẹ nhàng'}
                title={
                  language === 'en'
                    ? 'How to understand this respectfully'
                    : 'Cách hiểu chủ đề này một cách tôn trọng'
                }
                description={
                  language === 'en'
                    ? 'Use this context-first note for topics that may feel unfamiliar or sensitive to international readers.'
                    : 'Dùng ghi chú đặt bối cảnh lên trước cho các chủ đề có thể gây lạ lẫm hoặc nhạy cảm với người dùng quốc tế.'
                }
              />
              <p>{article.cultureShockNote}</p>
            </div>
          ) : null}

          <div className="panel-card">
            <SectionHeader
              title={language === 'en' ? 'Regions and ethnic communities' : 'Vùng miền và cộng đồng dân tộc'}
              description={
                language === 'en'
                  ? 'These links show where the tradition is culturally connected.'
                  : 'Các liên kết dưới đây cho thấy truyền thống này gắn với những không gian văn hoá nào.'
              }
            />
            <div className="relation-grid">
              <div>
                <h3>{language === 'en' ? 'Cultural regions' : 'Vùng văn hoá'}</h3>
                <div className="chip-row compact">
                  {article.regions.length > 0 ? (
                    article.regions.map((region) => (
                      <span key={`region-side-${region.id}`} className="content-chip">
                        {region.name}
                      </span>
                    ))
                  ) : (
                    <span className="muted-inline-text">
                      {language === 'en' ? 'No region relation metadata yet.' : 'Chưa có metadata vùng liên quan.'}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3>{language === 'en' ? 'Ethnic groups' : 'Dân tộc liên quan'}</h3>
                <div className="chip-row compact">
                  {article.ethnicGroups.length > 0 ? (
                    article.ethnicGroups.map((ethnic) => (
                      <span key={`ethnic-side-${ethnic.id}`} className="content-chip">
                        {ethnic.name}
                      </span>
                    ))
                  ) : (
                    <span className="muted-inline-text">
                      {language === 'en' ? 'No ethnic relation metadata yet.' : 'Chưa có metadata dân tộc liên quan.'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Media gallery' : 'Thư viện media'} />
            {article.media.length > 0 ? (
              <div className="media-grid">
                {article.media.map((media) => (
                  <figure key={media.id} className="media-card">
                    <img src={media.url} alt={media.title || media.altText || article.title} />
                    <figcaption>
                      <strong>{media.title || article.title}</strong>
                      <span>{media.description || media.copyright || (language === 'en' ? 'Verified media asset' : 'Tư liệu media đã kiểm duyệt')}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <StatusBlock
                title={language === 'en' ? 'No media attached yet' : 'Chưa có media đính kèm'}
                description={
                  language === 'en'
                    ? 'This article currently has no published media attachments.'
                    : 'Bài viết này hiện chưa có media xuất bản đi kèm.'
                }
              />
            )}
          </div>

          <div className="panel-card">
            <SectionHeader
              title={language === 'en' ? 'Source of truth' : 'Nguồn tham khảo'}
              description={
                language === 'en'
                  ? 'The platform should foreground reviewed references and source credibility for each cultural explanation.'
                  : 'Nền tảng cần làm nổi bật nguồn đã kiểm duyệt và độ tin cậy của từng giải thích văn hoá.'
              }
            />
            <div className="reference-list">
              {article.references.map((reference) => (
                <div key={reference.id} className="reference-item">
                  <div className="reference-meta-row">
                    <span className="content-chip small">{reference.type}</span>
                    {reference.trustLevel ? (
                      <span className="content-chip small accent-outline">{reference.trustLevel}</span>
                    ) : null}
                  </div>
                  <h3>{reference.title}</h3>
                  <p>
                    {reference.author ? `${reference.author} • ` : ''}
                    {reference.publisher ? `${reference.publisher} • ` : ''}
                    {reference.publishYear ?? ''}
                  </p>
                  {reference.citationNote ? <p>{reference.citationNote}</p> : null}
                  {reference.url ? (
                    <a href={reference.url} target="_blank" rel="noreferrer" className="inline-link">
                      {language === 'en' ? 'Open source' : 'Mở nguồn'}
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Share feedback' : 'Gửi phản hồi'} />
            <form className="feedback-form" onSubmit={submitFeedback}>
              <textarea
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder={
                  language === 'en'
                    ? 'Tell us what is unclear, sensitive, or missing...'
                    : 'Hãy cho biết điều gì còn chưa rõ, nhạy cảm hoặc còn thiếu...'
                }
              />
              <button type="submit" className="admin-button">
                {language === 'en' ? 'Submit feedback' : 'Gửi phản hồi'}
              </button>
            </form>
            {feedbackMessage ? <p className="search-feedback loading">{feedbackMessage}</p> : null}
          </div>
        </section>

        <aside className="article-sidebar-column">
          <div className="panel-card trust-card">
            <SectionHeader
              eyebrow={language === 'en' ? 'Trust panel' : 'Khối tin cậy'}
              title={
                language === 'en'
                  ? 'Reviewed, source-backed, and ready for AI grounding'
                  : 'Đã kiểm duyệt, có nguồn đối chiếu và sẵn cho AI grounding'
              }
              description={
                language === 'en'
                  ? 'This article comes from the reviewed cultural knowledge base and is linked with references, regions, ethnic groups, and AI sync metadata.'
                  : 'Bài viết này đến từ kho tri thức văn hoá đã kiểm duyệt và được liên kết với nguồn, vùng văn hoá, dân tộc và metadata đồng bộ AI.'
              }
            />
            <ul className="trust-list compact-list">
              {trustSummary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="panel-card">
            <SectionHeader
              title={language === 'en' ? 'Cultural context note' : 'Ghi chú bối cảnh văn hoá'}
              description={
                language === 'en'
                  ? 'Practices may vary across regions, families, generations, and communities.'
                  : 'Thực hành văn hoá có thể khác nhau theo vùng miền, gia đình, thế hệ và cộng đồng.'
              }
            />
          </div>

          <div className="panel-card">
            <SectionHeader title={language === 'en' ? 'Related cultural readings' : 'Bài đọc liên quan'} />
            <div className="results-list">
              {article.relatedArticles.length > 0 ? (
                article.relatedArticles.map((related) => (
                  <ArticleCard key={related.id} article={related} language={language} compact />
                ))
              ) : (
                <StatusBlock
                  title={language === 'en' ? 'No related articles yet' : 'Chưa có bài liên quan'}
                  description={
                    language === 'en'
                      ? 'The relationship graph for this article is not populated yet.'
                      : 'Đồ thị liên kết nội dung cho bài viết này chưa được bổ sung.'
                  }
                />
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
