import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { ChevronRight, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice, generateId } from '../utils';
import type { Order, CartItem } from '../types';

export default function CheckoutPage() {
  const { items: cartItems, totalPrice: cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isBuyNow = searchParams.get('mode') === 'buynow';

  // Determine items to checkout: buy-now single item OR cart items
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  useEffect(() => {
    if (isBuyNow) {
      const raw = sessionStorage.getItem('kickscare_buynow');
      if (raw) {
        try {
          setCheckoutItems([JSON.parse(raw)]);
        } catch {
          navigate('/shop');
        }
      } else {
        navigate('/shop');
      }
    } else {
      setCheckoutItems(cartItems);
    }
  }, [isBuyNow]);

  const checkoutTotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = checkoutTotal > 500000 ? 0 : 25000;
  const total = checkoutTotal + shipping;

  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [form, setForm] = useState({
    name: user?.address?.name || user?.name || '',
    phone: user?.address?.phone || user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('transfer-bca');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const newOrder: Order = {
        id: 'ORD-' + generateId().toUpperCase().slice(0, 8),
        userId: user?.id || 'guest',
        items: checkoutItems,
        totalAmount: total,
        status: 'pending',
        shippingAddress: { ...form },
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const existingOrders: Order[] = JSON.parse(localStorage.getItem('kickscare_orders') || '[]');
      existingOrders.push(newOrder);
      localStorage.setItem('kickscare_orders', JSON.stringify(existingOrders));
      setOrderId(newOrder.id);
      if (!isBuyNow) {
        clearCart();
      } else {
        sessionStorage.removeItem('kickscare_buynow');
      }
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  if (checkoutItems.length === 0 && step !== 'success') {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Tidak ada item untuk di-checkout</h2>
        <Link to="/shop" className="btn-primary">Mulai Belanja</Link>
      </div>
    );
  }

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-black" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Pesanan Berhasil!</h1>
        <p className="text-gray-500 mb-2">Nomor pesanan Anda: <span className="font-bold text-gray-900">{orderId}</span></p>
        <p className="text-gray-500 mb-6 text-sm">Tim kami akan segera memproses pesanan Anda. Notifikasi akan dikirimkan ke email Anda.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/dashboard/orders" className="btn-dark">Lihat Pesanan</Link>
          <Link to="/shop" className="btn-secondary">Lanjut Belanja</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-2">
        {isBuyNow ? 'Beli Sekarang' : 'Checkout'}
      </h1>

      {/* Steps */}
      <div className="flex items-center gap-3 mb-8">
        {['Alamat', 'Pembayaran'].map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              (i === 0 && (step === 'address' || step === 'payment')) || (i === 1 && step === 'payment')
                ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {i === 0 && step === 'payment' ? <CheckCircle size={16} /> : i + 1}
            </div>
            <span className="text-sm font-medium text-gray-700">{s}</span>
            {i === 0 && <ChevronRight size={16} className="text-gray-300" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="lg:col-span-2">
          {step === 'address' && (
            <form onSubmit={handleAddressSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">Alamat Pengiriman</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Penerima</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input-field" placeholder="Nama lengkap" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                  <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="input-field" placeholder="08xxx" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Lengkap</label>
                <input required value={form.street} onChange={(e) => setForm({ ...form, street: e.target.value })} className="input-field" placeholder="Nama jalan, nomor, RT/RW" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                  <input required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="input-field" placeholder="Nama kota" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <input required value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className="input-field" placeholder="Nama provinsi" />
                </div>
              </div>
              <div className="max-w-[160px]">
                <label className="block text-sm font-medium text-gray-700 mb-1">Kode Pos</label>
                <input required value={form.postalCode} onChange={(e) => setForm({ ...form, postalCode: e.target.value })} className="input-field" placeholder="12345" />
              </div>
              <button type="submit" className="btn-dark w-full justify-center py-3.5">
                Lanjut ke Pembayaran <ChevronRight size={16} />
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-gray-900 text-lg">Metode Pembayaran</h2>
              <div className="space-y-2">
                {[
                  { id: 'transfer-bca', label: 'Transfer Bank BCA', desc: '024-xxx-xxxx' },
                  { id: 'transfer-mandiri', label: 'Transfer Bank Mandiri', desc: '156-xxx-xxxx' },
                  { id: 'gopay', label: 'GoPay', desc: 'Bayar via GoPay' },
                  { id: 'ovo', label: 'OVO', desc: 'Bayar via OVO' },
                  { id: 'cod', label: 'Bayar di Tempat (COD)', desc: 'Hanya untuk wilayah Jakarta' },
                ].map((pm) => (
                  <label key={pm.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    paymentMethod === pm.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="radio" name="payment" value={pm.id} checked={paymentMethod === pm.id} onChange={() => setPaymentMethod(pm.id)} className="accent-black" />
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{pm.label}</p>
                      <p className="text-xs text-gray-500">{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep('address')} className="btn-secondary flex-1 justify-center py-3">
                  Kembali
                </button>
                <button type="submit" disabled={isProcessing} className="btn-dark flex-1 justify-center py-3">
                  {isProcessing ? 'Memproses...' : 'Konfirmasi Pesanan'}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-bold text-gray-900 mb-4">Ringkasan</h3>
          <div className="space-y-3 mb-4">
            {checkoutItems.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden shrink-0">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-xs text-gray-500">EU {item.size} · x{item.quantity}</p>
                </div>
                <p className="text-sm font-semibold shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(checkoutTotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Ongkir</span>
              <span>{checkoutTotal > 500000 ? <span className="text-green-600">GRATIS</span> : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-2 border-t border-gray-100">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
