'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BookingPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchUserBookings() {
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('accessToken');

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
          method: 'GET',
          headers,
        });

        const json = await res.json();
        console.log("Bookings Response:", json);

       if (!res.ok) {
  if (res.status === 401) {
    router.push('/login');
    return;
  }
  throw new Error(json.message || 'Failed to fetch bookings');
}

        setBookings(Array.isArray(json) ? json : json.data || json.bookings || []);
      } catch (err: any) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    }

    fetchUserBookings();
  }, [router]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading your bookings...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Booked Events</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-center">{error}</div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg mb-4">You haven't booked any events yet or need to log in.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => router.push('/events')}
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition"
              >
                Browse Events
              </button>
              <button
                onClick={() => router.push('/login')}
                className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:bg-gray-300 transition"
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {bookings.map((booking: any) => {
              const event = booking.event || booking;
              return (
                <div 
                  key={booking.id || booking._id} 
                  className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 p-6 flex flex-col sm:flex-row justify-between items-center gap-6"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="relative h-24 w-32 rounded-xl overflow-hidden flex-shrink-0">
                      <Image
                        src={event.image || `https://picsum.photos/seed/${event.id || event._id}/400/300`}
                        alt={event.title || 'Event'}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                        {event.startsAt ? new Date(event.startsAt).toLocaleDateString() : 'Upcoming'}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 mt-1">{event.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">📍 {event.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
                    <span className="px-4 py-1.5 bg-green-50 text-green-700 font-semibold text-sm rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}