// Site Settings API endpoints

import { client } from './client';

const BASE_PATH = '/site-settings';

export interface SiteSetting {
  id: number;
  createdAt: string;
  updatedAt: string;
  key: string;
  category: string;
  value: Record<string, unknown>; // JSON value
  isPublic: boolean;
  description?: string | null;
  updatedBy?: number | null;
}

export interface CreateSiteSettingData {
  key: string;
  category: string;
  value: Record<string, unknown>;
  isPublic?: boolean;
  description?: string;
}

export interface UpdateSiteSettingData {
  category?: string;
  value?: Record<string, unknown>;
  isPublic?: boolean;
  description?: string;
}

export const siteSettingApi = {
  /**
   * Get all site settings (Public)
   */
  getAll() {
    return client.request<SiteSetting[]>(BASE_PATH);
  },

  /**
   * Get site setting by ID or key (Public)
   */
  getByIdOrKey(idOrKey: string | number) {
    return client.request<SiteSetting>(`${BASE_PATH}/${idOrKey}`);
  },

  /**
   * Create new site setting (Superadmin only)
   */
  create(data: CreateSiteSettingData) {
    return client.authRequest<SiteSetting>(BASE_PATH, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /**
   * Update site setting (Superadmin only)
   */
  update(id: number, data: UpdateSiteSettingData) {
    return client.authRequest<SiteSetting>(`${BASE_PATH}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  /**
   * Delete site setting (Superadmin only)
   */
  delete(id: number) {
    return client.authRequest(`${BASE_PATH}/${id}`, {
      method: 'DELETE',
    });
  },
};
