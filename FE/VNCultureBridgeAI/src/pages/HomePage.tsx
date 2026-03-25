import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom'
import heroImg from '../assets/hero.png'
import { StatusBlock } from '../components/common/StatusBlock'
import { ArticleCard } from '../components/content/ArticleCard'
import { SectionHeader } from '../components/content/SectionHeader'
import { getCategories, getFeaturedArticles, getRegions } from '../services/api'
import type { ArticleSummary, Category, Language, Region } from '../types/content'

type OutletContext = { language: Language }

const featuredTopics = {
  en: [
    'Tet',
    'Ao dai',
    'Ancestor worship',
    'Highland festivals',
    'Three-region cuisine',
  ],
  vi: ['Tết', 'Áo dài', 'Thờ cúng tổ tiên', 'Lễ hội vùng cao', 'Ẩm thực ba miền'],
}

const copy = {
  en: {
    heroTitle: 'Discover and Understand Vietnamese Culture',
    heroSubtitle:
      'This is not only a tourism website. It helps international readers understand why Vietnamese customs, rituals, beliefs, and social behaviours carry cultural meaning.',
    mapCta: 'Explore Cultural Map',
    askAi: 'Ask AI now',
    searchPlaceholder: 'Search Tet, ao dai, ancestor worship, food etiquette...',
    searchLabel: 'Quick cultural search',
    topicEyebrow: 'Featured topics',
    topicTitle: 'Start with familiar cultural entry points',
    topicDescription:
      'Discover essential themes that frequently appear in travel, academic, and intercultural questions.',
    categoryEyebrow: 'Explore by cultural pathways',
    categoryTitle: 'Browse culture by topic, not just by article title',
    categoryDescription:
      'Move through customs, rituals, beliefs, cuisine, and ethnic cultures with curated bilingual entry points.',
    featuredEyebrow: 'Featured cultural articles',
    featuredTitle: 'Published articles that explain meaning, not just facts',
    featuredDescription:
      'Each article is reviewed, bilingual, and structured to explain origin, significance, context, and respectful understanding.',
    regionEyebrow: 'Explore by cultural region',
    regionTitle: 'Discover Vietnam through cultural regions',
    regionDescription:
      'The platform treats cultural space as more than administrative borders so users can understand traditions where they actually live.',
    trustEyebrow: 'Why this platform is trustworthy',
    trustTitle: 'Verified knowledge, bilingual consistency, and source-backed explanation',
    trustDescription:
      'The public experience is built on reviewed content, linked references, article metadata, and visible source-of-truth cues.',
    aiEyebrow: 'AI grounded in reviewed knowledge',
    aiTitle: 'AI explains context, not just short answers',
    aiDescription:
      'The AI layer should answer from reviewed cultural data, highlight uncertainty, and respond gently on culture-shock topics.',
    footerEyebrow: 'Methodology and scholarly grounding',
    footerTitle: 'Cultural explanation supported by editorial review and references',
    footerDescription:
      'VNCultureBridge AI is designed around bilingual publication, cultural context, reviewed references, and AI answers that stay within approved knowledge.',
    noContent: 'No published featured articles are available yet.',
    loadingTitle: 'Loading homepage content',
    loadingDescription: 'Fetching featured articles, categories, and regions...',
  },
  vi: {
    heroTitle: 'Khám phá và hiểu sâu văn hoá Việt Nam',
    heroSubtitle:
      'Đây không chỉ là một website du lịch. Nền tảng giúp người dùng quốc tế hiểu vì sao phong tục, nghi lễ, tín ngưỡng và cách ứng xử của người Việt mang những ý nghĩa văn hoá riêng.',
    mapCta: 'Khám phá bản đồ văn hoá',
    askAi: 'Hỏi AI ngay',
    searchPlaceholder: 'Tìm Tết, áo dài, thờ cúng tổ tiên, phép tắc bàn ăn...',
    searchLabel: 'Tìm kiếm nhanh',
    topicEyebrow: 'Chủ đề nổi bật',
    topicTitle: 'Bắt đầu từ những điểm chạm văn hoá quen thuộc',
    topicDescription:
      'Khám phá các chủ đề thường xuất hiện trong hành trình du lịch, học thuật và giao tiếp liên văn hoá.',
    categoryEyebrow: 'Khám phá theo lối đi văn hoá',
    categoryTitle: 'Duyệt văn hoá theo chủ đề, không chỉ theo tên bài viết',
    categoryDescription:
      'Di chuyển qua phong tục, nghi lễ, tín ngưỡng, ẩm thực và văn hoá dân tộc bằng các điểm vào song ngữ đã được biên tập.',
    featuredEyebrow: 'Bài viết văn hoá nổi bật',
    featuredTitle: 'Những bài viết giải thích ý nghĩa, không chỉ đưa thông tin',
    featuredDescription:
      'Mỗi bài viết đều được duyệt, có song ngữ và được cấu trúc để làm rõ nguồn gốc, ý nghĩa, bối cảnh và cách tiếp cận tôn trọng.',
    regionEyebrow: 'Khám phá theo vùng',
    regionTitle: 'Khám phá Việt Nam qua các vùng văn hoá',
    regionDescription:
      'Nền tảng xem không gian văn hoá nhiều hơn ranh giới hành chính để người dùng hiểu truyền thống tồn tại ở đâu và vận động như thế nào.',
    trustEyebrow: 'Vì sao nền tảng này đáng tin cậy',
    trustTitle: 'Tri thức đã kiểm duyệt, nhất quán song ngữ và giải thích có nguồn',
    trustDescription:
      'Trải nghiệm public được xây dựng trên nội dung đã duyệt, nguồn tham khảo liên kết, metadata bài viết và các dấu hiệu source-of-truth rõ ràng.',
    aiEyebrow: 'AI dựa trên dữ liệu đã kiểm duyệt',
    aiTitle: 'AI giải thích bối cảnh, không chỉ đưa câu trả lời ngắn',
    aiDescription:
      'Tầng AI cần trả lời từ dữ liệu văn hoá đã duyệt, nêu rõ sự chưa chắc chắn và phản hồi nhẹ nhàng với các chủ đề culture shock.',
    footerEyebrow: 'Phương pháp và nền tảng học thuật',
    footerTitle: 'Giải thích văn hoá dựa trên kiểm duyệt biên tập và nguồn tham khảo',
    footerDescription:
      'VNCultureBridge AI được xây dựng quanh nguyên tắc xuất bản song ngữ, đặt bối cảnh lên trước, gắn nguồn tham khảo và giữ AI trong phạm vi tri thức đã phê duyệt.',
    noContent: 'Hiện chưa có bài nổi bật đã xuất bản.',
    loadingTitle: 'Đang tải nội dung trang chủ',
    loadingDescription: 'Đang lấy bài viết nổi bật, danh mục và vùng văn hoá...',
  },
} as const

export function HomePage() {
  const { language } = useOutletContext<OutletContext>()
  const navigate = useNavigate()
  const [featuredArticles, setFeaturedArticles] = useState<ArticleSummary[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [regions, setRegions] = useState<Region[]>([])
  const [heroQuery, setHeroQuery] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const content = copy[language]

  useEffect(() => {
    setLoading(true)
    Promise.all([getFeaturedArticles(language), getCategories(language), getRegions(language)])
      .then(([articlesData, categoryData, regionData]) => {
        setFeaturedArticles(articlesData)
        setCategories(categoryData.slice(0, 4))
        setRegions(regionData.slice(0, 4))
        setError('')
      })
      .catch((requestError) => {
        setError(requestError instanceof Error ? requestError.message : 'Unable to load homepage data')
      })
      .finally(() => setLoading(false))
  }, [language])

  const handleQuickSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = heroQuery.trim()
    navigate(trimmed ? `/search?lang=${language}&q=${encodeURIComponent(trimmed)}` : `/search?lang=${language}`)
  }

  return (
    <main>
      <section
        className="hero-section hero-section-home"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(25, 6, 4, 0.96) 0%, rgba(79, 16, 10, 0.82) 38%, rgba(102, 25, 16, 0.52) 58%, rgba(33, 9, 7, 0.86) 100%), url(${heroImg})`,
        }}
      >
        <div className="shell-container hero-content hero-home-grid">
          <div>
            <div className="hero-badge">
              <span>✧</span>
              <span>
                {language === 'en'
                  ? 'Verified bilingual cultural knowledge'
                  : 'Tri thức văn hoá song ngữ đã kiểm duyệt'}
              </span>
            </div>
            <h1 className="hero-title hero-title-home">{content.heroTitle}</h1>
            <p className="hero-description hero-description-home">{content.heroSubtitle}</p>

            <form className="home-search-bar" onSubmit={handleQuickSearch}>
              <label htmlFor="home-search" className="home-search-label">
                {content.searchLabel}
              </label>
              <div className="home-search-input-wrap">
                <input
                  id="home-search"
                  value={heroQuery}
                  onChange={(event) => setHeroQuery(event.target.value)}
                  placeholder={content.searchPlaceholder}
                />
                <button type="submit" className="admin-button">
                  {language === 'en' ? 'Search' : 'Tìm kiếm'}
                </button>
              </div>
            </form>

            <div className="hero-actions">
              <Link to={`/map?lang=${language}`} className="admin-button">
                {content.mapCta}
              </Link>
              <Link to={`/ai-guide?lang=${language}`} className="outline-button">
                {content.askAi}
              </Link>
            </div>
          </div>

          <div className="hero-side-panel">
            <h3>{content.topicEyebrow}</h3>
            <div className="chip-row compact hero-topic-chips">
              {featuredTopics[language].map((topic) => (
                <button
                  key={topic}
                  type="button"
                  className="topic-chip"
                  onClick={() => navigate(`/search?lang=${language}&q=${encodeURIComponent(topic)}`)}
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell-section shell-container">
        <SectionHeader
          eyebrow={content.categoryEyebrow}
          title={content.categoryTitle}
          description={content.categoryDescription}
        />
        <div className="category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories?lang=${language}&categoryId=${category.id}`}
              className="info-card"
            >
              <h3>{category.name}</h3>
              <p>
                {category.description ||
                  (language === 'en'
                    ? 'Explore cultural content in this thematic pathway.'
                    : 'Khám phá nội dung văn hoá theo chủ đề này.')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell-section shell-container dual-panel">
        <div className="panel-card trust-card">
          <SectionHeader
            eyebrow={content.trustEyebrow}
            title={content.trustTitle}
            description={content.trustDescription}
          />
          <ul className="trust-list">
            <li>
              {language === 'en'
                ? 'Published content is reviewed and tied to references.'
                : 'Nội dung xuất bản đã được duyệt và gắn với nguồn tham khảo.'}
            </li>
            <li>
              {language === 'en'
                ? 'The UI foregrounds context, not only quick facts.'
                : 'Giao diện ưu tiên bối cảnh, không chỉ các fact ngắn.'}
            </li>
            <li>
              {language === 'en'
                ? 'Language switching keeps the public experience bilingual.'
                : 'Chuyển ngôn ngữ giúp trải nghiệm public giữ được song ngữ.'}
            </li>
          </ul>
        </div>

        <div className="panel-card trust-card">
          <SectionHeader
            eyebrow={content.aiEyebrow}
            title={content.aiTitle}
            description={content.aiDescription}
          />
          <ul className="trust-list">
            <li>
              {language === 'en'
                ? 'The AI should answer only from reviewed internal knowledge.'
                : 'AI cần trả lời chỉ từ tri thức nội bộ đã được kiểm duyệt.'}
            </li>
            <li>
              {language === 'en'
                ? 'It should admit when data is limited instead of inventing facts.'
                : 'Hệ thống phải nói rõ khi dữ liệu còn hạn chế thay vì tự suy diễn.'}
            </li>
            <li>
              {language === 'en'
                ? 'Culture-shock topics should use gentle explanation mode.'
                : 'Chủ đề culture shock nên đi qua chế độ giải thích nhẹ nhàng.'}
            </li>
          </ul>
          <Link to={`/ai-guide?lang=${language}`} className="inline-link">
            {content.askAi}
          </Link>
        </div>
      </section>

      <section className="shell-section shell-container">
        <SectionHeader
          eyebrow={content.featuredEyebrow}
          title={content.featuredTitle}
          description={content.featuredDescription}
        />

        {loading ? (
          <StatusBlock title={content.loadingTitle} description={content.loadingDescription} />
        ) : error ? (
          <StatusBlock
            title={language === 'en' ? 'Unable to load homepage data' : 'Không thể tải dữ liệu trang chủ'}
            description={error}
            tone="error"
          />
        ) : featuredArticles.length > 0 ? (
          <div className="article-grid">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} language={language} />
            ))}
          </div>
        ) : (
          <StatusBlock
            title={language === 'en' ? 'No featured content yet' : 'Chưa có nội dung nổi bật'}
            description={content.noContent}
          />
        )}
      </section>

      <section className="shell-section shell-container">
        <SectionHeader
          eyebrow={content.regionEyebrow}
          title={content.regionTitle}
          description={content.regionDescription}
        />
        <div className="region-grid region-grid-home">
          {regions.map((region) => (
            <Link key={region.id} to={`/map?lang=${language}&regionId=${region.id}`} className="region-pill-card region-preview-card">
              <strong>{region.name}</strong>
              <span>{region.type || (language === 'en' ? 'Cultural region' : 'Vùng văn hoá')}</span>
              <p>
                {region.description ||
                  (language === 'en'
                    ? 'Open this region to view published cultural articles tied to its knowledge space.'
                    : 'Mở vùng này để xem các bài viết văn hoá đã xuất bản gắn với không gian tri thức của vùng.')}
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell-section shell-container footer-cue-section">
        <SectionHeader
          eyebrow={content.footerEyebrow}
          title={content.footerTitle}
          description={content.footerDescription}
        />
        <div className="footer-cue-grid">
          <div className="panel-card">
            <h3>{language === 'en' ? 'Methodology' : 'Phương pháp'}</h3>
            <p>
              {language === 'en'
                ? 'Articles, translations, metadata, references, and AI knowledge should all move through a reviewed editorial flow.'
                : 'Bài viết, bản dịch, metadata, nguồn tham khảo và tri thức AI đều phải đi qua một quy trình biên tập đã kiểm duyệt.'}
            </p>
          </div>
          <div className="panel-card">
            <h3>{language === 'en' ? 'Academic grounding' : 'Nền tảng học thuật'}</h3>
            <p>
              {language === 'en'
                ? 'Source-of-truth cues should point to references, update history, editorial review, and controlled AI grounding.'
                : 'Các dấu hiệu source-of-truth cần trỏ tới nguồn tham khảo, lịch sử cập nhật, kiểm duyệt biên tập và grounding AI có kiểm soát.'}
            </p>
          </div>
          <div className="panel-card">
            <h3>{language === 'en' ? 'Contact & feedback' : 'Liên hệ & phản hồi'}</h3>
            <p>
              {language === 'en'
                ? 'Readers should be able to challenge unclear explanations, missing context, or sensitive content handling.'
                : 'Người đọc cần có khả năng phản hồi về giải thích chưa rõ, thiếu bối cảnh hoặc cách xử lý nội dung nhạy cảm.'}
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
