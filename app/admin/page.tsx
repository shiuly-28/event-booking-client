'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const adminLinks = [
  {
    href: '/admin/categories',
    title: 'Categories',
    description: 'Create, edit, and delete event categories',
    key: 'categories',
    icon: '🏷️',
  },
  {
    href: '/admin/events',
    title: 'Events',
    description: 'Create, edit, and delete events',
    key: 'events',
    icon: '🎫',
  },
  {
    href: '/admin/bookings',
    title: 'Bookings',
    description: 'Confirm, cancel, or remove bookings',
    key: 'bookings',
    icon: '📅',
  },
  {
    href: '/admin/reviews',
    title: 'Reviews',
    description: 'Moderate and manage user reviews',
    key: 'reviews',
    icon: '⭐',
  },
];

export default function AdminDashboardPage() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const token = localStorage.getItem('token');

      try {
        const [categories, events, bookings, reviews] = await Promise.all([
          fetch(`${API_URL}/categories`).then((r) => r.json()),
          fetch(`${API_URL}/events`).then((r) => r.json()),
          fetch(`${API_URL}/bookings`, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((r) => r.json()),
          fetch(`${API_URL}/reviews`).then((r) => r.json()),
        ]);

        setCounts({
          categories: categories.data?.length || 0,
          events: events.data?.length || 0,
          bookings: bookings.data?.length || 0,
          reviews: reviews.data?.length || 0,
        });
      } catch {
        setCounts({});
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-600 mb-8">Manage your event booking platform</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-[#00684D] transition group"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#00684D] transition mb-1">
                  {link.icon} {link.title}
                </h2>
                <p className="text-gray-500 text-sm">{link.description}</p>
              </div>
              <span className="text-2xl font-bold text-[#00684D]">
                {loading ? '...' : counts[link.key] ?? 0}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}