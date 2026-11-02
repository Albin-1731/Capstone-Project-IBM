import { ShoppingCart, Users, Package, Sparkles, DollarSign, ArrowUp, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../../data/products';
import { formatPrice, formatDate } from '../../utils';
import type { Order, CareBooking } from '../../types';

const MOCK_CUSTOMERS_COUNT = 5;

const mockSalesData = [
  { month: 'Jun', amount: 12500000 },
  { month: 'Jul', amount: 18200000 },
  { month: 'Agu', amount: 15800000 },
  { month: 'Sep', amount: 22400000 },
  { month: 'Okt', amount: 19700000 },
  { month: 'Nov', amount: 28900000 },
];

const maxAmount = Math.max(...mockSalesData.map((d) => d.amount));

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};
const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu', confirmed: 'Dikonfirmasi', processing: 'Diproses',
  shipped: 'Dikirim', delivered: 'Diterima', cancelled: 'Dibatalkan',
};

export default function AdminOverview() {
  // Re-read from localStorage on render
  const orders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]');
  const bookings: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]');

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalCareRevenue = bookings.reduce((sum, b) => sum + b.servicePrice, 0);
  const activeBookings = bookings.filter((b) => b.status !== 'completed').length;

  // Customer count from localStorage
  const savedUser = localStorage.getItem('kickscare_user');
  let customerCount = MOCK_CUSTOMERS_COUNT;
  if (savedUser) {
    const u = JSON.parse(savedUser);
    if (u.role === 'customer') customerCount = MOCK_CUSTOMERS_COUNT + 1;
  }

  const stats = [
    { label: 'Total Pendapatan', value: formatPrice(totalRevenue + totalCareRevenue), icon: DollarSign, color: 'bg-green-50 text-green-600', change: '+23%', link: '/admin/reports' },
    { label: 'Total Pesanan', value: orders.length, icon: ShoppingCart, color: 'bg-blue-50 text-blue-600', change: '+12%', link: '/admin/orders' },
    { label: 'Total Produk', value: products.length, icon: Package, color: 'bg-purple-50 text-purple-600', change: '+3', link: '/admin/products' },
    { label: 'Total Pelanggan', value: customerCount, icon: Users, color: 'bg-orange-50 text-orange-600', change: '+8', link: '/admin/customers' },
    { label: 'Booking Aktif', value: activeBookings, icon: Sparkles, color: 'bg-lime-50 text-lime-600', change: '+5', link: '/admin/care' },
  ];

  const recentOrders = [...orders].reverse().slice(0, 5);
  const recentBookings = [...bookings].reverse().slice(0, 3);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang di Admin Panel KicksCare.id</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} to={stat.link} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                <stat.icon size={20} />
              </div>
              <span className="text-xs text-green-600 font-semibold flex items-center gap-0.5">
                <ArrowUp size={12} /> {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="font-bold text-gray-900">Grafik Pendapatan (6 Bulan)</h3>
              <p className="text-xs text-gray-400 mt-0.5">Data estimasi — belum terhubung backend</p>
            </div>
            <span className="badge bg-lime-100 text-lime-700">2025</span>
          </div>
          <div className="flex items-end gap-3 h-44">
            {mockSalesData.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <p className="text-xs text-gray-500 font-semibold truncate w-full text-center">
                  {(d.amount / 1000000).toFixed(1)}jt
                </p>
                <div
                  className={`w-full rounded-t-lg transition-all ${i === mockSalesData.length - 1 ? 'bg-lime-400' : 'bg-gray-200 hover:bg-gray-300'}`}
                  style={{ height: `${(d.amount / maxAmount) * 140}px` }}
                />
                <p className="text-xs text-gray-500">{d.month}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
            <span className="text-gray-500">Total 6 bulan</span>
            <span className="font-bold text-gray-900">
              {formatPrice(mockSalesData.reduce((s, d) => s + d.amount, 0))}
            </span>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Booking Terbaru</h3>
            <Link to="/admin/care" className="text-xs text-gray-400 hover:text-black flex items-center gap-0.5">
              Lihat Semua <ArrowRight size={12} />
            </Link>
          </div>
          {recentBookings.length === 0 ? (
            <div className="text-center py-6">
              <Sparkles size={28} className="text-gray-200 mx-auto mb-2" />
              <p className="text-gray-400 text-sm">Belum ada booking</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((b) => (
                <div key={b.id} className="flex items-center gap-3 p-2.5 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center shrink-0">
                    <Sparkles size={14} className="text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-gray-900 truncate">{b.shoeInfo.brand} {b.shoeInfo.model}</p>
                    <p className="text-xs text-gray-500 truncate">{b.serviceName}</p>
                  </div>
                  <span className="text-xs font-bold text-gray-900 shrink-0">{formatPrice(b.servicePrice)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Pesanan Terbaru</h3>
          <Link to="/admin/orders" className="text-xs text-gray-400 hover:text-black flex items-center gap-0.5">
            Lihat Semua <ArrowRight size={12} />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingCart size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">Belum ada pesanan masuk</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left pb-3 font-semibold text-gray-500">ID Pesanan</th>
                  <th className="text-left pb-3 font-semibold text-gray-500 hidden sm:table-cell">Item</th>
                  <th className="text-left pb-3 font-semibold text-gray-500">Total</th>
                  <th className="text-left pb-3 font-semibold text-gray-500">Status</th>
                  <th className="text-left pb-3 font-semibold text-gray-500 hidden md:table-cell">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="py-3 font-mono text-xs text-gray-700">{order.id}</td>
                    <td className="py-3 text-gray-700 hidden sm:table-cell">{order.items.length} item</td>
                    <td className="py-3 font-semibold">{formatPrice(order.totalAmount)}</td>
                    <td className="py-3">
                      <span className={`badge ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500 text-xs hidden md:table-cell">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Kelola Produk', to: '/admin/products', color: 'bg-purple-50 border-purple-100', textColor: 'text-purple-700' },
          { label: 'Kelola Pesanan', to: '/admin/orders', color: 'bg-blue-50 border-blue-100', textColor: 'text-blue-700' },
          { label: 'Kelola Booking', to: '/admin/care', color: 'bg-lime-50 border-lime-100', textColor: 'text-lime-700' },
          { label: 'Laporan', to: '/admin/reports', color: 'bg-green-50 border-green-100', textColor: 'text-green-700' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className={`${item.color} border rounded-2xl p-4 hover:shadow-sm transition-all flex items-center justify-between`}
          >
            <span className={`font-semibold text-sm ${item.textColor}`}>{item.label}</span>
            <ArrowRight size={16} className={item.textColor} />
          </Link>
        ))}
      </div>
    </div>
  );
}
