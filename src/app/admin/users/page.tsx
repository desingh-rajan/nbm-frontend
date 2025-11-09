'use client'

import { useState, useMemo, useCallback } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'
import { useUsers, useDeleteUser } from '@/hooks'
import UserRow from '@/components/admin/users/UserRow'
import { CreateUserModal } from '@/components/admin/users'
import type { User } from '@/types'

interface PaginationInfo {
  page?: number
  limit?: number
  total?: number
  totalPages?: number
  hasNext?: boolean
  hasPrev?: boolean
}

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const limit = 10
  const { data, isLoading, error, refetch } = useUsers(page, limit)

  const users = useMemo(() => ((data as { data?: User[] })?.data || []) as User[], [data])
  const pagination = useMemo(() => (data as { pagination?: PaginationInfo })?.pagination || {} as PaginationInfo, [data])

  const { mutate: deleteUser } = useDeleteUser()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleCloseModal = useCallback(() => {
    setShowCreateModal(false)
  }, [])

  const handleSuccess = useCallback(() => {
    handleCloseModal()
    refetch()
  }, [handleCloseModal, refetch])

  const handleDeleteUser = useCallback(async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return

    deleteUser(userId, {
      onSuccess: () => {
        refetch()
      },
      onError: (error) => {
        alert('Failed to delete user: ' + error.message)
      },
    })
  }, [deleteUser, refetch])

  return (
    <ProtectedRoute requireSuperAdmin>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-display font-bold text-[var(--color-text)]">
                User Management
              </h1>
              <p className="text-[var(--color-text-muted)] mt-1">
                Manage admin and user accounts
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] 
                       text-white font-medium rounded-lg transition-all"
            >
              + Add User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--color-brand)] mx-auto"></div>
                <p className="mt-4 text-[var(--color-text-muted)]">Loading users...</p>
              </div>
            ) : error ? (
              <div className="p-8">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-xl text-[var(--color-text-muted)] mb-4">Failed to load users</p>
                  <p className="text-[var(--color-text-muted)] mb-6">{error.message}</p>
                  <button
                    onClick={() => refetch()}
                    className="px-6 py-3 bg-[var(--color-brand)] text-white dark:text-[#0a0a0a] rounded-lg hover:bg-[var(--color-brand-dark)] transition-all font-medium"
                  >
                    Retry
                  </button>
                </div>
              </div>
            ) : users.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[var(--color-text-muted)]">No users found</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">
                        Role
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
                    {users.map((user: User) => (
                      <UserRow
                        key={user.id}
                        user={user}
                        onDelete={handleDeleteUser}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {(pagination.totalPages ?? 0) > 1 && (
            <div className="flex items-center justify-between p-4 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg">
              <div className="text-sm text-[var(--color-text-muted)]">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, pagination.total ?? 0)} of {pagination.total ?? 0} users
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={!pagination.hasPrev}
                  className="px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                {/* Smart pagination - show max 5 buttons */}
                <div className="flex items-center gap-1">
                  {(() => {
                    const pages: (number | string)[] = []
                    const maxButtons = 5
                    const totalPages = pagination.totalPages ?? 1

                    if (totalPages <= maxButtons) {
                      // Show all pages if 5 or fewer
                      for (let i = 1; i <= totalPages; i++) pages.push(i)
                    } else {
                      // Show: first, current range, last
                      pages.push(1)
                      if (page > 3) pages.push('...')

                      const start = Math.max(2, page - 1)
                      const end = Math.min(totalPages - 1, page + 1)
                      for (let i = start; i <= end; i++) pages.push(i)

                      if (page < totalPages - 2) pages.push('...')
                      pages.push(totalPages)
                    }

                    return pages.map((p, i) => (
                      typeof p === 'number' ? (
                        <button
                          key={i}
                          onClick={() => setPage(p)}
                          className={`px-3 py-2 rounded-lg transition-all ${p === page
                            ? 'bg-[var(--color-brand)] text-white'
                            : 'border border-[var(--color-border)] text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                            }`}
                        >
                          {p}
                        </button>
                      ) : (
                        <span key={i} className="px-2 py-2 text-[var(--color-text-muted)]">{p}</span>
                      )
                    ))
                  })()}
                </div>

                <button
                  onClick={() => setPage(p => p + 1)}
                  disabled={!pagination.hasNext}
                  className="px-3 py-2 border border-[var(--color-border)] rounded-lg text-[var(--color-text)] hover:bg-[var(--color-bg)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Create User Modal */}
        {showCreateModal && <CreateUserModal onClose={handleCloseModal} onSuccess={handleSuccess} />}
      </AdminLayout>
    </ProtectedRoute>
  )
}
