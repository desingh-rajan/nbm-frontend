// Base API client with common functionality

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  status: number;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

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

      // Normalize response: unwrap { data: {...} } wrapper
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
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async authRequest<T = any>(
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
}

export const client = new ApiClient();
