'use client'

import { useState } from 'react'
import { useCreateUser } from '@/hooks'

interface CreateUserModalProps {
  onClose: () => void
  onSuccess: () => void
}

export function CreateUserModal({ onClose, onSuccess }: CreateUserModalProps) {
  const { mutate: createUser, isPending } = useCreateUser()
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'user' as 'admin' | 'user',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    createUser(
      {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        role: formData.role,
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
      <div className="bg-[var(--color-surface)] rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[var(--color-border)]">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-display font-bold text-[var(--color-text)]">Create New User</h2>
            <p className="text-[var(--color-text-muted)] mt-1">Add a new user to the system</p>
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

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
              placeholder="johndoe"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              minLength={6}
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
              placeholder="••••••••"
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Minimum 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-[var(--color-text)] mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
              className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent"
            >
              <option value="user">User - Regular access</option>
              <option value="admin">Admin - Full access</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[var(--color-border)]">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-[var(--color-border)] text-[var(--color-text)] rounded-lg hover:bg-[var(--color-bg-muted)] transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-4 py-2.5 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white dark:text-[#0a0a0a] rounded-lg transition-all disabled:opacity-50 font-medium shadow-lg"
            >
              {isPending ? 'Creating...' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
