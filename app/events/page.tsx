import Link from 'next/link';
import Image from 'next/image';

async function getAllEvents() {
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

export default async function AllEventsPage() {
  const events = await getAllEvents();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Upcoming Events</h1>

        {events.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event: any) => (
              <div key={event.id || event._id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col">
                <div className="relative h-48 w-full">
                  <Image
                    src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                  <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {event.price ? `$${event.price}` : 'Free'}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-indigo-600 font-medium mb-1">
                    {event.startsAt ? new Date(event.startsAt).toLocaleDateString() : event.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex items-center gap-1">
                    📍 {event.location}
                  </p>
                  <div className="mt-auto">
                    <Link
                      href={`/events/${event.id || event._id}`}
                      className="block w-full text-center bg-indigo-50 text-indigo-600 font-semibold py-2.5 rounded-xl hover:bg-indigo-600 hover:text-white transition"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}