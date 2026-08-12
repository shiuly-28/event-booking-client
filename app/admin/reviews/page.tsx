'use client';

import { useEffect, useState } from 'react';

interface Review {
  id: string;
  rating: number;
  comment?: string;
  user?: { name: string };
  event?: { title: string };
}

function Spinner() {
  return (
    <div className="flex items-center justify-center py-16">
      <svg
        className="animate-spin h-8 w-8 text-indigo-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
    </div>
  );
}

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const getToken = () => localStorage.getItem('token');

  async function fetchReviews() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/reviews`, { cache: 'no-store' });
      const json = await res.json();
      setReviews(json.data || []);
    } catch {
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchReviews();
  }, []);

  function startEdit(r: Review) {
    setEditingId(r.id);
    setEditRating(r.rating);
    setEditComment(r.comment || '');
  }

  async function handleUpdate(id: string) {
    setError('');
    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ rating: editRating, comment: editComment }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to update review');
      setReviews((prev) => prev.map((r) => (r.id === id ? json.data : r)));
      setEditingId(null);
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this review?')) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to delete review');
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Reviews</h1>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      {loading ? (
        <Spinner />
      ) : reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {reviews.map((r) => (
            <div key={r.id} className="p-4">
              {editingId === r.id ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editRating}
                    onChange={(e) => setEditRating(Number(e.target.value))}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 w-24"
                  />
                  <textarea
                    value={editComment}
                    onChange={(e) => setEditComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-1.5"
                    rows={2}
                  />
                  <div className="flex gap-2">
                    <button onClick={() => handleUpdate(r.id)} className="px-4 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition">
                      Save
                    </button>
                    <button onClick={() => setEditingId(null)} className="px-4 py-1.5 bg-gray-200 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-300 transition">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {'⭐'.repeat(r.rating)} — {r.event?.title || 'Unknown event'}
                    </p>
                    <p className="text-sm text-gray-500">{r.comment}</p>
                    <p className="text-xs text-gray-400 mt-1">by {r.user?.name || 'Unknown user'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => startEdit(r)} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-sm font-semibold rounded-lg hover:bg-indigo-100 transition">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(r.id)} className="px-4 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}