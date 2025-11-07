'use client'

import { useState } from 'react'
import { useCreateSiteSetting } from '@/hooks'

interface CreateSettingModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateSettingModal({ onClose, onSuccess }: CreateSettingModalProps) {
  const { mutate: createSetting, isPending } = useCreateSiteSetting()
  const [formData, setFormData] = useState({
    key: '',
    category: 'general',
    value: '{\n  \n}',
    isPublic: true,
    description: '',
  })

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
    } catch (err) {
      console.error('Failed to parse JSON:', err)
      alert('Failed to create setting. Please check your JSON syntax.')
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="p-8 border-b border-[var(--color-border)]">
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

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
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

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
              Configuration Value (JSON) <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-sm leading-relaxed focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
              rows={12}
              placeholder='{\n  "title": "Hero Section",\n  "subtitle": "Your subtitle here",\n  "enabled": true\n}'
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              Enter valid JSON. Use double quotes for strings.
            </p>
          </div>

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

          <div className="flex gap-3 pt-6 border-t border-[var(--color-border)]">
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
        </form>
      </div>
    </div>
  )
}
