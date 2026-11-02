import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { careServices } from '../data/careServices';
import { useAuth } from '../context/AuthContext';
import { formatPrice, generateId } from '../utils';
import type { CareBooking } from '../types';

export default function BookingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const preselectedServiceId = (location.state as { serviceId?: string })?.serviceId || '';

  const [step, setStep] = useState<'service' | 'info' | 'confirm' | 'success'>('service');
  const [selectedServiceId, setSelectedServiceId] = useState(preselectedServiceId);
  const [deliveryMethod, setDeliveryMethod] = useState<'dropoff' | 'pickup'>('dropoff');
  const [bookingDate, setBookingDate] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const [shoeInfo, setShoeInfo] = useState({
    brand: '',
    model: '',
    color: '',
    size: '',
    condition: 'good',
    notes: '',
  });

  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    province: user?.address?.province || '',
    postalCode: user?.address?.postalCode || '',
  });

  const selectedService = careServices.find((s) => s.id === selectedServiceId);

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!selectedService) return;
    setIsProcessing(true);
    setTimeout(() => {
      const booking: CareBooking = {
        id: 'BKG-' + generateId().toUpperCase().slice(0, 8),
        userId: user?.id || 'guest',
        shoeInfo,
        serviceType: selectedService.type,
        serviceName: selectedService.name,
        servicePrice: selectedService.price,
        deliveryMethod,
        bookingDate,
        status: 'booking-submitted',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        address: deliveryMethod === 'pickup' ? { ...address } : undefined,
        notes: shoeInfo.notes,
      };
      const existing: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]');
      existing.push(booking);
      localStorage.setItem('kickscare_bookings', JSON.stringify(existing));
      setBookingId(booking.id);
      setIsProcessing(false);
      setStep('success');
    }, 1500);
  };

  if (step === 'success') {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-lime-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-black" />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Booking Berhasil!</h1>
        <p className="text-gray-500 mb-2">ID Booking: <span className="font-bold text-gray-900">{bookingId}</span></p>
        <p className="text-gray-500 mb-6 text-sm">
          {deliveryMethod === 'dropoff'
            ? `Silakan antar sepatu Anda pada ${new Date(bookingDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`
            : 'Tim kami akan menghubungi Anda untuk konfirmasi penjemputan.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/dashboard/care')} className="btn-dark">Lacak Booking</button>
          <button onClick={() => navigate('/shoe-care')} className="btn-secondary">Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-black text-gray-900 mb-2">Pesan Layanan Perawatan</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-8">
        {['Pilih Layanan', 'Info Sepatu', 'Konfirmasi'].map((s, i) => {
          const stepKeys = ['service', 'info', 'confirm'];
          const currentIdx = stepKeys.indexOf(step);
          return (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                i < currentIdx ? 'bg-lime-400 text-black' : i === currentIdx ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {i < currentIdx ? <CheckCircle size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:inline ${i === currentIdx ? 'text-gray-900' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <span className="text-gray-200 mx-1">›</span>}
            </div>
          );
        })}
      </div>

      {/* STEP 1: Select Service */}
      {step === 'service' && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Pilih Jenis Layanan</h2>
          <div className="space-y-3 mb-6">
            {careServices.map((s) => (
              <label key={s.id} className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all ${
                selectedServiceId === s.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input type="radio" name="service" value={s.id} checked={selectedServiceId === s.id} onChange={() => setSelectedServiceId(s.id)} className="accent-black" />
                <div className="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{s.name}</p>
                  <p className="text-sm text-gray-500 line-clamp-1">{s.description}</p>
                  <p className="text-sm font-semibold mt-1">{formatPrice(s.price)}</p>
                </div>
                {s.popular && <span className="badge bg-lime-400 text-black shrink-0">POPULER</span>}
              </label>
            ))}
          </div>
          <button
            disabled={!selectedServiceId}
            onClick={() => setStep('info')}
            className="btn-dark w-full justify-center py-3.5 disabled:opacity-50"
          >
            Lanjut →
          </button>
        </div>
      )}

      {/* STEP 2: Shoe Info */}
      {step === 'info' && (
        <form onSubmit={(e) => { e.preventDefault(); setStep('confirm'); }}>
          <h2 className="font-bold text-gray-900 mb-4">Informasi Sepatu & Jadwal</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Data Sepatu</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Sepatu</label>
                <input required value={shoeInfo.brand} onChange={(e) => setShoeInfo({ ...shoeInfo, brand: e.target.value })} className="input-field" placeholder="Nike, Adidas, dll" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                <input required value={shoeInfo.model} onChange={(e) => setShoeInfo({ ...shoeInfo, model: e.target.value })} className="input-field" placeholder="Air Force 1, Ultraboost" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Warna</label>
                <input required value={shoeInfo.color} onChange={(e) => setShoeInfo({ ...shoeInfo, color: e.target.value })} className="input-field" placeholder="White/Black" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ukuran (EU)</label>
                <input required value={shoeInfo.size} onChange={(e) => setShoeInfo({ ...shoeInfo, size: e.target.value })} className="input-field" placeholder="42" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi Sepatu</label>
              <select value={shoeInfo.condition} onChange={(e) => setShoeInfo({ ...shoeInfo, condition: e.target.value })} className="input-field">
                <option value="good">Baik - Kotor ringan</option>
                <option value="medium">Sedang - Cukup kotor</option>
                <option value="bad">Buruk - Sangat kotor / rusak</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Catatan Tambahan</label>
              <textarea
                value={shoeInfo.notes}
                onChange={(e) => setShoeInfo({ ...shoeInfo, notes: e.target.value })}
                className="input-field resize-none"
                rows={3}
                placeholder="Contoh: ada noda membandel di bagian kiri, midsole agak kuning..."
              />
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 space-y-4">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide">Jadwal & Metode</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal Booking</label>
              <input required type="date" min={minDateStr} value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Metode Pengiriman Sepatu</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'dropoff', label: 'Drop Off', desc: 'Antar sepatu ke toko kami' },
                  { value: 'pickup', label: 'Pick Up', desc: 'Kami jemput ke lokasi Anda' },
                ].map((m) => (
                  <label key={m.value} className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryMethod === m.value ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input type="radio" name="delivery" value={m.value} checked={deliveryMethod === m.value as 'dropoff'|'pickup'} onChange={() => setDeliveryMethod(m.value as 'dropoff'|'pickup')} className="hidden" />
                    <span className="font-semibold text-sm">{m.label}</span>
                    <span className="text-xs text-gray-500">{m.desc}</span>
                  </label>
                ))}
              </div>
            </div>

            {deliveryMethod === 'pickup' && (
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700">Alamat Penjemputan</p>
                <input required={deliveryMethod === 'pickup'} value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} className="input-field" placeholder="Nama penerima" />
                <input required={deliveryMethod === 'pickup'} value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} className="input-field" placeholder="No. telepon" />
                <input required={deliveryMethod === 'pickup'} value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} className="input-field" placeholder="Alamat lengkap" />
                <div className="grid grid-cols-2 gap-3">
                  <input required={deliveryMethod === 'pickup'} value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} className="input-field" placeholder="Kota" />
                  <input required={deliveryMethod === 'pickup'} value={address.province} onChange={(e) => setAddress({ ...address, province: e.target.value })} className="input-field" placeholder="Provinsi" />
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => setStep('service')} className="btn-secondary flex-1 justify-center py-3">← Kembali</button>
            <button type="submit" className="btn-dark flex-1 justify-center py-3">Lanjut →</button>
          </div>
        </form>
      )}

      {/* STEP 3: Confirmation */}
      {step === 'confirm' && selectedService && (
        <div>
          <h2 className="font-bold text-gray-900 mb-4">Konfirmasi Pemesanan</h2>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 space-y-3">
            <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wide mb-3">Ringkasan Layanan</h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Layanan</span>
              <span className="font-semibold">{selectedService.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Sepatu</span>
              <span className="font-semibold">{shoeInfo.brand} {shoeInfo.model}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Ukuran / Warna</span>
              <span className="font-semibold">EU {shoeInfo.size} / {shoeInfo.color}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tanggal</span>
              <span className="font-semibold">{new Date(bookingDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Metode</span>
              <span className="font-semibold capitalize">{deliveryMethod === 'dropoff' ? 'Drop Off ke Toko' : 'Pick Up ke Alamat'}</span>
            </div>
            <div className="flex justify-between text-sm border-t border-gray-100 pt-3">
              <span className="font-bold text-gray-900">Total Estimasi</span>
              <span className="font-bold text-gray-900">{formatPrice(selectedService.price)}</span>
            </div>
          </div>
          {shoeInfo.notes && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900 mb-1">Catatan:</p>
              {shoeInfo.notes}
            </div>
          )}
          <p className="text-xs text-gray-400 mb-5">
            * Harga final mungkin berbeda setelah inspeksi kondisi sepatu. Anda akan dihubungi sebelum pengerjaan dimulai.
          </p>
          <div className="flex gap-3">
            <button onClick={() => setStep('info')} className="btn-secondary flex-1 justify-center py-3">← Kembali</button>
            <button onClick={handleSubmit} disabled={isProcessing} className="btn-dark flex-1 justify-center py-3">
              {isProcessing ? 'Memproses...' : 'Konfirmasi Booking ✓'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
