/**
 * @deprecated This file is deprecated. Import from '@/lib/api' instead.
 * The API has been refactored into separate entity-based modules:
 * - auth.ts: Authentication endpoints
 * - user.ts: User management endpoints
 * - article.ts: Article management endpoints
 * - client.ts: Base API client
 */

// Re-export everything from the new API structure for backward compatibility
export * from './api/index';
export { api } from './api/index';
