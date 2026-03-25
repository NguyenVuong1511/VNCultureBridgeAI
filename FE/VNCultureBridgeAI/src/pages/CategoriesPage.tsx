import { useEffect, useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import { StatusBlock } from '../components/common/StatusBlock'
import { ArticleCard } from '../components/content/ArticleCard'
import { SectionHeader } from '../components/content/SectionHeader'
import { getCategories, getCategoryArticles } from '../services/api'
import type { ArticleSummary, Category, Language } from '../types/content'

type OutletContext = { language: Language }

export function CategoriesPage() {
  const { language } = useOutletContext<OutletContext>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [categories, setCategories] = useState<Category[]>([])
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  const [selectedCategoryName, setSelectedCategoryName] = useState('')
  const [error, setError] = useState('')
  const categoryId = searchParams.get('categoryId')

  useEffect(() => {
    getCategories(language)
      .then(setCategories)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Failed to load categories'))
  }, [language])

  useEffect(() => {
    if (!categoryId) {
      setArticles([])
      setSelectedCategoryName('')
      return
    }

    getCategoryArticles(language, categoryId)
      .then((response) => {
        setArticles(response.data.items)
        setSelectedCategoryName(response.data.category.name)
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Failed to load category articles'))
  }, [language, categoryId])

  return (
    <main className="shell-section shell-container">
      <SectionHeader
        eyebrow={language === 'en' ? 'Cultural categories' : 'Danh mục văn hoá'}
        title={language === 'en' ? 'Browse Vietnamese culture by theme' : 'Khám phá văn hoá Việt Nam theo chủ đề'}
        description={
          language === 'en'
            ? 'Choose a curated pathway such as customs, festivals, beliefs, cuisine, or ethnic cultures.'
            : 'Chọn một lối đi được biên tập như phong tục, lễ hội, tín ngưỡng, ẩm thực hoặc văn hoá dân tộc.'
        }
      />

      {error ? (
        <StatusBlock
          title={language === 'en' ? 'Category data unavailable' : 'Dữ liệu danh mục chưa sẵn sàng'}
          description={error}
          tone="error"
        />
      ) : null}

      <div className="category-grid">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={`info-card info-card-button ${String(category.id) === categoryId ? 'info-card-active' : ''}`}
            onClick={() => setSearchParams({ lang: language, categoryId: String(category.id) })}
          >
            <h3>{category.name}</h3>
            <p>{category.description || (language === 'en' ? 'Explore approved cultural articles in this category.' : 'Khám phá các bài viết văn hoá đã kiểm duyệt trong danh mục này.')}</p>
          </button>
        ))}
      </div>

      {categoryId ? (
        <section className="shell-section-inline">
          <SectionHeader
            eyebrow={language === 'en' ? 'Selected category' : 'Danh mục đang xem'}
            title={selectedCategoryName || (language === 'en' ? 'Category articles' : 'Bài viết theo danh mục')}
            description={
              language === 'en'
                ? 'Published articles connected to this cultural pathway.'
                : 'Các bài viết đã xuất bản thuộc lối đi văn hoá này.'
            }
          />
          {articles.length > 0 ? (
            <div className="article-grid">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} language={language} compact />
              ))}
            </div>
          ) : (
            <StatusBlock
              title={language === 'en' ? 'No articles in this category yet' : 'Chưa có bài viết trong danh mục này'}
              description={
                language === 'en'
                  ? 'Try another category or use the AI guide for a broader explanation.'
                  : 'Hãy thử danh mục khác hoặc dùng AI để nhận giải thích rộng hơn.'
              }
            />
          )}
        </section>
      ) : null}

      <div className="page-cta-row">
        <Link to={`/search?lang=${language}`} className="outline-button">
          {language === 'en' ? 'Go to Search' : 'Đi tới tìm kiếm'}
        </Link>
      </div>
    </main>
  )
}
