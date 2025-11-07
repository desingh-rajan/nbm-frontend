'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { articleApi, ArticleUpdateData } from '@/lib/api'

/**
 * Hook for fetching all articles (Admin - includes drafts)
 */
export function useArticles() {
  return useQuery({
    queryKey: ['articles'],
    queryFn: async () => {
      const response = await articleApi.getAll()
      if (response.error) throw new Error(response.error)
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

/**
 * Hook for fetching a single article by ID
 */
export function useArticle(id: string) {
  return useQuery({
    queryKey: ['articles', id],
    queryFn: async () => {
      const response = await articleApi.getById(id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  })
}

/**
 * Hook for creating a new article
 */
export function useCreateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      title,
      content,
      published = false,
    }: {
      title: string
      content: string
      published?: boolean
    }) => {
      const response = await articleApi.create(title, content, published)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}

/**
 * Hook for updating an article
 */
export function useUpdateArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: ArticleUpdateData }) => {
      const response = await articleApi.update(id, updates)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      queryClient.invalidateQueries({ queryKey: ['articles', variables.id] })
    },
  })
}

/**
 * Hook for deleting an article
 */
export function useDeleteArticle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await articleApi.delete(id)
      if (response.error) throw new Error(response.error)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
    },
  })
}
