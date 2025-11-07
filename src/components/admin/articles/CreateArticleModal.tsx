'use client'

import { useState } from 'react'
import { useCreateArticle } from '@/hooks'

interface CreateArticleModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateArticleModal({ onClose, onSuccess }: CreateArticleModalProps) {
  const { mutate: createArticle, isPending } = useCreateArticle()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    published: false,
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    createArticle(
      {
        title: formData.title,
        content: formData.content,
        published: formData.published,
      },
      {
        onSuccess: () => {
          onSuccess()
        },
        onError: (error) => {
          setError(error.message)
        },
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[var(--color-border)]">
        <div className="p-8 border-b border-[var(--color-border)]">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-display font-bold text-[var(--color-text)]">Create New Article</h2>
              <p className="text-[var(--color-text-muted)] mt-1">Write and publish a new blog post</p>
            </div>
            <button
              onClick={onClose}
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent text-lg font-medium"
              placeholder="Enter article title..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
              Content <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={12}
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent leading-relaxed"
              placeholder="Write your article content here..."
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Supports Markdown formatting
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-muted)] rounded-xl">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-5 h-5 text-[var(--color-brand)] rounded focus:ring-2 focus:ring-[var(--color-brand)]"
            />
            <label htmlFor="published" className="text-sm font-medium text-[var(--color-text)]">
              Publish immediately (make article visible to public)
            </label>
          </div>

          <div className="flex gap-3 pt-6 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-6 py-3 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white dark:text-[#0a0a0a] rounded-lg transition-all disabled:opacity-50 font-medium shadow-lg"
            >
              {isPending ? 'Creating...' : formData.published ? 'Create & Publish' : 'Save as Draft'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
