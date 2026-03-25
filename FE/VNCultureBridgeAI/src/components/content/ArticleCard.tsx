import { Link } from 'react-router-dom'
import type { ArticleSummary, Language } from '../../types/content'

type ArticleCardProps = {
  article: ArticleSummary
  language: Language
  compact?: boolean
}

export function ArticleCard({ article, language, compact = false }: ArticleCardProps) {
  return (
    <article className={`article-card ${compact ? 'article-card-compact' : ''}`}>
      {article.primaryMediaUrl ? (
        <img className="article-card-media" src={article.primaryMediaUrl} alt={article.title} />
      ) : (
        <div className="article-card-media article-card-media-placeholder" />
      )}

      <div className="article-card-body">
        <div className="article-card-meta">
          <span>{article.type}</span>
          {article.publishedAt ? <span>{new Date(article.publishedAt).toLocaleDateString()}</span> : null}
        </div>
        <h3>{article.title}</h3>
        <p>{article.summary}</p>
        <Link to={`/articles/${article.slug}?lang=${language}`} className="inline-link">
          {language === 'en' ? 'Read cultural article' : 'Đọc bài văn hoá'}
        </Link>
      </div>
    </article>
  )
}
