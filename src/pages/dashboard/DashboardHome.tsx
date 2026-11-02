import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, Heart, ArrowRight, Package, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice, formatDate } from '../../utils';
import type { Order, CareBooking } from '../../types';

export default function DashboardHome() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  const orders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]')
    .filter((o: Order) => o.userId === user?.id);
  const bookings: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]')
    .filter((b: CareBooking) => b.userId === user?.id);

  const activeBookings = bookings.filter((b) => b.status !== 'completed');

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      processing: 'bg-purple-100 text-purple-700',
      shipped: 'bg-indigo-100 text-indigo-700',
      delivered: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    const labels: Record<string, string> = {
      pending: 'Menunggu', confirmed: 'Dikonfirmasi', processing: 'Diproses',
      shipped: 'Dikirim', delivered: 'Diterima', cancelled: 'Dibatalkan',
    };
    return (
      <span className={`badge ${styles[status] || 'bg-gray-100 text-gray-700'}`}>{labels[status] || status}</span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">
          Halo, {user?.name.split(' ')[0]}! 👋
        </h1>
        <p className="text-gray-500 mt-1">Selamat datang di dashboard KicksCare.id</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Pesanan', value: orders.length, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600', link: '/dashboard/orders' },
          { label: 'Booking Aktif', value: activeBookings.length, icon: Sparkles, color: 'bg-lime-50 text-lime-600', link: '/dashboard/care' },
          { label: 'Wishlist', value: wishlist.length, icon: Heart, color: 'bg-red-50 text-red-500', link: '/dashboard/wishlist' },
          { label: 'Total Booking', value: bookings.length, icon: Package, color: 'bg-purple-50 text-purple-600', link: '/dashboard/care' },
        ].map((stat) => (
          <Link key={stat.label} to={stat.link} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <p className="text-2xl font-black text-gray-900">{stat.value}</p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-gray-900">Pesanan Terbaru</h2>
          <Link to="/dashboard/orders" className="text-sm text-gray-500 hover:text-black flex items-center gap-1">
            Lihat semua <ArrowRight size={14} />
          </Link>
        </div>
        {orders.length === 0 ? (
          <div className="text-center py-8">
            <ShoppingBag size={32} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada pesanan</p>
            <Link to="/shop" className="text-sm font-semibold text-black hover:underline mt-2 inline-block">Mulai Belanja</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.slice(-3).reverse().map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div>
                  <p className="font-semibold text-sm text-gray-900">{order.id}</p>
                  <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm">{formatPrice(order.totalAmount)}</p>
                  {statusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Active Care Bookings */}
      {activeBookings.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900">Perawatan Aktif</h2>
            <Link to="/dashboard/care" className="text-sm text-gray-500 hover:text-black flex items-center gap-1">
              Lacak <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {activeBookings.slice(0, 2).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 bg-lime-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-lime-400 rounded-lg flex items-center justify-center">
                    <Sparkles size={14} className="text-black" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{booking.shoeInfo.brand} {booking.shoeInfo.model}</p>
                    <p className="text-xs text-gray-500">{booking.serviceName}</p>
                  </div>
                </div>
                <span className="badge bg-lime-400 text-black capitalize">{booking.status.replace('-', ' ')}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link to="/shop" className="bg-black text-white rounded-2xl p-5 flex items-center justify-between hover:bg-gray-900 transition-colors">
          <div>
            <p className="font-bold">Explore Marketplace</p>
            <p className="text-gray-400 text-sm mt-0.5">Temukan sneakers terbaru</p>
          </div>
          <ShoppingBag size={24} className="text-lime-400" />
        </Link>
        <Link to="/shoe-care/book" className="bg-lime-400 text-black rounded-2xl p-5 flex items-center justify-between hover:bg-lime-300 transition-colors">
          <div>
            <p className="font-bold">Book Shoes Care</p>
            <p className="text-black/60 text-sm mt-0.5">Rawat koleksi Anda</p>
          </div>
          <Sparkles size={24} className="text-black" />
        </Link>
      </div>
    </div>
  );
}
