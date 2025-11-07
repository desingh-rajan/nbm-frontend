// Central type definitions for the application

/**
 * User entity - represents a user in the system
 */
export interface User {
  id: string
  email: string
  username: string
  role: 'superadmin' | 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

/**
 * Article entity - represents a blog post/article
 */
export interface Article {
  id: string
  title: string
  content: string
  isPublished: boolean
  createdAt: string
  updatedAt: string
}

/**
 * Site Setting entity - represents configuration settings
 */
export interface SiteSetting {
  id: number
  key: string
  category: string
  value: Record<string, unknown>
  isPublic: boolean
  description?: string
  createdAt: string
  updatedAt: string
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
  data?: T
  error?: string
  message?: string
}
