'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, logout, isSuperAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '📊' },
    { name: 'Articles', href: '/admin/articles', icon: '📝' },
    ...(isSuperAdmin ? [{ name: 'User Management', href: '/admin/users', icon: '👥' }] : []),
    ...(isSuperAdmin ? [{ name: 'Site Settings', href: '/admin/site-settings', icon: '⚙️' }] : []),
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-card)] border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/admin" className="text-xl font-display font-bold text-[var(--color-brand)]">
                NBM Admin
              </Link>
            </div>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <div className="text-right">
                <p className="text-sm font-medium text-[var(--color-text)]">
                  {user?.username}
                </p>
                <p className="text-xs text-[var(--color-text-muted)] capitalize">
                  {user?.role}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-[var(--color-text)] 
                         hover:text-[var(--color-brand)] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[var(--color-card)] border-r border-[var(--color-border)] min-h-[calc(100vh-4rem)] sticky top-16">
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${isActive
                      ? 'bg-[var(--color-brand)] text-white dark:text-[#0a0a0a]'
                      : 'text-[var(--color-text)] hover:bg-[var(--color-bg)]'
                    }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Quick Links */}
          <div className="p-4 mt-8 border-t border-[var(--color-border)]">
            <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase mb-3">
              Quick Links
            </p>
            <div className="space-y-2">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors"
              >
                <span>🏠</span> View Site
              </a>
              <Link
                href="/admin/settings"
                className="flex items-center gap-2 text-sm text-[var(--color-text)] hover:text-[var(--color-brand)] transition-colors"
              >
                <span>⚙️</span> Settings
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
