import { useEffect, useState } from 'react'
import { Link, useOutletContext, useSearchParams } from 'react-router-dom'
import { StatusBlock } from '../components/common/StatusBlock'
import { ArticleCard } from '../components/content/ArticleCard'
import { SectionHeader } from '../components/content/SectionHeader'
import { getRegionArticles, getRegions } from '../services/api'
import type { ArticleSummary, Language, Region } from '../types/content'

type OutletContext = { language: Language }

export function MapPage() {
  const { language } = useOutletContext<OutletContext>()
  const [searchParams, setSearchParams] = useSearchParams()
  const [regions, setRegions] = useState<Region[]>([])
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [articles, setArticles] = useState<ArticleSummary[]>([])
  const [error, setError] = useState('')
  const regionId = searchParams.get('regionId')

  useEffect(() => {
    getRegions(language)
      .then(setRegions)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Failed to load regions'))
  }, [language])

  useEffect(() => {
    if (!regionId) {
      setSelectedRegion(null)
      setArticles([])
      return
    }

    getRegionArticles(language, regionId)
      .then((response) => {
        setSelectedRegion(response.data.region)
        setArticles(response.data.items)
      })
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Failed to load region articles'))
  }, [language, regionId])

  return (
    <main className="shell-section shell-container">
      <SectionHeader
        eyebrow={language === 'en' ? 'Cultural map explorer' : 'Khám phá bản đồ văn hoá'}
        title={language === 'en' ? 'Explore Vietnam through cultural regions' : 'Khám phá Việt Nam qua các vùng văn hoá'}
        description={
          language === 'en'
            ? 'This map is organised by cultural regions and knowledge groupings, not only administrative borders.'
            : 'Bản đồ này được tổ chức theo vùng văn hoá và các không gian tri thức, không chỉ theo ranh giới hành chính.'
        }
      />

      {error ? (
        <StatusBlock
          title={language === 'en' ? 'Map data unavailable' : 'Dữ liệu bản đồ chưa sẵn sàng'}
          description={error}
          tone="error"
        />
      ) : null}

      <div className="map-layout">
        <section className="panel-card">
          <h3>{language === 'en' ? 'Cultural regions' : 'Vùng văn hoá'}</h3>
          <div className="region-grid">
            {regions.map((region) => (
              <button
                key={region.id}
                type="button"
                className={`region-pill-card region-pill-button ${String(region.id) === regionId ? 'region-pill-active' : ''}`}
                onClick={() => setSearchParams({ lang: language, regionId: String(region.id) })}
              >
                <strong>{region.name}</strong>
                <span>{region.type || (language === 'en' ? 'Cultural region' : 'Vùng văn hoá')}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="panel-card panel-card-map">
          {selectedRegion ? (
            <>
              <SectionHeader
                eyebrow={language === 'en' ? 'Selected region' : 'Vùng đang chọn'}
                title={selectedRegion.name}
                description={selectedRegion.description || (language === 'en' ? 'Explore region-linked cultural articles, practices, and knowledge objects.' : 'Khám phá các bài viết, thực hành và tri thức văn hoá gắn với vùng này.')}
              />
              {articles.length > 0 ? (
                <div className="article-grid">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} language={language} compact />
                  ))}
                </div>
              ) : (
                <StatusBlock
                  title={language === 'en' ? 'No published articles yet' : 'Chưa có bài viết đã xuất bản'}
                  description={
                    language === 'en'
                      ? 'This region exists in the cultural taxonomy, but there are no published articles linked yet.'
                      : 'Vùng này đã tồn tại trong taxonomy văn hoá, nhưng chưa có bài viết xuất bản liên kết.'
                  }
                />
              )}
            </>
          ) : (
            <StatusBlock
              title={language === 'en' ? 'Choose a cultural region' : 'Hãy chọn một vùng văn hoá'}
              description={
                language === 'en'
                  ? 'Select a region from the left to browse region-linked cultural articles.'
                  : 'Chọn một vùng ở bên trái để xem các bài viết văn hoá liên quan.'
              }
            />
          )}
        </section>
      </div>

      <div className="page-cta-row">
        <Link to={`/ai-guide?lang=${language}`} className="outline-button">
          {language === 'en' ? 'Ask AI about a region' : 'Hỏi AI về một vùng văn hoá'}
        </Link>
      </div>
    </main>
  )
}
