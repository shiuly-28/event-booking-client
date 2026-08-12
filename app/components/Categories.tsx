import Link from 'next/link';

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : json.data || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export default async function Categories() {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    return <div className="py-6 text-center text-gray-500">No categories found.</div>;
  }

  // Duplicate the list so the scroll loop looks seamless
  const marqueeItems = [...categories, ...categories];

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
          Event <span className="text-[#00684D]">Categories</span>
        </h2>
      </div>

      <div className="relative">
        <div className="flex gap-4 animate-marquee w-max">
          {marqueeItems.map((cat: any, index: number) => (
            <div
              key={`${cat.id || cat._id}-${index}`}
              className="bg-white px-8 py-6 rounded-xl shadow-sm hover:shadow-md transition text-center cursor-pointer border border-gray-100 hover:border-[#00684D] group shrink-0"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#00684D] transition whitespace-nowrap">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}