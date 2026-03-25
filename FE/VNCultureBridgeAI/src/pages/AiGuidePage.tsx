import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { useOutletContext } from 'react-router-dom'
import { StatusBlock } from '../components/common/StatusBlock'
import { SectionHeader } from '../components/content/SectionHeader'
import { createChatMessage, createChatSession, getChatMessages } from '../services/api'
import type { ChatMessage, ChatSession, Language } from '../types/content'

type OutletContext = { language: Language }

const cannedAnswer = {
  en: {
    contextual: 'This answer is presented in a context-first style for international readers.',
    trust: 'Based on verified internal cultural sources',
    noData: 'If internal evidence is limited, the system should say so clearly rather than invent cultural facts.',
  },
  vi: {
    contextual: 'Câu trả lời được trình bày theo hướng đặt bối cảnh lên trước cho người dùng quốc tế.',
    trust: 'Dựa trên nguồn tri thức văn hoá nội bộ đã kiểm duyệt',
    noData: 'Nếu dữ liệu nội bộ còn hạn chế, hệ thống cần nói rõ thay vì tự suy diễn tri thức văn hoá.',
  },
} as const

export function AiGuidePage() {
  const { language } = useOutletContext<OutletContext>()
  const [session, setSession] = useState<ChatSession | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    createChatSession(language)
      .then((createdSession) => {
        setSession(createdSession)
        return getChatMessages(createdSession.id)
      })
      .then(setMessages)
      .catch((requestError) => setError(requestError instanceof Error ? requestError.message : 'Unable to initialize AI guide'))
  }, [language])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!session || !prompt.trim()) return

    try {
      const userMessage = await createChatMessage(session.id, {
        senderType: 'NGUOI_DUNG',
        language,
        content: prompt.trim(),
        isGrounded: true,
      })

      const aiMessage = await createChatMessage(session.id, {
        senderType: 'AI',
        language,
        content: `${prompt.trim()}\n\n${cannedAnswer[language].contextual}\n${cannedAnswer[language].trust}\n${cannedAnswer[language].noData}`,
        isGrounded: true,
        citations: [],
      })

      setMessages((current) => [...current, userMessage, aiMessage])
      setPrompt('')
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to send AI message')
    }
  }

  return (
    <main className="shell-section shell-container">
      <SectionHeader
        eyebrow={language === 'en' ? 'AI cultural guide' : 'Trợ lý AI văn hoá'}
        title={language === 'en' ? 'Ask culturally grounded questions' : 'Đặt câu hỏi văn hoá có căn cứ'}
        description={
          language === 'en'
            ? 'This workspace demonstrates a verified-knowledge AI layer with context-first explanation, gentle interpretation, and space for citations.'
            : 'Đây là không gian minh hoạ cho tầng AI dựa trên tri thức đã kiểm duyệt, giải thích theo bối cảnh, diễn giải nhẹ nhàng và có chỗ cho trích dẫn.'
        }
      />

      {error ? (
        <StatusBlock
          title={language === 'en' ? 'AI guide unavailable' : 'AI guide chưa sẵn sàng'}
          description={error}
          tone="error"
        />
      ) : null}

      <div className="ai-layout">
        <section className="panel-card chat-thread-card">
          <div className="chat-thread">
            {messages.length > 0 ? (
              messages.map((message) => (
                <article key={message.id} className={`chat-bubble ${message.senderType === 'AI' ? 'chat-bubble-ai' : 'chat-bubble-user'}`}>
                  <strong>{message.senderType === 'AI' ? 'AI' : language === 'en' ? 'You' : 'Bạn'}</strong>
                  <p>{message.content}</p>
                  {message.senderType === 'AI' ? (
                    <span className="trust-caption">
                      {language === 'en' ? 'Verified internal cultural knowledge mode' : 'Chế độ tri thức văn hoá nội bộ đã kiểm duyệt'}
                    </span>
                  ) : null}
                </article>
              ))
            ) : (
              <StatusBlock
                title={language === 'en' ? 'Start your AI cultural conversation' : 'Bắt đầu cuộc hội thoại văn hoá với AI'}
                description={
                  language === 'en'
                    ? 'Ask about customs, etiquette, beliefs, or a topic that feels unfamiliar.'
                    : 'Hãy hỏi về phong tục, ứng xử, tín ngưỡng hoặc một chủ đề bạn còn thấy xa lạ.'
                }
              />
            )}
          </div>

          <form className="ai-form" onSubmit={handleSubmit}>
            <textarea
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={language === 'en' ? 'Why do Vietnamese people burn incense? What should I understand respectfully?' : 'Vì sao người Việt thắp hương? Tôi nên hiểu điều này thế nào cho phù hợp?'}
            />
            <button type="submit" className="admin-button">
              {language === 'en' ? 'Send to AI guide' : 'Gửi tới AI'}
            </button>
          </form>
        </section>

        <aside className="panel-card trust-card">
          <SectionHeader
            eyebrow={language === 'en' ? 'AI answer principles' : 'Nguyên tắc trả lời AI'}
            title={language === 'en' ? 'Context-first, source-aware, culturally respectful' : 'Đặt bối cảnh lên trước, nhận biết nguồn, tôn trọng văn hoá'}
          />
          <ul className="trust-list">
            <li>{language === 'en' ? 'Use approved internal knowledge as the source of truth.' : 'Dùng tri thức nội bộ đã duyệt làm source of truth.'}</li>
            <li>{language === 'en' ? 'Show uncertainty when data is limited.' : 'Thể hiện rõ sự chưa chắc chắn khi dữ liệu còn hạn chế.'}</li>
            <li>{language === 'en' ? 'Handle culture-shock topics with gentle explanation mode.' : 'Xử lý chủ đề culture shock bằng chế độ giải thích nhẹ nhàng.'}</li>
          </ul>
        </aside>
      </div>
    </main>
  )
}
