import { useAuth } from '../../context/AuthContext';
import { formatPrice, formatDate } from '../../utils';
import type { CareBooking, CareBookingStatus } from '../../types';
import { careStatusSteps } from '../../data/careServices';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle, Circle } from 'lucide-react';

const statusIndex = (status: CareBookingStatus) =>
  careStatusSteps.findIndex((s) => s.key === status);

export default function CareBookingsPage() {
  const { user } = useAuth();
  const bookings: CareBooking[] = JSON.parse(localStorage.getItem('kickscare_bookings') || '[]')
    .filter((b: CareBooking) => b.userId === user?.id)
    .reverse();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-black text-gray-900">Shoes Care</h1>
        <Link to="/shoe-care/book" className="btn-dark text-sm py-2 px-4">+ Booking Baru</Link>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Sparkles size={40} className="text-gray-200 mx-auto mb-4" />
          <h3 className="font-bold text-gray-900 mb-2">Belum ada booking Shoes Care</h3>
          <p className="text-gray-500 text-sm mb-4">Rawat sepatu Anda bersama tim profesional kami</p>
          <Link to="/shoe-care" className="btn-primary">Lihat Layanan Shoes Care</Link>
        </div>
      ) : (
        <div className="space-y-5">
          {bookings.map((booking) => {
            const currentIdx = statusIndex(booking.status);
            return (
              <div key={booking.id} className="bg-white border border-gray-100 rounded-2xl p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-bold text-gray-900">{booking.id}</p>
                    <p className="text-sm text-gray-500">{booking.shoeInfo.brand} {booking.shoeInfo.model} · {booking.serviceName}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{formatDate(booking.createdAt)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatPrice(booking.servicePrice)}</p>
                    <p className="text-xs text-gray-400 capitalize">{booking.deliveryMethod === 'dropoff' ? 'Drop Off' : 'Pick Up'}</p>
                  </div>
                </div>

                {/* Progress Timeline */}
                <div className="mt-4">
                  <div className="relative">
                    {/* Progress bar */}
                    <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-100">
                      <div
                        className="h-full bg-lime-400 transition-all duration-500"
                        style={{ width: `${(currentIdx / (careStatusSteps.length - 1)) * 100}%` }}
                      />
                    </div>
                    <div className="relative flex justify-between">
                      {careStatusSteps.map((step, i) => {
                        const isDone = i <= currentIdx;
                        const isCurrent = i === currentIdx;
                        return (
                          <div key={step.key} className="flex flex-col items-center" style={{ width: `${100 / careStatusSteps.length}%` }}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative transition-all ${
                              isDone ? 'bg-lime-400 text-black' : 'bg-white border-2 border-gray-200 text-gray-400'
                            } ${isCurrent ? 'ring-2 ring-lime-400 ring-offset-2' : ''}`}>
                              {isDone ? <CheckCircle size={14} /> : <Circle size={14} />}
                            </div>
                            <p className={`text-center mt-2 leading-tight ${i === 0 || i === careStatusSteps.length - 1 ? 'block' : 'hidden md:block'}`}
                              style={{ fontSize: '9px', maxWidth: '60px' }}>
                              {step.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="mt-4 bg-lime-50 rounded-xl p-3">
                    <p className="text-sm font-semibold text-lime-800">
                      Status: {careStatusSteps.find((s) => s.key === booking.status)?.description || booking.status}
                    </p>
                  </div>
                </div>

                {booking.notes && (
                  <p className="text-xs text-gray-500 mt-3 border-t border-gray-100 pt-3">
                    📝 {booking.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
