'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useAuth } from '@/hooks'

export default function AdminDashboard() {
  const { user, isSuperAdmin } = useAuth()

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-display font-bold text-[var(--color-text)] mb-2">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-[var(--color-text-muted)]">
              Here&apos;s what&apos;s happening with your site today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Total Articles</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">0</p>
                </div>
                <div className="text-4xl">📝</div>
              </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Published</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">0</p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Drafts</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">0</p>
                </div>
                <div className="text-4xl">📄</div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/articles/new"
                className="flex items-center gap-3 p-4 bg-[var(--color-bg)] hover:bg-[var(--color-brand)] 
                         hover:text-white border border-[var(--color-border)] rounded-lg transition-all group"
              >
                <span className="text-2xl">➕</span>
                <div>
                  <p className="font-medium">New Article</p>
                  <p className="text-sm opacity-75">Create a new post</p>
                </div>
              </a>

              {isSuperAdmin && (
                <a
                  href="/admin/users"
                  className="flex items-center gap-3 p-4 bg-[var(--color-bg)] hover:bg-[var(--color-brand)] 
                           hover:text-white border border-[var(--color-border)] rounded-lg transition-all group"
                >
                  <span className="text-2xl">👥</span>
                  <div>
                    <p className="font-medium">Manage Users</p>
                    <p className="text-sm opacity-75">Add or edit users</p>
                  </div>
                </a>
              )}

              <a
                href="/admin/settings"
                className="flex items-center gap-3 p-4 bg-[var(--color-bg)] hover:bg-[var(--color-brand)] 
                         hover:text-white border border-[var(--color-border)] rounded-lg transition-all group"
              >
                <span className="text-2xl">⚙️</span>
                <div>
                  <p className="font-medium">Settings</p>
                  <p className="text-sm opacity-75">Configure your account</p>
                </div>
              </a>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-4">
              Recent Activity
            </h2>
            <div className="text-center py-8">
              <p className="text-[var(--color-text-muted)]">No recent activity</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
