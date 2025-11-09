'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useUsers } from '@/hooks/useUsers'
import { useMemo } from 'react'

interface User {
  id: string
  username?: string
  email: string
  role: string
}

export default function AdminDashboard() {
  const { data: usersData, isLoading } = useUsers(1, 5)  // Only fetch 5 users for dashboard

  const users = useMemo(() => usersData?.data || [], [usersData?.data])
  const totalUsers = useMemo(() => usersData?.pagination?.total || 0, [usersData?.pagination?.total])

  // Memoize computed stats
  const stats = useMemo(() => ({
    totalUsers,
    adminCount: users.filter((u: User) => u.role === 'admin').length,
    regularUserCount: users.filter((u: User) => u.role !== 'admin').length,
    recentUsers: users.slice(0, 5),
  }), [totalUsers, users])

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="space-y-6">
          {/* Welcome Section */}
          <div>
            <h1 className="text-3xl font-display font-bold text-[var(--color-text)] mb-2">
              Welcome back! 👋
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
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Total Users</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">{isLoading ? '-' : stats.totalUsers}</p>
                </div>
                <div className="text-4xl">👥</div>
              </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Admins</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">{isLoading ? '-' : stats.adminCount}</p>
                </div>
                <div className="text-4xl">🛡️</div>
              </div>
            </div>

            <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--color-text-muted)] mb-1">Regular Users</p>
                  <p className="text-3xl font-bold text-[var(--color-text)]">{isLoading ? '-' : stats.regularUserCount}</p>
                </div>
                <div className="text-4xl">👤</div>
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
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg p-6">
            <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-4">
              Recent Users
            </h2>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-[var(--color-text-muted)]">Loading users...</p>
              </div>
            ) : stats.recentUsers.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-[var(--color-text-muted)]">No users yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {stats.recentUsers.map((user: User) => (
                  <div key={user.id} className="flex items-center justify-between p-3 bg-[var(--color-bg)] rounded border border-[var(--color-border)]">
                    <div className="flex-1">
                      <p className="font-medium text-[var(--color-text)]">{user.username || user.email}</p>
                      <p className="text-sm text-[var(--color-text-muted)]">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.role === 'admin'
                        ? 'bg-[var(--color-brand)] text-white'
                        : 'bg-[var(--color-border)] text-[var(--color-text)]'
                        }`}>
                        {user.role || 'user'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}
