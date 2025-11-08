'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useArticles, useDeleteArticle } from '@/hooks'
import { CreateArticleModal } from '@/components/admin/articles'
import type { Article } from '@/types'

export default function ArticlesPage() {
  const { data, isLoading, error, refetch } = useArticles()
  const articles = ((data as { articles?: Article[] })?.articles || []) as Article[]
  const { mutate: deleteArticle } = useDeleteArticle()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCloseModal = () => {
    setShowCreateModal(false)
  }

  const handleSuccess = () => {
    handleCloseModal()
    refetch()
  }

  const handleDeleteArticle = async (articleId: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return

    deleteArticle(articleId, {
      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        alert('Failed to delete article: ' + error.message)
      },
    })
  }

  // Only show loading on initial load, not on cached data
  if (isLoading && articles.length === 0) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    )
  }

  if (error) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl text-[var(--color-text-muted)] mb-4">Failed to load articles</p>
            <p className="text-[var(--color-text-muted)] mb-6">{error.message}</p>
            <button
              onClick={() => refetch()}
              className="px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all font-medium"
            >
              Retry
            </button>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">
                Articles
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Manage your blog posts and content
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] 
                       text-white font-medium rounded-lg transition-all"
            >
              + New Article
            </button>
          </div>

          {/* Articles List */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand)] mx-auto"></div>
                <p className="mt-4 text-[var(--color-text-muted)]">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[var(--color-text-muted)]">No articles found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {articles.map((article: Article) => (
                      <tr key={article.id} className="hover:bg-[var(--color-bg)] transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-[var(--color-text)]">
                            {article.title}
                          </div>
                          <div className="text-sm text-[var(--color-text-muted)] truncate max-w-md">
                            {article.content.substring(0, 100)}...
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${article.isPublished ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}
                          `}>
                            {article.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)]">
                          {new Date(article.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                          <button
                            onClick={() => handleDeleteArticle(article.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Create Article Modal */}
        {showCreateModal && <CreateArticleModal onClose={handleCloseModal} onSuccess={handleSuccess} />}
      </AdminLayout>
    </ProtectedRoute>
  )
}
