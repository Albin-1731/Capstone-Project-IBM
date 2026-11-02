import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../utils';
import type { Order } from '../../types';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu Pembayaran',
  confirmed: 'Dikonfirmasi',
  processing: 'Sedang Diproses',
  shipped: 'Dikirim',
  delivered: 'Diterima',
  cancelled: 'Dibatalkan',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function OrdersPage() {
  const { user } = useAuth();
  const orders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]')
    .filter((o: Order) => o.userId === user?.id)
    .reverse();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-900">Pesanan Saya</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ShoppingBag size={40} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Belum ada pesanan</h3>
          <p className="text-gray-500 text-sm mb-4">Mulai belanja dan pesanan Anda akan muncul di sini</p>
          <Link to="/shop" className="btn-primary">Jelajahi Produk</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-bold text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">{formatDate(order.createdAt)}</p>
                </div>
                <span className={`badge ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-700'}`}>
                  {STATUS_LABELS[order.status] || order.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.product.brand} · EU {item.size} · x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <p className="text-sm text-gray-500">
                  Alamat: {order.shippingAddress.city}, {order.shippingAddress.province}
                </p>
                <p className="font-bold">Total: {formatPrice(order.totalAmount)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
