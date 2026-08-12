import Link from 'next/link';

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`, { 
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json) ? json : json.data || [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export default async function Categories() {
  const categories = await getCategories();

  if (!categories || categories.length === 0) {
    return <div className="py-6 text-center text-gray-500">No categories found.</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
          Event <span className="text-[#00684D]">Categories</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat: any, index: number) => (
            <div 
              key={cat.id || cat._id || index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center cursor-pointer border border-gray-100 hover:border-indigo-500 group"
            >
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#00684D] transition">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}