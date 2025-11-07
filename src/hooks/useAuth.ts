'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { authApi } from '@/lib/api'
import type { User } from '@/types'

/**
 * Hook for user authentication and session management
 */
export function useAuth() {
  const queryClient = useQueryClient()

  // Get current user
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const token = authApi.getToken()
      if (!token) throw new Error('No token')

      const response = await authApi.getMe()
      if (response.error) throw new Error(response.error)
      return response.data
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh for 5 min
    gcTime: 10 * 60 * 1000, // 10 minutes - cache time
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
    refetchOnMount: false, // Don't refetch on component mount if data is fresh
  })

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
    onSuccess: () => {
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
    isLoading,
    error,
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
