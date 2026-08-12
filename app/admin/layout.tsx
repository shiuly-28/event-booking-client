'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊' },
  { href: '/admin/categories', label: 'Categories', icon: '🏷️' },
  { href: '/admin/events', label: 'Events', icon: '🎫' },
  { href: '/admin/bookings', label: 'Bookings', icon: '📅' },
  { href: '/admin/reviews', label: 'Reviews', icon: '⭐' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(stored);
    if (user.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    setEmail(user.email);
    setChecked(true);
  }, [router]);

  if (!checked) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Checking access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <p className="text-lg font-bold text-[#00684D]">Admin Panel</p>
          <p className="text-xs text-gray-500 mt-1 truncate">{email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
                pathname === item.href
                  ? 'bg-indigo-50 text-[#00684D]'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <Link href="/" className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-500 hover:text-gray-700">
            <span>←</span> Back to site
          </Link>
        </div>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}