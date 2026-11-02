import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';
import { formatPrice } from '../../utils';
import type { Order, CareBooking } from '../../types';
import { products } from '../../data/products';

export default function AdminReports() {
  const orders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]');
  const bookings: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]');

  const marketplaceRevenue = orders.reduce((s, o) => s + o.totalAmount, 0);
  const careRevenue = bookings.reduce((s, b) => s + b.servicePrice, 0);
  const totalRevenue = marketplaceRevenue + careRevenue;

  const topProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);
  const categoryStats = products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Reports & Analytics</h1>

      {/* Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <p className="font-semibold text-gray-700">Total Revenue</p>
          </div>
          <p className="text-2xl font-black text-gray-900">{formatPrice(totalRevenue)}</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Marketplace</span>
              <span className="font-medium">{formatPrice(marketplaceRevenue)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shoe Care</span>
              <span className="font-medium">{formatPrice(careRevenue)}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <TrendingUp size={20} className="text-blue-600" />
            </div>
            <p className="font-semibold text-gray-700">Total Transaksi</p>
          </div>
          <p className="text-2xl font-black text-gray-900">{orders.length + bookings.length}</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Pesanan</span>
              <span className="font-medium">{orders.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Booking</span>
              <span className="font-medium">{bookings.length}</span>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Package size={20} className="text-purple-600" />
            </div>
            <p className="font-semibold text-gray-700">Inventaris</p>
          </div>
          <p className="text-2xl font-black text-gray-900">{products.length}</p>
          <div className="mt-3 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Total Stok</span>
              <span className="font-medium">{products.reduce((s, p) => s + p.stock, 0)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Distribusi Kategori Produk</h3>
        <div className="space-y-3">
          {Object.entries(categoryStats).map(([cat, count]) => (
            <div key={cat}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{cat}</span>
                <span className="text-gray-500">{count} produk</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-lime-400 rounded-full"
                  style={{ width: `${(count / products.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-900 mb-4">Produk Terpopuler</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.id} className="flex items-center gap-4">
              <span className="w-6 text-center font-black text-gray-400 text-sm">{i + 1}</span>
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 text-sm truncate">{p.name}</p>
                <p className="text-xs text-gray-500">{p.brand} · {p.reviewCount.toLocaleString()} ulasan</p>
              </div>
              <p className="font-bold text-sm shrink-0">{formatPrice(p.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
