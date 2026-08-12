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

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All <span className="text-indigo-600">Categories</span>
        </h1>

        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">No categories found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/events?categoryId=${cat.id}`}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition text-center border border-gray-100 hover:border-indigo-500 group"
              >
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}