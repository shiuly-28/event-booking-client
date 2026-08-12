import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-wide">EventBooking</h2>
            <p className="text-sm text-gray-400">
              Discover and book unforgettable events with ease. Your ultimate platform for seamless event management.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-white transition">Events</Link>
              </li>
              <li>
                <Link href="/category" className="hover:text-white transition">Category</Link>
              </li>
              <li>
                <Link href="/review" className="hover:text-white transition">Review</Link>
              </li>
            </ul>
          </div>

          {/* Support & Booking */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Account & Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/booking" className="hover:text-white transition">My Bookings</Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition">Login</Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">Register</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-base">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on upcoming events and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 w-full"
              />
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EventBooking. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}