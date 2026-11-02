import { useState } from 'react';
import { Users, Search, ShoppingBag, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { formatDate, formatPrice } from '../../utils';
import type { User, Order, CareBooking } from '../../types';

// Mock customers
const MOCK_CUSTOMERS: User[] = [
  { id: 'u001', name: 'Ahmad Rizki', email: 'user@kickscare.id', phone: '08123456789', role: 'customer', createdAt: '2024-01-15T00:00:00Z' },
  { id: 'u003', name: 'Budi Santoso', email: 'budi@example.com', phone: '08234567890', role: 'customer', createdAt: '2024-02-20T00:00:00Z' },
  { id: 'u004', name: 'Sari Dewi', email: 'sari@example.com', phone: '08345678901', role: 'customer', createdAt: '2024-03-05T00:00:00Z' },
  { id: 'u005', name: 'Rizal Fauzi', email: 'rizal@example.com', phone: '08456789012', role: 'customer', createdAt: '2024-03-18T00:00:00Z' },
  { id: 'u006', name: 'Dina Putri', email: 'dina@example.com', phone: '08567890123', role: 'customer', createdAt: '2024-04-01T00:00:00Z' },
];

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const savedUser = localStorage.getItem('kickscare_user');
  let customers = [...MOCK_CUSTOMERS];
  if (savedUser) {
    const u = JSON.parse(savedUser);
    if (u.role === 'customer' && !customers.find((c) => c.id === u.id)) {
      customers.unshift(u);
    }
  }

  const allOrders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]');
  const allBookings: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]');

  const getOrderCount = (userId: string) => allOrders.filter((o) => o.userId === userId).length;
  const getBookingCount = (userId: string) => allBookings.filter((b) => b.userId === userId).length;
  const getOrderTotal = (userId: string) =>
    allOrders.filter((o) => o.userId === userId).reduce((sum, o) => sum + o.totalAmount, 0);
  const getCustomerOrders = (userId: string) => allOrders.filter((o) => o.userId === userId).slice(-3).reverse();

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone || '').includes(search)
  );

  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">Customer Management</h1>
        <span className="badge bg-gray-100 text-gray-700">{customers.length} pelanggan</span>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pelanggan', value: customers.length, icon: Users, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Pesanan', value: allOrders.length, icon: ShoppingBag, color: 'bg-purple-50 text-purple-600' },
          { label: 'Total Booking', value: allBookings.length, icon: Sparkles, color: 'bg-lime-50 text-lime-600' },
          { label: 'Total Revenue', value: formatPrice(totalRevenue), icon: ShoppingBag, color: 'bg-green-50 text-green-600' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${stat.color}`}>
              <stat.icon size={18} />
            </div>
            <p className="text-lg font-black text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, email, atau nomor telepon..."
          className="input-field pl-10"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Pelanggan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Kontak</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Bergabung</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Pesanan</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Total Belanja</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <>
                  <tr
                    key={c.id}
                    className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-lime-400 rounded-full flex items-center justify-center font-bold text-sm text-black shrink-0">
                          {c.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{c.name}</p>
                          <p className="text-xs text-gray-400 md:hidden">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-gray-600 hidden md:block">{c.email}</p>
                      <p className="text-gray-400 text-xs">{c.phone || '-'}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell text-xs">{formatDate(c.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="badge bg-blue-50 text-blue-700">{getOrderCount(c.id)} pesanan</span>
                      </div>
                      <span className="badge bg-lime-50 text-lime-700 mt-1 block w-fit">{getBookingCount(c.id)} booking</span>
                    </td>
                    <td className="px-4 py-3 font-semibold hidden sm:table-cell">
                      {getOrderTotal(c.id) > 0 ? formatPrice(getOrderTotal(c.id)) : <span className="text-gray-400">-</span>}
                    </td>
                    <td className="px-4 py-3">
                      <span className="badge bg-green-100 text-green-700">Aktif</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {expandedId === c.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                  </tr>
                  {expandedId === c.id && (
                    <tr key={`${c.id}-detail`}>
                      <td colSpan={7} className="px-4 pb-4 bg-gray-50 border-b border-gray-100">
                        <div className="pt-3">
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pesanan Terakhir</p>
                          {getCustomerOrders(c.id).length === 0 ? (
                            <p className="text-sm text-gray-400">Belum ada pesanan</p>
                          ) : (
                            <div className="space-y-2">
                              {getCustomerOrders(c.id).map((order) => (
                                <div key={order.id} className="flex items-center justify-between bg-white border border-gray-100 rounded-xl p-3 text-sm">
                                  <div>
                                    <p className="font-mono font-semibold text-gray-900 text-xs">{order.id}</p>
                                    <p className="text-xs text-gray-400">{formatDate(order.createdAt)} · {order.items.length} item</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-semibold">{formatPrice(order.totalAmount)}</p>
                                    <span className="badge bg-yellow-100 text-yellow-700">{order.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12">
            <Users size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500">Tidak ada pelanggan ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
