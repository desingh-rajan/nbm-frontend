'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Optimized defaults for better performance
            staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
            gcTime: 10 * 60 * 1000, // 10 minutes - cache time (formerly cacheTime)
            refetchOnWindowFocus: false, // Don't refetch on tab switch
            refetchOnReconnect: true, // Refetch on network reconnect
            refetchOnMount: false, // Don't refetch if data is fresh
            retry: 1, // Only retry once on failure
          },
          mutations: {
            // Default options for all mutations
            retry: 0, // Don't retry mutations
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show devtools in development */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}
