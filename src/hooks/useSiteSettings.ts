'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { siteSettingApi, CreateSiteSettingData, UpdateSiteSettingData } from '@/lib/api'

/**
 * Hook for fetching all site settings
 */
export function useSiteSettings() {
  return useQuery({
    queryKey: ['siteSettings'],
    queryFn: async () => {
      const response = await siteSettingApi.getAll()
      if (response.error) throw new Error(response.error)
      return response.data
    },
    staleTime: 10 * 60 * 1000, // 10 minutes (settings rarely change)
    gcTime: 30 * 60 * 1000, // 30 minutes cache
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

/**
 * Hook for fetching a single site setting by ID or key
 */
export function useSiteSetting(idOrKey: string | number) {
  return useQuery({
    queryKey: ['siteSettings', idOrKey],
    queryFn: async () => {
      const response = await siteSettingApi.getByIdOrKey(idOrKey)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!idOrKey,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook for creating a new site setting (Superadmin only)
 */
export function useCreateSiteSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSiteSettingData) => {
      const response = await siteSettingApi.create(data)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] })
    },
  })
}

/**
 * Hook for updating a site setting (Superadmin only)
 */
export function useUpdateSiteSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateSiteSettingData }) => {
      const response = await siteSettingApi.update(id, data)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] })
      queryClient.invalidateQueries({ queryKey: ['siteSettings', variables.id] })
    },
  })
}

/**
 * Hook for deleting a site setting (Superadmin only)
 */
export function useDeleteSiteSetting() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await siteSettingApi.delete(id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['siteSettings'] })
    },
  })
}
