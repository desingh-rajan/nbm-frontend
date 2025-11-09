'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireSuperAdmin?: boolean
}

export default function ProtectedRoute({ children, requireSuperAdmin = false }: ProtectedRouteProps) {
  const router = useRouter()
  const { user, isLoading, isSuperAdmin } = useAuth()

  useEffect(() => {
    // Still loading auth check - don't redirect yet
    if (isLoading) return

    // Auth check complete, now check authorization

    // No user = not authenticated, redirect to login
    if (!user) {
      router.replace('/login')
      return
    }

    // SuperAdmin required but user doesn't have it
    if (requireSuperAdmin && !isSuperAdmin) {
      router.replace('/admin')
      return
    }
  }, [isLoading, user, isSuperAdmin, requireSuperAdmin, router])

  // While loading, show blank screen
  if (isLoading) {
    return <div className="min-h-screen bg-[var(--color-bg)]" />
  }

  // No user and not loading = will redirect
  if (!user) {
    return null
  }

  // SuperAdmin required but user doesn't have permission
  if (requireSuperAdmin && !isSuperAdmin) {
    return null
  }

  // All checks passed
  return <>{children}</>
}
