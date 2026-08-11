import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo / Brand Name */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              EventBooking
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Home
            </Link>
            <Link href="/category" className="text-gray-700 hover:text-indigo-600 font-medium transition">
             Category
            </Link>
            <Link href="/review" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Review
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Events
            </Link>
            <Link href="/booking" className="text-gray-700 hover:text-indigo-600 font-medium transition">
              Booking
            </Link>
           
          </div>

          {/* Right side: Login & Register Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/login" 
              className="text-indigo-600 border border-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button (Optional toggle can be added later) */}
          <div className="md:hidden flex items-center">
            <button className="text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}