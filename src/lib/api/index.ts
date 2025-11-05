// Centralized API exports

export * from './client';
export * from './auth';
export * from './user';
export * from './article';

// Re-export for backward compatibility with old code
import { authApi } from './auth';
import { userApi } from './user';
import { articleApi } from './article';

export const api = {
  // Auth
  login: authApi.login,
  register: authApi.register,
  getMe: authApi.getMe,
  logout: authApi.logout,
  changePassword: authApi.changePassword,
  getToken: authApi.getToken,
  setToken: authApi.setToken,
  clearToken: authApi.clearToken,

  // Users
  getUsers: userApi.getAll,
  getUserById: userApi.getById,
  createUser: userApi.create,
  updateUser: userApi.update,
  deleteUser: userApi.delete,

  // Articles
  getArticles: articleApi.getAll,
  getArticleById: articleApi.getById,
  createArticle: articleApi.create,
  updateArticle: articleApi.update,
  deleteArticle: articleApi.delete,
};
