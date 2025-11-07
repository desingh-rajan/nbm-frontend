# Data Fetching Patterns Analysis: Direct API Calls vs Custom Hooks

## Executive Summary

After investigating Next.js/React documentation and best practices, here's what I found:

### Your Concern

You noticed the current implementation uses direct API calls like `api.getSiteSettings()` inside components, while your office project wraps APIs in custom hooks like `useGetSiteSettings()`.

### The Answer

**Both approaches are valid**, but the **conventional modern approach depends on the component type**:

1. **Server Components (Next.js 13+ App Router)** → Direct API calls ✅ (What we're doing)
2. **Client Components** → Custom Hooks with SWR/React Query ✅ (What your office does)

---

## Conventional Approaches by Component Type

### 1. Server Components (Recommended for Next.js 13+)

**Official Next.js Pattern:**

```tsx
// ✅ MODERN APPROACH - Direct async/await in Server Components
export default async function Page() {
  const settings = await getSiteSettings()
  return <div>{settings.title}</div>
}
```

**Advantages:**

- ✅ No loading states needed (server handles it)
- ✅ No try/catch in components (use error boundaries)
- ✅ Automatic request deduplication
- ✅ Better SEO (server-rendered data)
- ✅ No client-side bundle bloat
- ✅ Direct database/API access (no separate API routes needed)

**From Next.js Docs:**
> "Server Components allow you to fetch data directly using async/await. You can safely make database queries using an ORM or database client."

---

### 2. Client Components (Traditional React Pattern)

**Official React Pattern with Custom Hooks:**

```tsx
// ✅ TRADITIONAL APPROACH - Custom hooks with SWR/React Query
'use client'

function useGetSiteSettings() {
  const { data, error, isLoading } = useSWR('/api/site-settings', fetcher)
  return { settings: data, isLoading, error }
}

export default function Page() {
  const { settings, isLoading, error } = useGetSiteSettings()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return <div>{settings.title}</div>
}
```

**Advantages:**

- ✅ Automatic caching
- ✅ Automatic revalidation
- ✅ Optimistic updates
- ✅ Focus tracking
- ✅ Request deduplication
- ✅ Polling/Refresh on interval
- ✅ Centralized error handling

**Community Libraries Recommended by Next.js:**

- [SWR](https://swr.vercel.app/) (by Vercel)
- [TanStack Query](https://tanstack.com/query/latest) (formerly React Query)

---

## Current Implementation Analysis

### What We're Doing Now

```tsx
// src/app/admin/site-settings/page.tsx (Server Component)
export default async function SiteSettingsPage() {
  const response = await api.getSiteSettings()
  
  if (response.error) {
    return <div>Error: {response.error}</div>
  }
  
  return <div>{/* render settings */}</div>
}
```

**This is CORRECT for Server Components!** ✅

---

## Comparison: Direct API vs Custom Hooks

| Aspect | Direct API (Server) | Custom Hooks (Client) |
|--------|---------------------|----------------------|
| **Component Type** | Server Components | Client Components |
| **Execution** | Server-side | Client-side (browser) |
| **Loading State** | Suspense/loading.tsx | Manual (hook returns isLoading) |
| **Error Handling** | Error boundaries | Try/catch in hooks |
| **Caching** | Automatic (Next.js) | Library-based (SWR/React Query) |
| **Revalidation** | Server-side | Client-side |
| **SEO** | Excellent | Poor (JS required) |
| **Bundle Size** | Zero (server) | Adds to bundle |
| **Interactivity** | Limited | Full |
| **Database Access** | Direct | Via API routes only |

---

## When to Use Each Pattern

### Use Direct API Calls (Server Components) When

- ✅ Fetching data for initial page load
- ✅ Need SEO-friendly content
- ✅ Data doesn't need frequent client-side updates
- ✅ Want zero JavaScript for data fetching
- ✅ Need direct database access

**Examples from Next.js:**

- Blog posts
- Product listings
- User profiles
- Settings pages (like ours!)

### Use Custom Hooks (Client Components) When

- ✅ Need real-time updates
- ✅ User interactions trigger data changes
- ✅ Need optimistic UI updates
- ✅ Polling/live data
- ✅ Client-side filtering/sorting

**Examples:**

- Live dashboards
- Chat applications
- Real-time notifications
- Shopping cart
- Form submissions with instant feedback

---

## Recommendations for Our Project

### Current Approach (Server Components) ✅

**Keep it!** Our admin pages are perfect for Server Components:

```tsx
// src/app/admin/site-settings/page.tsx
export default async function SiteSettingsPage() {
  const response = await api.getSiteSettings()
  
  if (response.error) {
    return <div>Error: {response.error}</div>
  }
  
  return <SiteSettingsClient initialData={response.data} />
}
```

### When to Add Custom Hooks

**Only add custom hooks when you need client-side interactivity:**

```tsx
// src/hooks/useSiteSettings.ts (only if needed for client updates)
'use client'

import useSWR from 'swr'
import { siteSettingApi } from '@/lib/api'

export function useSiteSettings() {
  const { data, error, isLoading, mutate } = useSWR(
    '/site-settings',
    () => siteSettingApi.getAll()
  )
  
  return {
    settings: data?.data,
    isLoading,
    error: error || data?.error,
    refresh: mutate
  }
}

// src/components/admin/SiteSettingsClient.tsx
'use client'

export function SiteSettingsClient({ initialData }) {
  const { settings, refresh } = useSiteSettings()
  
  const handleUpdate = async () => {
    await updateSetting()
    refresh() // Re-fetch latest data
  }
  
  return <div>{/* interactive UI */}</div>
}
```

---

## Addressing Your Concerns

### "A lot of API try/catch and error blocks are going inside the view components"

**Solutions:**

#### 1. Use Error Boundaries (Server Components)

```tsx
// app/admin/site-settings/error.tsx
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

#### 2. Create Data Layer Utilities (Hybrid)

```tsx
// src/lib/data/site-settings.ts (Server-side data layer)
import { siteSettingApi } from '@/lib/api'
import { cache } from 'react'

export const getSiteSettings = cache(async () => {
  const response = await siteSettingApi.getAll()
  
  if (response.error) {
    throw new Error(response.error)
  }
  
  return response.data
})

// Now components are cleaner
export default async function Page() {
  const settings = await getSiteSettings()
  return <div>{settings.title}</div>
}
```

#### 3. Use Custom Hooks for Client Components

```tsx
// src/hooks/useSiteSettings.ts
'use client'

export function useSiteSettings() {
  const { data, error, isLoading } = useSWR('/site-settings', fetcher)
  
  return {
    settings: data,
    isLoading,
    error, // Hook handles error state
  }
}

// Component is clean
export default function ClientPage() {
  const { settings, isLoading, error } = useSiteSettings()
  
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  return <div>{settings.title}</div>
}
```

---

## Industry Standards

### What Major Companies Use

**Vercel (Next.js creators):**

- Server Components for static/initial data
- SWR for client-side data fetching
- Direct API calls in Server Components

**React Team Recommendation:**
> "Effects are an 'escape hatch': you use them when you need to 'step outside React'. Wrapping your Effects in custom Hooks makes it easier to upgrade your code when these solutions become available."

**Next.js Official Recommendation:**
> "You can use a community library like SWR or React Query to fetch data in Client Components. These libraries have their own semantics for caching, streaming, and other features."

---

## Migration Path (If Needed)

### Current: Direct API Calls (Server)

```tsx
export default async function Page() {
  const res = await api.getSiteSettings()
  if (res.error) return <div>Error</div>
  return <div>{res.data.title}</div>
}
```

### Future: Add Client Hooks When Needed

```tsx
// 1. Server Component (initial load)
export default async function Page() {
  const initialSettings = await getSiteSettings()
  return <ClientSettings initialData={initialSettings} />
}

// 2. Client Component (interactive)
'use client'
function ClientSettings({ initialData }) {
  const { settings, refresh } = useSiteSettings({
    fallbackData: initialData
  })
  
  return <div>{settings.title}</div>
}
```

---

## Conclusion

### Is Your Current Approach Good?

**YES!** ✅ For Server Components, direct API calls are the modern, conventional approach.

### Is Your Office's Approach Good?

**YES!** ✅ For Client Components, custom hooks with SWR/React Query are best practice.

### The Key Difference

Your office probably uses the **Pages Router** (older Next.js) or pure React, where everything is client-side. With the **App Router** (Next.js 13+), Server Components are the default and preferred pattern.

### Our Recommendation

1. **Keep current approach** for admin pages (Server Components)
2. **Add custom hooks** only when you need client-side interactivity
3. **Create data layer utilities** to reduce try/catch in components
4. **Use error boundaries** for graceful error handling

### Maintainability

- Server Components: Easier (less boilerplate, less state management)
- Client Hooks: More code but better for interactive features

Both patterns are maintainable when used appropriately!

---

## References

- [Next.js Data Fetching](https://nextjs.org/docs/app/getting-started/fetching-data)
- [React Custom Hooks](https://react.dev/learn/reusing-logic-with-custom-hooks)
- [SWR Documentation](https://swr.vercel.app/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Next.js Server Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
