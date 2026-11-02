import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils';

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'KICKS30') {
      setDiscount(0.30);
      setPromoMessage('Kode promo berhasil digunakan! Diskon 30%');
    } else if (promoCode.toUpperCase() === 'CARE20') {
      setDiscount(0.20);
      setPromoMessage('Kode promo berhasil digunakan! Diskon 20%');
    } else {
      setDiscount(0);
      setPromoMessage('Kode promo tidak valid');
    }
  };

  const subtotal = totalPrice;
  const discountAmount = subtotal * discount;
  const shipping = subtotal > 500000 ? 0 : 25000;
  const total = subtotal - discountAmount + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Keranjang Kosong</h2>
          <p className="text-gray-500 mb-6">Tambahkan produk ke keranjang belanja Anda</p>
          <Link to="/shop" className="btn-primary">Mulai Belanja <ArrowRight size={16} /></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-6">Keranjang Belanja ({items.length} item)</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.size}-${item.color}`} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4">
              <Link to={`/shop/${item.product.id}`} className="w-24 h-24 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase">{item.product.brand}</p>
                    <Link to={`/shop/${item.product.id}`} className="font-semibold text-gray-900 hover:text-black text-sm">{item.product.name}</Link>
                    <p className="text-xs text-gray-500 mt-0.5">Size EU {item.size} · {item.color}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id, item.size, item.color)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-gray-900">{formatPrice(item.product.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1">
            <Trash2 size={14} /> Hapus Semua Item
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Ringkasan Pesanan</h2>

            {/* Promo Code */}
            <div className="mb-5">
              <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                <Tag size={14} /> Kode Promo
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Masukkan kode"
                  className="input-field flex-1 py-2 text-sm"
                />
                <button onClick={applyPromo} className="btn-dark py-2 px-4 text-sm rounded-xl">
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p className={`text-xs mt-1.5 ${discount > 0 ? 'text-green-600' : 'text-red-500'}`}>{promoMessage}</p>
              )}
            </div>

            {/* Price breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Diskon ({(discount * 100).toFixed(0)}%)</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Ongkos Kirim</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-semibold">GRATIS</span> : formatPrice(shipping)}</span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Belanja min. Rp500.000 untuk gratis ongkir</p>
              )}
              <div className="border-t border-gray-100 pt-3">
                <div className="flex justify-between font-bold text-gray-900 text-base">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-dark mt-5 justify-center py-3.5"
            >
              Lanjut ke Checkout <ArrowRight size={16} />
            </button>

            <Link to="/shop" className="block text-center text-sm text-gray-500 hover:text-gray-900 mt-3">
              ← Lanjut Belanja
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
