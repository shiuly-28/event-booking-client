export const dynamic = 'force-dynamic';

import Image from 'next/image';
import Link from 'next/link';

async function getEvents() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const json = await res.json();
    
    return Array.isArray(json) ? json : json.data || [];
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return [];
  }
}

export default async function FeaturedEvents() {
  const events = await getEvents();

  if (!events || events.length === 0) {
    return <div className="py-12 text-center text-gray-500">No upcoming events available.</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Upcoming <span className="text-[#00684D]">Events</span>
          </h2>
          <Link href="/events" className="text-[#00684D] font-semibold hover:underline">
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.slice(0, 4).map((event: any) => (
            <div key={event.id || event._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col">
              <div className="relative h-48 w-full">
                <Image
                  src={event.image || `https://picsum.photos/seed/${event.id || event._id}/800/600`}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 right-3 bg-[#00684D] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  {event.price ? `$${event.price}` : 'Free'}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-sm text-[#00684D] font-medium mb-1">
                  {event.startsAt ? new Date(event.startsAt).toLocaleDateString() : event.date}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                  📍 {event.location}
                </p>
                <div className="mt-auto">
                  <Link
                    href={`/events/${event.id || event._id}`}
                    className="block w-full text-center bg-indigo-50 text-[#00684D] font-semibold py-2.5 rounded-xl hover:bg-[#00684D] hover:text-white transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}