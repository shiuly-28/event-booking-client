import Link from 'next/link';

const adminLinks = [
  {
    href: '/admin/categories',
    title: 'Categories',
    description: 'Create, edit, and delete event categories',
  },
  {
    href: '/admin/events',
    title: 'Events',
    description: 'Create, edit, and delete events',
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-8">Manage your event booking platform</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-indigo-500 transition group"
            >
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition mb-1">
                {link.title}
              </h2>
              <p className="text-gray-500 text-sm">{link.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}