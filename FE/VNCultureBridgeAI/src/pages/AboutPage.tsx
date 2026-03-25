import { useOutletContext } from 'react-router-dom'
import { SectionHeader } from '../components/content/SectionHeader'
import type { Language } from '../types/content'

type OutletContext = { language: Language }

export function AboutPage() {
  const { language } = useOutletContext<OutletContext>()

  return (
    <main className="shell-section shell-container about-page">
      <SectionHeader
        eyebrow={language === 'en' ? 'About / Methodology / Source of Truth' : 'About / Phương pháp / Nguồn sự thật'}
        title={language === 'en' ? 'A bilingual cultural knowledge platform, not just a content site' : 'Một nền tảng tri thức văn hoá song ngữ, không chỉ là website nội dung'}
        description={
          language === 'en'
            ? 'VNCultureBridge AI is designed to combine verified cultural content, contextual explanation, and controlled AI assistance for international audiences.'
            : 'VNCultureBridge AI được thiết kế để kết hợp nội dung văn hoá đã kiểm duyệt, giải thích theo ngữ cảnh và hỗ trợ AI có kiểm soát cho người dùng quốc tế.'
        }
      />

      <div className="about-grid">
        <section id="methodology" className="panel-card">
          <h3>{language === 'en' ? 'Methodology' : 'Phương pháp'}</h3>
          <p>
            {language === 'en'
              ? 'Content should be curated from reviewed cultural articles, linked with categories, regions, ethnic groups, references, media, and translation states. The product emphasises context-first explanation over quick facts.'
              : 'Nội dung cần được biên tập từ các bài viết văn hoá đã duyệt, gắn với danh mục, vùng văn hoá, dân tộc, nguồn tham khảo, media và trạng thái bản dịch. Sản phẩm ưu tiên giải thích theo bối cảnh thay vì chỉ đưa các fact ngắn.'}
          </p>
        </section>

        <section id="source-of-truth" className="panel-card">
          <h3>{language === 'en' ? 'Source of truth' : 'Nguồn sự thật'}</h3>
          <p>
            {language === 'en'
              ? 'Every article and AI answer should be traceable to reviewed knowledge objects, article references, and editorial governance. This is why the interface highlights reviewed content, references, and update history.'
              : 'Mỗi bài viết và câu trả lời AI cần truy vết được về các đối tượng tri thức đã duyệt, nguồn tham khảo bài viết và quy trình biên tập. Vì vậy giao diện phải làm nổi bật trạng thái kiểm duyệt, nguồn tham khảo và lịch sử cập nhật.'}
          </p>
        </section>

        <section className="panel-card">
          <h3>{language === 'en' ? 'AI boundaries' : 'Ranh giới của AI'}</h3>
          <p>
            {language === 'en'
              ? 'The AI layer should not invent cultural knowledge outside reviewed data. When evidence is incomplete, it should say so clearly and redirect users to verified articles.'
              : 'Tầng AI không được tự suy diễn tri thức văn hoá ngoài dữ liệu đã duyệt. Khi bằng chứng chưa đủ, hệ thống cần nói rõ và chuyển hướng người dùng tới các bài viết đã kiểm chứng.'}
          </p>
        </section>
      </div>
    </main>
  )
}
