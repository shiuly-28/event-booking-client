'use client';

import { useState, useEffect } from 'react';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setBookings(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleConfirmBooking = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}/confirm`, {
        method: 'PATCH', // অথবা আপনার ব্যাকএন্ড অনুযায়ী PUT/PATCH মেথড দিন
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        alert('Booking confirmed successfully!');
        fetchBookings();
      } else {
        alert('Failed to confirm booking');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setBookings(bookings.filter(b => (b.id || b._id) !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="text-gray-500">Loading bookings...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Bookings</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase">
              <th className="p-4">Event Name</th>
              <th className="p-4">User</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {bookings.length === 0 ? (
              <tr><td colSpan={4} className="p-6 text-center text-gray-500">No bookings found.</td></tr>
            ) : (
              bookings.map((booking: any) => (
                <tr key={booking.id || booking._id} className="hover:bg-gray-50">
                  <td className="p-4 font-semibold text-gray-800">{booking.event?.title || 'N/A'}</td>
                  <td className="p-4 text-gray-600">{booking.user?.email || booking.email || 'Customer'}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      booking.status === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'
                    }`}>
                      {booking.status || 'Pending'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {booking.status !== 'confirmed' && (
                      <button
                        onClick={() => handleConfirmBooking(booking.id || booking._id)}
                        className="px-3 py-1.5 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700"
                      >
                        Confirm
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(booking.id || booking._id)}
                      className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-100"
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