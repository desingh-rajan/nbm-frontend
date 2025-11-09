'use client'

import { useState, useEffect } from 'react'
import { useUpdateSiteSetting, useDeleteSiteSetting } from '@/hooks'
import type { SiteSetting } from '@/lib/api'

// Helper to render nested key-value inputs
interface KeyValueInputProps {
  data: Record<string, unknown>
  onChange: (newData: Record<string, unknown>) => void
  path?: string
}

function KeyValueInputs({ data, onChange, path = '' }: KeyValueInputProps) {
  if (typeof data !== 'object' || data === null) {
    return null
  }

  const handleFieldChange = (key: string, value: unknown) => {
    onChange({ ...data, [key]: value })
  }

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([key, value]) => {
        const fieldPath = path ? `${path}.${key}` : key
        const isObject = typeof value === 'object' && value !== null && !Array.isArray(value)
        const isArray = Array.isArray(value)

        return (
          <div key={fieldPath} className={isObject ? 'pl-0' : ''}>
            {isObject ? (
              <div className="border-l-4 border-[var(--color-brand)] pl-4 space-y-3">
                <label className="block text-sm font-semibold text-[var(--color-text)] capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <KeyValueInputs
                  data={value as Record<string, unknown>}
                  onChange={(newValue) => handleFieldChange(key, newValue)}
                  path={fieldPath}
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-[var(--color-text)] mb-2 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type={typeof value === 'number' ? 'number' : typeof value === 'boolean' ? 'checkbox' : 'text'}
                  value={typeof value === 'boolean' ? undefined : String(value)}
                  checked={typeof value === 'boolean' ? value : undefined}
                  onChange={(e) => {
                    let newValue: string | number | boolean | string[] = e.target.value
                    if (typeof value === 'number') {
                      newValue = parseFloat(e.target.value) || 0
                    } else if (typeof value === 'boolean') {
                      newValue = e.target.checked
                    } else if (isArray) {
                      newValue = e.target.value.split(',').map(v => v.trim())
                    }
                    handleFieldChange(key, newValue)
                  }}
                  className={`w-full px-4 py-2.5 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none ${typeof value === 'boolean' ? 'w-5 h-5' : ''
                    }`}
                  placeholder={isArray ? 'Comma-separated values' : ''}
                />
                {isArray && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-1">
                    Current: {JSON.stringify(value)}
                  </p>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface ViewSettingModalProps {
  setting: SiteSetting
  onClose: () => void
  onSuccess: () => void
}

export function ViewSettingModal({ setting, onClose, onSuccess }: ViewSettingModalProps) {
  const { mutate: updateSetting, isPending: isUpdating } = useUpdateSiteSetting()
  const { mutate: deleteSetting, isPending: isDeleting } = useDeleteSiteSetting()
  const [isEditing, setIsEditing] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual') // Toggle between visual and JSON editing
  const [formData, setFormData] = useState({
    category: setting.category,
    value: JSON.stringify(setting.value, null, 2),
    visualValue: setting.value, // Parsed object for visual editing
    isPublic: setting.isPublic,
    description: setting.description || '',
  })

  // Sync visual changes to JSON
  useEffect(() => {
    if (editMode === 'visual') {
      try {
        setFormData(prev => ({
          ...prev,
          value: JSON.stringify(prev.visualValue, null, 2)
        }))
      } catch {
        // Ignore serialization errors
      }
    }
  }, [formData.visualValue, editMode])

  // Sync JSON changes to visual
  const handleJsonChange = (newJson: string) => {
    setFormData(prev => ({ ...prev, value: newJson }))
    try {
      const parsed = JSON.parse(newJson)
      setFormData(prev => ({ ...prev, visualValue: parsed }))
    } catch {
      // Invalid JSON, keep visual value unchanged
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const valueObject = JSON.parse(formData.value)
      updateSetting(
        {
          id: setting.id,
          data: {
            category: formData.category,
            value: valueObject,
            isPublic: formData.isPublic,
            description: formData.description || undefined,
          },
        },
        {
          onSuccess: () => {
            onSuccess()
          },
          onError: (error) => {
            console.error('Failed to update setting:', error)
            alert('Failed to update setting: ' + error.message)
          },
        }
      )
    } catch {
      alert('Failed to update setting. Please check your JSON syntax.')
    }
  }

  const handleDelete = async () => {
    deleteSetting(setting.id, {
      onSuccess: () => {
        onSuccess()
      },
      onError: (error) => {
        console.error('Failed to delete setting:', error)
        alert('Failed to delete setting: ' + error.message)
      },
    })
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-7xl w-full h-[95vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold text-[var(--color-text)] mb-2">
                {setting.key.split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] capitalize">
                  {setting.category}
                </span>
                {setting.isPublic ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Private
                  </span>
                )}
              </div>
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

        {!isEditing ? (
          <div className="p-6 space-y-6 overflow-y-auto flex-1">
            {setting.description && (
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  Description
                </label>
                <p className="text-[var(--color-text)] text-lg">{setting.description}</p>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                Configuration Value
              </label>
              <pre className="bg-[var(--color-bg)] p-6 rounded-xl border border-[var(--color-border)] overflow-x-auto text-sm font-mono leading-relaxed">
                {JSON.stringify(setting.value, null, 2)}
              </pre>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[var(--color-border)]">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  Created
                </label>
                <div className="text-[var(--color-text)]">{new Date(setting.createdAt).toLocaleString()}</div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  Last Updated
                </label>
                <div className="text-[var(--color-text)]">{new Date(setting.updatedAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="flex gap-3 pt-6 border-t border-[var(--color-border)]">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all font-medium shadow-lg hover:shadow-xl"
              >
                Edit Setting
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="px-6 py-3 text-red-600 hover:text-white dark:hover:text-[#0a0a0a] hover:bg-red-600 border border-red-300 rounded-lg transition-all font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                >
                  <option value="general">General</option>
                  <option value="email">Email</option>
                  <option value="appearance">Appearance</option>
                  <option value="features">Features</option>
                  <option value="sections">Sections</option>
                  <option value="showcase">Showcase</option>
                </select>
              </div>

              {/* Toggle between Visual and JSON editing */}
              <div className="flex gap-2 border-b border-[var(--color-border)]">
                <button
                  type="button"
                  onClick={() => setEditMode('visual')}
                  className={`px-4 py-2 font-medium transition-all ${editMode === 'visual'
                    ? 'text-[var(--color-brand)] border-b-2 border-[var(--color-brand)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                >
                  📝 Visual Editor
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode('json')}
                  className={`px-4 py-2 font-medium transition-all ${editMode === 'json'
                    ? 'text-[var(--color-brand)] border-b-2 border-[var(--color-brand)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
                    }`}
                >
                  { } JSON Editor
                </button>
              </div>

              {editMode === 'visual' ? (
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-4">
                    Configuration Value
                  </label>
                  <div className="bg-[var(--color-bg)] p-6 rounded-xl border border-[var(--color-border)] max-h-[50vh] overflow-y-auto">
                    <KeyValueInputs
                      data={formData.visualValue}
                      onChange={(newValue) => setFormData(prev => ({ ...prev, visualValue: newValue }))}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                    Configuration Value (JSON)
                  </label>
                  <textarea
                    required
                    value={formData.value}
                    onChange={(e) => handleJsonChange(e.target.value)}
                    className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-sm leading-relaxed focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                    rows={12}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                  rows={2}
                  placeholder="Describe what this setting controls..."
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--color-bg-muted)] rounded-xl">
                <input
                  type="checkbox"
                  id="isPublicEdit"
                  checked={formData.isPublic}
                  onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                  className="w-5 h-5 text-[var(--color-brand)] rounded focus:ring-2 focus:ring-[var(--color-brand)]"
                />
                <label htmlFor="isPublicEdit" className="text-sm font-medium text-[var(--color-text)]">
                  Make this setting publicly accessible (visible to frontend)
                </label>
              </div>
            </div>

            {/* Footer with buttons - fixed at bottom */}
            <div className="p-6 border-t border-[var(--color-border)] flex-shrink-0 bg-[var(--color-surface)]">
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 px-6 py-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all disabled:opacity-50 font-medium shadow-lg"
                >
                  {isUpdating ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center rounded-2xl">
            <div className="bg-[var(--color-surface)] p-8 rounded-xl max-w-md mx-4 shadow-2xl">
              <h3 className="text-2xl font-bold text-[var(--color-text)] mb-3">Delete Setting?</h3>
              <p className="text-[var(--color-text-muted)] mb-6">
                Are you sure you want to delete <strong>{setting.key}</strong>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2.5 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
