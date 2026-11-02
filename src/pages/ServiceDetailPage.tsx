import { useParams, Link } from 'react-router-dom';
import { Clock, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import { careServices } from '../data/careServices';
import { formatPrice } from '../utils';

export default function ServiceDetailPage() {
  const { id } = useParams();
  const service = careServices.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <h2 className="font-bold text-xl">Layanan tidak ditemukan</h2>
        <Link to="/shoe-care" className="btn-primary">Kembali ke Shoes Care</Link>
      </div>
    );
  }

  const otherServices = careServices.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-900">Home</Link>
        <ChevronRight size={14} />
        <Link to="/shoe-care" className="hover:text-gray-900">Shoes Care</Link>
        <ChevronRight size={14} />
        <span className="text-gray-900 font-medium">{service.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="rounded-3xl overflow-hidden bg-gray-100 aspect-square">
          <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div>
          {service.popular && (
            <span className="badge bg-lime-400 text-black mb-3 inline-block">LAYANAN POPULER</span>
          )}
          <h1 className="text-4xl font-black text-gray-900 mb-3">{service.name}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="flex items-center gap-1"><Clock size={14} /> {service.duration}</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{service.description}</p>

          {/* Features */}
          <div className="bg-gray-50 rounded-2xl p-5 mb-6">
            <h3 className="font-bold text-gray-900 mb-3">Yang Anda Dapatkan</h3>
            <ul className="space-y-2.5">
              {service.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-lime-500 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-6 p-4 bg-white border border-gray-200 rounded-2xl">
            <div>
              <p className="text-sm text-gray-500">Harga layanan</p>
              <p className="text-3xl font-black text-gray-900">{formatPrice(service.price)}</p>
            </div>
            <Link to="/shoe-care/book" state={{ serviceId: service.id }} className="btn-primary text-base px-6 py-3">
              Book Sekarang <ArrowRight size={16} />
            </Link>
          </div>

          <p className="text-xs text-gray-400">
            * Harga dapat bervariasi tergantung kondisi sepatu. Konsultasi gratis sebelum pengerjaan.
          </p>
        </div>
      </div>

      {/* Other Services */}
      <section>
        <h2 className="text-2xl font-black text-gray-900 mb-6">Layanan Lainnya</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {otherServices.map((s) => (
            <Link key={s.id} to={`/shoe-care/${s.id}`} className="group">
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="h-40 overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{s.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-3">{s.description}</p>
                  <p className="font-bold text-gray-900">{formatPrice(s.price)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
