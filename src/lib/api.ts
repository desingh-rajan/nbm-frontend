// API client for backend communication

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      // Merge headers - options.headers should override defaults
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔵 API Request:', {
          url,
          method: options.method || 'GET',
          headers,
          body: options.body,
        });
      }

      const response = await fetch(url, {
        ...options,
        headers,
      });

      const rawData = await response.json();

      // Debug logging in development
      if (process.env.NODE_ENV === 'development') {
        console.log('🔵 API Response:', {
          status: response.status,
          data: rawData,
        });
      }

      if (!response.ok) {
        return {
          error: rawData.message || rawData.error || 'An error occurred',
          status: response.status,
        };
      }

      // Normalize response: unwrap { data: {...} } to just return the data
      // This handles both { data: {...} } and { data: { data: {...} } } cases
      let normalizedData = rawData;
      if (rawData.data !== undefined) {
        normalizedData = rawData.data;
      }

      return {
        data: normalizedData,
        status: response.status,
      };
    } catch (error) {
      console.error('🔴 API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Network error',
        status: 500,
      };
    }
  } async authRequest<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/nbm-be/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email: string, password: string, username: string) {
    return this.request('/nbm-be/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, username }),
    });
  }

  async getMe() {
    return this.authRequest('/nbm-be/api/auth/me');
  }

  async logout() {
    return this.authRequest('/nbm-be/api/auth/logout', {
      method: 'POST',
    });
  }

  async changePassword(oldPassword: string, newPassword: string) {
    return this.authRequest('/nbm-be/api/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ oldPassword, newPassword }),
    });
  }

  // Admin endpoints
  async getUsers(page = 1, limit = 10) {
    return this.authRequest(`/nbm-be/api/admin/users?page=${page}&limit=${limit}`);
  }

  async getUserById(id: string) {
    return this.authRequest(`/nbm-be/api/admin/users/${id}`);
  }

  async createUser(email: string, password: string, username: string, role: string) {
    return this.authRequest('/nbm-be/api/admin/users', {
      method: 'POST',
      body: JSON.stringify({ email, password, username, role }),
    });
  }

  async updateUser(id: string, updates: { email?: string; username?: string; role?: string }) {
    return this.authRequest(`/nbm-be/api/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteUser(id: string) {
    return this.authRequest(`/nbm-be/api/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Articles endpoints
  async getArticles() {
    return this.authRequest('/nbm-be/api/admin/articles');
  }

  async getArticleById(id: string) {
    return this.authRequest(`/nbm-be/api/articles/${id}`);
  }

  async createArticle(title: string, content: string, published = false) {
    return this.authRequest('/nbm-be/api/articles', {
      method: 'POST',
      body: JSON.stringify({ title, content, isPublished: published }),
    });
  }

  async updateArticle(id: string, updates: { title?: string; content?: string; published?: boolean }) {
    return this.authRequest(`/nbm-be/api/articles/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        ...updates,
        isPublished: updates.published,
        published: undefined
      }),
    });
  }

  async deleteArticle(id: string) {
    return this.authRequest(`/nbm-be/api/articles/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_BASE_URL);
