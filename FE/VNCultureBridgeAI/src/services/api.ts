import type {
  ApiEnvelope,
  ArticleDetail,
  ArticleSummary,
  Category,
  CategoryArticlesResponse,
  ChatMessage,
  ChatSession,
  Language,
  Region,
  RegionArticlesResponse,
} from '../types/content'

const API_BASE_URL = 'http://localhost:3000/api/v1'

async function request<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const json = (await response.json()) as ApiEnvelope<T>

  if (!response.ok || !json.success) {
    throw new Error(json.message || 'API request failed')
  }

  return json
}

export async function getFeaturedArticles(language: Language) {
  const params = new URLSearchParams({ lang: language, featured: 'true', page: '1', pageSize: '6' })
  const result = await request<ArticleSummary[]>(`/articles?${params.toString()}`)
  return result.data
}

export async function getArticles(language: Language, options?: Record<string, string>) {
  const params = new URLSearchParams({ lang: language, page: '1', pageSize: '12', ...(options ?? {}) })
  return request<ArticleSummary[]>(`/articles?${params.toString()}`)
}

export async function getArticleBySlug(language: Language, slug: string) {
  const params = new URLSearchParams({ lang: language })
  const result = await request<ArticleDetail>(`/articles/slug/${slug}?${params.toString()}`)
  return result.data
}

export async function getCategories(language: Language) {
  const params = new URLSearchParams({ lang: language })
  const result = await request<Category[]>(`/categories?${params.toString()}`)
  return result.data
}

export async function getCategoryArticles(language: Language, categoryId: string) {
  const params = new URLSearchParams({ lang: language, page: '1', pageSize: '8' })
  return request<CategoryArticlesResponse>(`/categories/${categoryId}/articles?${params.toString()}`)
}

export async function getRegions(language: Language) {
  const params = new URLSearchParams({ lang: language })
  const result = await request<Region[]>(`/regions?${params.toString()}`)
  return result.data
}

export async function getRegionArticles(language: Language, regionId: string) {
  const params = new URLSearchParams({ lang: language, page: '1', pageSize: '8' })
  return request<RegionArticlesResponse>(`/regions/${regionId}/articles?${params.toString()}`)
}

export async function searchArticles(language: Language, query: string) {
  const params = new URLSearchParams({ lang: language, q: query, page: '1', pageSize: '10' })
  return request<ArticleSummary[]>(`/search?${params.toString()}`)
}

export async function createFeedback(payload: {
  type: string
  articleId?: number | null
  messageId?: number | null
  rating?: number | null
  isHelpful?: boolean | null
  content: string
}) {
  return request('/feedback', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function createChatSession(language: Language) {
  const result = await request<ChatSession>('/ai-chat/sessions', {
    method: 'POST',
    body: JSON.stringify({ language }),
  })
  return result.data
}

export async function getChatMessages(sessionId: string) {
  const result = await request<ChatMessage[]>(`/ai-chat/sessions/${sessionId}/messages`)
  return result.data
}

export async function createChatMessage(
  sessionId: string,
  payload: {
    senderType: 'NGUOI_DUNG' | 'AI'
    language: Language
    content: string
    isGrounded?: boolean
    isSensitive?: boolean
    citations?: Array<{ knowledgeDocumentId?: number; excerpt?: string; sourceTitle?: string }>
  },
) {
  const result = await request<ChatMessage>(`/ai-chat/sessions/${sessionId}/messages`, {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  return result.data
}
