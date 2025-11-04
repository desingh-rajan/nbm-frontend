'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';

export interface User {
  id: string;
  email: string;
  username: string;
  role: 'superadmin' | 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isSuperAdmin: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // On mount: Check if user is authenticated
  useEffect(() => {
    const initAuth = async () => {
      const token = api.getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      // Token exists, verify it's still valid by calling /me
      try {
        const response = await api.getMe();
        console.log('🔍 /me response:', JSON.stringify(response, null, 2));

        if (response.error) {
          console.error('❌ /me returned error:', response.error);
          api.clearToken();
          setUser(null);
        } else {
          // API client normalizes response - data is already unwrapped
          const userData = response.data;
          console.log('👤 User data:', userData);

          if (userData && userData.id) {
            setUser(userData);
            console.log('✅ User authenticated');
          } else {
            console.error('❌ Invalid user data:', response.data);
            api.clearToken();
            setUser(null);
          }
        }
      } catch (error) {
        console.error('❌ /me API call failed:', error);
        api.clearToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password);

      if (response.error) {
        return { success: false, error: response.error };
      }

      // API client now normalizes response - data is unwrapped
      const { token, user: userData } = response.data || {};

      if (!token || !userData) {
        return { success: false, error: 'Invalid response from server' };
      }

      // Set token and user
      api.setToken(token);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Login failed'
      };
    }
  }; const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      // Ignore logout errors
    } finally {
      api.clearToken();
      setUser(null);
    }
  };

  const isSuperAdmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isSuperAdmin,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
