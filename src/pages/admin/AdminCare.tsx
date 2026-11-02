import { useState } from 'react';
import { formatPrice, formatDate } from '../../utils';
import type { CareBooking, CareBookingStatus } from '../../types';
import { careStatusSteps } from '../../data/careServices';
import { Sparkles } from 'lucide-react';

const STATUS_LABELS: Record<string, string> = {
  'booking-submitted': 'Booking Dikirim',
  'booking-confirmed': 'Dikonfirmasi',
  'shoes-received': 'Sepatu Diterima',
  'in-progress': 'Dalam Pengerjaan',
  'quality-control': 'Quality Control',
  'ready': 'Siap Diambil',
  'completed': 'Selesai',
};

export default function AdminCare() {
  const [bookings, setBookings] = useState<CareBooking[]>(() =>
    JSON.parse(localStorage.getItem('kickscare_bookings') || '[]')
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const updateStatus = (bookingId: string, status: CareBookingStatus) => {
    const updated = bookings.map((b) =>
      b.id === bookingId ? { ...b, status, updatedAt: new Date().toISOString() } : b
    );
    setBookings(updated);
    localStorage.setItem('kickscare_bookings', JSON.stringify(updated));
  };

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-black text-gray-900">Care Service Management</h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Sparkles size={40} className="text-gray-200 mx-auto mb-4" />
          <p className="text-gray-500">Belum ada booking perawatan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {[...bookings].reverse().map((booking) => (
            <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                onClick={() => setExpandedId(expandedId === booking.id ? null : booking.id)}
              >
                <div>
                  <p className="font-bold font-mono text-gray-900">{booking.id}</p>
                  <p className="text-xs text-gray-500">
                    {booking.shoeInfo.brand} {booking.shoeInfo.model} · {booking.serviceName}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">{formatPrice(booking.servicePrice)}</span>
                  <span className="badge bg-lime-100 text-lime-700 hidden sm:inline">
                    {STATUS_LABELS[booking.status] || booking.status}
                  </span>
                </div>
              </div>

              {expandedId === booking.id && (
                <div className="border-t border-gray-100 p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Info Sepatu</p>
                      <p className="text-gray-600">Brand: {booking.shoeInfo.brand}</p>
                      <p className="text-gray-600">Model: {booking.shoeInfo.model}</p>
                      <p className="text-gray-600">Ukuran: EU {booking.shoeInfo.size}</p>
                      <p className="text-gray-600">Warna: {booking.shoeInfo.color}</p>
                      <p className="text-gray-600">Kondisi: {booking.shoeInfo.condition}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700 mb-1">Detail Booking</p>
                      <p className="text-gray-600">Layanan: {booking.serviceName}</p>
                      <p className="text-gray-600">Tanggal: {formatDate(booking.bookingDate)}</p>
                      <p className="text-gray-600">Metode: {booking.deliveryMethod === 'dropoff' ? 'Drop Off' : 'Pick Up'}</p>
                      <p className="text-gray-600">Dibuat: {formatDate(booking.createdAt)}</p>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="bg-gray-50 rounded-xl p-3 text-sm text-gray-600">
                      <span className="font-semibold">Catatan:</span> {booking.notes}
                    </div>
                  )}

                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {(careStatusSteps as readonly { key: string; label: string }[]).map((step) => (
                        <button
                          key={step.key}
                          onClick={() => updateStatus(booking.id, step.key as CareBookingStatus)}
                          className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                            booking.status === step.key ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600 hover:border-gray-400'
                          }`}
                        >
                          {step.label}
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
