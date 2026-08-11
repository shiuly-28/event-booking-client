import Image from 'next/image';
import Link from 'next/link';


export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            
            <h1 className="text-3xl sm:text-5xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Book Your Dream <span className="text-indigo-600">Events</span> Easily
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Discover and book tickets for the most exciting concerts, tech meetups, workshops, and gatherings around you with just a few clicks.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
              <Link
                href="/events"
                className="bg-indigo-600 text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition text-center"
              >
                Explore Events
              </Link>
              <Link
                href="/register"
                className="border border-indigo-600 text-indigo-600 font-medium px-8 py-3 rounded-xl hover:bg-indigo-50 transition text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="flex justify-center">
            <div className="relative w-full h-72 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              {/* আপনি চাইলে public ফোল্ডারে আপনার ইভেন্টের ছবি রেখে এখানে পাথ বদলে দিতে পারেন */}
              <Image
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80"
                alt="Event Booking"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}