import { Link, NavLink, useLocation } from 'react-router-dom'
import type { Language } from '../../types/content'

type SiteHeaderProps = {
  language: Language
  onChangeLanguage: (language: Language) => void
}

export function SiteHeader({ language, onChangeLanguage }: SiteHeaderProps) {
  const location = useLocation()
  const withLang = (path: string) => `${path}?lang=${language}`

  return (
    <header className="site-header-shell">
      <div className="shell-container site-header-row">
        <Link to={withLang('/')} className="brand-block-link">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-mark-inner" />
          </div>
          <div className="brand-copy">
            <span className="brand-title">VNCultureBridge</span>
            <p>{language === 'en' ? 'AI • Vietnamese Culture' : 'AI • Văn Hoá Việt Nam'}</p>
          </div>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <NavLink to={withLang('/')} className="nav-link">
            {language === 'en' ? 'Home' : 'Trang chủ'}
          </NavLink>
          <NavLink to={withLang('/map')} className="nav-link">
            {language === 'en' ? 'Cultural Map' : 'Bản đồ văn hoá'}
          </NavLink>
          <NavLink to={withLang('/categories')} className="nav-link">
            {language === 'en' ? 'Categories' : 'Danh mục'}
          </NavLink>
          <NavLink to={withLang('/search')} className="nav-link">
            Search
          </NavLink>
          <NavLink to={withLang('/ai-guide')} className="nav-link">
            {language === 'en' ? 'Ask AI' : 'Hỏi AI'}
          </NavLink>
          <NavLink to={withLang('/about')} className="nav-link">
            About
          </NavLink>
        </nav>

        <div className="header-actions">
          <div className="language-switcher" role="group" aria-label="Language switcher">
            <button
              type="button"
              className={language === 'en' ? 'lang-button active' : 'lang-button'}
              onClick={() => onChangeLanguage('en')}
            >
              EN
            </button>
            <span className="lang-divider">|</span>
            <button
              type="button"
              className={language === 'vi' ? 'lang-button active' : 'lang-button'}
              onClick={() => onChangeLanguage('vi')}
            >
              VI
            </button>
          </div>

          <Link
            to={`/ai-guide?lang=${language}${location.pathname.startsWith('/articles/') ? `&article=${location.pathname.split('/').pop()}` : ''}`}
            className="admin-button"
          >
            {language === 'en' ? 'Ask AI' : 'Hỏi AI'}
          </Link>
        </div>
      </div>
    </header>
  )
}
