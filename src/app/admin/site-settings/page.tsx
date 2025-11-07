'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminLayout from '@/components/admin/AdminLayout';
import { api } from '@/lib/api';
import type { SiteSetting } from '@/lib/api/siteSetting';

export default function SiteSettingsPage() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState<SiteSetting | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const response = await api.getSiteSettings();
      if (response.data) {
        setSettings(response.data);
      }
    } catch (err) {
      console.error('Failed to load site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (setting: SiteSetting) => {
    setSelectedSetting(setting);
    setShowViewModal(true);
  };

  const categories = [
    { value: 'all', label: 'All Settings', count: settings.length },
    { value: 'general', label: 'General', count: settings.filter(s => s.category === 'general').length },
    { value: 'sections', label: 'Sections', count: settings.filter(s => s.category === 'sections').length },
    { value: 'features', label: 'Features', count: settings.filter(s => s.category === 'features').length },
    { value: 'appearance', label: 'Appearance', count: settings.filter(s => s.category === 'appearance').length },
    { value: 'email', label: 'Email', count: settings.filter(s => s.category === 'email').length },
    { value: 'showcase', label: 'Showcase', count: settings.filter(s => s.category === 'showcase').length },
  ];

  const filteredSettings = selectedCategory === 'all'
    ? settings
    : settings.filter(s => s.category === selectedCategory);

  if (loading) {
    return (
      <ProtectedRoute requireSuperAdmin>
        <AdminLayout>
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-brand)]"></div>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
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
          <CreateSettingModal
            onClose={() => setShowCreateModal(false)}
            onSuccess={() => {
              setShowCreateModal(false);
              loadSettings();
            }}
          />
        )}

        {/* View/Edit Modal */}
        {showViewModal && selectedSetting && (
          <ViewSettingModal
            setting={selectedSetting}
            onClose={() => {
              setShowViewModal(false);
              setSelectedSetting(null);
            }}
            onSuccess={() => {
              setShowViewModal(false);
              setSelectedSetting(null);
              loadSettings();
            }}
          />
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
}

// Create Setting Modal Component
function CreateSettingModal({
  onClose,
  onSuccess,
}: {
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    key: '',
    category: 'general',
    value: '{\n  \n}',
    isPublic: true,
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const valueObject = JSON.parse(formData.value);
      await api.createSiteSetting({
        key: formData.key,
        category: formData.category,
        value: valueObject,
        isPublic: formData.isPublic,
        description: formData.description || undefined,
      });
      onSuccess();
    } catch (err) {
      console.error('Failed to create setting:', err);
      alert('Failed to create setting. Please check your JSON syntax.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
              Description
            </label>
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
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all disabled:opacity-50 font-medium shadow-lg"
            >
              {submitting ? 'Creating...' : 'Create Setting'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// View/Edit Setting Modal Component
function ViewSettingModal({
  setting,
  onClose,
  onSuccess,
}: {
  setting: SiteSetting;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    category: setting.category,
    value: JSON.stringify(setting.value, null, 2),
    isPublic: setting.isPublic,
    description: setting.description || '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const valueObject = JSON.parse(formData.value);
      await api.updateSiteSetting(setting.id, {
        category: formData.category,
        value: valueObject,
        isPublic: formData.isPublic,
        description: formData.description || undefined,
      });
      onSuccess();
    } catch (err) {
      console.error('Failed to update setting:', err);
      alert('Failed to update setting. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteSiteSetting(setting.id);
      onSuccess();
    } catch (err) {
      console.error('Failed to delete setting:', err);
      alert('Failed to delete setting');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-8 border-b border-[var(--color-border)]">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h2 className="text-3xl font-display font-bold text-[var(--color-text)] mb-2">
                {setting.key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </h2>
              <div className="flex items-center gap-3">
                <span className="text-sm px-3 py-1 rounded-full bg-[var(--color-bg-muted)] text-[var(--color-text-muted)] capitalize">
                  {setting.category}
                </span>
                {setting.isPublic ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    Public
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
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
          <div className="p-8 space-y-6">
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
                <div className="text-[var(--color-text)]">
                  {new Date(setting.createdAt).toLocaleString()}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                  Last Updated
                </label>
                <div className="text-[var(--color-text)]">
                  {new Date(setting.updatedAt).toLocaleString()}
                </div>
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
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Category
              </label>
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

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Configuration Value (JSON)
              </label>
              <textarea
                required
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                className="w-full px-4 py-3 border border-[var(--color-border)] rounded-xl bg-[var(--color-bg)] text-[var(--color-text)] font-mono text-sm leading-relaxed focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent outline-none"
                rows={16}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[var(--color-text)] mb-3">
                Description
              </label>
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

            <div className="flex gap-3 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="flex-1 px-6 py-3 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all disabled:opacity-50 font-medium shadow-lg"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
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
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
