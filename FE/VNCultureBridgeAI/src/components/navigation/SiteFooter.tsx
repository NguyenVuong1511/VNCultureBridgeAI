import { Link } from 'react-router-dom'
import type { Language } from '../../types/content'

type SiteFooterProps = {
  language: Language
}

export function SiteFooter({ language }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="shell-container footer-grid">
        <div>
          <h3>VNCultureBridge AI</h3>
          <p>
            {language === 'en'
              ? 'A bilingual cultural knowledge platform that explains Vietnamese customs with context, care, and verified references.'
              : 'Nền tảng tri thức văn hoá song ngữ giúp giải thích phong tục Việt Nam bằng bối cảnh, sự cẩn trọng và nguồn kiểm duyệt.'}
          </p>
        </div>
        <div>
          <h4>{language === 'en' ? 'Explore' : 'Khám phá'}</h4>
          <ul>
            <li><Link to={`/?lang=${language}`}>Home</Link></li>
            <li><Link to={`/map?lang=${language}`}>{language === 'en' ? 'Cultural Map' : 'Bản đồ văn hoá'}</Link></li>
            <li><Link to={`/categories?lang=${language}`}>{language === 'en' ? 'Categories' : 'Danh mục'}</Link></li>
            <li><Link to={`/search?lang=${language}`}>Search</Link></li>
          </ul>
        </div>
        <div>
          <h4>{language === 'en' ? 'Trust & Methodology' : 'Niềm tin & Phương pháp'}</h4>
          <ul>
            <li><Link to={`/about?lang=${language}`}>About</Link></li>
            <li><Link to={`/about?lang=${language}#methodology`}>Methodology</Link></li>
            <li><Link to={`/about?lang=${language}#source-of-truth`}>Source of Truth</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-note">
        {language === 'en'
          ? 'Cultural practices may vary across regions, ethnic groups, families, and generations.'
          : 'Phong tục có thể khác nhau theo vùng miền, dân tộc, gia đình và thế hệ.'}
      </div>
    </footer>
  )
}
