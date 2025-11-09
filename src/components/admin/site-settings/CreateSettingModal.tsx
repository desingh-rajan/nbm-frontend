'use client'

import { useState, useEffect } from 'react'
import { useCreateSiteSetting } from '@/hooks'

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

  const handleAddField = () => {
    const newKey = prompt('Enter field name:')
    if (newKey && !data[newKey]) {
      onChange({ ...data, [newKey]: '' })
    }
  }

  const handleRemoveField = (key: string) => {
    const newData = { ...data }
    delete newData[key]
    onChange(newData)
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
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-semibold text-[var(--color-text)] capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveField(key)}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
                <KeyValueInputs
                  data={value as Record<string, unknown>}
                  onChange={(newValue) => handleFieldChange(key, newValue)}
                  path={fieldPath}
                />
              </div>
            ) : (
              <div className="flex gap-2 items-start">
                <div className="flex-1">
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
                <button
                  type="button"
                  onClick={() => handleRemoveField(key)}
                  className="mt-8 text-red-500 hover:text-red-700 text-sm"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )
      })}
      <button
        type="button"
        onClick={handleAddField}
        className="text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] font-medium"
      >
        + Add Field
      </button>
    </div>
  )
}

interface CreateSettingModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateSettingModal({ onClose, onSuccess }: CreateSettingModalProps) {
  const { mutate: createSetting, isPending } = useCreateSiteSetting()
  const [editMode, setEditMode] = useState<'visual' | 'json'>('visual')
  const [formData, setFormData] = useState({
    key: '',
    category: 'general',
    value: '{\n  \n}',
    visualValue: {} as Record<string, unknown>,
    isPublic: true,
    description: '',
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
      createSetting(
        {
          key: formData.key,
          category: formData.category,
          value: valueObject,
          isPublic: formData.isPublic,
          description: formData.description || undefined,
        },
        {
          onSuccess: () => {
            onSuccess()
          },
          onError: (error) => {
            console.error('Failed to create setting:', error)
            alert('Failed to create setting: ' + error.message)
          },
        }
      )
    } catch {
      alert('Failed to create setting. Please check your JSON syntax.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-6xl w-full h-[95vh] flex flex-col shadow-2xl">
        <div className="p-6 border-b border-[var(--color-border)] flex-shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-display font-bold text-[var(--color-text)]">
                Create New Setting
              </h2>
              <p className="text-[var(--color-text-muted)] mt-1">
                Add a new configuration setting to your site
              </p>
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

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="p-6 space-y-5 overflow-y-auto flex-1">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Setting Key <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.key}
                onChange={(e) => setFormData({ ...formData, key: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                placeholder="hero_section"
              />
              <p className="text-xs text-[var(--color-text-muted)] mt-2">
                Use snake_case (e.g., hero_section, contact_info)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
              >
                <option value="general">General - Basic site information</option>
                <option value="sections">Sections - Homepage sections</option>
                <option value="features">Features - Feature flags and toggles</option>
                <option value="appearance">Appearance - Visual settings</option>
                <option value="email">Email - Email configurations</option>
                <option value="showcase">Showcase - Portfolio and showcase items</option>
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
                  Configuration Value <span className="text-red-500">*</span>
                </label>
                <div className="bg-[var(--color-bg)] p-6 rounded-xl border border-[var(--color-border)] max-h-[45vh] overflow-y-auto">
                  <KeyValueInputs
                    data={formData.visualValue}
                    onChange={(newValue) => setFormData(prev => ({ ...prev, visualValue: newValue }))}
                  />
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-2">
                  Add fields using the &ldquo;+ Add Field&rdquo; button. Nested objects will be shown with indentation.
                </p>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                  Configuration Value (JSON) <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.value}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-sm leading-relaxed focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                  rows={10}
                  placeholder={'{\n  title: Hero Section,\n  subtitle: Your subtitle here,\n  enabled: true\n}'}
                />
                <p className="text-xs text-[var(--color-text-muted)] mt-2">
                  Enter valid JSON. Use double quotes for strings.
                </p>
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
                id="isPublic"
                checked={formData.isPublic}
                onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                className="w-5 h-5 text-[var(--color-brand)] rounded focus:ring-2 focus:ring-[var(--color-brand)]"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-[var(--color-text)]">
                Make this setting publicly accessible (visible to frontend)
              </label>
            </div>
          </div>

          {/* Footer with buttons - fixed at bottom */}
          <div className="p-6 border-t border-[var(--color-border)] flex-shrink-0 bg-[var(--color-surface)]">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="flex-1 px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all disabled:opacity-50 font-medium shadow-lg"
              >
                {isPending ? 'Creating...' : 'Create Setting'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
