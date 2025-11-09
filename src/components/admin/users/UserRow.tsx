'use client'

import { memo } from 'react'
import type { User } from '@/types'

interface UserRowProps {
  user: User
  onDelete: (userId: string) => void
}

const UserRow = memo(({ user, onDelete }: UserRowProps) => (
  <tr className="hover:bg-[var(--color-bg)] transition-colors">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-10 bg-[var(--color-brand)] rounded-full flex items-center justify-center text-white font-medium">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-[var(--color-text)]">
            {user.username}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-[var(--color-text)]">{user.email}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
        ${user.role === 'superadmin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : ''}
        ${user.role === 'admin' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
        ${user.role === 'user' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400' : ''}
      `}>
        {user.role}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--color-text-muted)]">
      {new Date(user.createdAt).toLocaleDateString()}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <button
        onClick={() => onDelete(user.id)}
        disabled={user.role === 'superadmin'}
        className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Delete
      </button>
    </td>
  </tr>
), (prevProps, nextProps) => {
  // Only re-render if user data changes
  return JSON.stringify(prevProps.user) === JSON.stringify(nextProps.user)
})

UserRow.displayName = 'UserRow'

export default UserRow
