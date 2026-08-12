'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    async function fetchEventDetails() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events/${id}`);
        const json = await res.json();
        setEvent(json.data || json);
      } catch (error) {
        console.error("Failed to fetch event details", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEventDetails();
  }, [id]);

  const handleBooking = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/booking');
      return;
    }

    setBookingLoading(true);
    setMessage('');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId: id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Booking failed');
      }

      setMessage('🎉 Event booked successfully!');
      setTimeout(() => {
        router.push('/booking'); // আপনার নেভবারের বুকিং পেজে রিডিক্ট করবে
      }, 1500);
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-500">Loading...</div>;
  if (!event) return <div className="text-center py-20 text-gray-500">Event not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 p-8">
        <div className="relative h-72 w-full rounded-xl overflow-hidden mb-6">
          <Image
            src={event.image || `https://picsum.photos/seed/${event.id || event._id}/1200/600`}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            {event.startsAt ? new Date(event.startsAt).toLocaleDateString() : event.date}
          </span>
          <span className="text-lg font-bold text-gray-900 bg-gray-100 px-4 py-1 rounded-full">
            {event.price ? `$${event.price}` : 'Free'}
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
        <p className="text-gray-600 text-base mb-6">📍 {event.location}</p>
        <p className="text-gray-700 leading-relaxed mb-8">{event.description}</p>

        {message && <div className="mb-4 p-3 bg-indigo-50 text-indigo-700 text-center rounded-xl font-medium">{message}</div>}

        <button
          onClick={handleBooking}
          disabled={bookingLoading}
          className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg"
        >
          {bookingLoading ? 'Processing Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}