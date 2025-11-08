'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useSiteSettings } from '@/hooks'
import { CreateSettingModal, ViewSettingModal } from '@/components/admin/site-settings'
import type { SiteSetting } from '@/lib/api/siteSetting'

export default function SiteSettingsPage() {
  const { data, isLoading, error, refetch } = useSiteSettings()
  const settings = (Array.isArray(data) ? data : ((data as unknown as { siteSettings?: SiteSetting[] })?.siteSettings || [])) as SiteSetting[]
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedSetting, setSelectedSetting] = useState<SiteSetting | null>(null)
  const [showViewModal, setShowViewModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const handleView = (setting: SiteSetting) => {
    setSelectedSetting(setting)
    setShowViewModal(true)
  }

  const handleCloseModals = () => {
    setShowCreateModal(false)
    setShowViewModal(false)
    setSelectedSetting(null)
  }

  const handleSuccess = () => {
    handleCloseModals()
    refetch()
  }

  const categories = [
    { value: 'all', label: 'All Settings', count: settings.length },
    { value: 'general', label: 'General', count: settings.filter((s) => s.category === 'general').length },
    { value: 'sections', label: 'Sections', count: settings.filter((s) => s.category === 'sections').length },
    { value: 'features', label: 'Features', count: settings.filter((s) => s.category === 'features').length },
    { value: 'appearance', label: 'Appearance', count: settings.filter((s) => s.category === 'appearance').length },
    { value: 'email', label: 'Email', count: settings.filter((s) => s.category === 'email').length },
    { value: 'showcase', label: 'Showcase', count: settings.filter((s) => s.category === 'showcase').length },
  ]

  const filteredSettings =
    selectedCategory === 'all' ? settings : settings.filter((s) => s.category === selectedCategory)

  // Only show loading on initial load, not on cached data
  if (isLoading && settings.length === 0) {
    return (
      <ProtectedRoute requireSuperAdmin>
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
      <ProtectedRoute requireSuperAdmin>
        <AdminLayout>
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-xl text-[var(--color-text-muted)] mb-4">Failed to load settings</p>
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
    <ProtectedRoute requireSuperAdmin>
      <AdminLayout>
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-display font-bold text-[var(--color-text)] mb-2">
                Site Settings
              </h1>
              <p className="text-lg text-[var(--color-text-muted)]">
                Configure your website content and behavior
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white dark:text-[#0a0a0a] px-8 py-3 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl"
            >
              + New Setting
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 pb-2 border-b border-[var(--color-border)]">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === cat.value
                  ? 'bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] shadow-md'
                  : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] hover:bg-[var(--color-bg-muted)] border border-[var(--color-border)]'
                  }`}
              >
                {cat.label} <span className="text-sm opacity-75">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Settings Grid - 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {filteredSettings.map((setting) => (
              <div
                key={setting.id}
                onClick={() => handleView(setting)}
                className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg p-4 hover:border-[var(--color-brand)] hover:shadow-md transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-semibold text-[var(--color-text)] group-hover:text-[var(--color-brand)] transition-colors truncate">
                        {setting.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </h3>
                      <span className="text-xs font-medium px-2 py-0.5 rounded bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] capitalize flex-shrink-0">
                        {setting.category}
                      </span>
                    </div>
                    {setting.description && (
                      <p className="text-sm text-[var(--color-text-muted)] line-clamp-1">
                        {setting.description}
                      </p>
                    )}
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {setting.isPublic ? (
                      <span className="flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                        Public
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-medium bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        Private
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleView(setting);
                      }}
                      className="text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] font-medium text-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredSettings.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">⚙️</div>
              <p className="text-xl text-[var(--color-text-muted)] mb-2">No settings found</p>
              <p className="text-[var(--color-text-muted)]">
                {selectedCategory === 'all'
                  ? 'Click "New Setting" to create your first setting'
                  : `No settings in the ${selectedCategory} category`
                }
              </p>
            </div>
          )}
        </div>

        {/* Create Modal */}
        {showCreateModal && (
          <CreateSettingModal onClose={handleCloseModals} onSuccess={handleSuccess} />
        )}

        {/* View/Edit Modal */}
        {showViewModal && selectedSetting && (
          <ViewSettingModal setting={selectedSetting} onClose={handleCloseModals} onSuccess={handleSuccess} />
        )}
      </AdminLayout>
    </ProtectedRoute>
  )
}
