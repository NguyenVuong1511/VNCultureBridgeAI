export type Language = 'vi' | 'en'

export type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  meta?: {
    page?: number
    pageSize?: number
    total?: number
  }
}

export type ArticleSummary = {
  id: number
  slug: string
  originalLanguage?: string
  type: string
  status?: string
  sensitivityLevel?: string
  reviewLevel?: string
  featured?: boolean
  publishedAt?: string
  language?: string
  title: string
  summary: string
  introduction?: string
  origin?: string
  culturalMeaning?: string
  usageContext?: string
  content?: string
  primaryMediaUrl?: string | null
  relationType?: string
}

export type Category = {
  id: number
  code: string
  parentId: number | null
  sortOrder?: number
  isActive?: boolean
  language?: string
  name: string
  description?: string
  children?: Category[]
}

export type Region = {
  id: number
  code: string
  parentId: number | null
  type?: string
  geoJson?: string | null
  sortOrder?: number
  isActive?: boolean
  language?: string
  name: string
  description?: string
}

export type ArticleReference = {
  id: number
  type: string
  title: string
  author?: string
  publisher?: string
  publishYear?: number
  url?: string
  trustLevel?: string
  isPrimary?: boolean
  citationNote?: string
  pageFrom?: number
  pageTo?: number
}

export type ArticleMedia = {
  id: number
  type: string
  url: string
  altText?: string
  copyright?: string
  isPrimary?: boolean
  displayOrder?: number
  title?: string
  description?: string
}

export type NamedRelation = {
  id: number
  code: string
  relationType?: string
  isPrimary?: boolean
  name: string
}

export type ArticleDetail = ArticleSummary & {
  canSyncAI?: boolean
  aiSyncStatus?: string
  cultureShockNote?: string
  seoTitle?: string
  seoDescription?: string
  categories: NamedRelation[]
  regions: NamedRelation[]
  ethnicGroups: NamedRelation[]
  relatedArticles: ArticleSummary[]
  references: ArticleReference[]
  media: ArticleMedia[]
}

export type RegionArticlesResponse = {
  region: Region
  items: ArticleSummary[]
}

export type CategoryArticlesResponse = {
  category: Category
  items: ArticleSummary[]
}

export type ChatSession = {
  id: string
  sessionId?: string | null
  language?: string | null
  countryCode?: string | null
  title?: string | null
  createdAt?: string
}

export type Citation = {
  id?: number
  knowledgeDocumentId?: number
  excerpt?: string
  sourceTitle?: string
}

export type ChatMessage = {
  id: number
  senderType: 'NGUOI_DUNG' | 'AI' | 'HE_THONG'
  orderIndex?: number
  language?: string | null
  content: string
  intentCode?: string | null
  confidenceScore?: number | null
  answeredWell?: boolean | null
  isOutOfScope?: boolean
  isSensitive?: boolean
  isGrounded?: boolean
  responseTimeMs?: number | null
  promptTokens?: number | null
  completionTokens?: number | null
  citations?: Citation[]
}
