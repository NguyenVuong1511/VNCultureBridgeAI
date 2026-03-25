import { useState } from 'react'
import type { FormEvent } from 'react'
import { useOutletContext, useSearchParams } from 'react-router-dom'
import { StatusBlock } from '../components/common/StatusBlock'
import { ArticleCard } from '../components/content/ArticleCard'
import { SectionHeader } from '../components/content/SectionHeader'
import { searchArticles } from '../services/api'
import type { ArticleSummary, Language } from '../types/content'

type OutletContext = { language: Language }

export function SearchPage() {
  const { language } = useOutletContext<OutletContext>()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<ArticleSummary[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = query.trim()
    setSearchParams(trimmed ? { lang: language, q: trimmed } : { lang: language })

    if (!trimmed) {
      setResults([])
      setError(language === 'en' ? 'Please enter a keyword to search.' : 'Vui lòng nhập từ khoá để tìm kiếm.')
      return
    }

    setLoading(true)
    setError('')
    try {
      const response = await searchArticles(language, trimmed)
      setResults(response.data)
    } catch (requestError) {
      setResults([])
      setError(requestError instanceof Error ? requestError.message : 'Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="shell-section shell-container">
      <SectionHeader
        eyebrow={language === 'en' ? 'Search verified content' : 'Tìm kiếm nội dung đã kiểm duyệt'}
        title={language === 'en' ? 'Search Vietnamese cultural knowledge' : 'Tìm kiếm tri thức văn hoá Việt Nam'}
        description={
          language === 'en'
            ? 'Search customs, rituals, symbols, festivals, or cuisine topics, then continue through article pages or AI-guided follow-up.'
            : 'Tìm kiếm phong tục, nghi lễ, biểu tượng, lễ hội hoặc chủ đề ẩm thực, sau đó đi tiếp qua bài viết hoặc AI.'
        }
      />

      <form className="search-page-bar" onSubmit={handleSearch}>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={language === 'en' ? 'Search customs, festivals, etiquette, beliefs...' : 'Tìm phong tục, lễ hội, ứng xử, tín ngưỡng...'}
        />
        <button type="submit" className="admin-button" disabled={loading}>
          {loading ? '...' : language === 'en' ? 'Search' : 'Tìm kiếm'}
        </button>
      </form>

      {error ? (
        <StatusBlock
          title={language === 'en' ? 'Search issue' : 'Có vấn đề khi tìm kiếm'}
          description={error}
          tone="error"
        />
      ) : null}

      {results.length > 0 ? (
        <div className="article-grid shell-section-inline">
          {results.map((article) => (
            <ArticleCard key={article.id} article={article} language={language} compact />
          ))}
        </div>
      ) : !loading && searchParams.get('q') ? (
        <StatusBlock
          title={language === 'en' ? 'No matching result' : 'Không có kết quả phù hợp'}
          description={
            language === 'en'
              ? 'Try broader cultural keywords or continue with AI for a guided explanation.'
              : 'Hãy thử từ khoá rộng hơn hoặc tiếp tục với AI để được giải thích có hướng dẫn.'
          }
        />
      ) : null}
    </main>
  )
}
