'use client';

import { useState, useEffect } from 'react';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setReviews(reviews.filter(r => (r.id || r._id) !== id));
      } else {
        alert('Failed to delete review');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-gray-500">Loading reviews...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Reviews</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">User / Email</th>
              <th className="p-4">Rating</th>
              <th className="p-4">Comment</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {reviews.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">No reviews found.</td>
              </tr>
            ) : (
              reviews.map((review: any) => (
                <tr key={review.id || review._id} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">
                    {review.user?.email || review.email || 'Anonymous'}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-yellow-50 text-yellow-700 font-bold rounded-lg text-xs">
                      ★ {review.rating || '5'} / 5
                    </span>
                  </td>
                  <td className="p-4 text-gray-600 max-w-xs truncate">
                    {review.comment || review.message || 'No comment provided'}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(review.id || review._id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}