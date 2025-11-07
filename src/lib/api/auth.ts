// Authentication API endpoints

import { client } from './client';

const BASE_PATH = '/nbm-be/api/auth';

export const authApi = {
  /**
   * Login with email and password
   */
  login(email: string, password: string) {
    return client.request(`${BASE_PATH}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * Register a new user
   */
  register(email: string, password: string, username: string) {
    return client.request(`${BASE_PATH}/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });
  },

  /**
   * Get current user information
   */
  getMe() {
    return client.authRequest(`${BASE_PATH}/me`);
  },

  /**
   * Logout current user
   */
  logout() {
    return client.authRequest(`${BASE_PATH}/logout`, {
      method: 'POST',
    });
  },

  /**
   * Change user password
   */
  changePassword(oldPassword: string, newPassword: string) {
    return client.authRequest(`${BASE_PATH}/change-password`, {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  },

  // Token management helpers
  getToken: () => client.getToken(),
  setToken: (token: string) => client.setToken(token),
  clearToken: () => client.clearToken(),
};
