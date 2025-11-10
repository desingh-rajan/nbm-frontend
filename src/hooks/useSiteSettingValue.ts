'use client'

import { useSiteSettings } from './useSiteSettings'
import { useMemo } from 'react'

/**
 * Hook to get a single site setting value by key
 * Provides type safety and fallback defaults
 */
export function useSiteSettingValue<T = unknown>(
  key: string,
  defaultValue: T
): T {
  const { data: settings } = useSiteSettings();

  const value = useMemo(() => {
    if (!settings) return defaultValue;

    const setting = settings.find((s) => s.key === key);
    if (!setting) return defaultValue;

    // The value from the API is already the direct value (string, array, or object)
    // No need to unwrap - backend stores it as JSON directly
    return setting.value as T;
  }, [settings, key, defaultValue]);

  return value;
}

/**
 * Hook to get multiple site settings by category
 */
export function useSiteSettingsByCategory(category: string) {
  const { data: settings, isLoading } = useSiteSettings()

  return useMemo(() => {
    if (isLoading || !settings) return []
    return settings.filter((s) => s.category === category && s.isPublic)
  }, [settings, category, isLoading])
}
