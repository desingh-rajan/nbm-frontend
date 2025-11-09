'use client'

import React, { ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

/**
 * Error Boundary component following React best practices
 * Catches errors in child components and displays fallback UI
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error reporting service in production
    console.error('❌ Error caught by boundary:', error, errorInfo)

    // You can integrate with Sentry, LogRocket, etc. here
    // Sentry.captureException(error, { contexts: { react: errorInfo } })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-4">
            <div className="max-w-md w-full space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="text-2xl font-bold text-[var(--color-text)] mb-2">
                  Oops! Something went wrong
                </h1>
                <p className="text-[var(--color-text-muted)] mb-6">
                  We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
                </p>
              </div>

              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                <p className="text-sm text-red-500 font-mono break-words">
                  {this.state.error?.message}
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => window.location.href = '/'}
                  className="flex-1 px-4 py-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] 
                           text-white font-medium rounded-lg transition-all"
                >
                  Go Home
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="flex-1 px-4 py-2 border border-[var(--color-border)] 
                           text-[var(--color-text)] hover:bg-[var(--color-bg)] font-medium rounded-lg transition-all"
                >
                  Refresh
                </button>
              </div>

              {process.env.NODE_ENV === 'development' && (
                <details className="bg-[var(--color-bg)] border border-[var(--color-border)] rounded-lg p-4">
                  <summary className="cursor-pointer text-sm font-medium text-[var(--color-text)]">
                    Error Details (Dev only)
                  </summary>
                  <pre className="mt-3 text-xs text-[var(--color-text-muted)] overflow-auto max-h-64">
                    {this.state.error?.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
