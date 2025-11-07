'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { userApi, UserUpdateData } from '@/lib/api'

/**
 * Hook for fetching all users (Admin only)
 */
export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const response = await userApi.getAll(page, limit)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh longer
    gcTime: 10 * 60 * 1000, // 10 minutes - cache time
    refetchOnWindowFocus: false, // Don't refetch on window focus
    refetchOnMount: false, // Don't refetch on mount if data is fresh
  })
}

/**
 * Hook for fetching a single user by ID
 */
export function useUser(id: string) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: async () => {
      const response = await userApi.getById(id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  })
}

/**
 * Hook for creating a new user
 */
export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      email,
      password,
      username,
      role,
    }: {
      email: string
      password: string
      username: string
      role: string
    }) => {
      const response = await userApi.create(email, password, username, role)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}

/**
 * Hook for updating a user
 */
export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: UserUpdateData }) => {
      const response = await userApi.update(id, updates)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['users', variables.id] })
    },
  })
}

/**
 * Hook for deleting a user
 */
export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await userApi.delete(id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
