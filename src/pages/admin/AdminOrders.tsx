import { useState } from 'react';
import { formatPrice, formatDate } from '../../utils';
import type { Order, OrderStatus } from '../../types';
import { ShoppingCart } from 'lucide-react';

const STATUS_OPTIONS: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const STATUS_LABELS: Record<string, string> = {
  pending: 'Menunggu', confirmed: 'Dikonfirmasi', processing: 'Diproses',
  shipped: 'Dikirim', delivered: 'Diterima', cancelled: 'Dibatalkan',
};
const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700', confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700', shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700', cancelled: 'bg-red-100 text-red-700',
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>(() =>
    JSON.parse(localStorage.getItem('kickscare_orders') || '[]')
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateStatus = (orderId: string, status: OrderStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o
    );
    setOrders(updated);
    localStorage.setItem('kickscare_orders', JSON.stringify(updated));
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-gray-900">Order Management</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <ShoppingCart size={40} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada pesanan masuk</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...orders].reverse().map((order) => (
            <div key={order.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
              >
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-bold text-gray-900 font-mono">{order.id}</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)} · {order.items.length} item</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-900">{formatPrice(order.totalAmount)}</span>
                  <span className={`badge ${STATUS_COLORS[order.status]}`}>{STATUS_LABELS[order.status]}</span>
                </div>
              </div>

              {expandedId === order.id && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  {/* Items */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Item Pesanan</p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-gray-500">EU {item.size} · {item.color} · x{item.quantity}</p>
                          </div>
                          <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Alamat Pengiriman</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.name} · {order.shippingAddress.phone}<br />
                      {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                    </p>
                  </div>

                  {/* Status Update */}
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            order.status === s ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {STATUS_LABELS[s]}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
