'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        router.push('/admin');
      } else {
        setError(result.error || 'Login failed');
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--color-bg)] to-[var(--color-bg-secondary)] px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Logo/Brand */}
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-[var(--color-brand)]">
            NBM Admin
          </h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">
            Sign in to manage your content
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-[var(--color-card)] shadow-xl rounded-lg p-8 border border-[var(--color-border)]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg 
                         text-[var(--color-text)] placeholder-[var(--color-text-muted)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent
                         transition-all"
                placeholder="admin@example.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--color-text)] mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg 
                         text-[var(--color-text)] placeholder-[var(--color-text-muted)]
                         focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:border-transparent
                         transition-all"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] 
                       text-white font-medium rounded-lg transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-2
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Development Credentials */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 pt-6 border-t border-[var(--color-border)]">
              <p className="text-xs text-[var(--color-text-muted)] text-center mb-3">
                Development Test Credentials
              </p>
              <div className="space-y-2 text-xs">
                <div className="bg-[var(--color-bg)] p-3 rounded border border-[var(--color-border)]">
                  <p className="font-medium text-[var(--color-text)] mb-1">Superadmin:</p>
                  <p className="text-[var(--color-text-muted)]">dev-admin@localhost</p>
                </div>
                <div className="bg-[var(--color-bg)] p-3 rounded border border-[var(--color-border)]">
                  <p className="font-medium text-[var(--color-text)] mb-1">Alpha User:</p>
                  <p className="text-[var(--color-text-muted)]">alpha@localhost</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="text-sm text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
