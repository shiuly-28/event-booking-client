'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// স্লাইডারের জন্য ইমেইজগুলোর তালিকা (আপনি চাইলে আপনার পছন্দমতো ছবি বা লোকাল পাথ দিতে পারেন)
const sliderImages = [
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // প্রতি ৪ সেকেন্ড পর পর অটোমেটিক ছবি পরিবর্তন হবে
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-5xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
              Book Your Dream <span className="text-[#00684D]">Events</span> Easily
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto md:mx-0">
              Discover and book tickets for the most exciting concerts, tech meetups, workshops, and gatherings around you with just a few clicks.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 pt-2">
              <Link
                href="/events"
                className="bg-[#00684D] text-white font-medium px-8 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition text-center"
              >
                Explore Events
              </Link>
              <Link
                href="/register"
                className="border border-[#00684D] text-[#00684D] font-medium px-8 py-3 rounded-xl hover:bg-emerald-50 transition text-center"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Right Side: Image Slider */}
          <div className="flex justify-center">
            <div className="relative w-full h-72 sm:h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl">
              {sliderImages.map((src, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Event Slide ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-1000"
                    priority={index === 0}
                  />
                </div>
              ))}

              {/* Slider Dots / Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {sliderImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-[#00684D] w-6' : 'bg-white/70'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}