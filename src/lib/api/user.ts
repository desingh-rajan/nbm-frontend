// User management API endpoints (Admin only)

import { client } from './client';

const BASE_PATH = '/admin/users';

export interface UserUpdateData {
  email?: string;
  username?: string;
  role?: string;
}

export const userApi = {
  /**
   * Get paginated list of users (Admin)
   */
  getAll(page = 1, limit = 10) {
    return client.authRequest(`${BASE_PATH}?page=${page}&limit=${limit}`);
  },

  /**
   * Get user by ID (Admin)
   */
  getById(id: string) {
    return client.authRequest(`${BASE_PATH}/${id}`);
  },

  /**
   * Create new user (Admin)
   */
  create(email: string, password: string, username: string, role: string) {
    return client.authRequest(BASE_PATH, {
      method: 'POST',
      body: JSON.stringify({ email, password, username, role }),
    });
  },

  /**
   * Update user (Admin)
   */
  update(id: string, updates: UserUpdateData) {
    return client.authRequest(`${BASE_PATH}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  },

  /**
   * Delete user (Admin)
   */
  delete(id: string) {
    return client.authRequest(`${BASE_PATH}/${id}`, {
      method: 'DELETE',
    });
  },
};
