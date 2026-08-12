'use client';

import Spinner from '@/app/components/Spinner';
import { useEffect, useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  description?: string;
  location: string;
  price: number;
  startsAt: string;
  seats: number;
  categoryId: string;
  category?: Category;
}

const emptyForm = {
  title: '',
  description: '',
  location: '',
  price: 0,
  startsAt: '',
  seats: 0,
  categoryId: '',
};

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const getToken = () => localStorage.getItem('token');

  async function fetchAll() {
    setLoading(true);
    try {
      const [eventsRes, categoriesRes] = await Promise.all([
        fetch(`${API_URL}/events`, { cache: 'no-store' }),
        fetch(`${API_URL}/categories`, { cache: 'no-store' }),
      ]);
      const eventsJson = await eventsRes.json();
      const categoriesJson = await categoriesRes.json();
      setEvents(eventsJson.data || []);
      setCategories(categoriesJson.data || []);
    } catch {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAll();
  }, []);

  function openCreateForm() {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(ev: Event) {
    setForm({
      title: ev.title,
      description: ev.description || '',
      location: ev.location,
      price: ev.price,
      startsAt: ev.startsAt ? ev.startsAt.slice(0, 16) : '',
      seats: ev.seats,
      categoryId: ev.categoryId,
    });
    setEditingId(ev.id);
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const url = editingId ? `${API_URL}/events/${editingId}` : `${API_URL}/events`;
      const method = editingId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          seats: Number(form.seats),
          startsAt: new Date(form.startsAt).toISOString(),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to save event');

      if (editingId) {
        setEvents((prev) => prev.map((ev) => (ev.id === editingId ? json.data : ev)));
      } else {
        setEvents((prev) => [json.data, ...prev]);
      }
      setShowForm(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this event?')) return;
    setError('');
    try {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || 'Failed to delete event');
      setEvents((prev) => prev.filter((ev) => ev.id !== id));
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
        <button
          onClick={openCreateForm}
          className="px-5 py-2.5 bg-[#00684D] text-white font-semibold rounded-xl hover:bg-[#013b2c] transition"
        >
          + New Event
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 space-y-4">
          <h2 className="text-lg font-bold text-gray-900">{editingId ? 'Edit Event' : 'New Event'}</h2>
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <input required placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <input type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <input type="number" placeholder="Seats" value={form.seats} onChange={(e) => setForm({ ...form, seats: Number(e.target.value) })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <input required type="datetime-local" value={form.startsAt} onChange={(e) => setForm({ ...form, startsAt: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2" />
            <select required value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })} className="border border-gray-300 rounded-lg px-3 py-2">
              <option value="">Select category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} />
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="px-5 py-2 bg-[#00684D] text-white font-semibold rounded-lg hover:bg-[#00684D] transition disabled:opacity-50">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
         <Spinner />
      ) : events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
          {events.map((ev) => (
            <div key={ev.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold text-gray-900">{ev.title}</p>
                <p className="text-sm text-gray-500">
                  📍 {ev.location} · {ev.category?.name || 'No category'} · ${ev.price}
                </p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEditForm(ev)} className="px-4 py-1.5 bg-indigo-50 text-[#00684D] text-sm font-semibold rounded-lg hover:bg-indigo-100 transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(ev.id)} className="px-4 py-1.5 bg-red-50 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-100 transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

