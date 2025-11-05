// Article management API endpoints

import { client } from './client';

const BASE_PATH = '/articles';
const ADMIN_PATH = '/admin/articles';

export interface ArticleUpdateData {
  title?: string;
  content?: string;
  published?: boolean;
}

export const articleApi = {
  /**
   * Get all articles (Admin - includes drafts)
   */
  getAll() {
    return client.authRequest(ADMIN_PATH);
  },

  /**
   * Get article by ID
   */
  getById(id: string) {
    return client.authRequest(`${BASE_PATH}/${id}`);
  },

  /**
   * Create new article
   */
  create(title: string, content: string, published = false) {
    return client.authRequest(BASE_PATH, {
      method: 'POST',
      body: JSON.stringify({ title, content, isPublished: published }),
    });
  },

  /**
   * Update article
   */
  update(id: string, updates: ArticleUpdateData) {
    return client.authRequest(`${BASE_PATH}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...updates,
        isPublished: updates.published,
        published: undefined,
      }),
    });
  },

  /**
   * Delete article
   */
  delete(id: string) {
    return client.authRequest(`${BASE_PATH}/${id}`, {
      method: 'DELETE',
    });
  },
};
