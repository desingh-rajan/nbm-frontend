'use client'

import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import type { User } from '@/types'

/**
 * Hook for user authentication and session management
 */
export function useAuth() {
  const queryClient = useQueryClient()

  // Track if we've checked the token (prevents premature redirects)
  const [tokenChecked, setTokenChecked] = useState(false)
  const [hasStoredToken, setHasStoredToken] = useState(false)

  // Check for stored token immediately
  useEffect(() => {
    const token = authApi.getToken()
    setHasStoredToken(!!token)
    setTokenChecked(true)
  }, [])

  // Get current user - fetch if token exists
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await authApi.getMe()
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: tokenChecked && hasStoredToken, // Wait until token is checked
    retry: false,
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  })

  // Return proper loading state:
  // - Return true if we haven't checked token yet
  // - Return true if query is loading
  // - Return false once everything is done
  const authLoading = !tokenChecked || (tokenChecked && hasStoredToken && isLoading)

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await authApi.login(email, password)
      if (response.error) throw new Error(response.error)

      const { token, user: userData } = response.data || {}
      if (!token || !userData) {
        throw new Error('Invalid response from server')
      }

      // Store token
      authApi.setToken(token)

      return userData
    },
    onSuccess: (userData) => {
      // Set user data directly in cache for instant update
      queryClient.setQueryData(['auth', 'me'], userData)
      // Then invalidate to refetch if needed
      queryClient.invalidateQueries({ queryKey: ['auth', 'me'] })
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: async () => {
      const response = await authApi.logout()
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.clear() // Clear all cached data
      authApi.clearToken()
    },
  })

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async ({ oldPassword, newPassword }: { oldPassword: string; newPassword: string }) => {
      const response = await authApi.changePassword(oldPassword, newPassword)
      if (response.error) throw new Error(response.error)
      return response.data
    },
  })

  return {
    // User data
    user,
    isLoading: authLoading,
    error: null,
    isAuthenticated: !!user,

    // Role checks
    isSuperAdmin: user?.role === 'superadmin',
    isAdmin: user?.role === 'admin' || user?.role === 'superadmin',

    // Actions
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    logout: logoutMutation.mutate,
    changePassword: changePasswordMutation.mutate,

    // Mutation states
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    isChangingPassword: changePasswordMutation.isPending,

    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    changePasswordError: changePasswordMutation.error,
  }
}
